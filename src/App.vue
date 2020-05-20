<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .trans {
    transition: all 100ms linear;
  }

  .btn-selected {
    background-color: #086300;
    color: white;
    border: 5px double gold;
  }

  .btn-selected:hover {
    color: white;
  }

  .custom-active {
    transform: scale(1.3);
  }
</style>
