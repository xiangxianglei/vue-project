<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-link to="/Home/About">About</router-link> |
    <router-link to="/Home/my">my</router-link>-->
    <h3>{{$store.state.count}}</h3>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="router('/home')">标签</van-tabbar-item>
      <van-tabbar-item icon="search" @click="router('/About')">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="router('/my')">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="router('/login')">标签</van-tabbar-item>
    </van-tabbar>
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
  methods: {
    router(val) {
      window.console.log(val);
      this.$router.push(val);
    },
    count() {
      this.$store.commit("increment", 999);
      this.$get("/Wap/Test/gettest", {
        id: "666"
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
