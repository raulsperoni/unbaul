
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
        name: `UnBaúl.com`,
        short_name: `UnBaúl`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000000`,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({
                  query: {
                    site: { siteMetadata },
                  },
                  ...rest
                }) => {
          siteMetadata.feed_url = siteMetadata.siteUrl + '/rss.xml';
          siteMetadata.image_url =
              siteMetadata.siteUrl + '/icons/icon-512x512.png';
          const siteMetadataModified = siteMetadata;
          siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/rss.xml`;
          siteMetadataModified.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allArticle, allContentfulArticle } }) => {
              return allContentfulArticle.edges
                .filter(edge => !edge.node.secret)
                .map(edge => {
                  return {
                    ...edge.node,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                    custom_elements: [
                        { "content:encoded": edge.node.body.childMarkdownRemark.html },
                        { "featuredImage": "https:" + edge.node.hero.seo.src }],
                    author: edge.node.author ? edge.node.author.name : '',
                  };
                });
            },
            query:
                `
              {
                allContentfulArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                      author {
                        name
                      }
                      secret
                      hero {
                        seo: fixed(width: 1200, quality: 100) {
                          src
                        }
                      }
                    }
                  }
                }
              }
              `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
};
