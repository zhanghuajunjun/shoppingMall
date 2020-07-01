<template>
  <div>
    <van-nav-bar title="订单结算" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <div v-if="this.defaultAdd === null" class="defaultAdd_null">
      <div>您还没有设置默认收货地址，</div>
      <div>
        请设置
        <span class="default" @click="setDefa">默收货地址</span>
      </div>
      <div class="caitiao">
        <img src="../../项目资料/可能要用的图片/caitiao.jpg" width="100%" />
      </div>
    </div>
    <div v-else class="addre">
      <div class="flex-j-sb">
        <van-icon name="location-o" class="location" />
        <div class="all">
          <div class="flex-j-sb">
            <span>收货人：{{defaultAdd.name}}</span>
            <span>{{defaultAdd.tel}}</span>
          </div>
          <div class="address">收货地址：{{defaultAdd.address}}</div>
          <div class="Inconvenience">(收货不便时，可选择免费待收货服务)</div>
        </div>
        <van-icon name="arrow" class="location" @click="arrow" />
      </div>
      <div class="caitiao">
        <img src="../../项目资料/可能要用的图片/caitiao.jpg" width="100%" />
      </div>
      <div v-if="flag==='1'">
        <div v-for="(item,index) in shopList" :key="index" class="d-flex">
          <img :src="item.image_path" class="img" />
          <div class="item">
            <div class="name">{{item.name}}</div>
            <div class="flex-j-sb">
              <div class="price">￥{{item.present_price}}</div>
              <div class="count">X{{item.count}}</div>
            </div>
          </div>
        </div>
        <div>
          <van-submit-bar :price="this.total*100" button-text="提交订单" @submit="onSubmit" />
        </div>
      </div>
      <div v-else class="d-flex">
        <img :src="this.goodsOne.image_path" class="img" />
        <div class="item">
          <div class="name">{{this.goodsOne.name}}</div>
          <div class="flex-j-sb">
            <div class="price">￥{{this.goodsOne.present_price}}</div>
            <div class="count">X{{this.counts}}</div>
          </div>
        </div>
        <div>
          <van-submit-bar :price="totals*100" button-text="提交订单" @submit="onSubmit" />
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
      shopList: [],
      defaultAdd: {},
      arr: [],
      count: "",
      goodsOne: {},
      counts: "",
      flag: "",
      total: ""
    };
  },
  components: {},
  methods: {
    setDefa() {
      this.$router.push("/address");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    arrow() {
      this.$router.push("/address");
    },
    onSubmit() {
      if (this.flag === "1") {
        this.shopList.map(item => {
          this.arr.push(item.cid);
        });
        this.$api
          .order({
            address: this.defaultAdd.address,
            tel: this.defaultAdd.tel,
            orderId: this.arr,
            totalPrice: this.total,
            idDirect: false,
            count: this.count
          })
          .then(res => {
            console.log(res);
            this.$toast.success(res.msg);
            this.$router.push("/");
            localStorage.removeItem("cartlist");
            localStorage.removeItem("cartflag");
            localStorage.removeItem("carttotal");
          })
          .catch(err => {});
      } else {
        this.arr.push(this.goodsOne.id);
        this.$api
          .order({
            address: this.defaultAdd.address,
            tel: this.defaultAdd.tel,
            orderId: this.arr,
            totalPrice: this.totals,
            idDirect: true,
            count: this.counts
          })
          .then(res => {
            console.log(res);
            this.$toast.success(res.msg);
            this.$router.push("/");
            localStorage.removeItem("detailGoodsOne");
            localStorage.removeItem("detailcount");
          })
          .catch(err => {});
      }
    }
  },
  mounted() {
    // 从购物车结算
    this.shopList = JSON.parse(localStorage.getItem("cartlist"));
    this.flag = localStorage.getItem("cartflag");
    this.total = localStorage.getItem("carttotal");
    // 从详情页结算
    this.goodsOne = JSON.parse(localStorage.getItem("detailGoodsOne"));
    this.counts = localStorage.getItem("detailcount");
    // 查询是否默认地址
    this.$api
      .getDefaultAddress()
      .then(res => {
        this.defaultAdd = res.defaultAdd;
      })
      .catch(err => {});
  },
  watch: {},
  computed: {
    totals() {
      return this.goodsOne.present_price * this.counts;
    }
  }
};
</script>

<style scoped lang='scss'>
.defaultAdd_null {
  padding: 20px 10px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.default {
  text-decoration: underline;
  color: red;
}
.caitiao {
  margin: 0 -10px 10px -10px;
}
.location {
  font-size: 30px;
}
.flex-j-sb {
  align-items: center;
}
.addre {
  padding: 10px;
}
.all {
  width: 80%;
}
.address {
  font-size: 14px;
  margin-top: 10px;
}
.Inconvenience {
  font-size: 14px;
  margin-top: 5px;
  color: orange;
}
.img {
  width: 25%;
  border: 1px solid #eeeeee;
  margin-right: 10px;
}
.name {
  color: red;
  margin-bottom: 15px;
}
.item {
  width: 100%;
}
.price {
  color: red;
  font-size: 15px;
}
.count {
  font-size: 15px;
}
</style>