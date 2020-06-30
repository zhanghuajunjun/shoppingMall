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
      <div v-if="this.username === null">
        <div @click="Collection">
          收藏
          <van-icon name="like-o" />
        </div>
      </div>
      <div v-else-if="flag===false && this.isCollection === 0">
        <div @click="Collection">
          收藏
          <van-icon name="like-o" />
        </div>
      </div>
      <div v-else>
        <div @click="cancelCollection">
          取消收藏
          <van-icon name="like" class="cancel" />
        </div>
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
        <van-tab title="商品详情">
          <div v-html="goodsOne.detail"></div>
        </van-tab>
        <van-tab title="商品评价"></van-tab>
      </van-tabs>
    </div>
    <div class="zw"></div>
    <van-goods-action class="index">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="length" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addShops" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
    <van-action-sheet v-model="show" round>
      <div class="content">
        <div class="flex-j-sb">
          <div class="d-flex">
            <img :src="goodsOne.image" class="img" />
            <div class="f-dir-jc">
              <div class="buygoods">{{goodsOne.name}}</div>
              <div class="more">剩余：{{goodsOne.amount}}</div>
              <div class="price">￥{{goodsOne.present_price}}.00</div>
            </div>
          </div>
          <van-icon name="close" class="close" @click="close" />
        </div>
        <div class="buycount">
          <div>购买数量：</div>
          <div class="Quota">
            每人限购50件
            <van-stepper
              v-model="value"
              theme="round"
              button-size="22"
              max="50"
              disable-input
              class="stepper"
            />
          </div>
        </div>
        <van-button type="danger" size="large" class="van-btn" @click="buyShop">立即购买</van-button>
      </div>
    </van-action-sheet>
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
      goods: {},
      active: 0,
      show: false,
      round: false,
      value: 1,
      length: "",
      username: "",
      isCollection: "",
      id: "",
      flag: false,
      flags: 0
    };
  },
  components: {},
  methods: {
    // 返回
    goTo() {
      this.$router.go(-1);
    },
    // 点击立即购买弹框
    buy() {
      this.show = true;
    },
    // 关闭弹框
    close() {
      this.show = false;
    },
    // 点击购物车图标进入购物车
    goCart() {
      this.$router.push("/shoppingCart");
    },
    // 点击收藏
    Collection() {
      if (this.username === null) {
        this.$dialog
          .confirm({
            message: "您还没有登录，是否要登录？"
          })
          .then(res => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$api
          .collection(this.goodsOne)
          .then(res => {
            console.log(res);
            this.$toast.success("收藏成功");
            this.flag = true;
            this.$utils.Collection(this.goodsOne)
          })
          .catch(err => {});
      }
    },
    // 点击取消收藏
    cancelCollection() {
      this.$api
        .cancelCollection(this.id)
        .then(res => {
          this.$toast.success("取消成功");
          this.flag = false;
          this.$api
            .isCollection(this.goodsId)
            .then(res => {
              console.log(res);
              this.isCollection = res.isCollection;
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    addShops() {
      if (this.username === null) {
        this.$dialog
          .confirm({
            message: "您还没有登录，是否要登录？"
          })
          .then(res => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$api
          .addShop({
            id: this.goodsOne.id
          })
          .then(res => {
            this.$toast.success("加入购物车成功");
          })
          .catch(err => {});
      }
    },

    buyShop() {
      this.$router.push({
        path: "/settlement",
        query: { goodsOne: this.goodsOne, count: this.value, flags: this.flags }
      });
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.length = localStorage.getItem("length");
    this.goodsId = this.$route.query.id;
    this.$api
      .goods(this.goodsId)
      .then(res => {
        console.log(res);
        this.goods = res.goods;
        this.goodsOne = res.goods.goodsOne;
        this.id = res.goods.goodsOne.id;
      })
      .catch(err => {});
    this.$api
      .isCollection(this.goodsId)
      .then(res => {
        this.isCollection = res.isCollection;
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
/deep/.van-tabs__content {
  padding-top: 10px;
}
.zw {
  height: 50px;
  margin-bottom: -10px;
}
// .index {
//   z-index: 99;
// }
/deep/img {
  margin-bottom: -5px;
}
.img {
  width: 25%;
  margin-right: 15px;
  border: 1px solid #eeeeee;
}
.close {
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
}
.buygoods {
  font-size: 15px;
  margin-bottom: 10px;
}
.flex-j-sb {
  padding: 0 15px;
  margin: 20px 0;
}
.more {
  font-size: 12px;
  color: #999;
}
.buycount {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  padding: 20px 20px 20px 10px;
  display: flex;
  justify-content: space-between;
}
.Quota {
  color: red;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.stepper {
  margin-left: 20px;
}
.van-btn {
  margin-top: 30px;
}
.cancel {
  color: red;
}
</style>