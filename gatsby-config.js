
require('dotenv').config({
  path: `.env`
})

module.exports = {
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-52425609-1", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,

        },
      },
    },
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
        rootPath: "/",
        basePath: "/",
        mailchimp: true,
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
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://unbaul.us7.list-manage.com/subscribe/post?u=8dc357faa455eb6b60b1498ba&amp;id=7ea51b44df', // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      }
    },
  ],
};
