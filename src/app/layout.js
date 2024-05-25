import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className={montserrat.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
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
