<template>
  <div>
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div v-for="(item,index) in list" :key="index">
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
      list: []
    };
  },
  components: {},
  methods: {
    getData() {
      this.$api
        .collectionList()
        .then(res => {
          this.arr = res.data.list;
          console.log(res);
          for (let i = 0; i < this.arr.length; i++) {
            if (this.arr.indexOf(this.arr[i]) === i) {
              this.list.push(this.arr[i]);
            }
          }
        })
        .catch(err => {});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    close(index) {
      this.$api
        .cancelCollection(this.list[index].cid)
        .then(res => {
          this.$toast.success("删除成功");
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getData()
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