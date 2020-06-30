<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in slides" :key="index">
        <img v-lazy="item.image" @click="goDetail(index)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: "",
      goodsOne: {}
    };
  },
  components: {},
  methods: {
    goDetail(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.slides[index].goodsId }
      });
      this.$api
        .goods(this.slides[index].goodsId)
        .then(res => {
          this.goodsOne = res.goods.goodsOne
          this.$utils.goDetail(this.goodsOne);
        })
        .catch(err => {});
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img {
  width: 100%;
  height: 167px;
}
</style>