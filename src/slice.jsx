/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use an environment variable or replace with your API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchtopratedcontent = createAsyncThunk(
  "fetchtoprated",
  async (_,{ rejectWithValue }) => {
    try {
      const [movies, tvshows] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`
        ),
      ]);
      return {
        topratedmovies: movies.data.results,
        topratedtvshows: tvshows.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPopularContent = createAsyncThunk(
  "fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      const [popularMovies, popularTvShows] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${API_KEY}`
        ),
      ]);
      return {
        popularMovies: popularMovies.data.results,
        popularTvShows: popularTvShows.data.results,
      };
    } catch (error) {
      console.error('Error fetching popular content:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
//  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
//  `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pagetv}&sort_by=popularity.desc`
export const fetchTrendingContent = createAsyncThunk(
  "fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const [day, week] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${API_KEY}`
        ),
      ]);
      return {
        trendingDay: day.data.results,
        trendingWeek: week.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchmovies = createAsyncThunk(
  "fetchmovies",
  async (page, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`
      );
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchtvshows = createAsyncThunk(
  "fetchtvshows",
  async (pagetv, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pagetv}&sort_by=popularity.desc&api_key=${API_KEY}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// contentType,
export const detailedContent = createAsyncThunk(
  "detailedContent",
  async ({ contentId, contentType }, { rejectWithValue }) => {
    try {
      const [infos, similar, recommended] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}/similar?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}/recommendations?api_key=${API_KEY}`
        ),
      ]);
      return {
        contentDetailed: infos.data,
        similarcontent: similar.data.results,
        recommendedcontent: recommended.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchContent = createAsyncThunk(
  "searchContent",
  async (inputStr, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${inputStr}&api_key=${API_KEY}`
      );
      // console.log(result.data.results, inputStr);
      return result.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: "contentSlice",
  initialState: {
    searchResults: [],
    contentDetailed: [],
    similarcontent: [],
    recommendedcontent: [],
    topratedmovies: [],
    topratedshows: [],
    popularmovies: [],
    populartvshows: [],
    trendingday: [],
    trendingweek: [],
    movies: [],
    tvshows: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(detailedContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(detailedContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contentDetailed = action.payload.contentDetailed;
        state.similarcontent = action.payload.similarcontent;
        state.recommendedcontent = action.payload.recommendedcontent;
      })
      .addCase(detailedContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTrendingContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trendingday = action.payload.trendingDay;
        state.trendingweek = action.payload.trendingWeek;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPopularContent.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(fetchPopularContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularmovies = action.payload.popularMovies;
        state.populartvshows = action.payload.popularTvShows;
      })
      .addCase(fetchPopularContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchtopratedcontent.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(fetchtopratedcontent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topratedmovies = action.payload.topratedmovies;
        state.topratedshows = action.payload.topratedtvshows;
      })
      .addCase(fetchtopratedcontent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchmovies.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(fetchmovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchmovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchtvshows.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(fetchtvshows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tvshows = action.payload;
      })
      .addCase(fetchtvshows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const sliceReducer = slice.reducer;
