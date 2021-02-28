<template>
  <div id="app">
    <Home />
    <Footer />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Footer from "./components/global/Footer.vue";

export default {
  components: {
    Home,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  text-align: center;
  .content {
    padding-top: 50px;
    padding-bottom: 20px;
  }
}
</style>
