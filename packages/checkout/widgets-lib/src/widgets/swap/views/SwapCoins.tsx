import { Box } from '@biom3/react';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { WidgetTheme } from '@imtbl/checkout-sdk';
import { useTranslation } from 'react-i18next';
import { ConnectLoaderContext } from 'context/connect-loader-context/ConnectLoaderContext';
import { Environment } from '@imtbl/config';
import { HeaderNavigation } from '../../../components/Header/HeaderNavigation';
import { SimpleLayout } from '../../../components/SimpleLayout/SimpleLayout';
import { QuickswapFooter } from '../../../components/Footer/QuickswapFooter';
import { sendSwapWidgetCloseEvent } from '../SwapWidgetEvents';
import { SwapForm } from '../components/SwapForm';
import { SharedViews, ViewActions, ViewContext } from '../../../context/view-context/ViewContext';
import { hasZeroBalance } from '../../../lib/gasBalanceCheck';
import { SwapContext } from '../context/SwapContext';
import { NotEnoughImx } from '../../../components/NotEnoughImx/NotEnoughImx';
import { IMX_TOKEN_SYMBOL } from '../../../lib';
import { EventTargetContext } from '../../../context/event-target-context/EventTargetContext';
import { UserJourney, useAnalytics } from '../../../context/analytics-provider/SegmentAnalyticsProvider';
import { isPassportProvider } from '../../../lib/provider';

export interface SwapCoinsProps {
  theme: WidgetTheme;
  fromAmount?: string;
  toAmount?: string;
  fromTokenAddress?: string;
  toTokenAddress?: string;
}

export function SwapCoins({
  theme,
  fromAmount,
  toAmount,
  fromTokenAddress,
  toTokenAddress,
}: SwapCoinsProps) {
  const { t } = useTranslation();
  const { viewDispatch } = useContext(ViewContext);
  const { eventTargetState: { eventTarget } } = useContext(EventTargetContext);

  const {
    swapState: {
      tokenBalances,
    },
  } = useContext(SwapContext);

  const {
    connectLoaderState: {
      checkout,
      provider,
    },
  } = useContext(ConnectLoaderContext);

  const [showNotEnoughImxDrawer, setShowNotEnoughImxDrawer] = useState(false);

  const { page } = useAnalytics();

  useEffect(() => {
    page({
      userJourney: UserJourney.SWAP,
      screen: 'SwapCoins',
      extras: {
        fromAmount,
        toAmount,
        fromTokenAddress,
        toTokenAddress,
      },
    });
  }, []);

  useEffect(() => {
    if (hasZeroBalance(tokenBalances, IMX_TOKEN_SYMBOL) && !isPassportProvider(provider)) {
      setShowNotEnoughImxDrawer(true);
    }
  }, [tokenBalances]);

  return (
    <SimpleLayout
      header={(
        <HeaderNavigation
          title={t('views.SWAP.header.title')}
          onCloseButtonClick={() => sendSwapWidgetCloseEvent(eventTarget)}
        />
      )}
      footer={<QuickswapFooter environment={checkout?.config.environment} theme={theme} />}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <SwapForm
          data={{
            fromAmount,
            toAmount,
            fromTokenAddress,
            toTokenAddress,
          }}
          theme={theme}
        />
        <NotEnoughImx
          environment={checkout?.config.environment ?? Environment.PRODUCTION}
          visible={showNotEnoughImxDrawer}
          showAdjustAmount={false}
          hasZeroImx
          onAddCoinsClick={() => {
            viewDispatch({
              payload: {
                type: ViewActions.UPDATE_VIEW,
                view: {
                  type: SharedViews.TOP_UP_VIEW,
                },
              },
            });
          }}
          onCloseDrawer={() => {
            setShowNotEnoughImxDrawer(false);
          }}
        />
      </Box>
    </SimpleLayout>
  );
}
