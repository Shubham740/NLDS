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

  renderMoreDiscountItem = (item, index) => {
    if (index <= 3) {
      return (
        <View>
          <TouchableOpacity style={styles.moreDiscountTouchableStyle}>
            <Image
              style={{height: 79, width: 46, backgroundColor: 'green'}}
              source={img_path.FLAT}></Image>
            <View style={{marginLeft: 10}}>
              <View style={styles.discountOffViewStyle}>
                <Text style={styles.discountOffTextStyle}> 12 % off</Text>
              </View>

              <Text style={styles.discountTitleStyle}>Deodrant</Text>

              <Text style={styles.discountOffStyle}> 12 % off</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View />;
    }
  };

  renderBestDeal = (item, index) => {
    if (index <= 3) {
      return (
        <View>
          <TouchableOpacity style={styles.bestDealViewStyle}>
            <Image
              style={{height: 97, width: 161, backgroundColor: 'green'}}
              source={img_path.FLAT}></Image>
            <View style={{alignItems:'center', width:200}}>
              <View style={styles.bestDealDiscountOffStyle}>
                <Text style={styles.discountOffTextStyle}> 12 % off</Text>
              </View>

              <Text style={styles.bestDealTitleStyle}
              numberOfLines={2}
              > Parle Real Elaichi Premium Rusk 273g</Text>

              <Text style={styles.mrpStyle}> M.R.P Rs 20</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            style={{marginHorizontal: 20}}
            data={this.state.categoryList}
            renderItem={({itemValue, indexValue}) =>
              this.renderDailyEssential(itemValue, indexValue)
            }
            horizontal={true}
            keyExtractor={(itemValue, indexValue) => itemValue + indexValue.toString}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    } else {
      return <View />;
    }
  };

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
        <View style={[styles.moreDiscountViewStyle, {marginBottom: 0}]}>
          {this.renderBestDeal(null, 0)}
        </View>

        <LandingPageTitle title={STRINGS.MORE_DISCOUNT} />

        <View style={styles.moreDiscountViewStyle}>
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
