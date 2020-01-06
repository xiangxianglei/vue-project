<template>
  <div class="cart">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="router('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="goods-collect" @click="router('/About')">活动</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="router('/cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="router('/my')">我的</van-tabbar-item>
    </van-tabbar>-->

    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div v-for="(lists,index) in CartList">
        <van-checkbox :name="lists.id" @click="check_list(index,lists.price)">{{lists.name}}</van-checkbox>
      </div>
    </van-checkbox-group>

    <van-submit-bar :price="all_price" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      checked: false,
      result: [],
      all_price:0,
      CartList: [
        {
          img_src: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "美版玫瑰金iphone5",
          price: 99999,
          specification: "美版玫瑰金;64G",
          quantity: "1",
          id: "1"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          name: "美版玫瑰金iphone6",
          price: 199999,
          specification: "美版玫瑰金;128G",
          quantity: "1",
          id: "2"
        }
      ]
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    router(val) {
      window.console.log(val);
      this.$router.push(val).catch(err => {
        console.log(err);
      });
    },
    onSubmit() {
      console.log("提交", this.result);
    },
    checkAll() {
       let that = this;
      if (that.checked) {
        that.$refs.checkboxGroup.toggleAll(false);
      } else {
        that.$refs.checkboxGroup.toggleAll(true);
      }
      setTimeout(function() {
        let result_s = that.result;
        let item_list=[];
        if (result_s.length > 0) {
          item_list.length=0;
          for (var i = 0; i < result_s.length; i++) {
            let item = that.CartList.find(item => {
              return item.id == result_s[i];
            });
            item_list.push(item.price)
          }
           console.log(item_list);
           let sum = item_list.reduce(function(prev, cur, index, arr) {
              return prev + cur;
           });
           that.all_price=sum
        }else{
           console.log(item_list);
           that.all_price=0
        }
      },100);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    check_list(index, price) {
      let that = this;
      // console.log(index,price)
      setTimeout(function() {
        let result_s = that.result;
        let item_list=[];
        if (result_s.length > 0) {
          item_list.length=0;
          for (var i = 0; i < result_s.length; i++) {
            let item = that.CartList.find(item => {
              return item.id == result_s[i];
            });
            item_list.push(item.price)
          }
           console.log(item_list);
           let sum = item_list.reduce(function(prev, cur, index, arr) {
              return prev + cur;
           });
           that.all_price=sum
        }else{
           console.log(item_list);
           that.all_price=0
        }
      },100);
    }
  }
};
</script>

<style>
</style>