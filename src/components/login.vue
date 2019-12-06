<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="primary" size="large" @click="handleChange">登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    this.$store.commit("increment", 1);
  },
  methods: {
    handleChange() {
      let that = this;
      that.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      let username = that.username;
      let password = that.password;
      if(username=="" || password==""){
        that.$toast("用户名或密码有误！")
        return
      }
      that.$get("/Wap/Test/gettest", {
          username: username,
          password: password
        })
        .then(response => {
          console.log(response);
          window.localStorage.setItem("token", response.data.username);
          that.$toast.success("登录成功");
          setTimeout(function() {
            that.$store.commit("increment", 1);
            that.$router.go(-1);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>