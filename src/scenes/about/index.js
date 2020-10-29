import React from 'react';
import {Text,View,Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions/types';

export default function AboutScreen() {

  // //this object represents the classes that we defined 
  // const classes = useStyles();
  // //this hook allows us to access the dispatch function
    const dispatch = useDispatch();
  // //the useState() hook allows our component to hold its own internal state
  // //the dogName property isn't going to be used anywhere else, so there's no need to hold it on the redux store
  // const [dogName, setDogName] = useState('');
   //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
   const a = useSelector((state) => state.hmr.count);

  // //a function to dispatch multiple actions
  // const getDog = () => {
  //   dispatch(loadDogAction(true));
  //   dispatch(RandomDogAction(dogName));
  // }

  const increase = () => {
    dispatch({type: Actions.COUNTER_INCREMENT})
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About screen</Text>
      <Text>{a}</Text>
      <Button onPress={() => increase()} title="Increase Count" color="#841584" accessibilityLabel="Increase"/>
    </View>
  );

}


