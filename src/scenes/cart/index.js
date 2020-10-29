import React,{ useState , useEffect} from 'react';
import {Image,Button, Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles/index';
import Footer from '../../components/footer/index';
import Featured from '../../components/featured/index';
import axios from 'axios';
import { BASE_URL, GET_PROMOCODE } from '../../constant/api'



export  default   CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.crt.cart);  
  const navigation = useNavigation();
 
  let ta = 0;
  for(key in cart){
    ta = parseInt(ta) + parseInt(cart[key].price)
  }

  return(
    
    <View style={styles.cartpage}>
      <CartHeader />
      {Object.keys(cart).length == 0 && <View style={styles.emptycartcontainer}>
        <Text style={{ color: Colors.BLACK, textAlign: 'center', fontSize: 20, fontWeight: '800' }}>Your basket is empty!</Text>
        <Text style={{ color: Colors.GRAY_DARK, marginTop: 20, marginBottom: 20, textAlign: 'center' }}>Add item to it now</Text>
        <View style={{ textAlign: 'center', justifyContent: "center", flexDirection: 'row' }}>
          <Text style={styles.emptycartshop} onPress={() => navigation.navigate('Categories')}>Shop now</Text>
        </View>
        
      </View>
      }
      {Object.keys(cart).length == 0 && <View style={styles.footer}><Footer/></View>}
      {Object.keys(cart).length != 0 && <CartFull/> }
      {Object.keys(cart).length != 0 && <View style={styles.bottomcart}>
        <View style={styles.viewdetails}>
          <Text style={{marginBottom:5}}>रु {ta}</Text>
          <Text style={{ color: Colors.PRIMARY }}>View Price Details</Text>
        </View>
        <View>
          <Text style={styles.placeorder}>Place order</Text>
        </View>
      </View>}
    </View>
    
  );
}
  


