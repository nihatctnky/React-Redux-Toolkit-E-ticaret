import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { getCategoryProduct } from "../../redux/productSlice";
import Loading from './../Loading';
import Product from './Product';
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { getProducts } from './../../redux/productSlice';





const Products = ({ category, sort }) => {


    const dispatch = useDispatch();
    const { products, productsStatus } = useSelector(state => state.products);




    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const itemsPerPage = 6
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;

        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }


    console.log(sort);

    useEffect(() => {
        if (category) {
            dispatch(getCategoryProduct(category))
        } else {
            dispatch(getProducts())
        }

    }, [dispatch, category])

    return (
        <div>

            {
                productsStatus == "LOADING" ? <Loading /> :
                    <>

                        <div className=" flex flex-wrap">
                            {
                                currentItems?.sort((a, b) => sort == "inc" ? a.price - b.price : sort == "dec" ? b.price - a.price : "").map((product, i) => (
                                    <Product key={i} product={product} />

                                ))
                            }
                        </div>
                        <ReactPaginate
                            className="paginate"
                            breakLabel="..."
                            nextLabel=" >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                        />
                    </>
            }
        </div>
    )
}

export default Products