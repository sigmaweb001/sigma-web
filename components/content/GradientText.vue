<script lang="ts" setup>
const props = defineProps({
  secondary: Boolean
})
</script>

<template>
  <span class="GradientText inline-block" :class="secondary ? 'GradientTextSecondary' : 'GradientTextPrimary'">
    <ContentSlot :use="$slots.default" unwrap="p">
    </ContentSlot>
  </span>
</template>

<style scoped>
.GradientTextPrimary {
  background: linear-gradient(to right, #FEDDC1 10%, #FD9A47 40%, #E26802 60%, #FEDDC1 90%);
}


/*     --color-secondary-900: #080020;
    --color-secondary-800: #14014A;
    --color-secondary-700: #200273;
    --color-secondary-600: #370DAD;
    --color-secondary-500: #6B39FA;
    --color-secondary-400: #8961FD;
    --color-secondary-300: #A589F9;
    --color-secondary-200: #E5DCFF;
    --color-secondary-100: #F1ECFF;
    --color-secondary-50: #F8F5FF; */
.GradientTextSecondary {
  background: linear-gradient(to right, #A589F9 20%, #8961FD 40%, #6B39FA 60%, #200273 90%);
}

.GradientText {
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
