import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  loading: false,
  error: null,
  color: {},
  colors: [],
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//fetch colors
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //http request
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create color action
export const addColorAction = createAsyncThunk(
  "color/create",
  async (name, { rejectWithValue, getState }) => {
    try {
      //http request
      //token
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/colors`,
        {
          name,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete category
export const deleteColorAction = createAsyncThunk(
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
        `${baseURL}/colors/delete/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Action para resetar o estado de isAdded
export const resetColorAdded = createAsyncThunk("colors/resetAdded", () => {
  return false;
});

//colors slice
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(addColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.color = action.payload;
    });
    builder.addCase(addColorAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.color = null;
      state.isAdded = false;
    });

    // Reset isAdded
    builder.addCase(resetColorAdded.fulfilled, (state) => {
      state.isAdded = false;
    });

    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });

    //fetch all
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.error = action.payload;
    });
  },
});

//generate reducer
const colorsReducer = colorsSlice.reducer;

export default colorsReducer;
