import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';


// import { useProducts } from '../context/ProductsProvider'
import styles from "./ProductsPage.module.css"
import Card from '../components/Card';
import Loader from '../components/Loader';
import {  filterProducts, getInitialQuery, searchProducts } from '../helpers/helper';
import SearchBox from '../components/SearchBox';
import Sidebar from '../components/Sidebar';

import {  fetchProducts } from "../features/product/productSlice";

function ProductsPage() {
  // const products = useProducts();
  const dispatch = useDispatch();
  const  { products , loading }  = useSelector((store) =>  store.product);
  
  // const products = [];
   
  const [displayed , setDisplayed] = useState([]);

  const [search , setSearch ] = useState("");
  const [query , setQuery] = useState({});

  const [searchParams , setSearchParams ] = useSearchParams();
  
  useEffect(() => {
  dispatch(fetchProducts());
  },[])

  useEffect(() => {
    setDisplayed(products)
    setQuery(getInitialQuery(searchParams))
  } , [products])

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "" );
    let finalProducts = searchProducts(products , query.search);
    finalProducts = filterProducts(finalProducts , query.category);

    setDisplayed(finalProducts)
  } ,[query]);


  return (
    <>
   <SearchBox search={search}  setSearch={setSearch} setQuery={setQuery} />
    <div className={styles.container} >
      <div className={styles.products} >
        {loading &&  <Loader />}
        {displayed.map((p) => (
          <Card  key={p.id} data={p} />
          ))}
      </div>
    <Sidebar query={query} setQuery={setQuery} /> 
    </div>
        </>
  )
}

export default ProductsPage