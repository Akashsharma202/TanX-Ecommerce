import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
//  fetchin data from favourites when Wishlist is called
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favourites');
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      }
    };

    fetchData();
  }, []);
// removing perticular product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/favourites/${productId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
      console.log('Removed from wishlist:', productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-6">Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            item.product && item.product.image ? (
              <div key={item.id} className="bg-white rounded-md overflow-hidden shadow-md m-2 relative">
                <button
                  className="absolute w-7 h-7 top-2 right-2 p-2 rounded-full bg-red-500 text-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <h2 className="-mt-1">X</h2>
                </button>
                <img src={item.product.image} alt={item.product.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.product.title}</h2>
                  <p className="text-gray-700 mb-2">${item.product.amount}</p>
                </div>
              </div>
            ) : null
          ))}
        </div>
      ) : (
        <p className="text-xl">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
