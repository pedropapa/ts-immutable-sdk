/* tslint:disable */
/* eslint-disable */
/**
 * Immutable zkEVM API
 * Immutable Multi Rollup API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface ERC20ApproveMetadata
 */
export interface ERC20ApproveMetadata {
    /**
     * Transaction type
     * @type {string}
     * @memberof ERC20ApproveMetadata
     */
    'transaction_type': ERC20ApproveMetadataTransactionTypeEnum;
    /**
     * Requested approval amount
     * @type {string}
     * @memberof ERC20ApproveMetadata
     */
    'amount': string;
    /**
     * Requested token symbol
     * @type {string}
     * @memberof ERC20ApproveMetadata
     */
    'token_symbol': string;
    /**
     * Spender address
     * @type {string}
     * @memberof ERC20ApproveMetadata
     */
    'spender': string;
    /**
     * Indicate if it is a Smart Contract or EOA
     * @type {boolean}
     * @memberof ERC20ApproveMetadata
     */
    'is_smart_contract': boolean;
    /**
     * Is Contract Verified
     * @type {boolean}
     * @memberof ERC20ApproveMetadata
     */
    'is_contract_verified': boolean;
    /**
     * Smart Contract Name
     * @type {string}
     * @memberof ERC20ApproveMetadata
     */
    'contract_name': string;
}

export const ERC20ApproveMetadataTransactionTypeEnum = {
    Erc20Approve: 'ERC20_APPROVE'
} as const;

export type ERC20ApproveMetadataTransactionTypeEnum = typeof ERC20ApproveMetadataTransactionTypeEnum[keyof typeof ERC20ApproveMetadataTransactionTypeEnum];


