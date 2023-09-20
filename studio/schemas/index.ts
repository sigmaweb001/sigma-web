import docs from './docs'
import category from './category'
import product from './product'
import blockContent from './blockContent'

import blogAuthor from './blog/blogAuthor'
import blogCategory from './blog/blogCategory'
import blogPost from './blog/blogPost'
import siteconfig from './siteconfig'
// SECTION: Documents
import page from './documents/page'
import section from './documents/section'
// SECTION: Modules
import hero from './modules/hero'
import feature from './modules/feature'
// SECTION: Objects
import portableSimple from './objects/portable-simple'
import portableComplex from './objects/portable-complex'
import featuredItem from './objects/feature-item'

export const schemaTypes = [
  // Documents
  section,
  page,
  
  // Modules
  hero,
  feature,

  // Objects
  portableSimple,
  portableComplex,
  featuredItem,

  // Others
  docs,
  category,
  product,
  blockContent,
  blogAuthor,
  blogCategory,
  blogPost,
  siteconfig
]
