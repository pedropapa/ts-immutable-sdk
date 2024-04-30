export const ROOT_AXELAR_ADAPTOR = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gateway',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_initializerAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'CallerNotBridge',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidChildBridgeAdaptor',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidChildChain',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSourceAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSourceChain',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoGas',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotApprovedByGateway',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnauthorizedInitializer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnsupportedOperation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddresses',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'sourceChain',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'sourceAddress_',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'payload_',
        type: 'bytes',
      },
    ],
    name: 'AdaptorExecute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'childChain',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'childBridgeAdaptor',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'AxelarMessageSent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'oldChildBridgeAdaptor',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newChildBridgeAdaptor',
        type: 'string',
      },
    ],
    name: 'ChildBridgeAdaptorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'oldChildChain',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'newChildChain',
        type: 'string',
      },
    ],
    name: 'ChildChainUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldGasService',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newGasService',
        type: 'address',
      },
    ],
    name: 'GasServiceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldRootBridge',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newRootBridge',
        type: 'address',
      },
    ],
    name: 'RootBridgeUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BRIDGE_MANAGER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'GAS_SERVICE_MANAGER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TARGET_MANAGER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'childBridgeAdaptor',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'childChainId',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'commandId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'sourceChain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceAddress',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'commandId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'sourceChain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceAddress',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'string',
        name: 'tokenSymbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'executeWithToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gasService',
    outputs: [
      {
        internalType: 'contract IAxelarGasService',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gateway',
    outputs: [
      {
        internalType: 'contract IAxelarGateway',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantBridgeManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantGasServiceManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantTargetManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bridgeManager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'gasServiceManager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'targetManager',
            type: 'address',
          },
        ],
        internalType: 'struct IRootAxelarBridgeAdaptor.InitializationRoles',
        name: '_adaptorRoles',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '_rootBridge',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_childChainId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_childBridgeAdaptor',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_gasService',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initializerAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeBridgeManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeGasServiceManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeTargetManagerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rootBridge',
    outputs: [
      {
        internalType: 'contract IRootERC20Bridge',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'address',
        name: 'refundRecipient',
        type: 'address',
      },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newChildBridgeAdaptor',
        type: 'string',
      },
    ],
    name: 'updateChildBridgeAdaptor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newChildChain',
        type: 'string',
      },
    ],
    name: 'updateChildChain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newGasService',
        type: 'address',
      },
    ],
    name: 'updateGasService',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newRootBridge',
        type: 'address',
      },
    ],
    name: 'updateRootBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
