<template>
  <div>
    <van-nav-bar title="编辑地址" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <van-address-edit
      :area-list="area"
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
  name: "AddAddress",
  props: {},
  data() {
    return {
      area: area
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      this.content = this.content;
      this.$api
        .address({
          name: content.name,
          tel: content.tel,
          address: `${content.province}${content.city}${content.county}${content.addressDetail}`,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode
        })
        .then(res => {
          this.$router.push("/address");
        })
        .catch(err => {});
    },
    onDelete() {
      this.$router.push("/address");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>