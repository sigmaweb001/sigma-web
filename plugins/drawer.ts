export default defineNuxtPlugin((ctx: any) => {
  // Watch route change, close on change
  ctx.$router.afterEach(() => setTimeout(() => {
    showDrawer.value = false
  }, 50))

  return {

  }
})
