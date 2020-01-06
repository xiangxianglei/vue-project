<template>
  <div class="my">
    <!-- <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="router('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="goods-collect" @click="router('/About')">活动</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="router('/cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="router('/my')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import areaList from "../assets/area.js";
export default {
  data() {
    return {
      active: 3,
      areaList,
      searchResult: [],
      addressinfo:{
        "name":"刘祥"
      }
    };
  },
  mounted(){
    let data = this.$route.query
    this.addressinfo=data
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    router(val) {
      window.console.log(val);
      this.$router.push(val).catch(err => { console.log(err) });
    }
  }
};

</script>

<style>
</style>