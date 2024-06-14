import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAnalytics from "./components/GoogleAnalytics.tsx";
import Script from "next/script";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'], display: "swap",
  adjustFontFallback: false
});


export const metadata = {
  title: "KALTIMFOLKS",
  description: "A place for you to explore the creative culture of East Kalimantan and Indonesia's!",
  openGraph: {
    title: 'KALTIMFOLKS',
    description: "A place for you to explore the creative culture of East Kalimantan and Indonesia's!",
    url: 'kaltimfolks.com',
    siteName: 'KALTIMFOLKS',
    images: [
      {
        url: 'KALTIMFOLKS.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'KALTIMFOLKS.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'kaltimfolks logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KALTIMFOLKS',
    description: "A place for you to explore the creative culture of East Kalimantan and Indonesia's!",
    // siteId: '1467726470533754880',
    creator: 'KALTIMFOLKS',
    // creatorId: '1467726470533754880',
    images: [
      {
        url: 'KALTIMFOLKS.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'KALTIMFOLKS.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'kaltimfolks logo',
      },
    ],
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  metadataBase: new URL('https://kaltimfolks.com'),
  alternates: {
    canonical: 'https://kaltimfolks.com',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Script 
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MJQSL8JV');`
      }}
      ></Script>
      <body className={montserrat.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {/*<GoogleAnalytics GA_MEASUREMENT_ID={''} />*/}
                  {children}
                  <ToastContainer />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
