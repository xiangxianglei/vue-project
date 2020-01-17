<template>
  <div class="commodity_details">
    <div class="nav_bar_h"></div>
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-image-preview v-model="show" :images="images" @change="onChange" :startPosition="index">
      <!-- <template v-slot:index>第{{ index }}页</template> -->
    </van-image-preview>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="home_lb">
      <van-swipe-item v-for="(image, index) in images" :key="index" @click="img_click(index)">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <div class="details_title">
      <div class="details_h">Apple/苹果iPhone 8 128G 玫瑰金 移动联通电信全网通手机</div>
      <div class="details_title_s">
        <div class="details_title_p">
          {{ imputed_price_s(imputed_price) }}
          <span :hidden="time_time">999</span>
        </div>
        <div class="details_title_time" :hidden="time_time">
          <span>优惠倒计时</span>
          <van-count-down :time="time" @finish="finish">
            <template v-slot="timeData">
              <span class="item">{{ timeData_s(timeData.hours) }}</span>
              <span class="item">{{ timeData_s(timeData.minutes) }}</span>
              <span class="item">{{ timeData_s(timeData.seconds) }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom" style="text-align: left;">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange_yhj"
        @exchange="onExchange_yhj"
      />
    </van-popup>

    <van-cell title="选择" is-link :value="item_list" @click="Choose_specifications" />

    <!-- 分割线 -->
    <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">宝贝详情</van-divider>

    <div class="imageList_s">
      <img v-for="img in imageList_s" v-lazy="img"/>
    </div>

    <!-- 商品规格选择 -->
    <div class="specification">
      <van-sku
        v-model="show_specification"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :initial-sku="initialSku"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        @sku-selected="selected_sku"
        @stepper-change="stepper_change"
        ref="getSku"
      />
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="cart_info" @click="router('/cart')" />
      <!-- <van-goods-action-icon icon="shop-o" text="店铺" info="12" /> -->
      <van-goods-action-button type="warning" text="加入购物车" @click="onAddCartClicked" />
      <van-goods-action-button type="danger" text="立即购买" @click="onBuyClicked" />
    </van-goods-action>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  data() {
    return {
      time_time:false,
      time: 100000,
      timeData: {},
      loading: true,
      show: false,
      index: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg"
      ],

      imageList_s: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg",
        "https://img.yzcdn.cn/vant/apple-5.jpg",
        "https://img.yzcdn.cn/vant/apple-6.jpg",
        "https://img.yzcdn.cn/vant/apple-7.jpg",
        "https://img.yzcdn.cn/vant/apple-8.jpg"
      ],
      // 商品id
      //规格选择显示隐藏
      show_specification: false,
      goodsId: "666",
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "玫瑰金", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "2",
                name: "土豪金",
                imgUrl: "https://img.yzcdn.cn/vant/apple-3.jpg",
                previewImgUrl: "https://img.yzcdn.cn/vant/apple-3.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "3", // skuValueId：规格值 id
                name: "64G" // skuValueName：规格值名称
              },
              {
                id: "4",
                name: "128G"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1111, // skuId，下单时后端需要
            price: 10000, // 价格（单位分）
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "3", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 2222, // skuId，下单时后端需要
            price: 19999, // 价格（单位分）
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "4", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 3333, // skuId，下单时后端需要
            price: 20000, // 价格（单位分）
            s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "3", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 4444, // skuId，下单时后端需要
            price: 29999, // 价格（单位分）
            s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "4", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 10 // 当前 sku 组合对应的库存
          }
        ],
        price: "10000", // 默认价格（单位元）
        stock_num: 10, // 商品总库存
        collection_id: 2259, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false // 是否无规格商品
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/vant/apple-2.jpg"
      },
      //初始选择项
      initialSku: {
        s1: "1",
        s2: "3",
        // 初始选中数量
        selectedNum: 1
      },
      cart_info: 3,
      // 优惠劵================================
      showList: false,
      chosenCoupon: -1,
      //可以使用优惠劵
      coupons: [
        {
          id: 1,
          type: "1",
          condition: "无使用门槛\n最多优惠12元",
          value: 150,
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "1.5",
          unitDesc: "元",
          description: "描述信息"
        },
        {
          id: 2,
          type: "2",
          condition: "无使用门槛\n最多优惠12元",
          value: 1550,
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "8.8",
          unitDesc: "折",
          description: "描述信息"
        }
      ],
      //不可以使用优惠劵
      disabledCoupons: [
        {
          id: 3,
          type: "2",
          condition: "无使用门槛\n最多优惠12元",
          value: 1550,
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "15.5",
          unitDesc: "元",
          reason: "不可用原因"
        }
      ],
      skuValue_list: [],
      item_list: "请选择规格",
      imputed_price:"9999",
      valueDesc_price:"0"
    };
  },
  mounted() {
    let that = this;
    let id = that.$route.params.id;
    that.goodsId = id;
    that.getSkuData_s();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //预览滑动事件
    onChange(index) {
      this.index = index;
    },
    //轮播图预览事件
    img_click(index) {
      console.log(index);
      this.index = index;
      this.show = true;
    },
    // 立即购买事件
    onBuyClicked() {
      let that = this;
      if (that.item_list == "请选择规格") {
        that.show_specification = true;
        return false;
      }
      let getSkuData_list = that.$refs.getSku.getSkuData();
      console.log(getSkuData_list);
    },
    // 加入购物车事件
    onAddCartClicked(e) {
      let that = this;
      if (that.item_list == "请选择规格") {
        that.show_specification = true;
        return false;
      }
      let getSkuData_list = that.$refs.getSku.getSkuData();
      that.show_specification = false;
      that.cart_info += 1;
      console.log(getSkuData_list);
    },
    //优惠券切换回调
    onChange_yhj(index) {
      let that=this
      that.showList = false;
      console.log(index);
      if (index != -1) {
        that.chosenCoupon = index;
        let id = that.coupons[index].id;
        let type = that.coupons[index].type;
        that.valueDesc_price=that.coupons[index].value;
        let getSkuData_list = that.$refs.getSku.getSkuData();
        that.imputed_price=getSkuData_list.selectedSkuComb.price-that.valueDesc_price;
        console.log("yhj_id", that.coupons[index]);
      }else{
        that.chosenCoupon = -1;
        that.valueDesc_price=0;
        let getSkuData_list = that.$refs.getSku.getSkuData();
        that.imputed_price=getSkuData_list.selectedSkuComb.price-that.valueDesc_price;
      }
    },
    //兑换优惠券回调
    onExchange_yhj(code) {
      this.coupons.push(coupon);
    },
    selected_sku(e) {
      let that = this;
      that.getSkuData_s();
    },
    stepper_change(e) {
      let that = this;
      console.log(e);
      that.getSkuData_s(e);
    },
    Choose_specifications() {
      this.show_specification = true;
    },
    getSkuData_s(val) {
      let that = this;
      let item1;
      let item2;
      let item3;
      let item_list;
      let item_quantity;
      let getSkuData_list = that.$refs.getSku.getSkuData();
      if (val) {
        item_quantity = val;
      } else {
        item_quantity = getSkuData_list.selectedNum;
      }
      console.log(getSkuData_list);
      if (getSkuData_list.selectedSkuComb) {
        if (getSkuData_list.selectedSkuComb.s1) {
          let items = that.sku.tree[0].v.find(item => {
            return item.id == getSkuData_list.selectedSkuComb.s1;
          });
          item1 = items.name;
        }
        if (getSkuData_list.selectedSkuComb.s2) {
          let items = that.sku.tree[1].v.find(item => {
            return item.id == getSkuData_list.selectedSkuComb.s2;
          });
          item2 = items.name;
        }
        if (getSkuData_list.selectedSkuComb.s3) {
          let items = that.sku.tree[2].v.find(item => {
            return item.id == getSkuData_list.selectedSkuComb.s3;
          });
          item3 = items.name;
        }
        if (item1) {
          item_list = item1 + ",数量" + item_quantity;
        }
        if (item2) {
          item_list = item1 + "," + item2 + ",数量" + item_quantity;
        }
        if (item3) {
          item_list =
            item1 + "," + item2 + "," + item3 + ",数量" + item_quantity;
        }

        that.imputed_price=getSkuData_list.selectedSkuComb.price-that.valueDesc_price;
        console.log(item_list);
        that.item_list = item_list;
      }
    },
    router(val) {
      window.console.log(val);
      this.$router.push(val).catch(err => {
        console.log(err);
      });
    },
    timeData_s(val) {
      let times = val;
      if (times <= 9) {
        times = "0" + times;
      }
      return times;
    },
    imputed_price_s(val){
      let price_s="￥"+val/100
      return price_s
    },
    finish() {
      this.$toast('活动已结束');
      this.time_time=true;
    }
  }
};
</script>

<style scoped>
.home_lb img {
  width: 7.5rem;
  height: 7.5rem;
  float: left;
}
.specification {
  text-align: left;
}
.commodity_details {
  background: #eee;
}
.imageList_s {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.imageList_s img {
  width: 100%;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #000;
}
.details_title {
  padding: 0 0.2rem 0.2rem;
  background: #ff6034;
  padding-top: 0.1rem;
}
.details_h {
  color: #fff;
  font-weight: 600;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  text-align: left;
}
.details_title_s {
  width: 100%;
  margin-top: 0.1rem;
}
.details_title_s:after {
	content: "200b";
	display: block;
	font-size: 0;
	height: 0;
	clear: both
}
.details_title_p {
  float: left;
  color: #fff;
  font-size: 0.4rem;
  line-height: 0.8rem;
}
.details_title_p span {
  font-size: 0.3rem;
  text-decoration: line-through;
  color: #eee;
}
.details_title_time {
  float: right;
}
.details_title_time span {
  font-size: 0.28rem;
  color: #fff;
}
</style>>
