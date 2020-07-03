<template>
  <div class="dv">
    <div class="onefloor">
      <div class="item">1F</div>
      {{floorName}}
    </div>
    <div>
      <div v-for="(item,index) in floor1" :key="index">
        <div :class="[{'left':(index <= 0)},{'right':(index >= 1)}]" class="imgs">
          <img :src="item.image" @click="goDetail(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    floor1: {
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
      id: ""
    };
  },
  components: {},
  methods: {
    goDetail(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.floor1[index].goodsId }
      });
      this.$api
        .goods(this.floor1[index].goodsId)
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
.onefloor {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  color: red;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
  color: #fff;
}
.dv {
  display: flex;
  flex-direction: column;
}
img {
  width: 100%;
  background: #fff;
  height: 100%;
}
.left {
  float: left;
  width: 50%;

}
.right {
  float: right;
  width: 50%;
 
}
.imgs {
  display: flex;
}
</style>