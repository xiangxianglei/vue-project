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
  methods: {
    handleChange () {
      window.localStorage.setItem('token', this.username);
        this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>