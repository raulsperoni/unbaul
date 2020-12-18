
require('dotenv').config({
  path: `.env`
})

module.exports = {
  pathPrefix: "/unbaul",
  siteMetadata: {
    title: `Un baúl donde entre todo`,
    name: `Un Baúl`,
    siteUrl: `https://unbaul.com`,
    description: `Mantengo este baúl abierto por si acaso alguien quiere alguna vez mirar adentro`,
    hero: {
      heading: `Un baúl abierto por si alguien quiere alguna vez mirar adentro.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/raulsperoni`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/raulsperoni/`,
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/unbaul",
        rootPath: "/",
        authorsPage: true,
        sources: {
          contentful: true,
          local: false
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
