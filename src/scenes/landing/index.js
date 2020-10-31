import React, {Component} from 'react';
import {Text, View,SafeAreaView,Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class LandingScreen extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
      carouselItems: [
      {
          title:"Lux",
          text: "Text 1",
          src : "http://192.168.43.239:8000"+"/static/img/category/images/nia.webp"
      },
      {
          title:"Paneer",
          text: "Text 2",
          src : "http://192.168.43.239:8000"+"/static/img/category/images/foody.jpg"
      },
      {
          title:"Tomato",
          text: "Text 3",
          src : "http://192.168.43.239:8000"+"/static/img/products/images/61DlqYmSLOL._SL1024_.jpg"
      },
      {
          title:"Rice",
          text: "Text 4",
          src : "http://192.168.43.239:8000"+"/static/img/category/images/nia.webp"
      },
      {
          title:"Shop",
          text: "Text 5",
          src : "http://192.168.43.239:8000"+"/static/img/products/images/storediagram.gif"
      },
    ]
  }
}

_renderItem({item,index}){
  return (
    <View style={{
        backgroundColor:'yellow',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25, }}>
          <Image
          source={{uri: item.src}}
          style={{ width: 150, height: 150 , borderRadius: 0}}
        />
      <Text style={{fontSize: 30}}>{item.title}</Text>
    </View>

  )
}

render() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'green', paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
          <Carousel
            layout={"default"}
            ref={ref => this.carousel = ref}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem = { index => this.setState({activeIndex:index}) } />
      </View>
    </SafeAreaView>
  );
}

}



