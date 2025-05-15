import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Agregar explícitamente localhost como dominio permitido
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'deploy-pos-nestjs-qa1g.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
};

export default nextConfig;