<template>
  <div>
    <van-nav-bar title="我的评价" left-arrow @click-left="onClickLeft" class="dddd" />
    <div class="side"></div>
    <div v-if="flag">
      <div class="img">
        <img src="../../项目资料/可能要用的图片/evaluate.jpg" alt class="img" />
      </div>
      <div class="padd-lrs">
        <el-card>
          <van-tabs v-model="active">
            <van-tab title="待评价"></van-tab>
            <van-tab title="已评价"></van-tab>
          </van-tabs>
        </el-card>
      </div>
      <div class="paddten" v-if="this.active===0">
        <div v-for="(item,index) in tobeList" :key="index" class="d-flex">
          <img :src="item.image_path" alt class="item-img" />
          <div class="item">
            <div class="name">{{item.name}}</div>
            <van-tag round plain type="danger" size="medium" class="tag" @click="evaluate(item)">
              <van-icon name="chat-o" class="icon" />评论晒单
            </van-tag>
          </div>
        </div>
      </div>
      <div class="paddten" v-else>
        <div v-for="(item,index) in alreadyList" :key="index">
          <div v-for="item1 in item.goods" :key="item1.id" class="d-flex">
            <img :src="item1.image_path" alt class="item-img" />
            <div class="item">
              <div class="name">{{item1.name}}</div>
              <van-tag
                round
                plain
                type="danger"
                size="medium"
                class="tag"
                @click="detailEva(item,item1)"
              >
                <van-icon name="chat-o" class="icon" />评论详情
              </van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="else d-flex">
        <img :src="obj.image_path" alt class="obj-img" />
        <div class="f-dir-jc">
          <div>商品评分</div>
          <van-rate
            class="star"
            v-model="star"
            void-icon="star"
            :size="20"
            color="#ee0a24"
            void-color="#eee"
          />
        </div>
      </div>
      <div class="msg">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="说说你的感受吧~~~"
          show-word-limit
        />
      </div>
      <div class="paddten">
        <van-checkbox v-model="checked">匿名评价</van-checkbox>
      </div>
      <div class="paddten">
        <van-button type="primary" size="large" @click="Submit">提交</van-button>
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
      active: 0,
      tobeList: [],
      alreadyList: [],
      flag: true,
      checked: false,
      message: "",
      obj: {},
      star: 0
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    evaluate(item) {
      this.flag = false;
      this.obj = item;
    },
    detailEva(item, item1) {
      this.$router.push({
        path: "/detailEva",
        query: { detailEva: item, goodsdeta: item1 }
      });
    },
    Submit() {
      this.$api
        .goodsOne({
          id: this.obj.cid,
          rate: this.star,
          content: this.message,
          anonymous: this.checked,
          _id: this.obj._id,
          order_id: this.obj.order_id,
          image: []
        })
        .then(res => {
          this.$toast.success("提交评价成功");
          this.flag = true;
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.$api
      .tobeEvaluated()
      .then(res => {
        this.tobeList = res.data.list;
      })
      .catch(err => {});
    this.$api
      .alreadyEvaluated()
      .then(res => {
        this.alreadyList = res.data.list;
        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {}
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
  width: 100%;
}
/deep/.el-card__body {
  padding: 0;
}
.padd-lrs {
  margin-top: -25px;
}
.item-img {
  width: 20%;
  margin-right: 10px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.name {
  font-size: 14px;
}
.d-flex {
  margin-top: 10px;
  border-bottom: 1px solid #eeeeee;
}
.icon {
  margin-right: 5px;
}
.tag {
  position: absolute;
  right: 0;
  bottom: 5px;
}
.item {
  position: relative;
  width: 100%;
}
.obj-img {
  width: 25%;
  margin-right: 20px;
}
.else {
  padding: 0 10px 10px 10px;
}
.star {
  margin-top: 20px;
}
.msg {
  border-bottom: 1px solid #eeeeee;
}
</style>
