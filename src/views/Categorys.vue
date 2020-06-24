<template>
  <div>
    <div class="cate">商品分类</div>
    <div class="d-flex">
      <div>
        <van-sidebar v-model="activeKey" @change="onChange">
          <div v-for="(item,index) in category" :key="index">
            <van-sidebar-item :title="item.mallCategoryName" />
          </div>
        </van-sidebar>
      </div>

      <div class="tab">
        <van-tabs v-model="activeIdenx">
          <van-tab
            v-for="(item,index) in bxMallSubDto"
            :key="index"
            :title="item.mallSubName"
          >
            <div v-for="(item,index) in dataList" :key="index">
              <van-card
                :price="item.present_price"
                :title="item.name"
                :thumb="item.image_path"
                :origin-price="item.orl_price"
              />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categorys",
  props: {},
  data() {
    return {
      activeKey: 0,
      category: [],
      bxMallSubDto: [],
      id: "",
      dataList: [],
      activeIdenx: 0
    };
  },
  components: {},
  methods: {
    getData() {
      this.$api
        .catagorical(this.id)
        .then(res => {
          this.dataList = res.dataList;
          console.log(res);
        })
        .catch(err => {});
    },
    onChange(index) {
      this.bxMallSubDto = this.category[index].bxMallSubDto;
    }
  },
  mounted() {
    this.category = JSON.parse(localStorage.getItem("category"));
    this.bxMallSubDto = this.category[0].bxMallSubDto;
    if (this.$route.query.index) {
      this.activeKey = this.$route.query.index;
      this.id = this.category[this.activeKey].bxMallSubDto[0].mallSubId;
      this.getData();
    } else {
      this.id = this.category[0].bxMallSubDto[0].mallSubId;
      this.getData();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.sidebar {
  height: 500px;
  background: rgb(247, 248, 250);
  width: 120px;
}
/deep/.van-tab {
  height: 60px;
}
.tab {
  width: 100%;
}
.cate {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 1px solid #eeeeee;
}
</style>