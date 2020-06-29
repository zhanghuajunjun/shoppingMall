<template>
  <div>
    <div v-for="(item,index) in list" :key="index">
      <div class="item" v-html="item.name"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
  },
  mounted() {
    this.list.map(item => {
        let replaceReg = new RegExp(this.value, 'g')
        let replaceString = '<span class="highlights-text">' + this.value + '</span>' 
        item.name = item.name.replace(replaceReg, replaceString)
        console.log(item)
      })
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.item {
  font-size: 15px;
  padding: 15px;
  border: 1px solid #eeeeee;
}
</style>