<template>
  <div class="dv">
    <div class="twofloor">
      <span>2F</span>
      {{floorName}}
    </div>
    <div v-for="(item,index) in floor2" :key="index">
      <div :class="[{'left':(index <= 0)},{'right':(index >= 1)}]">
        <img :src="item.image"  @click="goDetail(index)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    floor2: {
      type: Array,
      default: () => []
    },
    floorName: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      id: ''
    };
  },
  components: {},
  methods: {
    goDetail(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.floor2[index].goodsId }
      });
      this.$api
        .goods(this.floor2[index].goodsId)
        .then(res => {
          this.goodsOne = res.goods.goodsOne;
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
.twofloor {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  color: red;
}
span {
  background: red;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
  color: #fff;
}
.dv {
  height: 350px;
}
img {
  width: 100%;
}
.left {
  float: left;
  width: 50%;
  margin-bottom: -4px;
}
.right {
  float: right;
  width: 50%;
  display: flex;
}
</style>