<template>
  <div id="app" class="container-fluid container-bg-color">
    <nav-bar-1 v-if="!inHomePage" class="nav-pc-display"></nav-bar-1>
    <nav-bar v-if="!inHomePage" class="nav-mobile-display"></nav-bar>

    <router-view/>

    <the-footer></the-footer>
  </div>
</template>

<script>
  import 'chart.js'
  //import TheFooter from './common/TheFooter'
  import TheFooter from './common/Footer'

  export default {
    name: 'App',
    data() {
      return {
        inHomePage: true
      }
    },
    created() {
      this.isDisplay();
    },
    watch: {
      '$route': 'isDisplay'
    },
    methods: {
      isDisplay() {
        this.inHomePage = (this.$route.name === 'Home' || this.$route.name === 'HomeTest');
      }
    },
    components: {TheFooter}
  }
</script>

<style>
  .container-bg-color {
    background-color: #f4f4f4;
    padding: 0 !important;
  }
</style>
