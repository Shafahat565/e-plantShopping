import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.cost.slice(1));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.slice(1));
    return (price * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
       
      dispatch(removeItem(item.name));
       setAddedToCart((prev) => ({
    ...prev,
    [item.name]: false,
  }));
       
    }
  };

const handleRemove = (item) => {
  dispatch(removeItem(item.name));
  setAddedToCart((prev) => ({
    ...prev,
    [item.name]: false,
  }));
  
};
  


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: <span style={{ color: 'green' }}>${calculateTotalAmount()}</span>
      </h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Subtotal: ${calculateItemSubtotal(item)}
              </div>

              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Checkout functionality coming soon')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
