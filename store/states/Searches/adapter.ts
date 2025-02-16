import { createEntityAdapter } from '@reduxjs/toolkit';
import { Search } from './interfaces';

export const searchesAdapter = createEntityAdapter<Search>();
