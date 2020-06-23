<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in slides" :key="index">
        <img v-lazy="item.image" @click="Details(index)"/>
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
      id: ''
    };
  },
  components: {},
  methods: {
    Details(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.slides[index].goodsId }
      });
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