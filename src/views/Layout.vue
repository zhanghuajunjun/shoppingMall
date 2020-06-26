<template>
  <div class="dv">
    <router-view></router-view>
    <van-tabbar route active-color="red" inactive-color="#000">
      <van-tabbar-item replace to="/" icon="wap-home-o">商城</van-tabbar-item>
      <van-tabbar-item replace to="/categorys" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingCart" icon="shopping-cart" :badge="shopList">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/self" icon="contact" dot>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      shopList: ''
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.shopList = localStorage.getItem('shopList')
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>