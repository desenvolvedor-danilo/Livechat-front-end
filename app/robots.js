export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://speakflowchat.vercel.app/sitemap.xml",
  }
}
