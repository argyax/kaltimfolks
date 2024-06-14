'use client'

import Script from "next/script"

export default function GoogleAnalytics({GA_MEASUREMENT_ID} : {GA_MEASUREMENT_ID : string}) {
    return (
        <>
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=G-LG70V1HQQV`}/>
                
            <Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', 'G-LG70V1HQQV', {
                    page_path: window.location.pathname,
                });
                `,
                }}
            />
        </>
    )
}