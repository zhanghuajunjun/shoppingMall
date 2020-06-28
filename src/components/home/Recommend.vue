<template>
  <div class="content">
    <div class="recommend">
      <div class="commodity">商品推荐</div>
      <van-swipe :width="125" :loop="false" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in recommend" :key="index">
          <div class="img">
            <img :src="item.image" />
            <div class="goodsname">{{item.goodsName}}</div>
            <div>
              <span>￥{{item.price}}</span>
              <span class="mall">￥{{item.mallPrice}}</span>
            </div>
            <div class="cart">
              <div class="check">
                <span class="shopping-cart-o">
                  <van-icon name="shopping-cart-o" color="#ffffff" @click="addShop(index)" />
                </span>
                <span class="details" @click="Details(index)">查看详情</span>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
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
      username: ''
    };
  },
  components: {},
  methods: {
    Details(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.recommend[index].goodsId }
      });
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
  padding: 10px 10px 10px 0;
}
.shopping-cart-o {
  background: #feca3a;
  padding: 5px;
  border-radius: 5px 0 0 5px;
}
.details {
  font-weight: 600px;
  color: #ffffff;
  background: #ff4c38;
  padding: 5px;
  border-radius: 0 5px 5px 0;
}
</style>