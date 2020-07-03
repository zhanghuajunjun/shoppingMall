<template>
  <div class="local">
    <div v-if="cityName===null || cityName===''">
      <div>{{city}}</div>
    </div>
    <div v-else>
      <div>{{cityName}}</div>
      <div class="flex-j-sb" v-if="flag===false && city!==''">
        <div>
          <van-icon name="location-o" />
          定位显示您在"{{city}}"
        </div>
        <div>
          <van-button type="primary" size="small" @click="changeCity" class="btn">切换到{{city}}</van-button>
          <van-icon name="cross" @click="cancel" />
        </div>
      </div>
    </div>
    <i class="el-icon-caret-bottom" @click="cityli"></i>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      city: "",
      cityName: "",
      flag: false
    };
  },
  components: {},
  methods: {
    cityli() {
      this.$router.push("/city");
    },
    changeCity() {
      let names = "";
      localStorage.setItem("cityName", names);
      this.cityName = localStorage.getItem("cityName");
      this.flag = true;
    },
    cancel() {
      this.flag = true;
    }
  },
  mounted() {
    let _this = this;
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
        buttonPosition: "RB"
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);
      function onComplete(data) {
        _this.city = data.addressComponent.city;
        _this.$store.commit("setCitya", data.addressComponent.city);
      }
      function onError(data) {}
    });
    this.cityName = localStorage.getItem("cityName");
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
.flex-j-sb {
  width: 93%;
  border-radius: 5px;
  background: rgba(75, 59, 1, 0.6);
  position: fixed;
  top: 60px;
  padding: 10px 0;
  font-size: 14px;
  align-items: center;
  color: #ffffff;
}
.btn {
  margin-right: 10px;
}
</style>