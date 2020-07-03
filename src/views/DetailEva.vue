<template>
  <div>
    <van-nav-bar title="评价详情" left-arrow @click-left="onClickLeft" class="dddd" />
    <div class="side"></div>
    <div class="bor">
      <div class="content">
        <div class="flex-cent">
          <img :src="this.avatar" alt class="img" />
          <div>
            <div class="marg-bos">{{this.username}}</div>
            <van-rate
              v-model="this.detailEva.rate"
              void-icon="star"
              :size="15"
              color="#ee0a24"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="time">{{this.detailEva.comment_time}}</div>
      </div>
      <div class="item">评价内容：{{this.detailEva.content}}</div>
    </div>
    <div class="flex-j-sb flex-a-c paddten">
      <div class="d-flex">
        <img :src="this.goodsdeta.image_path" alt width="20%" />
        <div>
          <div class="name">{{this.goodsdeta.name}}</div>
          <div class="price">￥{{this.goodsdeta.present_price}}</div>
        </div>
      </div>
      <div>
        <img src="../../项目资料/可能要用的图片/shop.png" alt class="shop-img" @click="addcart" />
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
      detailEva: {},
      anonymous: "",
      username: "",
      star: "",
      goodsdeta: {}
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    addcart() {
      this.$dialog
        .confirm({
          message: "是否重新加入购物车"
        })
        .then(() => {
          this.$api
            .addShop(this.goodsdeta.id)
            .then(res => {
              this.$router.push("/");
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.detailEva = this.$route.query.detailEva;
    this.goodsdeta = this.$route.query.goodsdeta;
    this.anonymous = this.detailEva.anonymous;
    this.star = this.detailEva.rate;
  },
  watch: {},
  computed: {
    userInfos() {
      return this.$store.state.userInfos;
    }
  }
};
</script>

<style scoped lang='scss'>
.dddd {
  position: fixed;
  width: 100%;
  z-index: 3;
}
.side {
  height: 46px;
}
.img {
  width: 50px;
  height: 50px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  margin-right: 10px;
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.time {
  font-size: 15px;
}
.item {
  padding: 10px;
}
.bor {
  border-bottom: 1px solid #eeeeee;
}
.shop-img {
  width: 30px;
  height: 30px;
  border: 1px solid red;
  border-radius: 50%;
}
.name {
  font-size: 15px;
  margin-left: 10px;
}
.price {
  font-size: 14px;
  margin-left: 10px;
  color: red;
  margin-top: 20px;
}
</style>