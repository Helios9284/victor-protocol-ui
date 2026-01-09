import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export const ConnectionButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button className="connectWallet bg-gradient-blue-primary text-white px-6 py-2 rounded-full font-cleanow transition-all border-[4px] border-blue-light cursor-pointer mt-4 md:mt-0 hover:bg-gradient-blue-sky shadow-[0_0_20px_var(--blue-primary)]" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="bg-gradient-blue-primary text-white px-6 py-2 rounded-full font-cleanow hover:bg-gradient-blue-sky transition-all border-[4px] border-blue-light cursor-pointer mt-4 md:mt-0 shadow-[0_0_20px_var(--blue-primary)]" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }} className='bg-gradient-blue-primary text-white px-6 py-2 rounded-full font-cleanow hover:bg-gradient-blue-sky transition-all border-[4px] border-blue-light cursor-pointer mt-4 md:mt-0 shadow-[0_0_20px_var(--blue-primary)]'>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={48}
                            height={48}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};