const CartFull = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.crt.cart); 
 
  let input = '';
  const saveUserInput = userInput => {
    input = userInput;
  };

  let arr = [];
  for(key in cart){
    let obj = cart[key]
    obj['id'] = key
    arr.push(obj)
  }

  function renderCartItem(item, n) {
    if (item.image == '' || item.image == null) {
      item.image = BASE_URL+"/static/img/category/images/nia.webp"
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.imagecontainer} onPress={() => { n.navigate('Product', { proID: item.id }) }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 80, height: 80, borderRadius: 0 }}
          />
        </TouchableOpacity>
        <View style={styles.pricecontainer}>
          <Text style={styles.itemtext}>{item.name}</Text>
          <Text style={styles.sellingprice}>रु {item.price}</Text>

          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <Text style={styles.mrpprice}>रु {item.mrp}</Text>
            <TouchableOpacity style={styles.listingquantity}>
              <View style={{ width: 30 }}>
                <Button onPress={() => xminus(item)} title="-" color={Colors.PRIMARY} accessibilityLabel="Decrease" />
              </View>

              <Text style={styles.listingquantitytext}>{item.quantity}</Text>
              <View style={{ width: 30 }}>
                <Button onPress={() => xplus(item)} title="+" color={Colors.PRIMARY} accessibilityLabel="Increase" />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }

  

  function klpd() {
    let arr = [];
    let tp =0;
    let ta = 0;
    let no = 0;
    for(key in cart){
      tp = parseInt(tp) + parseInt(cart[key].mrp)
      ta = parseInt(ta) + parseInt(cart[key].price)
      no = no + 1;
    }
    let dis = tp - ta;
    const [coupen, setCoupen] =  useState(0);

    applyPromo = () => {
      let obj = {"code":input}
      axios.post(GET_PROMOCODE,obj)
      .then(function(response) {
        if(response.data.length > 0){
          let cc = response.data[0].discount;
          setCoupen(cc)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    return (
      <View>
        <View style={styles.promocode}>
          <TextInput style={styles.txtinput}
            underlineColorAndroid="transparent"
            placeholder="Enter Promocode"
            placeholderTextColor="#000"
            autoCapitalize="none"
            onChangeText={userInput => saveUserInput(userInput)}
          />
          <View style={styles.applybtn}>
            <Button onPress={() => applyPromo()} title="Apply Coupen" color={Colors.PRIMARY} />
          </View>
        </View>
        <Featured />
        <View style={styles.shoopingdetails}>
          <Text style={{color:Colors.GRAY_DARK,borderBottomWidth:0.2,padding:10}}>Price Details</Text>
           <View style={styles.detail1}>
           <Text style={styles.rightleft}>Price ({no} Items)</Text>
           <Text>रु {tp}</Text>
           </View>

           <View style={styles.detail2}>
           <Text style={styles.rightleft}>Discount</Text>
           <Text>रु {dis}</Text>
           </View>

           <View style={styles.detail3}>
           <Text style={styles.rightleft}>Delivery Charge</Text>
           <Text>रु 0</Text>
           </View>

           <View style={styles.detail3}>
           <Text style={styles.rightleftcoupen} onPress={() => console.log("scroll it")}>Coupen Discount</Text>
           <Text>रु {coupen}</Text>
           </View>

           <View style={styles.detail4}>
           <Text style={styles.rightleft}>Total Amount</Text>
           <Text>रु {ta}</Text>
           </View>

          <Text style={{color: 'green',padding:10,marginBottom:20}}>You will save रु {dis} on this order</Text>
        </View>
      </View>
    )
  }

  xplus = (item) => {
    dispatch({
      type: Actions.CART_UPDATE_INCREMENT, 
      data : [item.id]
    });
  }
  
  xminus = (item) => {
    if(item.quantity == 1){
      dispatch({
        type: Actions.CART_REMOVE_ITEM, 
        data : [item.id]
      });
     }
    else
    {
      dispatch({
        type: Actions.CART_UPDATE_DECREMENT, 
        data : [item.id]
      });
    }
  }

  return (
    <View style={styles.cartfull}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={arr}
        numColumns={1}
        renderItem={({ item, index }) => renderCartItem(item, navigation)}
        ListFooterComponent = {klpd()}
      />
    </View>
  )

}


const CartHeader = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.crt.cart);  
  return(
    <View style={styles.cartpageheader}>
        <TouchableOpacity style={styles.leftheader}>
                   <Icon name="long-arrow-left" size={25} color="#fff" onPress={() => navigation.goBack()}/>
                   {Object.keys(cart).length == 0 && <Text style={styles.headertitle}>My Cart</Text> }
                   {Object.keys(cart).length != 0 && <Text style={styles.headertitle}>Needlife Basket ({Object.keys(cart).length} items)</Text> }
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  applybtn:{
    padding:3,
    textTransform:"uppercase"
  },
  promocode:{
    flexDirection: "row",
    padding:15,
    marginTop:10
  },
  txtinput: {
    marginRight: 15,
    height: 40,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    width:210
 },
  viewdetails: {
    width: 220
  },
  rightleft: {
    width: 310,

  },
  rightleftcoupen: {
    width: 310,
    //color:Colors.PRIMARY
  },
  shoopingdetails: {
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    marginBottom: 100
  },
  detail1:{
    padding:10,
    flexDirection:'row'
  },
  detail2:{
    padding:5,
    paddingLeft:10,
    flexDirection:'row'
  },
  detail3:{
    padding:5,
    paddingLeft:10,
    flexDirection:'row'
  },
  detail4:{
    padding:10,
    flexDirection:'row',
    borderBottomWidth:0.2,
    borderTopWidth:0.2,
    borderTopColor: Colors.GRAY_DARK
  },
  imagecontainer:{
    width: 80,
    padding:10,
    marginRight:10
  },
  pricecontainer :{
    marginLeft:20,
    marginTop:10
   },
  listingquantity:{
    width:100,
    flexDirection:"row",
    marginLeft:50
  },
  item: {
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,   
  },
  listingquantitytext:{
    marginTop:8,
    marginLeft:15,
    marginRight:15
   },
   mrpprice:{
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    marginTop:5,
    marginBottom: 6,
    width:50
   },
   sellingprice:{
     fontSize:20,
     flexDirection: "row",
     color: 'gray'
   },
   itemtext :{
    marginBottom: 5,
    textTransform: "capitalize",
    flexDirection: "row",
    fontSize: 18,
   },
  cartfull: {

  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: 360
  },
  bottomcart: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: 360,
    padding: 10,
    borderTopWidth:0.2,
    borderColor: Colors.GRAY_DARK,
    zIndex:10,
    backgroundColor: Colors.WHITE
  },
  placeorder:{
     width:100,
     backgroundColor:Colors.GRAY_DARK,
     color:Colors.WHITE,
     padding:10,
     textAlign: 'center'
  },
  emptycartshop: {
    flexDirection: 'row',
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    textAlign: 'center',
    justifyContent: "center",
    width: 150,
    padding: 10,
    margin: 0,
    borderRadius: 5
  },
  emptycartcontainer: {
    justifyContent: "center",
    textAlign: 'center',
    marginTop: 50
  },
  cartpage: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.WHITE
  },
  cartpageheader: {
    backgroundColor: Colors.PRIMARY,
    padding: 12
  },
  headertitle: {
    color: "white",
    marginLeft: 15,
    fontSize: 16,
    marginTop: 5
  },
  leftheader: {
    flexDirection: 'row',
    width: 270
  },
})






































