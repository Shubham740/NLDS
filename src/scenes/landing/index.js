import React, {Component} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import {ApiUrls, STRINGS} from '../../constant/';
import styles from './LandingPageStyles';

import LandingPageTitle from '../../components/atoms/landingTitle';
export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Lux',
          text: 'Text 1',
          src: ApiUrls.BASE_URL + 'static/img/category/images/nia.webp',
        },
        {
          title: 'Paneer',
          text: 'Text 2',
          src: ApiUrls.BASE_URL + 'static/img/category/images/foody.jpg',
        },
        {
          title: 'Tomato',
          text: 'Text 3',
          src:
            ApiUrls.BASE_URL +
            'static/img/products/images/61DlqYmSLOL._SL1024_.jpg',
        },
        {
          title: 'Rice',
          text: 'Text 4',
          src: ApiUrls.BASE_URL + 'static/img/category/images/nia.webp',
        },
        {
          title: 'Shop',
          text: 'Text 5',
          src: ApiUrls.BASE_URL + 'static/img/products/images/storediagram.gif',
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View
        style={{
          backgroundColor: 'yellow',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}>
        <Image
          source={{uri: item.src}}
          resizeMode={'contain'}
          style={{
            width: 100,
            height: 100,
            borderRadius: 0,
            alignSelf: 'center',
          }}
        />
        <Text style={{fontSize: 30}}>{item.title}</Text>
      </View>
    );
  }

  renderCrousal = () => {
    return (
      <View style={styles.categoryViewStyle}>
        <Carousel
          layout={'default'}
          ref={(ref) => (this.carousel = ref)}
          data={this.state.carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({activeIndex: index})}
        />
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.parentView}>
        <LandingPageTitle title={STRINGS.EXPLORE_BY_CATEGORY} />
        {this.renderCrousal()}
        <LandingPageTitle title={STRINGS.DAILY_ESSENTIAL} />
        <LandingPageTitle title={STRINGS.BEST_DEAL_FOR_YOU} />
        <LandingPageTitle title={STRINGS.MORE_DISCOUNT} />
      </SafeAreaView>
    );
  }
}
