<template>
  <div>
    <van-nav-bar title="编辑地址" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <van-address-edit
      :area-list="area"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import area from "../../area";
export default {
  name: "",
  props: {},
  data() {
    return {
      area: area
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push("/address");
    },
    onSave() {
      this.$api
        .address({
          // name: this.content.name,
          // tel: this.content.tel,
          // address: this.content.address,
          // isDefault: this.content.isDefault,
          // province: this.content.province,
          // city: this.content.city,
          // county: this.content.county,
          // addressDetail: this.content.addressDetail,
          // areaCode: this.content.areaCode,
          // id: this.content.id
        })
        .then(res => {
          console.log(res);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDelete() {
      Toast("delete");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>