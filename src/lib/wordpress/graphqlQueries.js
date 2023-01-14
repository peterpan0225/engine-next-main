/**
 * This file contains all the graphql queries used in this site.
 */
import { gql } from "@apollo/client";

//This `GET_POST_BY_CATEGORY` fetch category page details,

export const GET_SITE_OPTION = gql`
  query SiteGlobalInfo {
    siteConfig(id: "cG9zdDoxMjIzNzk=") {
      siteConfigOptions {
        showAd
        showMailchimp
        showMailchimpPopupIn
      }
      sidebarVideo {
        showVideo
        textBelowVideo
        vimeoVideoId
      }
      sidebarImage {
        showImage
        textBelowImage
        imageUrl {
          sourceUrl
          altText
        }
      }
    }
  }
`;
export const GET_SEARCH_POSTS = gql`
  query GET_SEARCH_POSTS($query: String!) {
    posts(where: { search: $query }, first: 10) {
      nodes {
        id
        title
        uri
        excerpt
        databaseId
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM)
          }
        }
        date
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
        categories(first: 1, where: { exclude: 51712 }) {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`;
export const GET_BRAND_POSTS = gql`
  query GET_BRAND_POSTS {
    posts(where: { categoryName: "brand-account" }, first: 5) {
      nodes {
        id
        title
        uri
        excerpt
        databaseId
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM)
          }
        }
        date
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
        categories(first: 1, where: { exclude: 51712 }) {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`;
export const GET_TOTAL_COUNTS = gql`
  query GET_TOTAL_COUNTS {
    getTotalPosts
    getTotalTags
    getTotalCategories
    users(where: { hasPublishedPosts: POST }) {
      pageInfo {
        total
      }
    }
  }
`;

export const GET_AUTHOR_URLS = gql`
  query GET_AUTHOR_URLS($perPage: Int, $pageNo: Int) {
    getAuthorUrls(perPage: $perPage, pageNo: $pageNo)
  }
`;
export const GET_PAGE_URLS = gql`
  query GET_PAGE_URLS {
    pages(first: 100) {
      nodes {
        uri
      }
    }
  }
`;
export const GET_POSTS_URLS = gql`
  query GET_POSTS_URLS($perPage: Int, $pageNo: Int) {
    getPostUrls(perPage: $perPage, pageNo: $pageNo)
  }
`;
export const GET_CATEGORY_URLS = gql`
  query GET_CATEGORY_URLS($perPage: Int, $pageNo: Int) {
    getCategoryUrls(perPage: $perPage, pageNo: $pageNo)
  }
`;
//This `GET_POST_BY_CATEGORY` fetch category page details,

export const GET_FEEDS_POSTS = gql`
  query GET_FEEDS_POSTS {
    posts(first: 20) {
      nodes {
        id
        uri
        title
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            mimeType
            fileSize
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

//This `GET_POST_BY_CATEGORY` fetch category page details,

export const GET_POST_BY_CATEGORY = gql`
  query GET_POST_BY_CATEGORY($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
      uri
      databaseId
      posts(first: 3) {
        nodes {
          title
          id
          date
          excerpt
          uri
          author {
            node {
              uri
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
              altText
            }
          }
        }
      }
    }
  }
`;
//This `QUERY_CATEGORY_DETAILS` fetch category page details,

export const QUERY_CATEGORY_DETAILS = gql`
  query QUERY_CATEGORY_DETAILS($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
      uri
      databaseId
      seo {
        title
      }
      posts {
        pageInfo {
          total
        }
      }
    }
  }
`;
//This `QUERY_TAG_DETAILS` fetch tag page details,

export const QUERY_TAG_DETAILS = gql`
  query QUERY_TAG_DETAILS($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      databaseId
      name
      uri
      seo {
        title
      }
      posts {
        pageInfo {
          total
        }
      }
    }
  }
`;

//This `GET_PAGINATED_POSTS` fetch page based data ,
//it can be used in author,tag,category page

export const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $authorName: String!
    $offset: Int!
    $size: Int!
    $tag: String
    $categoryDbId: Int
  ) {
    posts(
      where: {
        offsetPagination: { offset: $offset, size: $size }
        authorName: $authorName
        tag: $tag
        categoryId: $categoryDbId
      }
    ) {
      nodes {
        id
        categories(where: { orderby: TERM_ORDER, exclude: 51712 }, first: 1) {
          nodes {
            name
            uri
            id
          }
        }
        uri
        title
        excerpt
        date
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM)
          }
        }
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        offsetPagination {
          hasMore
        }
      }
    }
  }
`;

