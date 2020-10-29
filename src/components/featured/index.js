import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/index';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, FEATURED_PRODUCTS } from '../../constant/api';
import axios from 'axios';
import * as Actions from '../../actions/types';

export default function Featured() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.crt.cart);
  //const navigation = useNavigation();
  const [data, setData] = useState([]);

  console.log("feature" + data.length)

  useEffect(() => {
    getData().then((response) => {
      let fd = filterProducts(response.data)
      setData(fd)
    }).catch(errors => {
      console.log(errors)
    })
  }, []);


  function filterProducts(d) {
    let p = d.filter(item => {
      if (item.id in cart) {
        //console.log(item.name)
      }
      else {
        return item;
      }
    });
    return p;
  }

  function additemcart(item) {
    let p = data.filter(el => {
      if (el.id != item.id) {
        return el;
      }
    });
    setData(p)

    var c = BASE_URL+ item.product_image;
    dispatch({
      type: Actions.CART_ADD_ITEM,
      data: [item.id, 1, item.selling_price, c, item.name, item.mrp_price]
    });
    //let fd = filterProducts(data)
    //setData(fd)
  }

  function renderproducts(item) {
    if (item.product_image == '' || item.product_image == null) {
      item.product_image = "/static/img/category/images/nia.webp"
    }
    var c = BASE_URL + item.product_image;
    let percen = ((item.mrp_price - item.selling_price) / item.mrp_price) * 100;
    let z = percen.toString().split('.')[0];
    item["free"] = z;

    return (
      <TouchableOpacity>
        <View style={styles.featureditem}>
          <View style={{ justifyContent: "center", alignContent: "center" }}>
            <Image
              source={{ uri: c }}
              style={{ justifyContent: "center", alignContent: "center", padding: 50 }}
            />
            <Text style={styles.subitemtext}>{item.name}</Text>
          </View>
          <View style={styles.pricecontainercart}>
            <Text style={styles.sellingprice}>रु {item.selling_price}</Text>
            <Text style={styles.mrpprice}>{item.mrp_price}</Text>
            <Text style={styles.labelcolor}>{item.free}% Off</Text>
          </View>
          <View>
            <Text style={styles.featureditemadd} onPress={() => additemcart(item)}>ADD</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  return (
    <View style={styles.featuredproducts}>
      <Text style={styles.heading}>Items you have missed</Text>
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
  return axios.get(FEATURED_PRODUCTS);
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
    backgroundColor: Colors.SECONDARY,
    paddingTop: 15,
    paddingBottom: 20
  },
  pricecontainercart: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
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