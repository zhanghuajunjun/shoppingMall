<template>
  <div>
    <!-- 如果搜索出来没有商品 提示没有商品 -->
    <div v-if="list.length < 1 || value === ''">
      <van-cell>非常抱歉，该商品不存在，请重新输入关键词</van-cell>
    </div>
    <div v-else>
      <div v-for="(item,index) in list" :key="index" @click="goDetail(index)">
        <div class="item" v-html="item.searchName"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goDetail(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.list[index].id }
      });
      this.$utils.goDetail(this.list[index]);
      this.$utils.onSearch(this.value);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.item {
  font-size: 15px;
  padding: 15px;
  border: 1px solid #eeeeee;
}
</style>