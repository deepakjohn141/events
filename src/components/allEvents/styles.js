import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'orange',
        borderRadius: 50,
        padding: 16,
        elevation: 6,
    },
    addEventContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        marginTop: 16
    },
    addEventSubContainer: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: '90%',
        paddingTop: 16,
        paddingHorizontal: 16,
        borderRadius: 16
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        marginBottom: 16
    },
    postiveBtnContainer: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8
    },
    negativeBtnContainer: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginRight: 8
    },
    grayBtnContainer: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8
    },
    postivieBtnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    negativeBtnText: {
        color: 'white',
        fontWeight: 'bold',
    
    },
    actionBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 32
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12,
    },
    dateSelector: {
        backgroundColor: '#cccccc',
        padding: 8,
        borderRadius: 8
    },
    eventListItemContainer: {
        padding: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16
    },
    eventListItemBtnRight: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        marginLeft: 8
    },
    eventListItemBtnLeft: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        marginRight: 8
    },
    eventListItemActionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 16
    }, 
    favouriteConatiner: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
        alignSelf: 'flex-end'
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    descriptionText: {
        color: 'black',
        fontWeight: 'regular',
        fontSize: 16,
        marginTop: 8
    },
    dateText: {
        color: 'black',
        fontWeight: 'light',
        fontSize: 14
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    emptyMessage: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'gray',
        padding: 16,
        justifyContent: 'center'
    }
})