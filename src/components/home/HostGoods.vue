<template>
  <div>
    <div class="host">热销商品</div>
    <div class="flex-j-sb">
      <div v-for="(item,index) in hostGoods" :key="index" class="hostgoods">
        <img :src="item.image"  @click="Details(index)"/>
        <div class="goodsname">{{item.name}}</div>
        <div class="introduce">
          <span>￥{{item.price}}</span>
          <span class="mall">￥{{item.mallPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    hostGoods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: ''
    };
  },
  components: {},
  methods: {
    Details(index) {
      this.$router.push({
        path: "/details",
        query: { id: this.hostGoods[index].goodsId }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.host {
  color: red;
  width: 100%;
  text-align: center;
  padding: 20px 0 18px 0;
}
.flex-j-sb {
  flex-wrap: wrap;
}
.hostgoods {
  width: 47%;
  padding: 5px;
  background: white;
  margin-top: 2px;
}
img {
  width: 100%;
}
.goodsname {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.introduce {
  text-align: center;
  font-size: 14px;
}
.mall {
  text-decoration: line-through;
  color: red;
  font-size: 12px;
  margin-left: 10px;
}
</style>