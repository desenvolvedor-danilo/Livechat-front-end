/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024,
  },
  async rewrites() {
    const BACKEND_URL = "https://speakflow.ddns.net"
    const LOCAL_URL = "http://localhost:8080"
    // const URL_FILE = "https://livechat-0380.onrender.com"
    return [
      {
        source: "/users/:path*",
        //  destination: BACKEND_URL + "/users/:path*",
        destination: LOCAL_URL + "/users/:path*",

      },

      {
        source: "/refresh/:path*",
        //  destination: BACKEND_URL + "/refresh/:path*",
        destination: LOCAL_URL + "/refresh/:path*",

      },

      {
        source: "/conversas/:path*",
        //destination: BACKEND_URL + "/conversas/:path*",

        destination: LOCAL_URL + "/conversas/:path*",

      },

      {
        source: "/private-messages/:path*",
        //destination: BACKEND_URL + "/private-messages/:path*",

        destination: LOCAL_URL + "/private-messages/:path*",
      },

      {
        source: "/files/:path*",
        //destination: BACKEND_URL + "/files/:path*",

        destination: LOCAL_URL + "/files/:path*",
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
      hostname: "speakflow.ddns.net",
      //port: "8080",
      pathname: "**",
      search: ""
    }
    ]
  }

}

export default nextConfig;
