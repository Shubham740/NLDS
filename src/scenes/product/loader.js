import React from 'react'
import { View, Text,ActivityIndicator,StyleSheet } from 'react-native';

const Loader = (props) => {
    const { loading } = props
    return (
        <View>
            { loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text>Please Wait</Text>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    loader: {
        marginTop: 20,
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    alignItems:"center"
   }
});
export default Loader;
