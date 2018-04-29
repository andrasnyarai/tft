<template>
  <div id="app">
    <div class="intro">{{introduction}}</div>

    <nav>
      <router-link to="/">About</router-link>
      <router-link to="/tech">Tech</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import About from './components/About';

export default {
  name: 'app',
  data() {
    return {
      introduction: 'welcome to ...',
    };
  },
  components: {
    About,
  },
};

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  img {
    width: 500px
  }
  #app > .intro {
    color: #42b983;
    text-decoration: underline;
  }
</style>
