<template>
  <div>
    <div v-for="(item,index) in floor1" :key="index">
      <img :src="item.image">
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
  },
  watch: {},
  computed: {
    floor1() {
      return this.$store.state.floor1;
    }
  }
};
</script>

<style scoped lang='scss'>
img {
  width: 50%;
}
</style>