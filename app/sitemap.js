export default function sitemap() {
  const baseUrl = "https://speakflowchat.vercel.app"

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/cadastro`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

  ]
}
