<template>
  <div class="box">
    <div class="icon-tianchong">
      <i class="iconfont icon-zuojiantou-tianchong"></i>
    </div>
    <div class="login-box">
      <div class="log-res">登录&nbsp;/&nbsp;注册</div>
      <div class="login-item">
          <van-field
            v-model="username"
            placeholder="USERNAME"
            maxlength="6"
            :rules="[{ required: true, message: '请填写用户名',}]"
          />
          <van-field
            v-model="password"
            placeholder="PASSWORD"
            maxlength="12"
            type="password"
            :rules="[{ required: true, message: '请填写密码', min: 6, max: 18,}]"
          />
          <van-field
            v-model="digit"
            label="手机号码"
            :rules="[{ required: true, message: '请填写手机号', min: 11, max: 11,}]"
          />
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <template #button>
              <div>
                <van-button size="small" type="primary">发送验证码</van-button>
              </div>
            </template>
          </van-field>
          <div class="d-flex">
            <van-field v-model="smss" label="验证码" :rules="[{ required: true, message: '请填写验证码'}]" />
            <div v-html="code" class="sigon3" @click="loginc"></div>
          </div>
      </div>
      <div class="d-f">
        <van-button type="primary" class="sigon-item1" @click="loginb">登录</van-button>
        <van-button type="danger" class="sigon-item1" @click="logina">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      sms: "",
      digit: "",
      smss: "",
      password: "",
      code: "",
      time: 30 * 60 * 34
    };
  },
  components: {},
  methods: {
    loginc() {
      this.$api
        .verify()
        .then(res => {
          this.code = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    logina() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.smss
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast("注册成功");
            this.$router.push("/");
            localStorage.setItem("username", this.username);
          } else if (res.code === -1) {
            this.$dialog.alert({
              message: "用户已存在"
            });
          } else if (res.code === -2) {
            this.$dialog.alert({
              message: "验证码错误"
            });
          } else {
            this.$dialog.alert({
              message: "注册失败"
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginb() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.smss
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast("登录成功");
            this.$router.push("/");
          } else if (res.code === -1) {
            this.$dialog.alert({
              message: "密码错误"
            });
          } else if (res.code === -2) {
            this.$dialog.alert({
              message: "验证码错误"
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loginc();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  background: url("./6666.webp");
  width: 100%;
}
.icon-tianchong {
  padding: 10px;
}
.iconfont {
  font-size: 34px;
  color: #999;
}
.login-box {
  padding: 10px;
  background: transparent;
}
.log-res {
  font-size: 20px;
  padding: 20px;
}
.login-item {
  padding: 10px;
  background: white;
}
</style>