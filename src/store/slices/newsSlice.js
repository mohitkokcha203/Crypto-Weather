
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "3fff4ee443d4fa8f61aaf556217bb349"; 

export const fetchCryptoNews = createAsyncThunk(
  "news/fetchCryptoNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://api.mediastack.com/v1/news", {
        params: {
          access_key: API_KEY, 
          keywords: "cryptocurrency", 
          languages: "en", 
          limit: 5, 
        },
      });
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch crypto news"
      ); 
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [], 
    loading: false,
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload || []; 
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch crypto news";
      });
  },
});

export default newsSlice.reducer;
