import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: '90%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16
    },
    textInput: {
        padding: 8,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8
    },
    signUpContainer: {
        backgroundColor: 'orange',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginTop: 16
    },
    loginContainer: {
        backgroundColor: '#dfdfdf',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginTop: 8
    },
    signUpText: {
        color: 'white',
        fontWeight: 'bold'
    },
    loginText: {
        color: 'black',
        fontWeight: 'bold'
    },
    title: {
        position: 'absolute',
        top: '10%',
        color: 'orange',
        fontSize: 50,
        fontWeight: 'bold'
    }
})