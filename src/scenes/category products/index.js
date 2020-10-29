import React,{ useState , useEffect ,useRef } from 'react';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,Image,Button } from 'react-native';
import axios from 'axios';
import { BASE_URL, PRODUCTS_BY_CATEGORY } from '../../constant/api';
import { Colors } from '../../styles/index';
import { useNavigation } from '@react-navigation/native';
import { Get_All_CATEGORIES_URL } from '../../constant/api';
import Header from '../../components/header/index'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions/types';
import Icon from 'react-native-vector-icons/FontAwesome';



export default CategoryProductsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.crt.cart);  
  const [products, setProducts] =  useState([]);
  const [categoriesData, setCategoriesData] =  useState([]);
  const [a, b] =  useState([]);
  const navigation = useNavigation();
  const n = 2;
  const n2 = 4;
  let q = 1;

  console.log("CategoryProducts")
useEffect( () => {
   if (route.params == "" || route.params == null || route.params == undefined ){
     q = 1;
   }
   else
   {
     q = route.params.itemId;
   }
   getData(q).then(axios.spread((...responses) => {
    let data = responses[1].data.filter(item => item.parent == q)
    let p = responses[0].data.filter(item => {
      let percen = ((item.mrp_price-item.selling_price)/item.mrp_price)*100;
      let z = percen.toString().split('.')[0];
      item["free"] = z;
      if (cart.hasOwnProperty(item.id)) {
        item["visible"] = {
          "additem": false,
          "quantity": cart[item.id].quantity  
        };
       item.selling_price = cart[item.id].price;
       item.mrp_price = cart[item.id].mrp;
      }
      else {
        item["visible"] = {
          "additem": true,
          "quantity": 0
        };
      }
      return item
    })
     setProducts(p)
     setCategoriesData(data)
   })).catch(errors => {     
      console.log(errors)
  })

  }, [route.params]);

xyz = (i) =>{
  dispatch({
      type: Actions.CART_ADD_ITEM, 
      data : [products[i].id,1,products[i].selling_price,products[i].product_image,products[i].name,products[i].mrp_price]
    });
    products[i].visible["additem"] = false;
    products[i].visible["quantity"] = 1;
    b([])
}

plus = (i) => {
  dispatch({
    type: Actions.CART_UPDATE_INCREMENT, 
    data : [products[i].id]
  }); 
  
  let ones = parseInt(products[i].selling_price) / parseInt(products[i].visible["quantity"]);
  let onem = parseInt(products[i].mrp_price) / parseInt(products[i].visible["quantity"]);
  products[i].visible["quantity"] = products[i].visible["quantity"] + 1;
  products[i].selling_price = ones * products[i].visible["quantity"];
  products[i].mrp_price = onem * products[i].visible["quantity"];
  b([])
}

minus = (i) => {
  
  if(products[i].visible["quantity"] == 1){
    dispatch({
      type: Actions.CART_REMOVE_ITEM, 
      data : [products[i].id]
    });
    products[i].visible["quantity"] = 0;
    products[i].visible["additem"] = true;
  }
  else
  {
    dispatch({
      type: Actions.CART_UPDATE_DECREMENT, 
      data : [products[i].id]
    });
    
  let ones = parseInt(products[i].selling_price) / parseInt(products[i].visible["quantity"]);
  let onem = parseInt(products[i].mrp_price) / parseInt(products[i].visible["quantity"]);
  products[i].visible["quantity"] = products[i].visible["quantity"] - 1;
  products[i].selling_price = ones * products[i].visible["quantity"];
  products[i].mrp_price = onem * products[i].visible["quantity"];
   
  }
   b([])
}


function renderProducts(products, navigation){
  return(
    <FlatList
        keyExtractor={item => item.id.toString()}
        data={products}
        numColumns={1}
        ListHeaderComponent = { products.length == 0 && noProductAvailable(products)}   
        renderItem={({ item,index }) => renderGridItem(item,navigation,index)}
    />
  )
}

function noProductAvailable(products){
  return(
    <View style={styles.noProducts}>
       <Text>There is no products in this category</Text>
    </View>
      
   )
}

function renderSubcategories(item,n){
  if(item.picture == ''|| item.picture == null ){
   item.picture = "/static/img/category/images/nia.webp"
  }
   var c = BASE_URL + item.picture;
  return (
  <TouchableOpacity onPress={() => { n.navigate('Category Products', {itemId: item.id,itemName:item.name})}}>
    <View style={styles.itemCategory}>
    <Image
         source={{uri: c}}
         style={{ width: 110, height: 80 , borderRadius: 0,flexDirection:"row",flex:1,justifyContent:"center",alignContent:"center"}}
       />
   <Text style={styles.subitemtext}>{item.name}</Text>
    </View> 
  </TouchableOpacity>
   );
}

