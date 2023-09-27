import docs from './docs'
import product from './product'
import blockContent from './blockContent'

import siteconfig from './siteconfig'
// SECTION: Documents
import page from './documents/page'
import section from './documents/section'

import category from './documents/category'
import author from './documents/author'
import blog from './documents/blog'
import resource from './documents/resource'


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

// SECTION: Objects
import portableSimple from './objects/portable-simple'
import portableComplex from './objects/portable-complex'

export const schemaTypes = [
  // Documents
  section,
  page,

  author,
  category,
  blog,
  resource,
  
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
  product,
  blockContent,

 
  siteconfig
]
