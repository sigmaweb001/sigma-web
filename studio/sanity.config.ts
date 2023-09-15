import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table';


const hiddenDocTypes = listItem =>
  !["siteconfig"].includes(listItem.getId());

export default defineConfig({
  name: 'default',
  title: 'sigma-sanity',

  projectId: 'xbopepf9',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content Manager')
          .items([
            ...S.documentTypeListItems().filter(hiddenDocTypes),
            S.divider(),
            S.listItem()
              .title('Documents Management')
              .child(
                S.list()
                  .title('Documents Management')
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
              .title('Blogs Mangagement')
              .child(
                S.list()
                  .title('Blogs Management')
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
  document: {
    // prev is the result from previous plugins and thus can be composed
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const {getClient, dataset, document} = context
      const client = getClient({apiVersion: '2023-05-31'})

      if (document._type === 'blogPost') {
        console.log('[LOG] ~ file: sanity.config.ts:139 ~ document:', document)
        const slug = await client.fetch(
          `*[_type == 'blogPost' && _id == $postId][0].slug.current`,
          {postId: document._id}
        )

        const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)

        return `http://localhost:3333/blogs/${slug}?${params.toString()}`
      }

      return prev
    },
  },
})
