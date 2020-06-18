<template>
  <div class="box">
    <div class="icon-tianchong">
      <i class="iconfont icon-zuojiantou-tianchong" @click="goTo"></i>
    </div>
    <div class="login-box">
      <div class="log-res">登录&nbsp;/&nbsp;注册</div>
      <div class="login-item">
        <van-field
          v-model="username"
          placeholder="USERNAME"
          maxlength="6"
          :rules="[{ required: true, message: '请填写用户名',}]"
          class="field"
        />
        <van-field
          v-model="password"
          placeholder="PASSWORD"
          maxlength="12"
          type="password"
          :rules="[{ required: true, message: '请填写密码', min: 6, max: 18,}]"
          class="field"
        />
        <van-field
          v-model="digit"
          label="手机号码"
          placeholder="进注册需要"
          :rules="[{ required: true, message: '手机号格式错误', min: 11, max: 11,}]"
          class="field"
        />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="仅注册需要" class="field">
          <template #button>
            <div>
              <button type="primary" class="btn" @click="SMS">{{time}}</button>
            </div>
          </template>
        </van-field>
        <div class="d-flex">
          <span>验证码</span>
          <van-field
            v-model="smss"
            :rules="[{ required: true, message: '请填写验证码'}]"
            placeholder="请输入验证码"
            class="vanfield"
          />
          <div v-html="code" class="code" @click="verify"></div>
        </div>
      </div>
      <div class="d-f">
        <button type="primary" class="log" @click="login">登 录</button>
        <button type="danger" class="reg" @click="register">注 册</button>
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
      time: "发送验证码",
      flag: true
    };
  },
  components: {},
  methods: {
    goTo(){
      this.$router.push('-1');
    },
    SMS() {
      if (this.flag) {
        this.flag = false;
        let langtime = 60;
        let _this = this;
        let a = setInterval(() => {
          if (langtime == 0) {
            _this.flag = true;
            _this.time = "发送验证码";
            clearInterval(a);
          } else {
            langtime--;
            _this.time = `倒计时${langtime}秒`;
          }
        }, 1000);
      } else {
        console.log("不能点了");
      }
    },
    verify() {
      this.$api
        .verify()
        .then(res => {
          this.code = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
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
        })
        .catch(err => {});
    },
    register() {
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
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.verify();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  background: url("./6666.webp");
  width: 100%;
  height: 667px;
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
  border-radius: 10px;
  box-shadow: 0 0.533vw 3.2vw 0 rgba(0, 0, 0, 0.1);
}
.field {
  margin-top: 10px;
  border-bottom: 1px solid #cccccc;
}
.vanfield {
  margin-top: 10px;
  border-bottom: 1px solid #cccccc;
  width: 200px;
}
span {
  width: 80px;
  padding: 20px 0 10px 16px;
}
.code {
  margin-top: 15px;
}
.btn {
  border: none;
  background: #07c160;
  border-radius: 3px;
  color: #ffffff;
  padding: 5px;
}
.d-f {
  margin-top: 30px;
  margin-left: 20px;
}
.log {
  border: none;
  background: #07c160;
  padding: 10px 20px;
  color: #ffffff;
  font-weight: 600;
  border-radius: 3px;
  margin-right: 30px;
}
.reg {
  border: none;
  background: #dd121c;
  padding: 10px 20px;
  color: #ffffff;
  font-weight: 600;
  border-radius: 3px;
}
</style>