<template>
  <div id="app">
    <WebMain />
  </div>
</template>

<script>
import WebMain from "./components/WebMain.vue";

export default {
  name: "App",
  components: {
    WebMain,
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
