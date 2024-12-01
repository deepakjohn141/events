import { Alert, TextInput, TouchableOpacity } from "react-native"
import { View, Text } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default Login = () => {
    const navigation = useNavigation()
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleEmaiIdChange = (value) => {
        setEmailId(value)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleSignUp = () => {
        navigation.navigate('SignUp')
    }

    const handleLogin = async () => {
        if (!loading && emailId && password) {
            if (!/\S+@\S+\.\S+/.test(emailId)) {
                Alert.alert("Error", "Invalid Email Id.")
                return
            }
            if (password.length < 6) {
                Alert.alert('Error', "Password length should be atleast 6.")
                return
            }
            setLoading(true)
            try {
                const auth = getAuth()
                const user = await signInWithEmailAndPassword(auth, emailId, password)
                setLoading(false)
                setEmailId('')
                setPassword('')

            } catch (error) {
                setLoading(false)
                Alert.alert('Error', error.message)
            }
        } else {
            Alert.alert('Error', 'All fields are mandatory.')
        }
    }

    return (


        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <View style={styles.formContainer}>
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
                    style={styles.loginContainer}
                    onPress={handleLogin}>
                    <Text style={styles.loginText}>{loading ? 'loading...' : 'Login'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.singUpContainer}
                    onPress={handleSignUp}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}