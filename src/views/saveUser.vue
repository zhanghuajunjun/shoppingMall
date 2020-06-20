<template>
  <div>
    <van-nav-bar title="个人资料" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <div class="github">github</div>
    <van-field v-model="head" label="头像" />
    <van-field v-model="userInfos.username"  label="用户名" />
    <van-field v-model="userInfos.nickname"  label="昵称" />
    <van-field v-model="userInfos.gender"  label="男" />
    <van-field v-model="email" type="email" label="邮箱" placeholder="请输入邮箱"/>
    <van-field v-model="day"  label="出生年月" />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      head: '',
      email: '',
      // borth: ''
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push("/self");
    }
  },
  mounted() {
  },
  watch: {},
  computed: {
    userInfos() {
      return this.$store.state.userInfos;
    },
  }
};
</script>

<style scoped lang='scss'>
.nav-bar {
  border-bottom: 1px solid #eeeeee;
}
.github {
  padding: 15px 0 15px 20px;
  border-bottom: 1px solid #eeeeee;
}
</style>