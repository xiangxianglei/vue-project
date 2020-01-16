<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-link to="/Home/About">About</router-link> |
    <router-link to="/Home/my">my</router-link>-->
    <!-- <h3>{{$store.state.count}}</h3>
    <button @click="count" class="btn">5555</button>-->
    
    <!-- 搜索框 -->
    <div :class="{scrollTop_s}">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
      </form>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="home_lb">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 通知跑马灯 -->
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      mode="closeable"
    >16:00前下单当天发货，默认快递：中通。需要发指定快递请联系客服更改。</van-notice-bar>
    <!-- 分割线 -->
    <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">热门商品</van-divider>
    <!-- 筛选器 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="option_a" />
      <van-dropdown-item v-model="value2" :options="option2" @change="option_b" />
    </van-dropdown-menu>
    <!-- 商品列表 -->
    <div class="home_list">
      <div class="list_li" v-for="(image, index) in images" :key="index" @click="list_li(index)">
        <img v-lazy="image" />
        <h3>苹果一体机</h3>
        <p>
          ￥132646
          <span>月售13542件</span>
        </p>
      </div>
    </div>

    <div style="height:50px"></div>
    <!-- taber -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="router('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="goods-collect" @click="router('/About')">活动</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="router('/cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="router('/my')">我的</van-tabbar-item>
    </van-tabbar>
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
      active: 0,
      value: "",
      scrollTop_s: "666",
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg",
        "https://img.yzcdn.cn/vant/apple-5.jpg",
        "https://img.yzcdn.cn/vant/apple-6.jpg",
        "https://img.yzcdn.cn/vant/apple-7.jpg",
        "https://img.yzcdn.cn/vant/apple-8.jpg"
      ],
      value1: 0,
      value2: "a",
      option1: [
        { text: "热门商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  },
  mounted() {
    let that = this;
    window.addEventListener("scroll", function() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 50) {
        that.scrollTop_s = "scrollTop";
      } else {
        that.scrollTop_s = "";
      }
    });
    window.scrollTo(0,0);  
  },
  methods: {
    count() {
      this.$store.commit("increment", 999);
    },
    onSearch() {
      console.log(this.value);
    },
    onCancel() {},
    list_li(id) {
      console.log(id);
      this.$router.push({
        name: "commodity_details",
        params: {
          id: id
        }
      });
    },
    router(val) {
      window.console.log(val);
      this.$router.push(val).catch(err => {
        console.log(err);
      });
    },
    option_a() {
      console.log(this.value1);
    },
    option_b() {
      console.log(this.value2);
    }
  }
};
</script>
<style scoped>
.btn {
  width: 7.5rem;
  height: 2rem;
}
.home_lb img {
  width: 7.5rem;
  height: 5rem;
}
.home_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #eee;
}
.list_li {
  width: 48%;
  margin: 1%;
  box-sizing: border-box;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #fff;
}
.list_li img {
  width: 100%;
  height: 3.55rem;
}
.scrollTop_s {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.list_li h3 {
  line-height: 0.3rem;
  text-align: left;
  color: #333;
  font-size: 0.32rem;
  margin-left: 0.1rem;
}
.list_li p {
  color: red;
  font-size: 0.3rem;
  text-align: left;
  margin-left: 0.1rem;
}
.list_li p span {
  font-size: 0.24rem;
  color: #999;
}
</style>
