<template>
  <div class="login">
    <div class="login_mod">
      <h3>奢侈品商城</h3>
      <van-cell-group>
        <van-field
          v-model="username"
          value="username"
          left-icon="manager"
          placeholder="请输入手机号"
          type="number"
        />
        <van-field
          v-model="password"
          center
          clearable
          left-icon="lock"
          placeholder="请输入短信验证码"
          label-width="60px"
        >
          <van-button slot="button" size="small" type="primary" @click="send_code">{{code_text}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="primary" size="large" @click="handleChange">登录</van-button>
    </div>
  </div>
</template>

<script>
import api from "@/http/api";
let times;
export default {
  data() {
    return {
      username: "",
      password: "",
      img_src: "",
      code_text: "发送验证码"
    };
  },
  mounted() {},
  methods: {
    handleChange() {
      let that = this;
      that.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let username = that.username;
      let password = that.password;
      if (username == "") {
        that.$toast("手机号不能为空！");
        return;
      } else if (password == "") {
        that.$toast("验证码不能为空！");
        return;
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(username)) {
        that.$toast("手机号码有误，请重填");
        return;
      }
      that
        .$get(api.login, {
          username: username,
          password: password
        })
        .then(response => {
          console.log(response);
          window.localStorage.setItem("token", response.data.username);
          let logoin_time = new Date().getTime();
          window.localStorage.setItem("logoin_time", logoin_time);
          setTimeout(function() {
            that.$toast.success("登录成功");
            setTimeout(() => {
              clearInterval(times);
              that.$router.go(-1);
            }, 1000);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    send_code() {
      let code = 60;
      let that = this;
      let username = that.username;
      if (username == "") {
        that.$toast("请输入手机号！");
        return;
      }
      times = setInterval(() => {
        code--;
        that.code_text = code + "s";
        if (code == 0) {
          clearInterval(times);
          that.code_text = "重新发送";
        }
        console.log(code);
      }, 1000);
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100vh;
  background: url("../assets/img/login_bc.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_mod {
  width: 6.5rem;
  height: 7.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.2rem;
  padding: 0.5rem;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
}
.login .van-cell-group {
  background: none;
}
.login .van-cell {
  margin-bottom: 0.5rem;
}
.login .van-button--primary {
  background-color: #018ea9;
  border: 1px solid #018ea9;
}
.login_mod h3 {
  font-size: 0.5rem;
  color: #7c817d;
}
.van-cell__title {
  text-align: left;
}
.van-checkbox {
  margin-left: 0.2rem;
}
#app .van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.nav_bar_h {
  width: 100%;
  height: 46px;
}
</style>