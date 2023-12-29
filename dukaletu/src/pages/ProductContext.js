import React, { createContext, useContext, useReducer } from 'react';

// Create a context
export const ProductContext = createContext();

// Initial state
const initialState = {
  products: [],
};

// Reducer function
function productReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
}

// Context provider component
export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Actions
  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook for using the context
export function useProductContext() {
  return useContext(ProductContext);
}
