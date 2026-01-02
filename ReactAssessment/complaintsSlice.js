import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from "./complaintsAPI";

export const getComplaints = createAsyncThunk(
  "complaints/get",
  fetchComplaints
);

export const addComplaint = createAsyncThunk(
  "complaints/add",
  createComplaint
);

export const editComplaint = createAsyncThunk(
  "complaints/edit",
  async ({ id, data }) => updateComplaint(id, data)
);

export const removeComplaint = createAsyncThunk(
  "complaints/delete",
  deleteComplaint
);

const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    records: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(editComplaint.fulfilled, (state, action) => {
        const index = state.records.findIndex(
          (c) => c.id === action.payload.id
        );
        state.records[index] = action.payload;
      })
      .addCase(removeComplaint.fulfilled, (state, action) => {
        state.records = state.records.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default complaintsSlice.reducer;
