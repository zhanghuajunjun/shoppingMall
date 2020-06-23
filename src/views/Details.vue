<template>
  <div class="detail">
    <i class="iconfont icon-fanhuianniu" @click="goTo"></i>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="orange">
      <van-swipe-item>
        <img v-lazy="goodsOne.image" />
      </van-swipe-item>
      <van-swipe-item>
        <img v-lazy="goodsOne.image_path" />
      </van-swipe-item>
    </van-swipe>
    <div class="name">
      <div>{{goodsOne.name}}</div>
      <div class="price">
        <span>￥{{goodsOne.present_price}}</span>
        <span class="orl">￥{{goodsOne.orl_price}}</span>
      </div>
    </div>
    <div class="amount">
      <div>运费：{{goodsOne.__v}}</div>
      <div>剩余：{{goodsOne.amount}}</div>
      <div>
        收藏
        <van-icon name="like-o" />
      </div>
    </div>
    <div class="in">
      <div class="shop">
        <van-icon name="shop-collect-o" class="shop-collect-o" />有赞的店
        <van-tag type="danger" size="medium" class="tag">官方</van-tag>
      </div>
      <div class="arrow">
        进入店铺
        <van-icon name="arrow" class="arrows" />
      </div>
    </div>
    <div class="goods">
      <van-tabs v-model="active" title-active-color="red">
        <van-tab title="商品详情"></van-tab>
        <van-tab title="商品分类"></van-tab>
      </van-tabs>
    </div>
    <van-goods-action  class="index">
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      goodsId: "",
      goodsOne: {},
      active: 0
    };
  },
  components: {},
  methods: {
    goTo(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.goodsId = this.$route.query.id;
    this.$api
      .goods(this.goodsId)
      .then(res => {
        this.goodsOne = res.goods.goodsOne;
        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.icon-fanhuianniu {
  font-size: 30px;
  color: #999;
}
.detail {
  padding: 10px;
}
img {
  width: 100%;
}
.name {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  margin: 0 -10px;
  font-size: 18px;
}
.price {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
.orl {
  color: #888;
  margin-left: 5px;
  font-size: 12px;
  text-decoration: line-through;
}
.amount {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
  margin: 0 -10px;
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.in {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  margin: 0 -10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.tag {
  border-radius: 5px;
  margin-left: 5px;
}
.shop {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.shop-collect-o {
  font-size: 16px;
  margin-right: 5px;
}
.arrow {
  display: flex;
  align-items: center;
}
.arrows {
  margin-left: 5px;
}
.goods {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  margin: 0 -10px;
  margin-top: 15px;
}
.index {
  z-index: 99;
}
</style>