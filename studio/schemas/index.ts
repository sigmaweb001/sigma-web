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
import title from './modules/title'
import gridFeature from './modules/gridFeature'
import gridCustomer from './modules/gridCustomer'
import cta from './modules/cta'
import photoFeature from './modules/photoFeature'
import simpleContent from './modules/simpleContent'
import featuredResource from './modules/featuredResource'

// Resource
import resourceCategory from './documents/resource/resourceCategory'
import resourceItem from './documents/resource/resourceItem'

// SECTION: Objects
import portableSimple from './objects/portable-simple'
import portableComplex from './objects/portable-complex'

export const schemaTypes = [
  // Documents
  section,
  page,

  resourceCategory,
  resourceItem,
  
  // Modules
  hero,
  feature,
  title,
  gridFeature,
  gridCustomer,
  cta,
  photoFeature,
  simpleContent,
  
  featuredResource,

  // Objects
  portableSimple,
  portableComplex,

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
