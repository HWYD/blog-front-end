// components/GlobalScriptLoader.jsx
'use client';
import Script from 'next/script';

export default function GlobalScriptLoader() {
  return (
    <Script
      id="prism-js" // 必须的唯一标识
      strategy="afterInteractive" // 推荐策略
      src="/prism.js" // 对应 public/js/global-script.js
    />
  );
}
