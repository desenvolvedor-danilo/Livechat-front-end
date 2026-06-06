/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024,
  },
  async rewrites() {
    const BACKEND_URL = "http://137.131.163.242:8080"
    const URL_FILE = "https://livechat-0380.onrender.com"
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
        destination: URL_FILE + "/files/:path*",
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
      protocol: "https",
      hostname: "livechat-0380.onrender.com",
      //port: "8080",
      pathname: "**",
      search: ""
    }
    ]
  }

}

export default nextConfig;
