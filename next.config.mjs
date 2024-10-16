/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cocktails.solvro.pl",
        port: "",
      },
    ],
  },
};

export default nextConfig;
