<template>
  <div class="cart">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="router('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="goods-collect" @click="router('/About')">活动</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="router('/cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="router('/my')">我的</van-tabbar-item>
    </van-tabbar>-->
    <div class="nav_bar_h"></div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      :right-text="right_text"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div v-for="(lists,index) in CartList" class="cart_list">
        <van-checkbox :name="lists.id" @click="check_list(lists.id)"></van-checkbox>
        <div class="cart_img">
          <img :src="lists.img_src" alt @click="commodity_details(lists.id)" />
        </div>
        <div class="cart_text">
          <h3>{{lists.name}}</h3>
          <p>{{lists.specification}}</p>
          <div class="cart_cz">
            <div class="cart_price">{{price(index)}}</div>
            <van-stepper
              v-model="lists.quantity"
              @change="plus_quantity"
              :max="lists.stock_num"
              class="plus_quantity"
            />
          </div>
        </div>
      </div>
    </van-checkbox-group>
    <div style="height:55px"></div>
    <van-submit-bar
      :price="all_price"
      button-text="结算"
      @submit="onSubmit"
      :hidden="administration_type"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>

    <div class="Delete_goods" :hidden="!administration_type">
       <van-checkbox v-model="checked" @click="checkAll" class="Delete_goods_xz">全选</van-checkbox>
       <button @click="Delete_goods">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      checked: false,
      result: [],
      all_price: 0,
      CartList: [
        {
          img_src: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "美版玫瑰金iphone5",
          price: 1356243,
          specification: "美版玫瑰金;64G",
          quantity: 2,
          stock_num: 10,
          id: "1"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          name: "美版玫瑰金iphone6",
          price: 326856,
          specification: "美版玫瑰金;128G",
          quantity: 1,
          stock_num: 10,
          id: "2"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "美版玫瑰金iphone11",
          price: 999999,
          specification: "美版玫瑰金;128G",
          quantity: 1,
          stock_num: 10,
          id: "3"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "美版玫瑰金iphone5",
          price: 4542134,
          specification: "美版玫瑰金;64G",
          quantity: 2,
          stock_num: 10,
          id: "4"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          name: "美版玫瑰金iphone6",
          price: 30000,
          specification: "美版玫瑰金;128G",
          quantity: 1,
          stock_num: 10,
          id: "5"
        },
        {
          img_src: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "美版玫瑰金iphone11",
          price: 999999,
          specification: "美版玫瑰金;128G",
          quantity: 1,
          stock_num: 10,
          id: "6"
        }
      ],
      right_text: "管理",
      administration_type: false
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
      if(that.result.length==0){
        that.$toast('请选择商品');
        return false
      }
      console.log("提交", this.result);
    },
    onClickRight() {
      let that = this;
      if (that.administration_type) {
        that.right_text = "管理";
        that.administration_type = false;
      } else {
        that.right_text = "完成";
        that.administration_type = true;
      }
    },
    Delete_goods() {
      let that = this;
      if(that.result.length==0){
        that.$toast('请选择要删除的商品');
        return false
      }
      that.$dialog.confirm({
        title: "购物车删除",
        message: "是否确认将此商品移除购物车？",
        beforeClose(action, done) {
          if (action === "confirm") {
            setTimeout(done, 1000);
            setTimeout(function(){
              let result_s = that.result;
            if (result_s.length > 0) {
              for (var i = 0; i < result_s.length; i++) {
                let item = that.CartList.find(item => {
                  return item.id == result_s[i];
                });
                that.removeAaary(that.CartList, item);
              }
              that.result.length = 0;
              that.result_calculation();
              that.checked = false;
            } else {
              that.all_price = 0;
            }
            },1000)
          } else {
            done();
          }
        }
      });
    },
    removeAaary(_arr, _obj) {
      var length = _arr.length;
      for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
          if (i == 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return _arr;
          } else if (i == length - 1) {
            _arr.pop(); //删除并返回数组的最后一个元素
            return _arr;
          } else {
            _arr.splice(i, 1); //删除下标为i的元素
            return _arr;
          }
        }
      }
    },
    checkAll() {
      let that = this;
      if (that.checked) {
        that.$refs.checkboxGroup.toggleAll(false);
      } else {
        that.$refs.checkboxGroup.toggleAll(true);
      }
      setTimeout(function() {
        that.result_calculation();
      }, 100);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    check_list(id) {
      console.log(id);
      let that = this;
      setTimeout(function() {
        that.result_calculation();
      }, 100);
    },
    price(index) {
      return "￥" + this.CartList[index].price / 100;
    },
    plus_quantity() {
      let that = this;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      setTimeout(function() {
        that.$toast.clear();
        that.result_calculation();
      }, 500);
    },
    commodity_details(id) {
      console.log(id);
      this.$router.push({
        name: "commodity_details",
        params: {
          id: id
        }
      });
    },
    result_calculation() {
      let that = this;
      let result_s = that.result;
      let item_list = [];
      if (result_s.length > 0) {
        item_list.length = 0;
        for (var i = 0; i < result_s.length; i++) {
          let item = that.CartList.find(item => {
            return item.id == result_s[i];
          });
          item_list.push(item.price * item.quantity);
        }
        console.log(item_list);
        if (item_list.length == that.CartList.length) {
          that.checked = true;
        } else {
          that.checked = false;
        }
        let sum = item_list.reduce(function(prev, cur) {
          return prev + cur;
        });
        that.all_price = sum;
      } else {
        console.log(item_list);
        that.all_price = 0;
      }
    }
  }
};
</script>
<style scoped>
.cart {
  background: #f1f1f1;
  min-height: 100vh;
}
.cart_list {
  margin: 0.15rem;
  border-radius: 10px;
  width: 7.2rem;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  align-items: center;
  padding: 0.2rem;
}
.cart_img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.1rem;
  overflow: hidden;
  border: 1px solid #eee;
  margin: 0 0.2rem;
}
.cart_img img {
  width: 100%;
  height: 100%;
}
.cart_text {
  width: 3.9rem;
}
.cart_cz {
  width: 100%;
  height: 0.6rem;
}
.cart_price {
  float: left;
  line-height: 0.6rem;
  color: red;
}
.plus_quantity {
  float: right;
}
.cart_text h3 {
  font-size: 0.3rem;
  color: #000;
  line-height: 0.45rem;
  text-align: left;
}
.cart_text p {
  text-align: left;
  font-size: 0.26rem;
  color: #666;
  line-height: 0.45rem;
}
.Delete_goods{
  width: 100%;
  height: 50px;
  background: #fff;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 0.28rem;
}
.Delete_goods_xz{
  float: left;
  margin-top: 15px;
}
.Delete_goods button{
  float: right;
  margin:10px 0.2rem 0 0;
  background: none;
  border: 1px solid red;
  color: red;
  height: 30px;
  line-height: 30px;
  padding: 0 0.5rem;
  border-radius: 15px;
}
</style>