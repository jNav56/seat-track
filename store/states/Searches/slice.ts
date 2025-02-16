import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Search, Seats } from './interfaces';
import { initialState } from './initialState';
import { searchesAdapter } from './adapter';

const searchesSlice = createSlice({
  name: 'searches',
  initialState: searchesAdapter.getInitialState(initialState),
  reducers: {
    addSearch(state, action: PayloadAction<Search>) {
      searchesAdapter.addOne(state, action.payload);
    },
    deleteSearch(state, action: PayloadAction<string>) {
      searchesAdapter.removeOne(state, action.payload);
    },
    setSelectedSearch(state, action: PayloadAction<string>) {
      state.selectedSearch = action.payload;
    },
    addSeats(state, action: PayloadAction<{
      id: string,
      seats: Seats,
      time: string,
    }>) {
      const { id, seats, time } = action.payload;
      searchesAdapter.updateOne(state, { id, changes: { seats, lastFetch: time } });
    }
  },
})

export const {
  addSearch,
  deleteSearch,
  setSelectedSearch,
  addSeats,
} = searchesSlice.actions
export const searchesReducer = searchesSlice.reducer;