<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-link to="/Home/About">About</router-link> |
    <router-link to="/Home/my">my</router-link>-->
    <h3>{{$store.state.count}}</h3>
    <button @click="count" class="btn">5555</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // name: 'home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      active: 0
    };
  },
  mounted(){
     this.$store.commit("increment", 0);
  },
  methods: {
    
    count() {
      this.$store.commit("increment", 999);
      
    }
  }
};
</script>
<style scoped>
    .btn{
      width: 7.5rem;
      height: 2rem;
    }
</style>
