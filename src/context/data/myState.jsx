import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { addDoc, collection, onSnapshot, query, Timestamp, orderBy, setDoc, doc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function myState(props) {
  const [mode, setMode] = useState('light');
  
  const toggleMode= () =>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = "rgb(17, 24, 39)"
      }
      else{
        setMode('light');
        document.body.style.backgroundColor = "rgb(248, 248, 255)"
  }
}

const [loading, setLoading] = useState(false);

const [products, setProducts]= useState({
  title:null,
  price:null,
  imageUrl:null,
  category:null,
  description:null,
  time: Timestamp.now(),
  date: new Date().toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  )
});
const addProduct = async()=>{
  if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
    return toast.error('Please fill all fields')
  }
   setLoading(true);
  try {
    
    const productRef = collection(fireDB, 'products');

    await addDoc(productRef, products)
    toast.success("Add product successfully")
    setTimeout(()=>{
      window.location.href ='/dashboard'
    },800);
    getProductData()
    setLoading(false);

  } catch (error) {
    console.log(error)
    toast.error("Failed to Add")
    setLoading(false)
  }
}

const [product, setProduct] = useState([]);

const getProductData = async () => {

  setLoading(true);

  try {
    const q = query(
      collection(fireDB, 'products'),
      orderBy('time')
    );

    const data = onSnapshot(q, (QuerySnapshot)=>{
      let productArray =[];
      QuerySnapshot.forEach((doc) => {
        productArray.push({
          id: doc.id,
          ...doc.data(),
          });
          });
          setProduct(productArray)
          setLoading(false)

    });

    return()=>data;

  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

useEffect(()=>{
  getProductData()
},[])

// update product function

const edithandle = (item)=>{
  setProducts(item)
}

const updateProduct = async()=>{
  setLoading(true)
  try {
    await setDoc(doc(fireDB, "products", products.id), products);
    toast.success("Product Updated successfully")
    setTimeout(()=>{
      window.location.href ='/dashboard'
    },800);
    getProductData();
    setLoading(false)

  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}


 // delete product

 const deleteProduct = async (item)=>{
  setLoading(true)
  try {
    await deleteDoc(doc(fireDB, "products", item.id))
    toast.success("Product Deleted successfully")
    getProductData()
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
 }

 const[order, setOrder]= useState([])

 const getOrderData = async ()=>{
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB,"orders"))
    const orderArray =[];
    result.forEach((doc) => {
      orderArray.push(doc.data())
      setLoading(false)
      });
      setOrder(orderArray)
      console.log(orderArray)
      setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
 }

 const [user, setUser] = useState([]);

 const getUserData = async()=>{
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "users"))
    const userArray = [];;
    result.forEach((doc) => {
      userArray.push(doc.data())
      setLoading(false)
      });
      setUser(userArray)
      console.log(userArray)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
 }

 const [searchkey, setSearchkey]= useState('')
 const [filterType, setFilterType]= useState('')
 const [filterPrice, setFilterPrice]= useState('')

 useEffect(()=>{
  getOrderData()
  getUserData()
 },[])



  return (
    <MyContext.Provider value={{mode, toggleMode , loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }}>{props.children}</MyContext.Provider>
  )
}

export default myState