/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/users/:path*",
  //       destination: "http://localhost:8080/users/:path*",
  //     },
  //
  //     {
  //       source: "/refresh/:path*",
  //       destination: "http://localhost:8080/refresh/:path*",
  //     },
  //
  //     {
  //       source: "/conversas/:path*",
  //       destination: "http://localhost:8080/conversas/:path*",
  //     },
  //
  //     {
  //       source: "/private-messages/:path*",
  //       destination: "http://localhost:8080/private-messages/:path*",
  //     },
  //
  //     {
  //       source: "/files/:path*",
  //       destination: "http://localhost:8080/files/:path*",
  //     },
  //   ];
  // },
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "http",
      hostname: "localhost",
      port: "8080",
      pathname: "**",
      search: ""
    }
    ],

    remotePatterns: [{
      protocol: "https",
      hostname: "https://livechat-0380.onrender.com",
      port: "8080",
      pathname: "**",
      search: ""
    }
    ]
  }

}

export default nextConfig;
