import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://scholar-quest-ten.vercel.app'),
  title: {
    default: 'ScholarQuest | AI-Powered Scholarship Discovery Platform',
    template: '%s | ScholarQuest',
  },
  description: 'ScholarQuest — An intelligent, AI-powered scholarship discovery and application management platform connecting ambitious students with universities, companies, and organizations.',
  keywords: ['scholarships', 'scholarship finder', 'AI matching', 'student funding', 'grants', 'fellowships', 'college funding', 'financial aid'],
  authors: [{ name: 'ScholarQuest' }],
  creator: 'ScholarQuest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scholar-quest-ten.vercel.app',
    title: 'ScholarQuest | Find Your Academic Future',
    description: 'Find scholarships tailored for you with our intelligent matching engine.',
    siteName: 'ScholarQuest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarQuest | Find Your Academic Future',
    description: 'Find scholarships tailored for you with our intelligent matching engine.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '4vbhkv0ENgrRKmH70roONs1DK4oy_ryYv28NQnyAQRY',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Material Symbols Outlined icon font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
