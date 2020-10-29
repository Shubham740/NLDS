import React , {Component} from 'react';
import { connect } from 'react-redux';
import Loader from './loader';
import axios from 'axios';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    Image,
    Button
} from "react-native";
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { BASE_URL, PRODUCT_DETAILS } from '../../constant/api';
import { Colors } from '../../styles/index';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import Similar from '../../components/similar/index';
import * as Actions from '../../actions/types';
import store from '../../store/store';

export default class Product extends Component { 

  constructor(props) {
    console.log('product render')
    super(props);
    this.state = {
      activeSlide:0,
      loading: false,
      item: [],
      proID: this.props.route.params.proID
    };
    //this.getTodos = this.getTodos.bind(this);
    
   // this.getTodos(this.props.route.params.proID); 
}


  componentDidUpdate(prevProps, prevState) {
    console.log("product componentDidUpdate")
    let pre = prevProps.route.params.proID;
    let curr = this.props.route.params.proID
    if (pre != curr) {
     // this.getTodos(curr);
    }
  }

async getTodos(id) {
  console.log("api"+id)
  let data = await axios
    .get(PRODUCT_DETAILS+id)
    .then(function(response) {
      let len = response.data.length;
      if (len == 1) {
        return response.data[0];
      }
      else {
        let zarr = [];
        for (let i = 0; i < len - 1; i++) {
          zarr.push(response.data[i])
        }
        let lastItem = response.data[len]
        console.log(lastItem)
        //lastItem["offered_pro"] = zarr
        return lastItem;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
    
   
  this.setState({ item: data , proID : id,activeSlide: 0});
}

atb = (item) =>{
  store.dispatch({
      type: Actions.CART_ADD_ITEM, 
      data : [item.id,1,item.selling_price,item.product_image,item.name,item.mrp_price]
    });
    this.props.navigation.navigate('Product', {proID: item.id})
}

pplus = (item) => {
  store.dispatch({
    type: Actions.CART_UPDATE_INCREMENT, 
    data : [item.id]
  });
  this.props.navigation.navigate('Product', {proID: item.id})
}

pminus = (item) => {
  let mycart = store.getState().crt.cart;
  if(mycart[item.id].quantity == 1){
    store.dispatch({
      type: Actions.CART_REMOVE_ITEM, 
      data : [item.id]
    });
   }
  else
  {
    store.dispatch({
      type: Actions.CART_UPDATE_DECREMENT, 
      data : [item.id]
    });
  }
  this.props.navigation.navigate('Product', {proID: item.id})
}

render() {
  const { item } = this.state
  let itemInCart = false;
  let cart = store.getState().crt.cart;
  if(item.id in cart){
    itemInCart = true;
  }

  let proSlider = [];
  if (item.product_image != null) {
    proSlider.push({ src: item.product_image })
  }
  else {
    item.product_image = BASE_URL+"/static/img/category/images/nia.webp"
    proSlider.push({ src: item.product_image })
  }

  if (item.thumbnail_1 != null) {
    proSlider.push({ src: item.thumbnail_1 })
  }
  if (item.thumbnail_2 != null) {
    proSlider.push({ src: item.thumbnail_2 })
  }
  item["productSlider"] = proSlider;

   let percen = ((item.mrp_price-item.selling_price)/item.mrp_price)*100;
   let z = percen.toString().split('.')[0];
   item["free"] = z;
   item["yousave"]= item.mrp_price-item.selling_price ;
   let cat = 0;
   if(item.category != undefined){
     cat = item.category[0]
   }

   let offer_visible = false;
   if( item.offered_pro != undefined){
    offer_visible = true;
   }


  return (
    //<Loader loading={loading}/>
   // <Text>{dataSource.name}</Text>
   
   <ScrollView>
     <View style={styles.proheader}><Header title={item.name}/></View>
      <View style={styles.propage}>

        <View>
          <Carousel
            layout={"default"}
            ref={ref => this.carousel = ref}
            data={item.productSlider}
            sliderWidth={360}
            itemWidth={360}
            firstItem={0}
            renderItem={this._renderProSlider}
            onSnapToItem={index => this.setState({ activeSlide: index })} />
             { this.pagination }
        </View>
       
      <View style={styles.probase,styles.proinner}>
        
        <View><Text style={styles.proname}>{item.name}</Text></View>
        <View style={styles.price}> 
          <Text style={styles.proselling}>रु{item.selling_price}</Text>
          <Text style={styles.promrp}>{item.mrp_price}रु</Text>
          <Text style={styles.prooff}>{item.free}% Off</Text>
        </View>
        
        <View style={styles.yousave}> 
          <Text style={styles.yousavename}>You Save:</Text>
          <Text style={styles.yousaveunit}>{item.yousave} रु</Text>
        </View>

      {item.weight != null && <View style={styles.proweight}>
        <Text style={styles.proweightname}>Weight:</Text>
        <Text style={styles.proweightunit}>{item.weight} {item.slug}</Text>
      </View>}

      </View>

      { offer_visible && <View style={styles.offer}>
          <Text style={styles.offerheading}>Offer Details:</Text>
          <Text style={styles.offerdata}></Text>
        </View>
      }

      <View style={styles.proshortdesc}>
         <Text style={styles.proshortdescname}>Product Details:</Text>
         <Text style={styles.proshortdescunit}>{item.short_description}</Text>
      </View>

        {item.long_description != "" && <View style={styles.prolongdesc}>
          <Text style={styles.prolongdescname}>Full Details:</Text>
          <Text style={styles.prolongdescunit}>{item.long_description}</Text>
        </View>
        }
      
      <View style={styles.propageaddcart}>
          <View style={styles.viewdetails}>
            {!itemInCart && <Text>रु {item.selling_price}</Text>}
            {itemInCart && <Text>रु {item.selling_price * cart[item.id].quantity}</Text>}
          </View>


        <View>

            {!itemInCart && <TouchableOpacity onPress={() => this.atb(item)}><View style={styles.placeorder}>
              <Text style={{color:Colors.WHITE}}>Add To Basket</Text>
            </View></TouchableOpacity>
            }

            {itemInCart && <View style={styles.listingquantity}>
              <View style={{ width: 30 }}>
                <Button onPress={() => this.pminus(item)} title="-" color={Colors.PRIMARY} accessibilityLabel="Decrease" />
              </View>

              <Text style={styles.listingquantitytext}>{cart[item.id].quantity}</Text>
              <View style={{ width: 30 }}>
                <Button onPress={() => this.pplus(item)} title="+" color={Colors.PRIMARY} accessibilityLabel="Increase" />
              </View>
            </View>
            }

        </View>

      </View>

      <View style={styles.similer}>
        <Similar similarid={cat} proID={this.state.proID}/>
      </View>


    </View>
    <View><Footer/></View>
    </ScrollView>
   );
}



_renderProSlider({item,index}){
  return (
    <View style={{
        backgroundColor:Colors.GRAY_DARK,
        borderRadius: 5,
        height: 250,
        }}>
          <Image
          source={{uri: item.src}}
          style={{ width: 360, height: 250 , borderRadius: 0}}
        />
    </View>
  )
}


get pagination() {
  const { item , activeSlide } = this.state
  return (
      <Pagination
        dotsLength={item.productSlider.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 5 }}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
           // marginHorizontal: 2,
            backgroundColor: Colors.PRIMARY
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
  );
}



}





const styles = StyleSheet.create({
  listingquantitytext:{
    marginTop:8,
    marginLeft:15,
    marginRight:15
   },
  listingquantity:{
    width:100,
    flexDirection:"row",
    marginLeft:20,
    //marginBottom:10
  },
  placeorder:{
    borderWidth:0.2,
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
  viewdetails:{
    marginTop:10,
    width:210
  },
  propageaddcart:{
    marginTop:10,
    padding:10,
    borderWidth:0.2,
    backgroundColor:Colors.WHITE,
    flexDirection: 'row'
  },
  propage:{
    flex:1,
    //marginTop:5,
    marginBottom:5,
  },
  proinner:{
    marginLeft:5,
    marginRight:5
  },
  proheader:{
    height:50
  },
  probase:{
    flexDirection : "column",
  },
  yousave:{
    marginTop:10,
    flexDirection: "row"
  },
  yousavename:{
    fontStyle: 'normal',
    fontSize: 20,
    //fontWeight: "bold",
  },
  yousaveunit:{
    color : "gray",
    marginLeft: 5,
    marginTop: 4,
    
  },
  offerdata:{
    color: Colors.GRAY_DARK,
   },
  proshortdescunit:{
   color: Colors.GRAY_DARK,
  },
  prolongdescunit:{
    color: Colors.GRAY_DARK,
   },
  proshortdescname:{
    fontSize:16,
    marginBottom:10
  },
  offerheading:{
    fontSize:16,
    marginBottom:10
  },
  prolongdescname:{
    fontSize:16,
    marginBottom:10
  },
  proshortdesc:{
    marginTop: 10,
    borderWidth:0.2,
    padding:10,
    backgroundColor: Colors.WHITE
  },
  offer:{
    marginTop: 10,
    borderWidth:0.2,
    padding:10,
    backgroundColor: Colors.WHITE
  },
  prolongdesc:{
    marginTop: 10,
    borderWidth:0.2,
    padding:10,
    backgroundColor: Colors.WHITE
  },
  proweightunit:{
    marginTop:3
  },
  proweightname:{
    color: Colors.GRAY_DARK,
    fontSize:16,
    marginRight: 5
  },
  proweight:{
   flexDirection: "row",
   marginTop: 10
  },
  similer : {
    paddingTop:10,
    marginTop:10,
    marginBottom:10,
    backgroundColor: Colors.WHITE
  },
  proname: {
    color: Colors.PRIMARY,
    fontSize:24,
    textTransform: "capitalize",
    marginTop:10,
    marginBottom:10
  },
  proselling: {
    fontSize: 20,
    fontWeight: "bold",
 },
  promrp: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    color : "gray",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4
  },
  prooff: {
    marginTop: 4
  },
  price:{
    flexDirection: "row"
  }
})
