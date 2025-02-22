import React, { Suspense } from 'react';
import {
  ChainId,
  IMTBLWidgetEvents,
  SaleItem,
  SaleWidgetParams,
  WidgetConfiguration,
  WidgetProperties,
  WidgetTheme,
  WidgetType,
} from '@imtbl/checkout-sdk';
import { Base } from 'widgets/BaseWidgetRoot';
import {
  ConnectLoader,
  ConnectLoaderParams,
} from 'components/ConnectLoader/ConnectLoader';
import { getL2ChainId } from 'lib';
import { isValidWalletProvider } from 'lib/validations/widgetValidators';
import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider';
import { CustomAnalyticsProvider } from 'context/analytics-provider/CustomAnalyticsProvider';
import { LoadingView } from 'views/loading/LoadingView';
import { HandoverProvider } from 'context/handover-context/HandoverProvider';
import { sendSaleWidgetCloseEvent } from './SaleWidgetEvents';
import i18n from '../../i18n';

const SaleWidget = React.lazy(() => import('./SaleWidget'));

export class Sale extends Base<WidgetType.SALE> {
  protected eventTopic: IMTBLWidgetEvents = IMTBLWidgetEvents.IMTBL_SALE_WIDGET_EVENT;

  // TODO: add specific validation logic for the sale items
  private isValidProucts(products: SaleItem[]): boolean {
    try {
      return Array.isArray(products);
    } catch {
      return false;
    }
  }

  protected getValidatedProperties({
    config,
  }: WidgetProperties<WidgetType.SALE>): WidgetProperties<WidgetType.SALE> {
    let validatedConfig: WidgetConfiguration | undefined;

    if (config) {
      validatedConfig = config;
      if (config.theme === WidgetTheme.LIGHT) validatedConfig.theme = WidgetTheme.LIGHT;
      else validatedConfig.theme = WidgetTheme.DARK;
    }

    return {
      config: validatedConfig,
    };
  }

  protected getValidatedParameters(params: SaleWidgetParams): SaleWidgetParams {
    const validatedParams = params;
    if (!isValidWalletProvider(params.walletProviderName)) {
      // eslint-disable-next-line no-console
      console.warn('[IMTBL]: invalid "walletProviderName" widget input');
      validatedParams.walletProviderName = undefined;
    }

    // TODO: fix the logic here when proper , currently saying if valid then reset to empty array.
    if (!this.isValidProucts(params.items ?? [])) {
      // eslint-disable-next-line no-console
      console.warn('[IMTBL]: invalid "items" widget input.');
      validatedParams.items = [];
    }

    if (!params.environmentId) {
      // eslint-disable-next-line no-console
      console.warn('[IMTBL]: invalid "environmentId" widget input');
      validatedParams.environmentId = '';
    }

    if (!params.collectionName) {
      // eslint-disable-next-line no-console
      console.warn('[IMTBL]: invalid "collectionName" widget input');
      validatedParams.collectionName = '';
    }

    if (
      params.excludePaymentTypes !== undefined
      && !Array.isArray(params.excludePaymentTypes)
    ) {
      // eslint-disable-next-line no-console
      console.warn('[IMTBL]: invalid "excludePaymentTypes" widget input');
      validatedParams.excludePaymentTypes = [];
    }

    return validatedParams;
  }

  protected render() {
    if (!this.reactRoot) return;

    const { t } = i18n;
    const connectLoaderParams: ConnectLoaderParams = {
      targetChainId: this.checkout.config.isProduction
        ? ChainId.IMTBL_ZKEVM_MAINNET
        : ChainId.IMTBL_ZKEVM_TESTNET,
      web3Provider: this.web3Provider,
      checkout: this.checkout,
      allowedChains: [getL2ChainId(this.checkout!.config)],
    };
    const config = this.strongConfig();

    this.reactRoot.render(
      <React.StrictMode>
        <CustomAnalyticsProvider checkout={this.checkout}>
          <ThemeProvider id="sale-container" config={config}>
            <HandoverProvider>
              <ConnectLoader
                widgetConfig={config}
                params={connectLoaderParams}
                closeEvent={() => {
                  sendSaleWidgetCloseEvent(window);
                }}
              >
                <Suspense
                  fallback={
                    <LoadingView loadingText={t('views.LOADING_VIEW.text')} />
                  }
                >
                  <SaleWidget
                    config={config}
                    language="en"
                    items={this.parameters.items!}
                    environmentId={this.parameters.environmentId!}
                    collectionName={this.parameters.collectionName!}
                    excludePaymentTypes={this.parameters.excludePaymentTypes!}
                    preferredCurrency={this.parameters.preferredCurrency!}
                    hideExcludedPaymentTypes={
                      this.properties?.config?.hideExcludedPaymentTypes ?? false
                    }
                    waitFulfillmentSettlements={
                      this.properties?.config?.waitFulfillmentSettlements
                      ?? true
                    }
                  />
                </Suspense>
              </ConnectLoader>
            </HandoverProvider>
          </ThemeProvider>
        </CustomAnalyticsProvider>
      </React.StrictMode>,
    );
  }
}
