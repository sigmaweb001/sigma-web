<script lang="ts" setup>
import { getHighlighter } from 'shikiji'

const { language, code } = definePropsRefs<{
  language: string
  code: string
}>()

const langMap = {
  bashfile: 'bash',
}

const lang = langMap[language.value] || 'bash'
const theme = 'github-light'
const darkTheme = 'github-dark'

const shiki = await getHighlighter()
await shiki.loadTheme(theme)
await shiki.loadTheme(darkTheme)
await shiki.loadLanguage(lang)

const htmlCode = shiki.codeToHtml(code.value, {
  lang,
  themes: {
    light: theme,
    dark: darkTheme,
  },
})
</script>

<template>
  <div v-html="htmlCode" />
</template>
