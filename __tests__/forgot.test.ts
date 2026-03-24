// __tests__/RefreshRequest.test.ts
import clientIAM from '../src/apis/client/clientIAM'; // Adjust the path as needed
import { IAM_ENDPOINTS } from '../src/apis/endpoints/endpoints';
import { RefreshRequest } from '../src/apis/services/iamService';
import { IAM_BASE_URL } from '../src/Config';
// import { RefreshRequest } from '../src/apis/auth';   // Adjust the path as needed
// import { IAM_BASE_URL, IAM_ENDPOINTS } from '../src/constants/endpoints'; // Adjust path

jest.mock('../src/apis/client/clientIAM'); // Mock the axios instance

jest.mock('react-native-device-info', () => ({
  getAndroidId: jest.fn(() => Promise.resolve('mock-android-id')),
  getVersion: jest.fn(() => '1.0.0'),
  getSystemName: jest.fn(() => 'Android'),
}));

// describe('RefreshRequest', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
  // });

  it('should call clientIAM.get and return data on success', async () => {
    const mockResponse = { token: 'new-access-token' };

    (clientIAM.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await RefreshRequest();

    expect(clientIAM.get).toHaveBeenCalledWith(
      IAM_BASE_URL + IAM_ENDPOINTS.TOKEN_REFRESH
    );
    expect(result).toEqual(mockResponse);
  });

  // it('should throw an error with handled message on failure', async () => {
  //   const errorMessage = 'Network error';

  //   (clientIAM.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

  //   await expect(RefreshRequest()).rejects.toThrow(errorMessage);
  // });
// });
