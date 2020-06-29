<template>
  <div class="local">
    <div>{{city}}成都市</div>
    <i class="el-icon-caret-bottom" @click="cityli"></i>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      city: ""
    };
  },
  components: {},
  methods: {
    cityli() {
      this.$router.push("/city");
    }
  },
  mounted() {
    // let _this = this;
    // AMap.plugin("AMap.Geolocation", function() {
    //   var geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     buttonOffset: new AMap.Pixel(10, 20),
    //     zoomToAccuracy: true,
    //     buttonPosition: "RB"
    //   });
    //   geolocation.getCurrentPosition();
    //   AMap.event.addListener(geolocation, "complete", onComplete);
    //   AMap.event.addListener(geolocation, "error", onError);
    //   function onComplete(data) {
    //     _this.city = data.addressComponent.city;
    //     _this.$store.commit('setCitya',data.addressComponent.city)
    //     console.log(data);
    //   }
    //   function onError(data) {}
    // });
  },
  watch: {},
  computed: {
    citya() {
      return this.$store.state.citya;
    }
  }
};
</script>

<style scoped lang='scss'>
.local {
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
}
.el-icon-caret-bottom {
  margin-left: 10px;
}
</style>