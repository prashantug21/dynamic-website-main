/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'scopiolabs.com',
          pathname: '/wp-content/uploads/**',
        },
      ],
      },
      
};

export default nextConfig;
