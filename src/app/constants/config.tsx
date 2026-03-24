export const GOOGLE_API_KEY = 'AIzaSyA8Yjo-r97TBudtxS1PD9vCprnmhW0brrA';
// export const GOOGLE_API_KEY = 'AIzaSyDFhFUaYpyAjNE4Eq-sWCGWjrr6kyGnhbQ';

export const HERE_API_KEY = 'iXf-FH-WZl33i3tsQb43naPvEOa2EPITeuyumkDKDK0';

export const GOOGLE_AUTOCOMPLETE_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export const GOOGLE_DETAILS_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';

export const GOOGLE_GEOCODING_URL =
  'https://maps.googleapis.com/maps/api/geocode/json';

export const GOOGLE_DISTANCE_MATRIX_URL =
  'https://maps.googleapis.com/maps/api/distancematrix/json';

export const HERE_GEOCODING_URL =
  'https://revgeocode.search.hereapi.com/v1/revgeocode';

export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  structured_formatting: any;
  terms: Object[];
  types: string[];
};
