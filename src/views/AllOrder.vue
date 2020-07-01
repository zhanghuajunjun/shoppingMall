<template>
  <div class="box">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" class="dddd" />
    <div class="side"></div>
    <div v-if="flag===true">
      <div class="daohang">
        <div class="daoh">全部</div>
        <div class="daoh">待支付</div>
        <div class="daoh">代发货</div>
        <div class="daoh">代收货</div>
        <div class="daoha">已完成</div>
      </div>
      <div class="side1"></div>
    </div>
    <div class="box-item">
      <div v-if="list.length < 1">
        <img src="../../项目资料/可能要用的图片/loading.gif" class="elseimg" />
        <div class="null">你还没有已完成的订单</div>
        <div @click="browse" class="browse">快去看看吧</div>
      </div>
      <div v-else v-for="(item,index) in list" :key="index">
        <el-card class="card">
          <div class="orderid">
            <div>订单编号：{{item.order_id}}</div>
            <div v-if="item.status===4" class="status">交易已完成</div>
            <div v-else class="status">交易未完成</div>
          </div>
          <div class="shopdeta">
            <div v-for="(item1,index1) in item.order_list" :key="index1">
              <div class="d-flex">
                <img :src="item1.image_path" alt class="img" />
                <div class="name">{{item1.name}}</div>
                <div class="count">
                  <div>￥{{item1.present_price}}</div>
                  <div class="counts">x {{item1.count}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="f-end">创建时间：{{item.add_time}}</div>
          <div class="f-end marg-tobo">收货地址：{{item.address}}</div>
          <div class="f-end">共 {{item.order_list.length}} 件商品 合计：{{item.mallPrice}}元</div>
        </el-card>
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
      list: [],
      flag: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    browse() {
      this.$router.push("/");
    }
  },
  mounted() {
    this.flag = this.$route.query.flag;
    this.$api
      .getMyOrder()
      .then(res => {
        this.list = res.list;
      })
      .catch(err => {});
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  background: #f2f2f2;
  width: 100%;
}
.dddd {
  position: fixed;
  width: 100%;
  z-index: 3;
}
.side {
  height: 46px;
}
.card {
  margin-top: 10px;
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
.orderid {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin: -10px -10px 0px -10px;
  border-bottom: 1px solid #eeeeee;
  font-size: 15px;
}
.box-item {
  padding: 10px;
}
.status {
  color: red;
}
.img {
  width: 25%;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.d-flex {
  margin-top: 10px;
  justify-content: space-between;
}
.count {
  font-size: 14px;
  width: 15%;
  text-align: center;
}
.name {
  width: 55%;
  font-size: 14px;
}
.counts {
  color: #999;
}
.shopdeta {
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
}
.f-end {
  font-size: 15px;
  display: flex;
  justify-content: flex-end;
}
.daohang {
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  background: white;
  position: fixed;
  top: 46px;
  width: 90%;
}
.side1 {
  height: 42px;
}
.daoh {
  padding: 10px 0;
}
.daoha {
  padding: 10px 0;
  border-bottom: 2px solid red;
}
</style>