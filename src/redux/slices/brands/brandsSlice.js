import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { fetchCategoriesAction } from "../categories/categoriesSlice";

//initial state
const initialState = {
  loading: false,
  error: null,
  brand: {},
  brands: [],
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create brand action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (name, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${baseURL}/brands`, { name }, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch brands action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch all",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete category
export const deleteBrandAction = createAsyncThunk(
  "color/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //http request
      const { data } = await axios.delete(
        `${baseURL}/brands/delete/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Action para resetar o estado de isAdded
export const resetBrandAdded = createAsyncThunk("brands/resetAdded", () => {
  return false;
});

//create slice
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.error = state.payload;
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
    });

    // Reset isAdded
    builder.addCase(resetBrandAdded.fulfilled, (state) => {
      state.isAdded = false;
    });

    //fecth all
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.error = action.payload;
    });
  },
});

//create reducer
const brandsReducer = brandsSlice.reducer;

export default brandsReducer;
