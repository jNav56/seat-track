export interface SectionInfo {
  section: string;
  rows: number;
  seats: number;
  numStandard: number;
  numResale: number;
}


export interface Seats {
  [section: string]: {
    [row: string]: {
      number: string;
      type: string;
    }[];
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
