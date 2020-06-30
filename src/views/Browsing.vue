<template>
  <div>
    <van-nav-bar title="最近浏览" left-arrow @click-left="onClickLeft" />
    <div v-if="this.browsing===null" class="else">
      <img src="../../项目资料/可能要用的图片/loading.gif" class="elseimg" />
      <div class="null">你还没有浏览过任何商品</div>
      <div @click="browse" class="browse">快去看看吧</div>
    </div>
    <div class="box" v-else>
      <div v-for="(item,index) in browsing" :key="index">
        <div class="d-flex">
          <img :src="item.image" class="img" />
          <div class="item" v-if="item.name">
            <div>{{item.name}}</div>
            <div class="price">￥{{item.present_price}}</div>
            <div class="close">
              <van-icon name="close" @click="close(index)" />
            </div>
          </div>
          <div class="item" v-else-if="item.goodsName">
            <div>{{item.goodsName}}</div>
            <div class="price">￥{{item.price}}</div>
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
      browsing: []
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    browse() {
      this.$router.push("/");
    },
    close(index) {
      this.$dialog
        .confirm({
          title: "确认删除该条浏览记录吗"
        })
        .then(() => {
          this.browsing = JSON.parse(localStorage.getItem("views"));
          this.browsing.splice(index, 1);
          localStorage.setItem("views", JSON.stringify(this.browsing));
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.browsing = JSON.parse(localStorage.getItem("views"));
    console.log(this.browsing);
    // this.arr1 = this.browsing.filter(item => {
    //   return item.name === null;
    // });
    // this.arr2 = this.arr1.filter(item => {
    //   return item.goodsName === null;
    // });
    // this.arr2.map(item => {
    //   this.
    // });
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
.null {
  font-size: 18px;
}
.else {
  text-align: center;
  margin-top: 20px;
}
.elseimg {
  width: 50%;
}
.browse {
  font-size: 18px;
  color: blue;
  text-decoration: underline;
  margin-top: 20px;
}
</style>