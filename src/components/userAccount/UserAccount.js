import styles from './styles'
import { auth } from '../../database/config'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { signOut } from "firebase/auth";


export default UserAccount = () => {

    console.log('user', auth.currentUser)

    const handleLogut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('sign out', 'success')
        }).catch((error) => {
            Alert.alert('Error', 'Sign out failed, try again after some time')
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{auth.currentUser.displayName}</Text>
            <Text style={styles.emailText}>{auth.currentUser.email}</Text>
            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={handleLogut}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}