<script lang="ts" setup>
import Feature from './Feature.vue'

const features: Feature[] = [
  {
    icon: 'heroicons-solid:bolt',
    description: 'We’re inspired by our customers’ ideas and are fun to work with',
  },
  {
    icon: 'heroicons-solid:circle-stack',
    description: 'Our video cloud platform is designed for unlimited scale',
  },
  {
    icon: 'heroicons-solid:document-check',
    description: 'We have the broadest video technology stack: Real-time, Live, VOD',
  },
  {
    icon: 'heroicons-solid:cursor-arrow-ripple',
    description: 'Our accessible products drive engagement and interactivity for all',
  },
  {
    icon: 'heroicons-solid:command-line',
    description: 'We build everything on our video APIs, and many tech companies use them too',
  },
  {
    icon: 'heroicons-solid:adjustments-vertical',
    description: 'Our products are loved by customers and easy to use',
  },
]
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 place-content-stretch">
      <div class="row-span-3">
        <img src="/testimonial-cover.png"/>
      </div>
      <Feature v-for="feature in features" :feature="feature" :key="feature.description" />
    </div>
  </section>
</template>

<style scoped>
.AnimatedText {
  text-align: center;

  background: linear-gradient(to right, #eae9e9 20%, #FF0 40%, #FF0 60%, #eae9e9 80%);
  background-size: 200% auto;

  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shine 1s linear infinite;
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
}
</style>
