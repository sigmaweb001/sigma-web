<script setup lang="ts">
import { AFloating } from '../floating/type'

const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const { config } = useDocus()

defineProps({
  vertical: {
    type: Boolean,
    default: false
  }
})

const hasNavigation = computed(() => !!config.value.aside?.level)

const filtered = computed(() => config.value.header?.exclude || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path as never)) { return false }
    return true
  })
})


const refs = useTemplateRefsList<HTMLDivElement>()

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav
    v-if="hasNavigation"
    :class="{ vertical }"
  >
    <ul>
      <li
        v-for="(link, idx) in tree"
        :key="link._path"
        :ref="refs.set"
      >
        <NuxtLink
          class="link"
          :to="link.redirect ? link.redirect : navBottomLink(link)"
          :class="{ active: isActive(link) }"
        >
          <Icon
            v-if="link.icon && config?.header?.showLinkIcon"
            :name="link.icon"
          />
          {{ link.title }}

          <Icon
            v-if="link.subNav && !vertical && link.children"
            name="carbon:chevron-down"
          />
        </NuxtLink>

        <ClientOnly v-if="link.subNav && !vertical">
          <AFloating
            trigger="hover"
            :delay="100"
            :hide-delay="200"
            :reference-el="refs[idx]"
          >
            <div class="subnav">
              <div class="h-18px" />
              <ul class="dark:bg-$color-gray-800 rounded-4px py-6px bg-$color-gray-100">
                <li
                  v-for="(_link, idx) in link.children"
                  :key="_link._path"
                  class="font-500 flex flex-col text-14px px-12px py-6px hover:text-$color-primary-500"
                >
                  <NuxtLink
                    class="link"
                    :to="_link.redirect ? _link.redirect : navBottomLink(_link)"
                    :class="{ active: isActive(_link) }"
                  >
                    <Icon
                      v-if="_link.icon && config?.header?.showLinkIcon"
                      :name="_link.icon"
                    />
                    {{ _link.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </AFloating>
        </ClientOnly>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="ts">
css({
  nav: {
    display: 'none',
    '@lg': {
      display: 'block'
    },
    '&.vertical': {
      marginBottom: '{docus.app.navigation.vertical.marginBottom}',
    },
    ul: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '100%',
      truncate: true,
      gap: '{docus.app.navigation.gap}',

      '.vertical &&': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '{docus.app.navigation.vertical.gap}',
        '.link': {
          padding: '{docus.app.navigation.vertical.link.padding}',
        }
      },

      li: {
        display: 'inline-flex',
        fontWeight: '{docus.app.navigation.link.fontWeight}',
        width: '100%',
      },

      '.link': {
        display: 'flex',
        alignItems: 'center',
        gap: '{docus.app.navigation.link.gap}',
        padding: '{docus.app.navigation.link.padding}',
        fontSize: '{docus.app.navigation.link.fontSize}',
        // borderRadius: '{radii.2xs}',
        width: '100%',
        outline: 'none',
        transition: 'background 200ms ease',

        svg: {
          display: 'inline-block',
          width: '{docus.app.navigation.link.icon.size}',
          height: '{docus.app.navigation.link.icon.size}',
        },

        '&:active, &.active, &:hover': {
          color: '{color.primary.500}',
          // backgroundColor: '{color.gray.100}',
          // '@dark': {
          //   backgroundColor: '{color.gray.800}',
          // },
        },

        // '&.active': {
        //   boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        //   fontWeight: '{fontWeight.semibold}'
        // }
      }
    }
  }
})
</style>
