<template>
  <div>
    <div class="vip">会员中心</div>
    <div class="info">
      <van-icon name="setting" class="setting" color="#ffffff" size="25" @click="save" />
      <div class="avatar">
        <img :src="this.avatar" />
      </div>
      <div v-if="this.username === null">
        <div class="out" @click="login">登录/注册</div>
      </div>
      <div v-else>
        <div class="wel">欢迎您：{{this.username}}</div>
        <div class="out" @click="out">退出登录</div>
      </div>
    </div>
    <div class="flex-j-sa">
      <div class="f-dir-mid">
        <van-icon name="paid" size="30" class="icon" />
        <div>待付款</div>
      </div>
      <div class="f-dir-mid">
        <van-icon name="free-postage" size="30" class="icon" />
        <div>代发货</div>
      </div>
      <div class="f-dir-mid">
        <van-icon name="points" size="30" class="icon" />
        <div>待收货</div>
      </div>
      <div class="f-dir-mid">
        <van-icon name="thumb-circle-o" size="30" class="icon" badge="9" />
        <div>评价</div>
      </div>
      <div class="f-dir-mid" @click="allOrder">
        <van-icon name="like-o" size="30" class="icon" :badge="this.length" />
        <div>已完成</div>
      </div>
    </div>
    <van-cell title="全部订单" is-link to="allOrder" class="order" icon="records" />
    <van-cell title="收藏商品" is-link to="collection" icon="star-o" class="cell" />
    <van-cell title="地址管理" is-link to="address" icon="location-o" />
    <van-cell title="最近浏览" is-link to="browsing" icon="eye-o" class="cell" />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      userInfo: {},
      username: "",
      flag: true,
      length: "",
      avatar: ''
    };
  },
  components: {},
  methods: {
    save() {
      this.$router.push("/saveUser");
    },
    out() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您正在退出登录，请确认是否退出"
        })
        .then(() => {
          this.flag = false;
          localStorage.removeItem("username");
          this.$router.go(0);
        })
        // on cancel
        .catch(() => {});
    },
    login() {
      this.$router.push("/login");
    },
    allOrder() {
      this.$router.push({ path: "/allOrder", query: { flag: this.flag } });
    }
  },
  mounted() {
    this.$api
      .queryUser()
      .then(res => {
        this.userInfo = res.userInfo;
        localStorage.setItem("avatar", res.userInfo.avatar);
        console.log(this.userInfo);
        this.$store.commit("setUserInfos", res.userInfo);
      })
      .catch(err => {});
    this.username = localStorage.getItem("username");
    this.avatar = localStorage.getItem("avatar");
    this.$api
      .orderNum()
      .then(res => {
        this.length = res.numList[3];
      })
      .catch(err => {});
  },
  watch: {},
  computed: {
    userInfos() {
      return this.$store.state.userInfos;
    }
  }
};
</script>

<style scoped lang='scss'>
.vip {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  font-weight: 500;
}
.info {
  background: rgb(227, 12, 123);
  padding: 10px;
  margin-bottom: 20px;
}
.setting {
  display: flex;
  justify-content: flex-end;
}
img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 10px 0;
}
.avatar {
  display: flex;
  justify-content: center;
}
.wel {
  font-size: 20px;
  font-size: 700;
  color: #ffffff;
  text-align: center;
  padding: 10px;
}
.out {
  color: #ffffff;
  text-align: center;
  padding: 10px 0 20px 0;
}
.icon {
  margin-bottom: 10px;
}
.van-icon {
  margin-right: 10px;
}
.order {
  margin: 10px 0;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
}
.cell {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
}
</style>