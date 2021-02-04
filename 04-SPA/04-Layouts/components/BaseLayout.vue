<template>
  <div>
    <the-header />

    <main>
      <router-view />
    </main>

    <the-footer />
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader },

  data() {
    return {
      layoutComponent: undefined,
    };
  },
  created() {
    this.layoutComponent = this.$route.meta.layout;
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
