// src/api/utils/handleApiError.ts

export const handleApiError = (error: any): string => {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('[API Error]', error.response.data);
      return error.response.data?.message || 'Something went wrong';
    } else if (error.request) {
      // Request was made but no response received
      console.error('[Network Error]', error.request);
      return 'Network error. Please check your internet connection.';
    } else {
      // Something else happened
      console.error('[Unexpected Error]', error.message);
      return 'Unexpected error occurred.';
    }
  };
  