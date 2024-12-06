'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function PaddleLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Setup({
        vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
      });
    }
  }, []);

  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      strategy="lazyOnload"
    />
  );
}
