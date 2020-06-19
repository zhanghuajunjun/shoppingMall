<template>
  <div class="dv">
    <div class="onefloor">
      <span>1F</span>
      {{floorName}}
    </div>
    <div v-for="(item,index) in floor1" :key="index">
      <div :class="[{'left':(index <= 0)},{'right':(index >= 1)}]">
        <img :src="item.image" />
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
.onefloor {
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