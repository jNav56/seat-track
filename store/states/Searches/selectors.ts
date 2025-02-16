import { RootState } from '@/store/store';
import { EntitySelectors } from '@reduxjs/toolkit';
import { Search } from './interfaces';
import { searchesAdapter } from './adapter';

export const {
  selectAll: selectSearches,
  selectById: selectSearchById,
}: EntitySelectors<Search, RootState, string> = searchesAdapter.getSelectors(
  (state: RootState) => state.searches,
);

export const selectSelectedSearch = (state: RootState) => state.searches.selectedSearch;

export const selectEntitySearches = (state: RootState) => state.searches.entities;
