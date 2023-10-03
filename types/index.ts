import type { ImageAsset, PortableTextBlock, Slug } from '@sanity/types'

export interface Docs {
  _id: string
  _type: 'docs'
  _createdAt: string
  title?: string
  slug: Slug
  // mainImage?: ImageAsset
  body: PortableTextBlock[]
}

export interface Product {
  _id: string
  _type: 'product'
  _createdAt: string
  title?: string
  slug: Slug
}

export interface Category {
  _id: string
  _type: 'category'
  _createdAt: string
  title?: string
  slug: Slug
}

export interface BlogCategory {
  _id: string
  _type: 'blogCategory'
  _createdAt: string
  title?: string
  slug: Slug
}

export interface BlogAuthor {
  _id: string
  _type: 'blogAuthor'
  _createdAt: string
  title?: string
  slug: Slug
  image?: ImageAsset
  name: string
  bio: string
}

export interface BlogPost {
  _id: string
  _type: 'blog'
  _createdAt: string
  excerpt: string
  publishedAt: string
  title?: string
  slug: Slug
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  categories: BlogCategory[]
  author: BlogAuthor
}
