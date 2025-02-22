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


// May contain unused imports in some cases
// @ts-ignore
import { NFTContractType } from './nftcontract-type';

/**
 * 
 * @export
 * @interface ActivityNFT
 */
export interface ActivityNFT {
    /**
     * 
     * @type {NFTContractType}
     * @memberof ActivityNFT
     */
    'contract_type': NFTContractType;
    /**
     * The token contract address
     * @type {string}
     * @memberof ActivityNFT
     */
    'contract_address': string;
    /**
     * An `uint256` token id as string
     * @type {string}
     * @memberof ActivityNFT
     */
    'token_id': string;
    /**
     * The amount of tokens exchanged
     * @type {string}
     * @memberof ActivityNFT
     */
    'amount': string;
}



