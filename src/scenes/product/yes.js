import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import styles from './no';
const ApiView = (props) => {
    console.log("product sub render")
    const { goForAxios, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
        <View style={styles.parentContainer}>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Click using axios'}
                    onPress={goForAxios}
                    color='green'
                />
            </View>
            
    
            { fromAxios && <FlatList
                    data={axiosData}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            }
            {loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text>Fetching Data</Text>
                </View>
            }
        </View>
    )
}



export default ApiView;
