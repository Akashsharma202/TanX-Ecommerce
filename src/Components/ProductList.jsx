import React, { useState, useEffect } from 'react';
import axios from 'axios';
import love from "./Img/love.webp";
import addCart from "./Img/addCart.webp";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // product fetching from http://localhost:5000/products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const isFavorite = (product) => favorites.some(fav => fav.id === product.id);
    const isCartItem = (productId) => cart.includes(productId);
// adding product to http://localhost:5000/favourites
    const addToFavorites = async (product) => {
        try {
            if (!isFavorite(product)) {
                await axios.post('http://localhost:5000/favourites', { product });
                setFavorites((prevFavorites) => [...prevFavorites, product]);
                alert("Added to favorites: " + product.title);
            } else {
                alert("Item already in favorites");
                console.log('Product already in favorites:', product.id);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };
//    adding product to cart http://localhost:5000/orders
    const addToCart = async (product) => {
        try {
            if (!isCartItem(product)) {
                await axios.post('http://localhost:5000/orders', { product });
                setCart((prevCart) => [...prevCart, product]);
                alert("Added to Cart: " + product.title);
            } else {
                console.log('Product already in cart:', product.id);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    // to show description of particular product
    const showDescription = (product) => {
        setSelectedProduct(product);
    };
    //to close the selected product's description 
    const hideDescription = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 h-[60%]">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-md overflow-hidden shadow-md m-2" onClick={() => showDescription(product)}>
                        <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-gray-700 mb-2">${product.amount}</p>
                            <div className="flex items-center mb-2">
                                <span role="img" aria-label="star" className="text-yellow-500 mr-1">
                                    ⭐
                                </span>
                                {product.rating}
                            </div>
                            <div className="flex justify-between">
                                <img
                                    src={love}
                                    alt="Add to Favorites"
                                    width={50}
                                    className={`cursor-pointer ${isFavorite(product) ? 'text-red-500' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); addToFavorites(product) }}
                                />
                                <img
                                    src={addCart}
                                    alt="Add to Cart"
                                    width={70}
                                    height={20}
                                    className={`cursor-pointer ${isCartItem(product) ? 'text-green-500' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); addToCart(product) }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 max-w-3xl flex flex-col rounded-md">
                        <button
                            className="relative w-10 p-2 rounded-full bg-red-800 text-white bottom-3"
                            onClick={hideDescription}
                        >
                            X
                        </button>
                        <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-40 object-cover" />
                        <h2 className="text-2xl font-semibold mb-4">{selectedProduct.title}</h2>
                        <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                        <div className='flex justify-between'>
                        <button className="text-white hover:text-black h-10 w-[20%] bg-black hover:bg-white "  onClick={(e) => { e.stopPropagation(); addToCart(selectedProduct) }}>Buy Now</button>
                        <button className="text-white hover:text-black h-10 w-[20%] bg-black hover:bg-white " onClick={(e) => { e.stopPropagation(); addToFavorites(selectedProduct) }}>Add to Basket</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;