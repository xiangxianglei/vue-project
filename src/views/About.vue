<template>
  <div class="About">
    <!-- <van-nav-bar title="地址信息" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
     <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="router('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="goods-collect" @click="router('/About')">活动</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="router('/cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="router('/my')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
    };
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
