<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active" v-if="$store.state.count=='0'">
      <van-tabbar-item icon="home-o" @click="router('/')">标签</van-tabbar-item>
      <van-tabbar-item icon="search" @click="router('/About')">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="router('/my')">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="router('/login')">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
   data() {
    return {
      active: 0
    }
  },
  methods:{
    router(val) {
      window.console.log(val);
      this.$router.push(val).catch(err => { console.log(err) });
    }
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
