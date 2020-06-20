<template>
  <div class="dv">
    <div class="tops">
      <tops></tops>
    </div>
    <div class="zhanwei"></div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div>
        <Rotation :slides="slides"></Rotation>
      </div>
      <div class="category">
        <Category :category="category"></Category>
      </div>
      <img :src="obj.PICTURE_ADDRESS" />
      <div>
        <Recommend :recommend="recommend"></Recommend>
      </div>
      <div>
        <floor-one :floor1="floor1" :floorName="floorName.floor1" v-if="floorName"></floor-one>
      </div>
      <div>
        <floor-two :floor2="floor2" :floorName="floorName.floor2" v-if="floorName"></floor-two>
      </div>
      <div>
        <floor-three :floor3="floor3" :floorName="floorName.floor3" v-if="floorName"></floor-three>
      </div>
      <div>
        <host-goods :hostGoods="hostGoods"></host-goods>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Tops from "../components/home/Tops";
import Rotation from "../components/home/Rotation";
import Category from "../components/home/Category";
import Recommend from "../components/home/Recommend";
import FloorOne from "../components/home/FloorOne";
import FloorTwo from "../components/home/FloorTwo";
import FloorThree from "../components/home/FloorThree";
import HostGoods from "../components/home/HostGoods";
export default {
  name: "",
  props: {},
  data() {
    return {
      isLoading: false,
      obj: {},
      slides: [],
      category: [],
      recommend: [],
      floorName: {},
      floor1: [],
      floor2: [],
      floor3: [],
      hostGoods: []
    };
  },
  components: {
    Tops,
    Rotation,
    Category,
    Recommend,
    FloorOne,
    FloorTwo,
    FloorThree,
    HostGoods
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    }
  },
  mounted() {
    this.$api
      .recommend()
      .then(res => {
        this.slides = res.data.slides;
        this.category = res.data.category;
        this.obj = res.data.advertesPicture;
        this.recommend = res.data.recommend;
        this.floorName = res.data.floorName;
        this.floor1 = res.data.floor1;
        this.floor2 = res.data.floor2;
        this.floor3 = res.data.floor3;
        this.hostGoods = res.data.hotGoods;
        this.$store.commit("setCategorys", res.data.category);

        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {
    categorys() {
      return this.$store.state.categorys;
    }
  }
};
</script>

<style scoped lang='scss'>
.tops {
  position: fixed;
  z-index: 999;
}
.zhanwei {
  height: 60px;
}
.dv {
  background: #f2f2f2;
}
.category {
  padding: 15px 10px;
}
img {
  width: 100%;
  margin-bottom: 20px;
}
</style>
