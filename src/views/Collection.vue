<template>
  <div>
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div v-for="(item,index) in collection" :key="index">
        <div class="d-flex">
          <img :src="item.image_path" class="img" />
          <div class="item">
            <div>{{item.name}}</div>
            <div class="price">￥{{item.present_price}}</div>
            <div class="close">
              <van-icon name="close" @click="close(index)" />
            </div>
          </div>
        </div>
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
      arr: [],
      list: [],
      collection: []
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    close(index) {
      this.$dialog
        .confirm({
          title: "确认删除该条收藏"
        })
        .then(() => {
          this.collection = JSON.parse(localStorage.getItem("collect"));
          this.collection.splice(index, 1);
          localStorage.setItem("collect", JSON.stringify(this.collection));
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.collection = JSON.parse(localStorage.getItem("collect"));
    console.log(this.collection);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  padding: 10px;
}
.d-flex {
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.img {
  width: 25%;
  border: 1px solid #eeeeee;
  margin-right: 10px;
}
.item {
  width: 100%;
}
.price {
  font-size: 14px;
  color: red;
  margin-top: 20px;
}
.close {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>