export interface Seats {
  [section: string]: {
    [row: string]: string[];
  }
}

export interface Search {
  id: string;
  label: string;
  url: string;
  lastFetch: string;
  seats: Seats;
}

export interface SearchState {
  selectedSearch: string;
};
