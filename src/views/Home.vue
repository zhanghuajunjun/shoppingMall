<template>
  <div class="dv">
    <div class="top">
      <div class="tops">
        <tops></tops>
      </div>
      <div class="search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @focus="onFocus"
          @search="onSearch"
          class="backg"
        >
          <template #action>
            <div v-if="flag===false">搜索</div>
            <div v-else-if="flag===true" @click="onCancel">取消</div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="zhanwei"></div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="content" v-if="flag===false">
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
        <div class="zhanwei1"></div>
      </div>
      <div v-else-if="flag===true">
        <Search v-if="list.length > 0" :list="list" :value="value"></Search>
        <div class="side"></div>
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
import Search from "../components/home/Search";

export default {
  name: "",
  props: {},
  data() {
    return {
      isLoading: false,
      flag: false,
      value: "",
      obj: {},
      slides: [],
      category: [],
      recommend: [],
      floorName: {},
      floor1: [],
      floor2: [],
      floor3: [],
      hostGoods: [],
      list: []
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
    HostGoods,
    Search
  },
  methods: {
    onFocus() {
      this.flag = true;
    },
    onSearch(value) {
      this.$api
        .search(this.value)
        .then(res => {
          res.data.list.map(item => {
            this.$set(item,"searchName",item.name);
          });
          this.list = res.data.list;
          console.log(this.list);
        })
        .catch(err => {});
    },
    onCancel() {
      this.flag = false;
    },
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
        this.obj = res.data.advertesPicture;
        this.recommend = res.data.recommend;
        this.floorName = res.data.floorName;
        this.floor1 = res.data.floor1;
        this.floor2 = res.data.floor2;
        this.floor3 = res.data.floor3;
        this.hostGoods = res.data.hotGoods;
        this.category = res.data.category;
        localStorage.setItem("category", JSON.stringify(this.category));
        console.log(res);
      })
      .catch(err => {});
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  position: fixed;
  z-index: 999;
  display: flex;
  width: 100%;
  background: #f2f2f2;
}
.tops {
  width: 30%;
  display: flex;
  align-items: center;
}
.zhanwei {
  height: 60px;
}
.dv {
  background: #f2f2f2;
}
.content {
  background: #f2f2f2;
}
.category {
  padding: 15px 10px;
}
img {
  width: 100%;
  margin-bottom: 20px;
}
.zhanwei1 {
  height: 50px;
}
.backg {
  background: #f2f2f2;
}
.search {
  width: 70%;
}
.side {
  height: 50px;
  background: #ffffff;
}
</style>