//This `GET_LATEST_POSTS` fetch latest 4 posts for sidebar,
//it also exclude the post by optional author and slug array

export const GET_LATEST_POSTS = gql`
  query GET_LATEST_POSTS(
    $author: [ID]
    $slug: [ID]
    $categoryId: Int
    $categoryNotIn: [ID]
    $tagNotIn: [ID]
    $first: Int
  ) {
    posts(
      where: {
        authorNotIn: $author
        notIn: $slug
        categoryNotIn: $categoryNotIn
        tagNotIn: $tagNotIn
        categoryId: $categoryId
      }
      first: $first
    ) {
      nodes {
        title
        uri
        excerpt
        databaseId
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM)
          }
        }
        date
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
        categories(first: 1, where: { exclude: 51712 }) {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`;

//This `GET_LATEST_POSTS` fetch latest 4 posts for sidebar,
//it also exclude the post by optional author and slug array

export const GET_CAT_LATEST_POSTS = gql`
  query GET_LATEST_POSTS(
    $author: [ID]
    $slug: [ID]
    $categoryId: Int
    $categoryNotIn: [ID]
    $tagNotIn: [ID]
    $first: Int
  ) {
    posts(
      where: {
        authorNotIn: $author
        notIn: $slug
        categoryNotIn: $categoryNotIn
        tagNotIn: $tagNotIn
        categoryId: $categoryId
      }
      first: $first
    ) {
      nodes {
        title
        uri
        excerpt
        databaseId
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
        date
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
        categories(first: 1, where: { exclude: 51712 }) {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`;

//This `GET_LATEST_POSTS` fetch latest 4 posts for sidebar,
//it also exclude the post by optional author and slug array

export const GET_HOMEPAGE_SLIDER_POSTS = gql`
  query GET_LATEST_POSTS($categoryId: Int) {
    posts(where: { categoryId: $categoryId }, first: 4) {
      nodes {
        title
        uri
        excerpt
        databaseId
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        date
        author {
          node {
            name
            uri
            avatar {
              url
            }
          }
        }
        categories(first: 1, where: { exclude: 51712 }) {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`;

//This `QUERY_AUTHOR_DETAILS` fetch author details

export const QUERY_AUTHOR_DETAILS = gql`
  query QUERY_AUTHOR_DETAILS($slug: ID!) {
    user(id: $slug, idType: SLUG) {
      id
      databaseId
      posts {
        pageInfo {
          total
        }
      }
      name
      description
      avatar {
        url
      }
      seo {
        title
      }
    }
  }
`;

//This `QUERY_NEXT_POST_URL` fetch next post url

export const QUERY_NEXT_POST_URL = gql`
  query QUERY_NEXT_POST_URL($after: String, $categorys: [ID!]) {
    posts(where: { categoryIn: $categorys }, first: 1, after: $after) {
      nodes {
        uri
      }
    }
  }
`;

//This `QUERY_POST_DETAILS_BY_URL` fetch a single post data
export const QUERY_POST_DETAILS_BY_URL = gql`
  query QUERY_POST_DETAILS_BY_URL($slug: String) {
    posts(where: { name: $slug }) {
      nodes {
        id
        uri
        databaseId
        title
        categories(first: 3, where: { exclude: "51712" }) {
          nodes {
            name
            databaseId
            uri
          }
        }
        author {
          node {
            name
            uri
            description
            avatar {
              url
            }
          }
        }
        date
        modified
        nextpageUrl
        seo {
          title
          twitterDescription
          readingTime
        }
        excerpt
        content
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            mediaDetails {
              width
              height
            }
          }
        }
        tags {
          nodes {
            uri
            name
            id
          }
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

//This `QUERY_PAGE_BY_URI` fetch page data

export const QUERY_PAGE_BY_URI = gql`
  query QUERY_PAGE_BY_URI($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      content
    }
  }
`;

//This `QUERY_IF_POST_EXIST_AND_URL` checks if a given url exists

export const QUERY_IF_POST_EXIST_AND_URL = gql`
  query QUERY_IF_POST_EXIST_AND_URL($slug: ID!) {
    post(idType: SLUG, id: $slug) {
      uri
      modified
    }
  }
`;
