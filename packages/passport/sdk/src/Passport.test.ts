import { Environment, ImmutableConfiguration } from '@imtbl/config';
import { IMXClient } from '@imtbl/x-client';
import { ImxApiClients, MultiRollupApiClients, imxApiConfig } from '@imtbl/generated-clients';
import AuthManager from './authManager';
import MagicAdapter from './magicAdapter';
import { Passport } from './Passport';
import { PassportImxProvider, PassportImxProviderFactory } from './starkEx';
import { OidcConfiguration } from './types';
import { mockUser, mockLinkedAddresses, mockUserImx } from './test/mocks';
import { announceProvider, passportProviderInfo } from './zkEvm/provider/eip6963';
import { ZkEvmProvider } from './zkEvm';

jest.mock('./authManager');
jest.mock('./magicAdapter');
jest.mock('./starkEx');
jest.mock('./confirmation');
jest.mock('./zkEvm');
jest.mock('./zkEvm/provider/eip6963');
jest.mock('@imtbl/generated-clients');

const oidcConfiguration: OidcConfiguration = {
  clientId: '11111',
  redirectUri: 'https://test.com',
  logoutRedirectUri: 'https://test.com',
};

describe('Passport', () => {
  afterEach(jest.resetAllMocks);

  let passport: Passport;
  let authLoginMock: jest.Mock;
  let loginCallbackMock: jest.Mock;
  let logoutMock: jest.Mock;
  let removeUserMock: jest.Mock;
  let getDeviceFlowEndSessionEndpointMock: jest.Mock;
  let magicLoginMock: jest.Mock;
  let magicLogoutMock: jest.Mock;
  let getUserMock: jest.Mock;
  let requestRefreshTokenMock: jest.Mock;
  let getProviderMock: jest.Mock;
  let getProviderSilentMock: jest.Mock;
  let getLinkedAddressesMock: jest.Mock;

  beforeEach(() => {
    authLoginMock = jest.fn().mockReturnValue(mockUser);
    loginCallbackMock = jest.fn();
    magicLoginMock = jest.fn();
    magicLogoutMock = jest.fn();
    logoutMock = jest.fn();
    removeUserMock = jest.fn();
    getDeviceFlowEndSessionEndpointMock = jest.fn();
    getUserMock = jest.fn();
    requestRefreshTokenMock = jest.fn();
    getProviderMock = jest.fn();
    getProviderSilentMock = jest.fn();
    getLinkedAddressesMock = jest.fn();
    (AuthManager as unknown as jest.Mock).mockReturnValue({
      login: authLoginMock,
      loginCallback: loginCallbackMock,
      logout: logoutMock,
      removeUser: removeUserMock,
      getDeviceFlowEndSessionEndpoint: getDeviceFlowEndSessionEndpointMock,
      getUser: getUserMock,
      requestRefreshTokenAfterRegistration: requestRefreshTokenMock,
    });
    (MagicAdapter as jest.Mock).mockReturnValue({
      login: magicLoginMock,
      logout: magicLogoutMock,
    });
    (PassportImxProviderFactory as jest.Mock).mockReturnValue({
      getProvider: getProviderMock,
      getProviderSilent: getProviderSilentMock,
    });
    (MultiRollupApiClients as jest.Mock).mockReturnValue({
      passportProfileApi: {
        getUserInfo: getLinkedAddressesMock,
      },
    });
    passport = new Passport({
      baseConfig: new ImmutableConfiguration({
        environment: Environment.SANDBOX,
      }),
      ...oidcConfiguration,
    });
  });

  describe('constructor', () => {
    describe('when modules have been overridden', () => {
      it('sets the private property to the overridden value', () => {
        const baseConfig = new ImmutableConfiguration({
          environment: Environment.SANDBOX,
        });
        const immutableXClient = new IMXClient({
          baseConfig,
        });
        const imxApiClients = new ImxApiClients(imxApiConfig.getSandbox());
        const passportInstance = new Passport({
          baseConfig,
          overrides: {
            authenticationDomain: 'authenticationDomain123',
            imxPublicApiDomain: 'guardianDomain123',
            magicProviderId: 'providerId123',
            magicPublishableApiKey: 'publishableKey123',
            passportDomain: 'customDomain123',
            relayerUrl: 'relayerUrl123',
            zkEvmRpcUrl: 'zkEvmRpcUrl123',
            imxApiClients,
            indexerMrBasePath: 'indexerMrBasePath123',
            orderBookMrBasePath: 'orderBookMrBasePath123',
            passportMrBasePath: 'passportMrBasePath123',
            immutableXClient,
          },
          ...oidcConfiguration,
        });
        // @ts-ignore
        expect(passportInstance.immutableXClient).toEqual(immutableXClient);
      });
    });
  });

  describe('connectImx', () => {
    it('should execute connect without error', async () => {
      const passportImxProvider = {} as PassportImxProvider;
      getProviderMock.mockResolvedValue(passportImxProvider);

      const result = await passport.connectImx();

      expect(result).toBe(passportImxProvider);
      expect(getProviderMock).toHaveBeenCalled();
    });
  });

  describe('connectImxSilent', () => {
    describe('when getPassportImxProvider returns null', () => {
      it('returns null', async () => {
        getProviderSilentMock.mockResolvedValue(null);

        const result = await passport.connectImxSilent();

        expect(result).toBe(null);
        expect(getProviderSilentMock).toHaveBeenCalled();
      });
    });
    describe('when getPassportImxProvider returns a provider', () => {
      it('should return the provider', async () => {
        const passportImxProvider = {} as PassportImxProvider;
        getProviderSilentMock.mockResolvedValue(passportImxProvider);

        const result = await passport.connectImxSilent();

        expect(result).toBe(passportImxProvider);
        expect(getProviderSilentMock).toHaveBeenCalled();
      });
    });
  });

  describe('connectEvm', () => {
    it('should execute connectEvm without error and return the provider', async () => {
      const provider = await passport.connectEvm();

      expect(provider).toBeInstanceOf(ZkEvmProvider);
      expect(ZkEvmProvider).toHaveBeenCalled();
    });

    it('should announce the provider by default', async () => {
      passportProviderInfo.uuid = 'mock123';
      const provider = await passport.connectEvm();

      expect(announceProvider).toHaveBeenCalledWith({
        info: passportProviderInfo,
        provider,
      });
    });

    it('should not announce the provider if called with options announceProvider false', async () => {
      const passportInstance = new Passport({
        baseConfig: new ImmutableConfiguration({
          environment: Environment.SANDBOX,
        }),
        ...oidcConfiguration,
      });

      await passportInstance.connectEvm({ announceProvider: false });

      expect(announceProvider).not.toHaveBeenCalled();
    });
  });

  describe('loginCallback', () => {
    it('should execute login callback', async () => {
      await passport.loginCallback();

      expect(loginCallbackMock).toBeCalledTimes(1);
    });
  });

  describe('logout', () => {
    describe('when the logout mode is silent', () => {
      it('should execute logout without error', async () => {
        await passport.logout();

        expect(logoutMock).toBeCalledTimes(1);
        expect(magicLogoutMock).toBeCalledTimes(1);
      });
    });

    describe('when the logout mode is redirect', () => {
      it('should execute logout without error in the correct order', async () => {
        await passport.logout();

        const logoutMockOrder = logoutMock.mock.invocationCallOrder[0];
        const magicLogoutMockOrder = magicLogoutMock.mock.invocationCallOrder[0];

        expect(logoutMock).toBeCalledTimes(1);
        expect(magicLogoutMock).toBeCalledTimes(1);
        expect(magicLogoutMockOrder).toBeLessThan(logoutMockOrder);
      });
    });
  });

  describe('logoutDeviceFlow', () => {
    it('should execute logoutDeviceFlow without error and return the device flow end session endpoint', async () => {
      const endSessionEndpoint = 'https://test.com/logout';
      getDeviceFlowEndSessionEndpointMock.mockReturnValue(endSessionEndpoint);

      const result = await passport.logoutDeviceFlow();

      expect(result).toEqual('https://test.com/logout');
      expect(removeUserMock).toHaveBeenCalledTimes(1);
      expect(magicLogoutMock).toHaveBeenCalledTimes(1);
      expect(getDeviceFlowEndSessionEndpointMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserInfo', () => {
    it('should execute getUser', async () => {
      getUserMock.mockReturnValue(mockUser);

      const result = await passport.getUserInfo();

      expect(result).toEqual(mockUser.profile);
    });

    it('should return undefined if there is no user', async () => {
      getUserMock.mockReturnValue(null);

      const result = await passport.getUserInfo();

      expect(result).toEqual(undefined);
    });
  });

  describe('getIdToken', () => {
    it('should execute getIdToken', async () => {
      getUserMock.mockReturnValue(mockUser);

      const result = await passport.getIdToken();

      expect(result).toEqual(mockUser.idToken);
    });

    it('should return undefined if there is no user', async () => {
      getUserMock.mockReturnValue(null);

      const result = await passport.getIdToken();

      expect(result).toEqual(undefined);
    });
  });

  describe('getAccessToken', () => {
    it('should execute getAccessToken', async () => {
      getUserMock.mockReturnValue(mockUser);

      const result = await passport.getAccessToken();

      expect(result).toEqual(mockUser.accessToken);
    });

    it('should return undefined if there is no user', async () => {
      getUserMock.mockReturnValue(null);

      const result = await passport.getAccessToken();

      expect(result).toEqual(undefined);
    });
  });

  describe('getLinkedAddresses', () => {
    it('should execute getLinkedAddresses', async () => {
      getUserMock.mockReturnValue(mockUser);
      getLinkedAddressesMock.mockReturnValue(mockLinkedAddresses);

      const result = await passport.getLinkedAddresses();

      expect(result).toEqual(mockLinkedAddresses.data.linked_addresses);
    });

    it('should return empty array if there is no linked addresses', async () => {
      getUserMock.mockReturnValue(mockUser);
      getLinkedAddressesMock.mockReturnValue({
        data: {
          sub: 'sub',
          linked_addresses: [],
        },
      });

      const result = await passport.getLinkedAddresses();

      expect(result).toHaveLength(0);
    });
  });

  describe('login', () => {
    it('should login silently if there is a user', async () => {
      getUserMock.mockReturnValue(mockUserImx);
      const user = await passport.login();

      expect(getUserMock).toBeCalledTimes(1);
      expect(authLoginMock).toBeCalledTimes(0);
      expect(user).toEqual(mockUser.profile);
    });

    it('should login if login sliently returns error', async () => {
      getUserMock.mockRejectedValue(new Error('Unknown or invalid refresh token.'));
      authLoginMock.mockReturnValue(mockUserImx);
      const user = await passport.login();

      expect(getUserMock).toBeCalledTimes(1);
      expect(authLoginMock).toBeCalledTimes(1);
      expect(user).toEqual(mockUser.profile);
    });

    it('should login and get a user', async () => {
      getUserMock.mockReturnValue(null);
      authLoginMock.mockReturnValue(mockUserImx);
      const user = await passport.login();

      expect(getUserMock).toBeCalledTimes(1);
      expect(authLoginMock).toBeCalledTimes(1);
      expect(user).toEqual(mockUserImx.profile);
    });

    it('should only login silently if useCachedSession is true', async () => {
      getUserMock.mockReturnValue(mockUserImx);
      const user = await passport.login({ useCachedSession: true });

      expect(getUserMock).toBeCalledTimes(1);
      expect(authLoginMock).toBeCalledTimes(0);
      expect(user).toEqual(mockUser.profile);
    });

    it('should throw error if useCachedSession is true and getUser returns error', async () => {
      const error = new Error('Unknown or invalid refresh token.');
      getUserMock.mockRejectedValue(error);
      authLoginMock.mockReturnValue(mockUserImx);

      await expect(passport.login({ useCachedSession: true })).rejects.toThrow(error);
      expect(getUserMock).toBeCalledTimes(1);
      expect(authLoginMock).toBeCalledTimes(0);
    });
  });
});
