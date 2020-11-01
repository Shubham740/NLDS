import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = (props) => {
    return (
        props.isLoading ?
            <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'transparent', position: 'absolute', zIndex: 1 }}>
                <ActivityIndicator size='large' color={'#F27113'} animating={true} />
            </View>
            : null
    );
};
export { Loader };