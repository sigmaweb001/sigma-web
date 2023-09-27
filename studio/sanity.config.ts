import { defineConfig } from 'sanity'
import { deskTool, type DefaultDocumentNodeResolver } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table';
import Iframe from 'sanity-plugin-iframe-pane'
import { SanityDocument } from 'sanity'
import { ensurePrefix } from '@antfu/utils'

const hiddenDocTypes = listItem =>
  !["siteconfig"].includes(listItem.getId());

// Customize this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument, path: string) {
  const domain = process.env.production ? 'https://sigmaott.com': 'http://localhost:3333'
  const _path = path === '/' ? path : '/products' + ensurePrefix('/', path)
  const host = domain + _path
  return doc?.slug?.current
    ? `${host}${ensurePrefix('/', doc.slug.current)}?preview=true`
    : `${host}?preview=true`
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `blogPost`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc, '/blogs'),
          })
          .title('Preview'),
      ])
    case `page`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc, ''),
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}

export default defineConfig({
  name: 'default',
  title: 'sigma-sanity',

  projectId: 'xbopepf9',
  dataset: 'production',

  plugins: [
    deskTool({
      defaultDocumentNode,
      structure: (S, context) => {
        return S.list()
          .title('Content Manager')
          .items([
            ...S.documentTypeListItems().filter(hiddenDocTypes),
            S.divider(),
            S.listItem()
              .title('Documents')
              .child(
                S.list()
                  .title('Documents')
                  .items(
                    [
                      S.divider(),
                      S.listItem()
                        .title("Docs by Category")
                        .child(
                          S.documentTypeList("category")
                            .title("Category")
                            .defaultOrdering([{ field: "orderRank", direction: 'asc' }])
                            .child(category =>
                              S.documentList()
                                .title("Docs")
                                .filter(
                                  '_type == "docs" && $category == category._ref'
                                )
                                .params({ category })
                            )
                        ),
                      S.listItem()
                        .title("Category by Product")
                        .child(
                          S.documentTypeList("product")
                            .title("Product")
                            .defaultOrdering([{ field: "orderRank", direction: 'asc' }])
                            .child(product =>
                              S.documentList()
                                .title("Category")
                                .filter(
                                  '_type == "category" && $product == product._ref'
                                )
                                .params({ product })
                                .child(category =>
                                  S.documentList()
                                    .title("Docs")
                                    .filter(
                                      '_type == "docs" && $category == category._ref'
                                    )
                                    .params({ category })
                                )
                            )
                        ),
                      S.divider(),
                      orderableDocumentListDeskItem({ type: "category", S, context }),
                      orderableDocumentListDeskItem({ type: "docs", S, context }),

                    ]
                  )
              ),
            S.listItem()
              .title('Blogs')
              .child(
                S.list()
                  .title('Blogs')
                  .items(
                    [
                      S.listItem()
                        .title("Blogs")
                        .child(
                          S.documentList()
                            .title("Blogs")
                            .filter('_type == "blogPost"')
                        ),
                      S.listItem()
                        .title("Categories")
                        .child(
                          S.documentList()
                            .title("Categories")
                            .filter('_type == "blogCategory"')
                        ),
                      S.listItem()
                        .title("Authors")
                        .child(
                          S.documentList()
                            .title("Authors")
                            .filter('_type == "blogAuthor"')
                        ),
                      S.divider(),
                    ]
                  )
              ),
            S.listItem()
              .title('eBooks & Download')
              .child(
                S.list()
                  .title('eBooks & Download')
                  .items(
                    [
                      // S.listItem()
                      //   .title("Blogs")
                      //   .child(
                      //     S.documentList()
                      //       .title("Blogs")
                      //       .filter('_type == "blogPost"')
                      //   ),
                      // S.listItem()
                      //   .title("Categories")
                      //   .child(
                      //     S.documentList()
                      //       .title("Categories")
                      //       .filter('_type == "blogCategory"')
                      //   ),
                      // S.listItem()
                      //   .title("Authors")
                      //   .child(
                      //     S.documentList()
                      //       .title("Authors")
                      //       .filter('_type == "blogAuthor"')
                      //   ),
                      S.divider(),
                    ]
                  )
              ),
            S.divider(),
            S.listItem()
              .title("Site Config")
              .child(
                S.editor().schemaType("siteconfig").documentId("siteconfig")
              ),
          ])

      },
    }),
    visionTool(),
    codeInput(),
    table(),
  ],

  schema: {
    types: schemaTypes,
  },
})
