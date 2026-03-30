// const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const basePath = "/densan-official-web-renewal-2026";
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    transpilePackages: ['three'],
    
    output: "export",
    basePath: basePath,
    assetPrefix: basePath,
    
    images: {
        // 静的エクスポートではNext.jsの画像最適化APIが使えないため無効化
        unoptimized: true,
    },

};

export default nextConfig;
