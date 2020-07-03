<template>
  <div>
    <div class="commodity">商品推荐</div>
    <van-swipe :width="135" :loop="false" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in recommend" :key="index">
        <div class="img">
          <img :src="item.image" />
          <div class="goodsname">{{item.goodsName}}</div>
          <div>
            <span>￥{{item.price}}</span>
            <span class="mall">￥{{item.mallPrice}}</span>
          </div>
          <div class="cart">
            <div class="shopping-cart-o">
              <van-icon name="shopping-cart-o" @click="addShop(index)" />
            </div>
            <div class="details" @click="goDetail(index)">查看详情</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    recommend: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      username: ""
    };
  },
  components: {},
  methods: {
    goDetail(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.recommend[index].goodsId }
      });
      this.$utils.goDetail(this.recommend[index]);
    },
    addShop(index) {
      this.username = localStorage.getItem("username");
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
            id: this.recommend[index].goodsId
          })
          .then(res => {
            this.$toast.success("加入购物车成功");
          })
          .catch(err => {});
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.commodity {
  background: white;
  padding: 10px 20px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
img {
  width: 100%;
}
.img {
  background: white;
  padding-left: 10px;
  margin-left: 1px;
}
.img :first-child {
  margin-left: 0px;
}
.goodsname {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mall {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  margin-left: 10px;
}
.cart {
  display: flex;
 margin: 10px 0 10px 10px;
}
.shopping-cart-o {
  background: #feca3a;
  padding: 5px;
  border-radius: 5px 0 0 5px;
}
.details {
  background: #ff4c38;
  padding: 5px;
  border-radius: 0 5px 5px 0;
}
</style>