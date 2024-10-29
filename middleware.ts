import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
  default-src 'self';
  script-src 'self' https://assets.pinterest.com https://vercel.live 'nonce-${nonce}' 'strict-dynamic';
  script-src-elem 'self' https://assets.pinterest.com https://vercel.live 'nonce-${nonce}';
  style-src 'self' https://assets.pinterest.com 'nonce-${nonce}' 'unsafe-inline';
  img-src 'self' https://placehold.co https://assets.pinterest.com https://log.pinterest.com blob: data:;
  font-src 'self' https://assets.pinterest.com;
  connect-src 'self' https://assets.pinterest.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // requestHeaders.set(
  //   "Content-Security-Policy-Report-Only",
  //   contentSecurityPolicyHeaderValue
  // );

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}
