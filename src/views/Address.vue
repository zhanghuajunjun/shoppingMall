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
      chosenAddressId: "",
      obj: {}
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onEdit(item) {
      this.$router.push({name:'EidtAddress',query:{obj: JSON.stringify(item)}})
    },
    onAdd() {
      this.$router.push("/addaddress");
    }
  },
  mounted() {
    this.$api
      .getAddress()
      .then(res => {
        res.address.map((item, index) => {
          this.$set(item,'id',(index+1).toString())
        })
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