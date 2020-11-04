import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ApiUrls, STRINGS} from '../../constant/';
import styles from './LandingPageStyles';
import {img_path, Utils} from '../../constant/';
import LandingPageTitle from '../../components/atoms/landingTitle';
import {Colors} from '../../styles/index';

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

      categoryList: Utils.getDummyCategoryList(),
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
  renderFlatPercentageOff = () => {
    return (
      <Image
        style={styles.flatPercentageImageStyle}
        resizeMode={'contain'}
        source={img_path.FLAT}></Image>
    );
  };

  renderCategory = (item, index) => {
    return (
      <View style={styles.categoryItemStyle}>
        <TouchableOpacity>
          <Image
            style={styles.imageCategoryStyle}
            source={{
              uri: ApiUrls.BASE_URL + 'static/img/category/images/foody.jpg',
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  };

    renderMoreDiscountItem=()=>{
      return(<TouchableOpacity
      style={{width:Dimensions.get('window').width/2-20, backgroundColor:'red', height:100}}
      >

      </TouchableOpacity>)
    }

  renderDailyEssential = (item, index) => {
    return (
      <View style={styles.dailyEssentialViewStyle}>
        <TouchableOpacity>
          <Image
            style={[styles.imageDailyEssentialStyle, {alignSelf: 'center'}]}
            source={{
              uri: ApiUrls.BASE_URL + 'static/img/category/images/foody.jpg',
            }}></Image>
          <Text style={styles.dailyEssentialTextStyle}>Oil & ghee</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.offTextStyle}>Upto 50%</Text>
            <Text style={{fontSize: 10, fontFamily: Utils.fonts.regular}}>
              {' Off'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log('renderCategory', this.state.categoryList);
    return (
      <ScrollView style={styles.parentView}>
        {this.renderFlatPercentageOff()}
        <LandingPageTitle title={STRINGS.EXPLORE_BY_CATEGORY} />
        <View style={styles.categoryFlatListStyle}>
          <FlatList
            style={{marginHorizontal: 20}}
            data={this.state.categoryList}
            renderItem={({item, index}) => this.renderCategory(item, index)}
            horizontal={true}
            keyExtractor={(item, index) => item + index.toString}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <LandingPageTitle title={STRINGS.DAILY_ESSENTIAL} />
        <View
          style={[
            styles.categoryFlatListStyle,
            {height: Utils.getHeightScale(120)},
          ]}>
          <FlatList
            style={{marginHorizontal: 20}}
            data={this.state.categoryList}
            renderItem={({item, index}) =>
              this.renderDailyEssential(item, index)
            }
            horizontal={true}
            keyExtractor={(item, index) => item + index.toString}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <LandingPageTitle title={STRINGS.BEST_DEAL_FOR_YOU} />
        <LandingPageTitle title={STRINGS.MORE_DISCOUNT} />

        <View
          style={styles.moreDiscountViewStyle}>
          <FlatList
            data={this.state.categoryList}
            renderItem={({item, index}) =>
              this.renderMoreDiscountItem(item, index)
            }
              numColumns={2}
            keyExtractor={(item, index) => item + index.toString}
            showsHorizontalScrollIndicator={false}
          />
          </View>
      </ScrollView>
    );
  }
}