function renderGridItem(item,n,i){
  if(item.product_image == ''|| item.product_image == null ){
   item.product_image = "http://192.168.43.239:8000/static/img/category/images/nia.webp"
  }
  
  return (
  <View>
      <View style={styles.item}>
        <TouchableOpacity style={styles.imagecontainer} onPress={() => { n.navigate('Product', {proID: item.id})}}>
         <Image
            source={{ uri: item.product_image }}
            style={{ width: 150, height: 100, borderRadius: 0 }}
          />
        </TouchableOpacity>
        <View style={styles.pricecontainer}>
           <Text style={styles.itemtext}>{item.name}</Text>
           <Text style={styles.sellingprice}>रु {item.selling_price}</Text>
          <Text style={styles.mrpprice}>रु {item.mrp_price}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.labelcolor}>{item.free}% Off</Text>
          
          { item.visible.additem && <TouchableOpacity style={styles.listingaddtocart} onPress={() => xyz(i)}>
            <Text style={styles.additem}>Add item</Text>
            <Text style={styles.additemplus}>+</Text>
          </TouchableOpacity> 
          }
          
            { !item.visible.additem && <TouchableOpacity style={styles.listingquantity}>
              <View style={{width:30}}>
              <Button onPress={() => minus(i) } title="-" color={Colors.PRIMARY} accessibilityLabel="Decrease"/>
              </View>
              
              <Text style={styles.listingquantitytext}>{item.visible.quantity}</Text>
              <View style={{width:30}}>
              <Button onPress={() => plus(i)} title="+" color={Colors.PRIMARY} accessibilityLabel="Increase" />
              </View>
            </TouchableOpacity>
        }



          </View>
        
        </View>
      </View> 
  </View>
   );
}


return(    
  <View style={styles.categoryproductspage}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={categoriesData}
        numColumns={n2}
        ListHeaderComponent = { <Header title={route.params.itemName} />}
        ListFooterComponent = {renderProducts(products, navigation)}
        renderItem={({ item }) => renderSubcategories(item, navigation)}
      />
      { Object.keys(cart).length !=0 && <MyView cart={cart}/>}
    </View>  
  )

}

async function getData(id){
    const a = axios.get(PRODUCTS_BY_CATEGORY+id);
    const b =  axios.get(Get_All_CATEGORIES_URL);
    return axios.all([a,b])
}


const MyView = ({ cart }) => {
  let tp = 0;
  for (key in cart){
    tp = parseInt(tp) + parseInt(cart[key].price);
  }

  return (
    <View style={styles.cartbottom}>
      <Text style={{marginRight:20,color: Colors.WHITE,marginTop:5}}>Basket रु {tp}</Text>
      <Text style={styles.cartbottombasket}>
        {/* <Icon name="shopping-cart" size={15} color={Colors.WHITE} options={{ tabBarBadge: 2 }}/>  */}
        {Object.keys(cart).length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryproductspage:{
   flex: 1
  },
  cartbottombasket:{
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    width: 40,
    textAlign: "center"
  },
  cartbottom:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding:5,
    backgroundColor: Colors.GRAY_DARK,
    zIndex:999,
    width: 360,
    textAlign: "center",
    justifyContent: "center"
  },
    noProducts: {
      flex: 1,
      justifyContent: "center",
      textAlign: "center",
      margin: 10
      },
    imagecontainer:{
      flex : 1,
    },
    listingquantitytext:{
     marginTop:8,
     marginLeft:15,
     marginRight:15
    },
    listingquantity:{
      width:100,
      flexDirection:"row",
      marginLeft:20,
      marginBottom:10
    },
    listingaddtocart:{
        width:100,
        flexDirection:"row",
        //backgroundColor: Colors.GRAY_LIGHT,
        borderWidth:0.8,
        textAlign:"center",
        justifyContent: "center",
        borderColor: Colors.PRIMARY,
        marginLeft:20
    },
    additem:{
      padding:4,
      width:70,
      textAlign:"center",
      color: Colors.PRIMARY,
      
    },
    additemplus:{
      color: Colors.PRIMARY,
      fontWeight: "bold",
      width:30,
      padding:4,
      textAlign:"center",
      borderLeftWidth:0.8,
      borderLeftColor: Colors.PRIMARY

    },
    pricecontainer :{
      flex : 1,
      flexDirection: "column",
     },
    mrpprice:{
     textDecorationLine: 'line-through', 
     textDecorationStyle: 'solid',
     marginTop:5,
     marginBottom: 6
    },
    sellingprice:{
      fontSize:20,
      flexDirection: "row",
      color: 'gray'
    },
    container: {
    flex: 0,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 5
    },  
    item: {
      flexDirection: "row",
      padding: 5,
     // borderWidth: 0.2, 
    //  borderColor: 'black',
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      //marginBottom: 15,
    },
    itemCategory : {
      flex:1,
      width: 110,
      flexDirection: "column",
      margin: 5,
      marginBottom:0,
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: Colors.WHITE,
      textAlign: "center"
    },
    itemtext :{
      marginBottom: 5,
      textTransform: "capitalize",
      flexDirection: "row",
      fontSize: 18,
     },
    subitemtext: {
      flex: 1,
      padding :5,
      textTransform: "capitalize",
      fontSize: 14,
      width: 110,
      textAlign: "center",
      backgroundColor: Colors.GRAY_DARK,
      color: Colors.WHITE
    },
    labelcolor:{
      width: 45,
      marginTop:5,
      color: Colors.BLACK
    }
  });