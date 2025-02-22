import {
  MenuItem, ButtCon, AllIconKeys, SxProps,
} from '@biom3/react';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect, useMemo, useState } from 'react';
import { getWalletLogoByName } from 'lib/logoUtils';
import { useTranslation } from 'react-i18next';
import { abbreviateWalletAddress } from 'lib/utils';
import { getWalletProviderNameByProvider, isPassportProvider } from 'lib/provider';
import {
  UserJourney,
  useAnalytics,
} from '../../../../context/analytics-provider/SegmentAnalyticsProvider';

const isCopiedStyle: SxProps = {
  background: 'base.color.status.success.bright',
  fill: 'base.color.status.success.bright',
};

const isCopiedIconStyle: SxProps = {
  fill: 'base.color.fixed.black.1000',
};

export function WalletAddress({
  provider,
  showL1Warning,
  setShowL1Warning,
}: {
  provider?: Web3Provider;
  showL1Warning: boolean;
  setShowL1Warning: (show: boolean) => void;
}) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  const { t } = useTranslation();

  const { track } = useAnalytics();

  const ctaIcon = useMemo<AllIconKeys>(() => {
    if (isPassportProvider(provider) && !showL1Warning) {
      return 'ShowPassword';
    }
    return isCopied ? 'Tick' : 'CopyText';
  }, [provider, showL1Warning, isCopied]);

  useEffect(() => {
    if (!provider || walletAddress !== '') return;

    (async () => {
      const address = await provider.getSigner().getAddress();
      setWalletAddress(address);
    })();
  }, [provider, walletAddress]);

  const handleIconClick = async () => {
    if (walletAddress && ctaIcon === 'CopyText') {
      track({
        userJourney: UserJourney.WALLET,
        screen: 'Settings',
        control: 'CopyWalletAddress',
        controlType: 'Button',
      });
      navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } else if (ctaIcon === 'ShowPassword') {
      setShowL1Warning(true);
    }
  };

  return (
    <MenuItem testId="wallet-address" emphasized size="medium">
      <MenuItem.FramedLogo
        logo={getWalletLogoByName(getWalletProviderNameByProvider(provider))}
        sx={{ backgroundColor: 'base.color.translucent.standard.200' }}
      />

      <ButtCon
        variant="tertiary"
        iconVariant="bold"
        size="small"
        icon={ctaIcon}
        iconSx={{
          ...(isCopied ? isCopiedIconStyle : {}),
        }}
        onClick={handleIconClick}
        sx={{
          cursor: 'pointer',
          ...(isCopied ? isCopiedStyle : {}),
        }}
      />
      <MenuItem.Label>{t('views.SETTINGS.walletAddress.label')}</MenuItem.Label>
      <MenuItem.Caption testId="wallet-address">
        {abbreviateWalletAddress(walletAddress)}
      </MenuItem.Caption>
    </MenuItem>
  );
}
