import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  totalAmount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR-CART" });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const increase_decrease = (id, sign) => {
    dispatch({ type: "INC/DEC-REASE", payload: { id, sign } });
  };

  // //in case of using a link to fetch data
  // const fetchData = async () => {
  //   dispatch({ type: "LOADING" });
  //   const response = await fetch(url);
  //   const cart = await response.json();
  //   dispatch({ type: "DISPLAY-ITEMS", payload: cart });
  // };

  // useEffect(() => fetchData());

  useEffect(() => {
    dispatch({ type: "GET-TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase_decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
