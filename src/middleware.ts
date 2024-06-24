import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of common browser User-Agent substrings (expanded)
const BROWSER_USER_AGENTS = [
    'Mozilla', 'Chrome', 'Safari', 'Firefox', 'Edge', 'Opera', 
    'Vivaldi', 'Brave', 'Yandex', 'SamsungBrowser', 'Internet Explorer',
    'IE', 'Silk', 'UCBrowser', 'Baiduspider', 'SeznamBot'
];

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const { pathname } = url;

    if (pathname.startsWith('/api/')) {
        const userAgent = req.headers.get('user-agent');
        const isBrowser = BROWSER_USER_AGENTS.some(agent => userAgent?.includes(agent));

        if (isBrowser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
