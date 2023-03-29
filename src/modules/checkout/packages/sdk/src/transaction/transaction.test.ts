import { Web3Provider } from '@ethersproject/providers';
import { CheckoutError, CheckoutErrorType } from '../errors';
import { SendTransactionParams, TransactionStatus } from '../types';
import { sendTransaction } from './transaction';

describe('transaction', () => {
  it('should send the transaction and return success', async () => {
    const mockProvider = {
      getSigner: jest.fn().mockReturnValue({
        sendTransaction: () => {
          return {}
        }
      })
    } as unknown as Web3Provider;

    const transaction = {
      nonce: "nonce",
      gasPrice: "1",
      gas: "1",
      to: "0x123",
      from: "0x234",
      value: "100",
      data: "data",
      chainId: 1
    };

    const params: SendTransactionParams = {
      provider: mockProvider,
      transaction,
    }

    await expect(sendTransaction(params)).resolves.toEqual({
      status: TransactionStatus.SUCCESS,
      transaction
    });
  });

  it('should return errored status if transaction errors', async () => {
    const mockProvider = {
      getSigner: jest.fn().mockReturnValue({
        sendTransaction: () => {
          throw new Error('Transaction errored');
        }
      })
    } as unknown as Web3Provider;

    const transaction = {
      nonce: "nonce",
      gasPrice: "1",
      gas: "1",
      to: "0x123",
      from: "0x234",
      value: "100",
      data: "data",
      chainId: 1
    };

    const params: SendTransactionParams = {
      provider: mockProvider,
      transaction,
    }

    await expect(sendTransaction(params)).rejects.toThrow(new CheckoutError(
      'Transaction errored',
      CheckoutErrorType.TRANSACTION_ERROR
    ));
  });
});
