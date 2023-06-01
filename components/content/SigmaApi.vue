<script lang="ts" setup>
const props = defineProps<{
  apiDescriptionUrl: string
}>()
</script>

<template>
  <elements-api class="h-full block" :apiDescriptionUrl="apiDescriptionUrl" router="hash" />
</template>

<style>
/* Styles for @stoplight/elements */

.sl-elements {
  --fs-paragraph: 18px !important;
  --fs-code: 13px !important;
  /* Reset padding for pre tags inside sl-elements */
  --ifm-pre-padding: 0;
  @apply !text-base;
}

/* Hides the `Production server` text in TryItPanel */
.TryItPanel>.sl-panel__titlebar>div:last-child {
  @apply hidden;
}

.sl-elements .OperationParametersContent {
  max-height: max-content;
}

.sl-code-viewer__scroller {
  max-height: initial !important;
}

/* Spacing between params */
.sl-self-stretch.sl-border-light.sl-border-t {
  @apply my-2;
}

.HttpOperation .sl-flex .sl-w-2\/5 {
  @apply ml-8 border-l border-border pl-8;
}

/* Fixes API reference white border */
.sl-elements div {
  @apply border-border;
}

.sl-elements-api>.sl-px-24 {
  @apply pl-8 pr-4;
}

.sl-text-base {
  @apply !text-sm;
}

.sl-elements a {
  color: inherit !important;
}

.sl-elements div[aria-label='Responses'] {
  span {
    @apply mr-auto;
  }

  div[data-key] {
    @apply mr-2 flex items-center rounded-md border outline-none ring-0;
  }

  div[data-key]::before {
    content: '';
    @apply mr-2 inline-block h-3 w-3 rounded-full bg-green-500 drop-shadow-sm;
  }

  div[data-key^='4']::before {
    @apply bg-red-500;
  }

  div[data-key^='5']::before {
    @apply bg-yellow-500;
  }

  div[aria-selected='true'] {
    @apply border-primary-100 shadow-sm;
  }
}

.sl-overflow-x-hidden.sl-overflow-y-auto.sl-flex-1.sl-w-full.sl-px-24.sl-bg-canvas {
  background-color: var(--docs-color-background);
}

.HttpOperation__Parameters .sl-flex-1,
.JsonSchemaViewer .sl-flex-1 {
  flex: none;
}

.sl-text-warning {
  @apply font-medium;
}

.sl-panel__titlebar .sl-h-lg {
  height: auto;
  padding: 12px 0;
}

.ElementsTableOfContentsItem>div {
  border-radius: 4px 0 0 4px;
  border-right: 2px solid transparent;
}

.ElementsTableOfContentsItem .sl-bg-primary-tint {
  border-right: 2px solid var(--ifm-color-primary);
  color: var(--ifm-color-primary);
  background: rgba(33, 96, 253, 0.16);
}

.sl-elements {
  scrollbar-width: thin;
}

.HttpOperation>.sl-flex.sl-mt-12>.sl-flex-1>div:not(.sl-prose) {
  @apply rounded-lg bg-background-100 p-4 pt-6;
}

.sl-absolute.sl--left-4 {
  @apply static pr-2;
}

.sl-elements-api>div:first-child {
  @apply !min-w-[240px] !max-w-[300px] !pl-0;
}

.sl-elements-api>div:last-child>div {
  @apply mx-auto;
}

/**
  Syntax highlighting styles for API reference only
*/

.sl-elements .token.punctuation {
  @apply !text-text-100;
}

.sl-elements .token.operator {
  @apply !text-text-100;
}

.sl-elements .token.property {
  @apply !text-[#1a90ff];
}

.sl-elements .token.string {
  @apply !text-$color-gray-100;
}

.sl-elements .token.function {
  @apply !text-primary-100;
}

html[data-theme='dark'] .sl-elements .token.boolean,
html[data-theme='dark'] .sl-elements .token.number {
  @apply !text-yellow-400;
}

html[data-theme='dark'] .sl-elements .token.null.keyword {
  @apply !text-red-400;
}

.sl-elements .TextRequestBody .token.string {
  @apply !text-gray-200;
}

html[data-theme='dark'] .sl-text-warning {
  @apply !text-red-500;
}

.sl-text-primary-dark {
  @apply !text-primary-100;
}

.sl-text-success {
  @apply !text-green-600;
}

.sl-text-primary {
  @apply !text-primary-100;
}

.sl-text-danger {
  @apply !text-red-500;
}

.sl-stack--horizontal>.sl-flex.sl-flex-wrap {
  @apply !flex-1;
}

/** hides the annoying popover which shows hovered fields in response */
.JsonSchemaViewer>.sl-bg-canvas-pure:first-child {
  @apply !hidden;
}
</style>