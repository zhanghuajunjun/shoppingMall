<template>
  <div>
    <div class="cart">购物车</div>
    <van-empty
      class="custom-image"
      image='https://img.yzcdn.cn/vant/custom-empty-image.png'
      description="您的购物车空空如也，快去挑选你心爱的商品吧"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.cart {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>