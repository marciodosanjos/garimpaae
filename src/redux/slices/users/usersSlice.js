import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//import { act } from "react-dom/test-utils";
import { resetErrAction } from "../globalActions/globalActions";

//initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  customer: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      //save user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      const cartItems = localStorage.getItem("cartItems");

      if (cartItems) {
        window.location.assign("/order-payment");
      } else {
        console.log("No cart items");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutUserAction = createAsyncThunk("users/logout", () => {
  //delete user in localstorage
  localStorage.removeItem("userInfo");
  return true;
});

//register action
export const registrationUserAction = createAsyncThunk(
  "users/register",
  async (
    { email, password, fullname },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//upddate shipping address
export const updateUserShippingAdressAction = createAsyncThunk(
  "users/update-address",
  async (
    {
      fullname,
      lastName,
      firstName,
      address,
      city,
      postalCode,
      province,
      phone,
      country,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      //make http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          fullname,
          lastName,
          firstName,
          address,
          city,
          postalCode,
          province,
          phone,
          country,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/profile-fetched",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserLoginData = createAsyncThunk(
  "user/update-login-data",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      //http post request
      const { data } = await axios.put(
        `${baseURL}/users/update/logindata`,
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    //logout
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });

    //register
    builder.addCase(registrationUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registrationUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registrationUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //update shipping address
    builder.addCase(updateUserShippingAdressAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserShippingAdressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUserShippingAdressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    //update login data
    builder.addCase(updateUserLoginData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserLoginData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserLoginData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //profile
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
