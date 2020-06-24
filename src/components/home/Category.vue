<template>
  <div class="card flex-j-sb">
    <div v-for="(item,index) in category" :key="index">
      <div class="f-dir-mid" @click="categorys(index)">
        <img :src="item.image" />
        <div class="mallCategoryName">{{item.mallCategoryName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    categorys(index) {
      this.$router.push({
        name: 'Categorys',
        query: {index: index}
      })
      console.log(index);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.card {
  padding: 20px 10px;
  background: white;
  box-shadow: 0 8px 12px #ebedf0;
  border-radius: 10px;
}
.mallCategoryName {
  font-size: 14px;
}
img {
  width: 40px;
  margin-bottom: 10px;
}
</style>