import Image from 'next/image';

const coinGeckoDarkLogo = "/assets/CG-Lockup.png";
const coinGeckoLightLogo = "/assets/CG-Lockup-2.png";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground">
      <div>{new Date().getFullYear()} Hyperliquid Insights.</div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span>Data powered by</span>
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center"
          aria-label="CoinGecko"
        >
          <Image
            src={coinGeckoLightLogo}
            alt="CoinGecko"
            className="h-6 w-auto object-contain dark:hidden"
            width={120}
            height={24}
          />
          <Image
            src={coinGeckoDarkLogo}
            alt="CoinGecko"
            className="hidden h-6 w-auto object-contain dark:block"
            width={120}
            height={24}
          />
        </a>
      </div>
    </footer>
  );
}
