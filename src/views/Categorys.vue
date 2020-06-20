<template>
  <div>
    <div class="cate">商品分类</div>
    <div class="d-flex">
      <van-sidebar v-model="activeKey" class="sidebar">
        <van-sidebar-item title="新鲜水果" />
        <van-sidebar-item title="中外名酒" />
        <van-sidebar-item title="营养奶品" />
        <van-sidebar-item title="食品饮料" />
        <van-sidebar-item title="个人护理" />
      </van-sidebar>
      <div class="tab">
        <van-tabs animated>
          <van-tab v-for="index in 8" :title="'标签 ' + index">内容 {{ index }}</van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeKey: 0
    };
  },
  components: {},
  methods: {},
  mounted() {
    // this.$api
    //   .catagorical()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {});
  },
  watch: {},
  computed: {
    categorys() {
      return this.$store.state.categorys;
    }
  }
};
</script>

<style scoped lang='scss'>
.sidebar {
  height: 500px;
  background: rgb(247, 248, 250);
  width: 120px;
}
.tab {
  margin-top: 10px;
}

.cate {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 1px solid #eeeeee;
}
</style>