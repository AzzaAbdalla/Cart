const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR-CART": {
      return { ...state, cart: [] };
    }
    case "REMOVE": {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: newCart };
    }
    case "INC/DEC-REASE": {
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id)
            return {
              ...cartItem,
              amount: cartItem.amount + action.payload.sign,
            };
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    }
    case "GET-TOTALS": {
      let total = 0,
        totalAmount = 0;
      state.cart.map((cartItem) => {
        totalAmount += cartItem.amount;
        total += cartItem.amount * cartItem.price;
        return { ...cartItem, total, totalAmount };
      });
      total = parseFloat(total.toFixed(2));
      totalAmount = parseFloat(totalAmount.toFixed(2));
      return { ...state, total, totalAmount };
    }
    // case "LOADING": {
    //   return { ...state, loading: true };
    // }
    // case "DISPLAY-ITEMS": {
    //   return { ...state, loading: false, cart: action.payload };
    // }
  }
  throw new Error("no matching action type");
};

export default reducer;
