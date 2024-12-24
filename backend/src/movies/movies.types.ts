// a single movie in the search results
export type OmdbSearchResult = {
  Title: string;
  Year: string;
  Poster: string;
};

// the full search response
export type SearchResponse = {
  Search: OmdbSearchResult[];
  Response: 'True' | 'False';
  Error?: string;
};

// the transformed movie data returned to the client
export type Movie = {
  title: string;
  year: string;
  posterUrl: string;
};
