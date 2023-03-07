import { User as OidcUser, UserManager } from 'oidc-client-ts';
import AuthManager from './authManager';
import { PassportError, PassportErrorType } from './errors/passportError';
import { User } from './types';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('oidc-client-ts');

const authConfig = { clientId: '11111', redirectUri: 'http://test.com' };
const mockOidcUser: OidcUser = {
  id_token: 'id123',
  access_token: 'access123',
  refresh_token: 'refresh123',
  token_type: 'Bearer',
  scope: 'openid',
  expires_in: 167222,
  profile: {
    sub: 'email|123',
    email: 'test@immutable.com',
    nickname: 'test',
  },
} as OidcUser;
const mockUser: User = {
  idToken: 'id123',
  accessToken: 'access123',
  refreshToken: 'refresh123',
  profile: {
    sub: 'email|123',
    email: 'test@immutable.com',
    nickname: 'test',
  },
};

describe('AuthManager', () => {
  afterEach(jest.resetAllMocks);

  let authManager: AuthManager;
  let signInMock: jest.Mock;
  let signinPopupCallbackMock: jest.Mock;
  let getUserMock: jest.Mock;
  let signinSilentMock: jest.Mock;

  beforeEach(() => {
    signInMock = jest.fn();
    signinPopupCallbackMock = jest.fn();
    getUserMock = jest.fn();
    signinSilentMock = jest.fn();
    (UserManager as jest.Mock).mockReturnValue({
      signinPopup: signInMock,
      signinPopupCallback: signinPopupCallbackMock,
      getUser: getUserMock,
      signinSilent: signinSilentMock,
    });
    authManager = new AuthManager(authConfig);
  });

  describe('login', () => {
    it('should get the login user and return the domain model', async () => {
      signInMock.mockResolvedValue(mockOidcUser);

      const result = await authManager.login();

      expect(result).toEqual(mockUser);
    });

    it('should throw the error if user is failed to login', async () => {
      signInMock.mockRejectedValue(new Error('NONO'));

      await expect(() => authManager.login()).rejects.toThrow(
        new PassportError(
          'AUTHENTICATION_ERROR: NONO',
          PassportErrorType.AUTHENTICATION_ERROR,
        )
      );
    });
  });

  describe('loginCallback', () => {
    it('should call login callback', async () => {
      await authManager.loginCallback();

      expect(signinPopupCallbackMock).toBeCalled();
    });
  });

  describe('getUser', () => {
    it('should retrieve the user from the userManager and return the domain model', async () => {
      getUserMock.mockReturnValue(mockOidcUser);

      const result = await authManager.getUser();

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if no user is returned', async () => {
      getUserMock.mockReturnValue(null);

      await expect(() => authManager.getUser()).rejects.toThrow(
        new PassportError(
          'NOT_LOGGED_IN_ERROR: Failed to retrieve user',
          PassportErrorType.NOT_LOGGED_IN_ERROR,
        )
      );
    });
  });
  describe('requestRefreshToken', () => {
    const passportData = {
      passport: {
        ether_key: '0x232',
        stark_key: '0x567',
        user_admin_key: '0x123',
      }
    };
    afterEach(() => {
      mockedAxios.get.mockClear();
    });
    it('requestRefreshToken successful with user wallet address in metadata', async () => {
      const mockUpdatedUser = { access_token: "123" };
      const expected = { accessToken: "123", etherKey: passportData.passport.ether_key };
      signinSilentMock.mockReturnValue(mockUpdatedUser);
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
      const response = {
        data: {
          'sub': 'email|63a3c1ada9d926a4845a3f0c',
          'nickname': 'yundi.fu',
          ...passportData,
        }
      };
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));

      const res = await authManager.requestRefreshToken(mockToken);

      expect(res).toEqual(expected);
      expect(signinSilentMock).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://auth.dev.immutable.com/userinfo', { 'headers': { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' } }
      );
    });

    it('requestRefreshToken failed without user wallet address in metadata with retries', async () => {
      const response = {
        data: {
          'sub': 'email|63a3c1ada9d926a4845a3f0c',
          'nickname': 'yundi.fu',
        }
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));

      await expect(authManager.requestRefreshToken(mockToken))
        .rejects
        .toThrow('REFRESH_TOKEN_ERROR');

      expect(signinSilentMock).toHaveBeenCalledTimes(0);

    }, 15000);

    it('requestRefreshToken failed with fetching user info error in metadata with retries', async () => {
      const response = {
        status: 500
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(response));

      await expect(authManager.requestRefreshToken(mockToken))
        .rejects
        .toThrow('REFRESH_TOKEN_ERROR');

      expect(signinSilentMock).toHaveBeenCalledTimes(0);
      expect(mockedAxios.get).toHaveBeenCalledTimes(6);

    }, 15000);
  });
});
