<template>
  <div class="dv">
    <div>
      <tops></tops>
    </div>
    <div>
      <Rotation></Rotation>
    </div>
    <div class="category">
      <Category></Category>
    </div>
    <img :src="obj.PICTURE_ADDRESS">
    <div>
      <Recommend></Recommend>
    </div>
    <div>
      <floor></floor>
    </div>
  </div>
</template>

<script>
import Tops from "../components/home/Tops";
import Rotation from "../components/home/Rotation";
import Category from "../components/home/Category";
import Recommend from "../components/home/Recommend";
import Floor from "../components/home/Floor";
export default {
  name: "",
  props: {},
  data() {
    return {
      obj: {}
    };
  },
  components: {
    Tops,
    Rotation,
    Category,
    Recommend,
    Floor,
  },
  methods: {},
  mounted() {
    this.$api
      .recommend()
      .then(res => {
        this.$store.commit("setSlides", res.data.slides);
        this.$store.commit("setCategory", res.data.category);
        this.obj = res.data.advertesPicture
        this.$store.commit("setRecommend", res.data.recommend);
        this.$store.commit("setFloor1", res.data.floor1);
        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {
    slides() {
      return this.$store.state.slides;
    },
    category() {
      return this.$store.state.category;
    },
    recommend() {
      return this.$store.state.recommend;
    },
    floor1() {
      return this.$store.state.floor1;
    },
  }
};
</script>

<style scoped lang='scss'>
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
