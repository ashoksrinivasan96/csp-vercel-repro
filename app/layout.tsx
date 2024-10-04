import { headers } from "next/headers";
import Script from "next/script";

export default function RootLayout({ children }) {
  const nonce = headers().get("x-nonce");
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://assets.pinterest.com/js/pinit.js"
          type="text/javascript"
          nonce={nonce}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
