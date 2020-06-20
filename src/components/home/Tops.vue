<template>
  <div class="top">
    <div class="local">
      <div>{{city}}成都市</div>
      <i class="el-icon-caret-bottom" @click="cityli"></i>
    </div>
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        class="backg"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      city: "",
      value: ""
    };
  },
  components: {},
  methods: {
    onSearch(val) {
      Toast("val");
    },
    cityli() {
      this.$router.push('/city')
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
.search {
  padding: 10px 10px 10px -10px;
}
.top {
  display: flex;
  background: #f2f2f2;
}
.backg {
  background: #f2f2f2;
}
.el-icon-caret-bottom {
  margin-left: 10px;
}
</style>