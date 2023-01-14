const axios = require("axios").default

async function fetch(query, { variables } = {}) {
  try {
    const res = await axios({
      url: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT,
      method: "post",
      data: {
        query,
        variables,
      },
    })
    const { data } = res.data
    return data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch API")
  }
}

async function getRedirects() {
  const data = await fetch(
    `
    query MyQuery {
        seo {
          redirects {
            origin
            target
            type
          }
        }
      }
      
        `
  )
  const pageData = await fetch(
    `
    query AllPageUrls {
        pages(first: 100) {
          nodes {
            uri
          }
        }
      }
      
        `
  )
  const rawRedirects = data.seo.redirects
  const pageUrls = pageData.pages.nodes.filter(
    (page) => page.uri !== "/" && null
  )

  const allPageRedirects = pageUrls.map((page) => {
    return {
      source: page.uri,
      destination: `/page${page.uri}`,
      permanent: true,
    }
  })
  const redirects = rawRedirects.map((item) => {
    return {
      source: `/${item.origin}`,
      destination: `/${item.target}`,
      permanent: item.type == 301,
    }
  })

  return [...redirects, ...allPageRedirects]
}
module.exports = getRedirects
