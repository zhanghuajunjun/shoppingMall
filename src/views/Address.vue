<template>
  <div>
    <van-nav-bar title="地址列表" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <div v-if="list.length <= 0">
      <div class="null">暂无收货地址~~</div>
      <van-address-list @add="onAdd"/>
    </div>

    <div v-else>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
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
      chosenAddressId: "1"
      // list: [
      //   {
      //     id: '1',
      //     name: '张三',
      //     tel: '13000000000',
      //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //     isDefault: true,
      //   },
      //   {
      //     id: '2',
      //     name: '李四',
      //     tel: '1310000000',
      //     address: '浙江省杭州市拱墅区莫干山路 50 号',
      //   },
      // ],
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push("/self");
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onAdd() {
      this.$router.push("/addaddress");
    }
  },
  mounted() {
    this.$api
      .getAddress()
      .then(res => {
        this.list = res.address;
        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.null {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: #232233;
}
</style>