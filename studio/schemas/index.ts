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

export const schemaTypes = [
  // Documents
  section,
  page,
  // Modules
  hero,

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
