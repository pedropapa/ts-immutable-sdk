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
 * @interface ERC20TransferMetadata
 */
export interface ERC20TransferMetadata {
    /**
     * Transaction type
     * @type {string}
     * @memberof ERC20TransferMetadata
     */
    'transaction_type': ERC20TransferMetadataTransactionTypeEnum;
    /**
     * The address to transfer the token to
     * @type {string}
     * @memberof ERC20TransferMetadata
     */
    'to_address': string;
    /**
     * A string representing the amount of tokens to transfer
     * @type {string}
     * @memberof ERC20TransferMetadata
     */
    'amount': string;
    /**
     * The token decimals
     * @type {number}
     * @memberof ERC20TransferMetadata
     */
    'decimals': number;
    /**
     * The symbol of the token being transferred
     * @type {string}
     * @memberof ERC20TransferMetadata
     */
    'symbol': string;
    /**
     * The image of the token being transferred
     * @type {string}
     * @memberof ERC20TransferMetadata
     */
    'image_url': string;
}

export const ERC20TransferMetadataTransactionTypeEnum = {
    Erc20Transfer: 'ERC20_TRANSFER'
} as const;

export type ERC20TransferMetadataTransactionTypeEnum = typeof ERC20TransferMetadataTransactionTypeEnum[keyof typeof ERC20TransferMetadataTransactionTypeEnum];


