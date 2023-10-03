import groq from 'groq'

export const docsquery = groq`
*[_type == "docs"] | order(_createdAt desc) {
  ...,
  category->,
}
`

export const singlequery = groq`
*[_type == "docs" && slug.current == $slug][0] {
  ...,
  category->,
  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        ...,
        reference->,
        "slug": @.reference->slug
      }
    }
  }
}
`

export const catByProductQuery = groq`
*[_type == "category" && product._ref in *[_type=="product" && slug.current==$product]._id ] | order(orderRank) {
  ...,
  // product->,
  "items": *[_type == "docs" && category._ref == ^._id] | order(orderRank) {
    title,
    slug,
    "category": category-> {slug},
    _id,
  }
}
`

export const productsQuery = groq`
*[_type == "product"] {
  ...,
  "cat": *[_type == "category" && product._ref == ^._id] | order(orderRank)[0] {
    orderRank,
    slug,
    "doc": *[_type == "docs" && category._ref == ^._id] | order(orderRank)[0] {
      orderRank,
      slug
    }
  }
}
`

// SECTION: Blogs
// Get all posts

const blogItem = `
  _id,
  _type,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    'blurDataURL':asset->metadata.lqip,
    'ImageColor': asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    ...,
    _id,
    image,
    slug,
    name
  },
  category->,
`
export const allBlogsQuery = `
*[_type == 'blog'] | order(publishedAt desc, _createdAt desc) {
  ${blogItem}
}
`

// Single Post
export const singleBlogQuery = `*[_type == "blog" && slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author-> {
    ...,
    bio
  },
  tags[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "blogPost" && count(tags[@._ref in ^.^.tags[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}`
// SECTION: Resources

const resourceItem = `
  _id,
  _type,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
  },
  featured,
  slug,
  title,
  category->,
  asset,
  description,
  "assetUrl": asset.asset->url
`
export const allResourceListQuery = `
*[_type == 'resource' || _type == 'blog'] | order(publishedAt desc, _createdAt desc) {
  _type == "resource" => {
    ${resourceItem}
  },
  _type == "blog" => {
    ${blogItem}
  }
}
`

export const resourceByCategoryQuery = `
*[(_type == 'resource' || _type == 'blog') && category->.slug.current == $slug] | order(publishedAt desc, _createdAt desc) {
  _type == "resource" => {
    ${resourceItem}
  },
  _type == "blog" => {
    ${blogItem}
  }
}
`

export const resourceByTagQuery = `
*[(_type == 'resource' || _type == 'blog') && defined(tags) && $slug in tags[]->slug.current] | order(publishedAt desc, _createdAt desc) {
  _type == "resource" => {
    ${resourceItem}
  },
  _type == "blog" => {
    ${blogItem}
  }
}
`

export const allPageQuery = `
{
  "products": *[_type == "page" && pageCategory == "product"] | order(publishedAt desc, _createdAt desc) {
    ...,
  },
  "engines": *[_type == "page" && pageCategory == "engine"] | order(publishedAt desc, _createdAt desc) {
    ...,
  },
}
`

export const allCategoryQuery = `
*[_type == "category"] | order(publishedAt desc, _createdAt desc) {
  ...,
}
`

export const allTagQuery = `
*[_type == "tag"] | order(publishedAt desc, _createdAt desc) {
  ...,
}
`

// !SECTION: Resources

// !SECTION

// Get Site Config
export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`
// SECTION - Site Config
// Construct our "site" GROQ
const site = `
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
  }
`

// TODO
// // Construct our "image meta" GROQ
// export const imageMeta = `
//   "alt": coalesce(alt, asset->altText),
//   asset,
//   crop,
//   customRatio,
//   hotspot,
//   "id": asset->assetId,
//   "type": asset->mimeType,
//   "aspectRatio": asset->metadata.dimensions.aspectRatio,
//   "lqip": asset->metadata.lqip
// `

// TODO: dynamic home ID
const homeID = '"30d6989d-103b-4f66-b92c-0b5b0ad9fafe"'

// Construct our "page" GROQ
const page = `
  "type": _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
`

// Construct our "image meta" GROQ
export const imageMeta = `
  "alt": coalesce(alt, asset->altText),
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ...,
      "url": @.url,
      "isButton": @.isButton,
      "page":@.page->{
        ${page}
      }
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`

// Construct our content "modules" GROQ
// TODO: photos
// mobilePhoto{
//   ${imageMeta}
// },
// desktopPhoto{
//   ${imageMeta}
// }
// Construct our content "modules" GROQ

//   video{
//     id,
//     title
//   }

export const modules = `
  _type == 'hero' => {
    ...,
    photos {
      ...,
    },
    title,
    subtitle,
    content[] {
      ${ptContent}
    },
    bgType,
    video {
      ...,
      id,
      title,
    }
  },
  _type == 'title' => {
    ...,
  },
  _type == 'feature' => {
    ..., 
  },
  _type == 'gridFeature' => {
    ...,
  },
  _type == 'gridCustomer' => {
    ...,
  },
  _type == 'photoFeature' => {
    ...,
  },
  _type == 'simpleContent' => {
    ...,
  },
  _type == 'cta' => {
    ...,
    "page":@.page->{
      ${page}
    }
  },
  _type == 'featuredResource' => {
    ...,
    items[]->{
      ${resourceItem}
    }
  }
`

// !SECTION: Site Config

// SECTION: Pages
// Fetch a static page with our global data
export function getStaticPageQuery(pageData: string) {
  // ${queries.site}

  const query = `
  {
    "page": ${pageData},
  }
  `
  return query
}

export function getPageQuery() {
  return `
    *[_type == "page" && slug.current == $slug] | order(_updatedAt desc)[0]{
      "id": _id,
      title,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${modules}
        }},
        !defined(_ref) => {
          ${modules},
        }
      },
    } 
  `
}
// !SECTION: Pages
