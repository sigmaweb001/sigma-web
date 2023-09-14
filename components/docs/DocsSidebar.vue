<script lang="ts" setup>
</script>

<template>
  <div>
    <div class="sticky top-[55px] hidden h-[calc(100vh-55px)] border-r border-gray-200 md:block">
      <DocsSideNav />
      <div class="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <p class="text-sm text-slate-500">
          Power by {{ ' ' }}
          <a
            href="#"
            target="_blank"
            class="text-violet-500 hover:text-violet-600"
            rel="noopener"
          >
            Sigma Streaming
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
