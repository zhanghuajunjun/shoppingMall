<template>
  <div class="dv">
    <router-view></router-view>
    <van-tabbar route active-color="red" inactive-color="#000">
      <van-tabbar-item replace to="/" icon="wap-home-o">商城</van-tabbar-item>
      <van-tabbar-item replace to="/categorys" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingCart" icon="shopping-cart" :badge="setLength">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/self" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      length: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$api
      .getCard()
      .then(res => {
        this.shopList = res.shopList;
        this.$store.commit("setLength", this.shopList.length);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {
    setLength() {
      return this.$store.state.length;
    }
  }
};
</script>

<style scoped lang='scss'>
</style>