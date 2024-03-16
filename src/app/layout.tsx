import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { MetamaskProviders } from './(providers)/MetaMaskProviders';
import './globals.css';
import GlobalLayout from './(components)/GlobalLayout/GlobalLayout';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Crypto wallet',
  description: 'App to connect with Metamask',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MetamaskProviders>
        <body className={poppins.className}>
          <GlobalLayout>{children}</GlobalLayout>
        </body>
      </MetamaskProviders>
    </html>
  );
}
