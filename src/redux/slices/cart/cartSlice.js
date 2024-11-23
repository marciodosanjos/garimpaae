import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//add product to cart
export const addOrderAction = createAsyncThunk("cart/add", async (cartItem) => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  //push to storage
  cartItems.push(cartItem);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return cartItems;
});

//get products from cart
export const getCartItemsAction = createAsyncThunk("cart/get", async () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
});

//change products from cart
export const changeCartQtyAction = createAsyncThunk(
  "cart/change-qty",
  async ({ productId, qty }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId.toString()) {
        //get new price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

//remove product to cart
export const removeItemCartAction = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //add to cart
    builder.addCase(addOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.cartItems = action.payload;
    });
    builder.addCase(addOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.error = action.payload;
    });
    //get cart items
    builder.addCase(getCartItemsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartItemsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItemsAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.cartItems = action.payload;
    });
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
