import { View, Text } from "react-native";
import { useEffect, useContext } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native"




export default Favourites = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Favourites</Text>
        </View>
    )
}