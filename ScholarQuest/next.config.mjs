/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['onnxruntime-node', '@xenova/transformers'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;
