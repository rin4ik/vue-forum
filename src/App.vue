<template>
  <div id="app">
    <div class="container">
      <img src="./assets/logo.png">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import "assets/css/style.css";
</style>
