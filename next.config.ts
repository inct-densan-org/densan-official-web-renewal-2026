import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['three'],
    
    output: "export",
    images: {
        // 静的エクスポートではNext.jsの画像最適化APIが使えないため無効化
        unoptimized: true,
    },

};

export default nextConfig;
