/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024,
  },
  async rewrites() {
    const BACKEND_URL = "137.131.163.242"
    return [
      {
        source: "/users/:path*",
        destination: BACKEND_URL + "/users/:path*",
      },

      {
        source: "/refresh/:path*",
        destination: BACKEND_URL + "/refresh/:path*",
      },

      {
        source: "/conversas/:path*",
        destination: BACKEND_URL + "/conversas/:path*",
      },

      {
        source: "/private-messages/:path*",
        destination: BACKEND_URL + "/private-messages/:path*",
      },

      {
        source: "/files/:path*",
        destination: BACKEND_URL + "/files/:path*",
      },
    ];
  },
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
      protocol: "http",
      hostname: "137.131.163.242",
      port: "8080",
      pathname: "**",
      search: ""
    }
    ]
  }

}

export default nextConfig;
