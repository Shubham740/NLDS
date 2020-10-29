import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/index';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, PRODUCTS_BY_CATEGORY } from '../../constant/api';
import axios from 'axios';
import * as Actions from '../../actions/types';

export default function Similar({similarid,proID}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.crt.cart);
  const navigation = useNavigation();
  const [data, setData] = useState([]);

console.log("similar"+similarid)

  useEffect(() => {
    getData(similarid).then((response) => {
      let p = response.data.filter(item => {
        if (item.id !== proID) {
          return item
        }
      });
      setData(p)
    }).catch(errors => {
      console.log(errors)
    })
  }, [proID]);


  // function filterProducts(d) {
  //   let p = d.filter(item => {
  //     if (item.id in cart) {
  //       //console.log(item.name)
  //     }
  //     else {
  //       return item;
  //     }
  //   });
  //   return p;
  // }

  // function additemcart(item) {
  //   let p = data.filter(el => {
  //     if (el.id != item.id) {
  //       return el;
  //     }
  //   });
  //   setData(p)

  //   var c = 'http://192.168.43.239:8000' + item.product_image;
  //   dispatch({
  //     type: Actions.CART_ADD_ITEM,
  //     data: [item.id, 1, item.selling_price, c, item.name, item.mrp_price]
  //   });
    
  // }

  function renderproducts(item) {
    if (item.product_image == '' || item.product_image == null) {
      item.product_image = BASE_URL+"/static/img/category/images/nia.webp"
    }
    
    let percen = ((item.mrp_price - item.selling_price) / item.mrp_price) * 100;
    let z = percen.toString().split('.')[0];
    item["free"] = z;

    return (
      <TouchableOpacity onPress={() => { navigation.navigate('Product', {proID: item.id})}}>
        <View style={styles.featureditem}>
          <View style={{ justifyContent: "center", alignContent: "center" }}>
            <Image
              source={{ uri: item.product_image }}
              style={{ justifyContent: "center", alignContent: "center", height: 200 }}
            />
            <Text style={styles.subitemtext}>{item.name}</Text>
          </View>
          <View style={styles.pricecontainercart}>
            <Text style={styles.sellingprice}>रु {item.selling_price}</Text>
            <Text style={styles.mrpprice}>{item.mrp_price}</Text>
            <Text style={styles.labelcolor}>{item.free}% Off</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  return (
    <View style={styles.featuredproducts}>
      <Text style={styles.heading}>Similar Products</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={({ item }) => renderproducts(item)}
      />
    </View>
  );


}

async function getData(id) {
  return axios.get(PRODUCTS_BY_CATEGORY+id);
}


const styles = StyleSheet.create({
  heading: {
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 18
  },
  featureditemadd: {
    borderWidth: 0.2,
    padding: 5,
    color: Colors.PRIMARY,
    borderRadius: 5,
    textAlign: 'center'
  },
  labelcolor: {
    fontSize: 12,
    color: Colors.PRIMARY
  },
  mrpprice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Colors.GRAY_DARK,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
  },
  subitemtext: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  featuredproducts: {
    //backgroundColor: Colors.SECONDARY,
    paddingTop: 15,
    paddingBottom: 20
  },
  pricecontainercart: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  featureditem: {
    //flex:1,
    width: 150,
    flexDirection: "column",
    margin: 5,
    //borderWidth:0.2,
    padding: 10,
    marginBottom: 0,
    justifyContent: "center",
    backgroundColor: 'white',
    textAlign: "center"
  },
})