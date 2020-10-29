import React,{ useState , useEffect } from 'react';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,Image, ScrollView,SafeAreaView} from 'react-native';
import axios from 'axios';
import { BASE_URL, Get_All_CATEGORIES_URL } from '../../constant/api';
import { Colors } from '../../styles/index';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'



export default function CategoriesScreen() {

const [categoriesData, setCategoriesData] =  useState(null);
const n = 3;
const navigation = useNavigation();

  useEffect( () => {
      getData().then(response => {
        let data = response.data.filter(item => item.parent == null)
        setCategoriesData(data) 
      })
      .catch(err => {
         console.log(err)
      });
  }, []);

  return (
    <View style={styles.allcategoriespage}>
      <FlatList
            nestedScrollEnabled
            data={categoriesData}
            numColumns={n}
            renderItem={({ item }) => renderGridItem(item, navigation)}
            ListHeaderComponent = { <Header title={'All Categories'} />}
            //ListFooterComponent = {<Footer/> }
          />
          
    </View>
  );
}


function renderGridItem(item,n){
   if(item.picture == ''|| item.picture == null ){
    item.picture = "/static/img/category/images/nia.webp"
   }
    var c = BASE_URL + item.picture;
   return (
   <TouchableOpacity onPress={() => { n.navigate('Category Products', {itemId: item.id,itemName:item.name})}}>
     <View style={styles.item}>
     <Image
          source={{uri: c}}
          style={{ width: 80, height: 80 , borderRadius: 0}}
        />
    <Text style={styles.itemtext}>{item.name}</Text>
     </View> 
   </TouchableOpacity>
    );
}

async function getData(){
  return await axios.get(Get_All_CATEGORIES_URL);  
}

const styles = StyleSheet.create({
  ScrollView :{
    //flex : 1
  },
  allcategoriespage:{
    flex: 1,
  },
  headerview:{
    flex: 1,
  },
  container: {
    flex: 3,
    //flexWrap: "wrap",
    justifyContent: "center",
   },
    item: {
      flexDirection: "row",
      padding: 10,
      fontSize: 18,
      width: 100,
     // borderWidth: 0.2, 
     // borderColor: 'gray',
      margin: 10,
      flexWrap: "wrap",
      justifyContent: "center",
      //backgroundColor: Colors.Text_COLOR
    },
    itemtext :{
      marginTop: 10,
      textTransform: "capitalize",  
      fontSize: 14,
      color: Colors.BLACK  
    }
    
  });


  


