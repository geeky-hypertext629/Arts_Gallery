import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from "./../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import {useAlert} from "react-alert";

import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';

const categories = ["Sculptures","Serigraphs","Prints","Painting","Street Art","Visual Art","Concrptual Art"];

const Products = () => {

    const dispatch = useDispatch();
    const alert = useAlert()

    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0)
    const [price, setPrice] = useState([0,100000]);
    const [category, setCategory] = useState("")

    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products)
    const {keyword} = useParams();

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice);
    }
    
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors)
        }
      
    dispatch(getProduct(keyword,currentPage,price,category,ratings))
    
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])

    let count = filteredProductsCount;


    //Slider Customization
    const priceMarks = [
        {
          value: 0,
          label: '₹0',
        },  
        {
          value: 50000,
          label: '₹50k',
        },
        {
          value: 100000,
          label: '₹100k',
        },
      ];
    
  return (
    <Fragment>
    <div className="background">
        {loading?<Loader/> : (
            <Fragment>
                
            <MetaData title="Arts -- Arts_Island"/>
            <h2 className="productsHeading">
                Artworks
            </h2>
            <div className="products">
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product={product} />
        ))}
            </div>

            <div className="filterBox">
            <Typography style={{textAlign : 'center'}}>Price</Typography>
            <Slider aria-label="Always visible" marks={priceMarks} value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider'
                min = {0}
                max = {100000}
            />
                    {/* Filter on the basis of category */}
            <hr className='line' />
            <Typography>Browse By Category</Typography>
            <ul className="categoryBox">
                {categories.map((category)=>(
                    <li className='category-link' key={category} onClick={()=>setCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
            <hr className='line2' />
                    <fieldset className='rating_top'>
                    <Typography className='rating_section'  component="legend">Ratings Above</Typography>
                    <Slider  aria-label="Always visible" value={ratings} onChange={(e,newRating)=>setRatings(newRating)} aria-labelledby='continuous-slider'
                        min={0}
                        max={5}
                        valueLabelDisplay='auto'
                        className='rating_inside'
                    />
                    </fieldset>
                
            </div>
            {
                resultPerPage<count &&  <div className="paginationBox">
                <Pagination
                   activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                />
            </div>
            }
            </Fragment>
        )}
        </div>
    </Fragment>
  )
}

export default Products;
