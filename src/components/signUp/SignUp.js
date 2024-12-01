import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import styles from "./styles"

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'



export default SignUp = () => {

    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handleNameChange = (value) => {
        setName(value)
    }

    const handleEmaiIdChange = (value) => {
        setEmailId(value)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleSignUp = async () => {
        if (!loading && name && emailId && password) {

            if (!/\S+@\S+\.\S+/.test(emailId)) {
                Alert.alert("Error", "Invalid Email Id")
                return
            }
            if (password.length < 6) {
                Alert.alert('Error', "Password length should be atleasdt 6.")
                return
            }
            setLoading(true)
            try {
                const auth = getAuth()
                console.log("auth:", auth)
                console.log("name:", emailId)
                console.log("password:", password)
                const userCredential = await createUserWithEmailAndPassword(auth, emailId, password)


                // Signed up 
                await updateProfile(userCredential.user, {
                    displayName: name,
                });
                setLoading(false)
                setEmailId('')
                setPassword('')
                setName('')

            } catch (error) {
                console.log("error:", error)

                Alert.alert('Error', 'Failed to sign up, try again.')
                setLoading(false)
            }

        } else {
            Alert.alert('Error', 'All fields are mandatory.')
        }
    }

    const handleLogin = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    keyboardType="default"
                    onChangeText={handleNameChange} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email-Id"
                    keyboardType="email-address"
                    onChangeText={handleEmaiIdChange} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handlePasswordChange} />
                <TouchableOpacity
                    style={styles.signUpContainer}
                    onPress={handleSignUp}>
                    <Text style={styles.signUpText}>{loading ? 'loading...' : 'Sign Up'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginContainer}
                    onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}