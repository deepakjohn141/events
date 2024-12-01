import { Alert, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native"
import { StateContext } from "../../../StateContext"
import { useContext, useEffect, useState } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Timestamp } from 'firebase/firestore'
import { auth } from "../../database/config";
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default AllEvents = (route) => {
    const { events, getAllEvents, addEvent, updateEvent, deleteEvent, addToFavourites, removeFromFavourites } = useContext(StateContext)

    const [eventList, setEventList] = events

    const [displayAddEvent, setDisplayAddEvent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editEvent, setEditEvent] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        console.log('datepicker', 'show')
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setStartDate(date)
        hideDatePicker();
    };



    const filteredEvents = () => {
        console.log('route', route.route.name)
        if (route.route.name == 'Favourites') {
            return eventList.filter(event => event.isFavourite == true)
        } if (route.route.name == 'My Events') {
            return eventList.filter(event => event.uid == auth.currentUser.uid)
        }
        else {
            return eventList
        }
    }

    const getEmptyMessage = () => {
        console.log('route', route.route.name)
        if (route.route.name == 'Favourites') {
            return 'There are no favourite events to display.'
        } if (route.route.name == 'My Events') {
            return 'Thers are no events added by you to display. Add events to see.'
        }
        else {
            return "There are no events to display."
        }
    }

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleDescriptionChange = (value) => {
        setDescription(value)
    }

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
    }

    const handleAddEvent = () => {
        if (title && description && startDate) {
            setLoading(true)
            const eventData = {
                title: title,
                description: description,
                startTime: Timestamp.fromDate(startDate)

            };

            const msg = addEvent(eventData)
            handleMessage(msg)
            setLoading(false)
            resetFormView()
        } else {
            Alert.alert('Alert', 'All fields are mandatory.')
        }
    }

    const handleUpdateEvent = () => {
        if (title && description && startDate) {
            setLoading(true)
            const eventData = {
                title: title,
                description: description,
                startTime: Timestamp.fromDate(startDate)

            };

            const msg = updateEvent(editEvent.id, eventData)
            handleMessage(msg)
            setLoading(false)
            resetFormView()
        } else {
            Alert.alert('Alert', 'All fields are mandatory.')
        }
    }

    const resetFormView = () => {
        setTitle('')
        setDescription('')
        setStartDate(new Date())
        setDisplayAddEvent(false)
        setEditEvent()
    }

    const handleMessage = (msg) => {
        if (msg) {
            Alert.alert('Error', msg)
        }
    }

    const handleFavouriteBtn = (event) => {
        const msg = event.isFavourite ? removeFromFavourites(event.id) : addToFavourites(event.id)
        handleMessage(msg)
    }


    const handleFABPress = () => {
        setStartDate(new Date())
        setDisplayAddEvent(true)
    }

    const getDate = (value) => {

        const milliseconds = value.seconds * 1000 + value.nanoseconds / 1000000;

        const date = new Date(milliseconds);

        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        return <Text style={styles.dateText}>{formattedDate}</Text>


    }

    const handleDeleteEvent = (value) => {
        const msg = deleteEvent(value)
    }

    const handleEditEvent = (event) => {
        setTitle(event.title)
        setDescription(event.description)
        const time = event.startTime
        const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000;

        const date = new Date(milliseconds);

        setStartDate(date)
        setEditEvent(event)

    }

    const handleDismiss = () => {
        resetFormView()
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    const displayEvents = () => {
        const result = filteredEvents()
        console.log('size', result.size)
        if (result.length == 0) {
            return <View style={styles.emptyMessageContainer}>
                <Text style={styles.emptyMessage}>{getEmptyMessage()}</Text>
            </View>
        } else {
            return result.map((ele) => {

                return <View key={ele.id} style={styles.eventListItemContainer}>
                    <Text style={styles.titleText}>{ele.title}</Text>
                    {getDate(ele.startTime)}
                    <Text style={styles.descriptionText}>{ele.description}</Text>


                    <View style={styles.eventListItemActionContainer}>
                        <TouchableOpacity
                            style={styles.favouriteConatiner}
                            onPress={() => handleFavouriteBtn(ele)}
                        >
                            <MaterialIcons name={ele.isFavourite ? "favorite" : "favorite-border"} size={24} color='orange' />
                        </TouchableOpacity>
                        {auth.currentUser && ele.uid == auth.currentUser.uid && (
                            <>
                                <TouchableOpacity
                                    style={styles.eventListItemBtnLeft}
                                    onPress={() => handleEditEvent(ele)}>
                                    <Text style={styles.postivieBtnText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.eventListItemBtnRight}
                                    onPress={() => handleDeleteEvent(ele.id)}>
                                    <Text style={styles.postivieBtnText}>Delete</Text>
                                </TouchableOpacity>
                            </>
                        )}

                    </View>


                </View>

            })
        }
    }

    if (displayAddEvent || editEvent) {
        return (
            <View style={styles.addEventContainer}>
                <View style={styles.addEventSubContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        value={description}
                        onChangeText={handleDescriptionChange}
                    />

                    <View style={styles.dateContainer}>
                        <TouchableOpacity
                            style={styles.dateSelector}
                            onPress={showDatePicker}>
                            <Text>{startDate.toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.actionBtnContainer}>

                        <TouchableOpacity
                            style={styles.negativeBtnContainer}
                            onPress={handleDismiss}>
                            <Text style={styles.negativeBtnText}>DISMISS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.postiveBtnContainer}
                            onPress={displayAddEvent ? handleAddEvent : handleUpdateEvent}
                        >
                            <Text style={styles.postivieBtnText}>{displayAddEvent ? 'ADD' : 'UPDATE'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    date={startDate}
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        )
    } else {
        return (

            <View style={styles.container}>
                <ScrollView >
                    {displayEvents()}
                </ScrollView>
                {route.route.name != 'Favourites' &&
                    <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                        <MaterialIcons name="add" size={24} color="white" />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}