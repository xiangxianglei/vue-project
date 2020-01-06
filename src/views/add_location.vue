<template>
  <div>
    <van-nav-bar title="地址信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :address-info="addressinfo"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
   
  </div>
</template>

<script>
import areaList from "../assets/area.js";
export default {
  data() {
    return {
      active: 2,
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
      this.$router.push("/location");
    },
    onSave() {
      let that=this;
      that.$toast.success("保存成功");
      window.console.log(that.addressinfo)
      setTimeout(function(){
        that.$router.push("/location");
      },1000)
    },
    onDelete() {
      this.$toast.success("成功文案");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "万达广场",
            address: "郑州市二七区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style>
</style>