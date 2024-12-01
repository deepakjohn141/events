import { Alert } from "react-native";
import { db, auth } from "./src/database/config";
import { createContext, useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc, deleteDoc, getDocs, getDoc, deleteField, updateDoc } from 'firebase/firestore'


export const StateContext = createContext()

export const StateProvider = (props) => {

    const [events, setEvents] = useState([])

    const addEvent = (data) => {
        const eventData = { ...data, uid: auth.currentUser.uid }
        addDoc(collection(db, "events"), eventData)
            .then((docRef) => {
                console.log('ref', docRef)
                const updatedEvent = { ...eventData, id: docRef.id }
                setEvents(events => [...events, updatedEvent])
                return ""
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                return 'Try after some time.'
            });
    }

    const updateEvent = (eventId, updatedData) => {
        setDoc(doc(db, "events", eventId), updatedData, { merge: true })
            .then(() => {
                setEvents((prevEvents) =>
                    prevEvents.map((event) => (event.id === eventId ? { ...event, ...updatedData } : event))
                );

                return ""
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                return 'Try after some time.'
            });
    }

    const deleteEvent = (eventId) => {
        removeFromFavourites(eventId)
        deleteDoc(doc(db, "events", eventId))
            .then((() => {
                setEvents(events.filter(item => item.id != eventId))
                return ""
            }))
            .catch((error) => {
                console.error('Error deleting event:', error);
                return "Try after some time."
            })
    }

    const addToFavourites = (eventId) => {
        const fav = {}
        fav[eventId] = true
        setDoc(doc(db, "favourite", auth.currentUser.uid), fav, { merge: true })
            .then((docRef) => {
                const updatedEvents = events.map((event) => {
                    const isFavourite = eventId == event.id ? true : event.isFavourite
                    return { ...event, isFavourite: isFavourite }
                });

                setEvents(updatedEvents)
                return ""
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                return 'Try after some time.'
            });
    }


    const removeFromFavourites = (eventId) => {
        const fav = {}
        fav[eventId] = deleteField()
        updateDoc(doc(db, "favourite", auth.currentUser.uid), fav)
            .then((docRef) => {
                console.log('remove fav ref', docRef)
                const updatedEvents = events.map((event) => {
                    const isFavourite = eventId == event.id ? false : event.isFavourite
                    return { ...event, isFavourite: isFavourite }
                });

                setEvents(updatedEvents)
                return ""
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                return 'Try after some time.'
            });
    }


    const getAllEvents = async () => {

        try {
            const querySnapshot = await getDocs(collection(db, "events"))

            const eventsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('sddss', eventsArray)
            getDoc(doc(db, "favourite", auth.currentUser.uid))
                .then((doc) => {
                    if (doc.exists()) {
                        const favouriteIds = Object.keys(doc.data());
                        const updatedEvents = eventsArray.map((event) => {
                            const isFavourite = favouriteIds.includes(event.id);
                            return { ...event, isFavourite: isFavourite };
                        });

                        setEvents(updatedEvents)
                        console.log('events', updatedEvents)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching favourites:", error);
                })
            setEvents(eventsArray)

        }
        catch (error) {
            console.error("Error fetching events:", error);
        }
    }



    return (
        <StateContext.Provider
            value={
                {
                    events: [events, setEvents],
                    getAllEvents, addEvent,
                    updateEvent, deleteEvent,
                    addToFavourites, removeFromFavourites
                }
            }
        >
            {props.children}
        </StateContext.Provider>
    )
}