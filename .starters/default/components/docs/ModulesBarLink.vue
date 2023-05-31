<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  currentPageId: {
    type: String,
    required: true,
  },
})

const active = ref(props.currentPageId.includes(props.title))
const selectedVersionName = props.currentPageId.split(":")[2].includes('v') ? props.currentPageId.split(":")[2] : undefined
</script>

<template>
  <div>
    <div class="dropdown">
      <NuxtLink :to="href" >
        <button
          class="px-3 rounded-md cursor-pointer py-1.5"
          :class="active ? 'bg-gray-200 dark:bg-pickled-bluewood-700/60': 'hover:bg-gray-200 dark:hover:bg-pickled-bluewood-700/60'"
        >
          <div class="flex items-center space-x-0.5 text-center">
            <div class="hidden md:block mr-1">
              <Icon :name="icon" />
            </div>
            <span class="pt-[1px]">
              {{title}}
              <span v-if="active">
                ({{ selectedVersionName || 'Latest' }})
              </span>
            </span>

          </div>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
	 position: relative;
}
 .dropdown nav {
   display: block !important;
	 position: absolute;
	 top: 100%;
	 left: 0;
	 opacity: 0;
	 visibility: hidden;
	 transition: 300ms all;
   z-index: 5;
}
 .dropdown:hover nav {
	 opacity: 1;
	 visibility: visible;
	 transform: translateY(0.25rem);
}
</style>
