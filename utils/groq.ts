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
export const blogPostQuery = groq`
*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc) {
  _id,
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
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "blogPost" && defined(slug.current)][].slug.current
`

// Single Post
export const singleBlogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
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
  author->,
  categories[]->,
  // "estReadingTime": round(length(pt::text(body)) / 5 / 180),
  "related": *[_type == "blogPost" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}`

// Get Site Config
export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`
