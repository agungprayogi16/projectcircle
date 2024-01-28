/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserProfileType } from "@/types";
import { API } from "@/utils/api";
import getError from "@/utils/getError";

type initialStateT = {
  data: UserProfileType | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: initialStateT = {
  data: null,
  isLoading: true,
  isError: false,
  error: "",
};

export const getProfile = createAsyncThunk(
  "profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue({ errorMessage: getError(error) });
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {}, // tidak diisi karena memakai extraReducers
  extraReducers: async (builder) => {
    console.log(getProfile.pending);

    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<UserProfileType>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      }
    );
    builder.addCase(
      getProfile.rejected,
      (state, action: PayloadAction<any>) => {
        state.data = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.errorMessage || "Unknown Error Occured";
      }
    );
  },
});

export default profileSlice.reducer;
