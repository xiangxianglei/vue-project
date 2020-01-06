<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-button type="primary" @click="delete_s">主要按钮</van-button>

    <h3>{{$store.state.count}}</h3>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          addressDetail: "浙江省杭州市滨江区江南大道 15 号",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          postalCode: "438400"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          addressDetail: "浙江省杭州市滨江区江南大道 15 号",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
          postalCode: "438400"
        }
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          addressDetail: "浙江省杭州市滨江区江南大道 15 号",
          address: "浙江省杭州市滨江区江南大道 15 号",
          postalCode: "438400"
        }
      ]
    };
  },

  methods: {
    onAdd() {
      this.$router.push("/add_location");
    },

    onEdit(item, index) {
      this.$router.push({ path: "/add_location", query: item });
      window.console.log(item);
    },
    delete_s() {
      window.localStorage.setItem("token", "");
    }
  }
};
</script>

<style>
</style>
