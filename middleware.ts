import { NextResponse, NextRequest } from 'next/server';

const supportedLocales = ['en', 'vi'];
export function validateContentType(request: NextRequest): boolean {
  const contentType = request.headers.get('content-type');
  return (
    !contentType ||
    contentType.includes('application/json') ||
    contentType.includes('text/plain') ||
    contentType.includes('text/html')
  );
}

function getPreferredLocale(request: NextRequest): string {
  const languages = request.headers.get('Accept-Language');
  if (!languages) {
    return 'en';
  }

  const preferred = languages.split(',')[0].split(';')[0].split('-')[0];

  if (supportedLocales.includes(preferred)) {
    return preferred;
  }
  return 'en';
}
export function redirectLocale(request: NextRequest): NextResponse | undefined {
  if (!validateContentType(request)) {
    return NextResponse.json(
      { error: 'Invalid Content-Type header' },
      { status: 400 }
    );
  }

  const { pathname } = request.nextUrl;

  const isLocaleInPathname = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (isLocaleInPathname) {
    return undefined;
  }

  const preferredLocale = getPreferredLocale(request);

  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export { redirectLocale as middleware };
