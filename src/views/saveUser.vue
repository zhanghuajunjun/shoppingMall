<template>
  <div>
    <van-nav-bar title="个人资料" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <div class="github">编辑个人资料</div>
    <div class="avatar">
      <div class="toux">头像</div>
      <div class="flex-a-c">
        <img :src="userInfos.avatar" alt />
        <van-uploader multiple :max-count="1" :max-size="3 * 1024 * 1024" :before-read="beforeRead">
          <van-icon name="arrow" />
        </van-uploader>
      </div>
    </div>
    <van-field v-model="username" label="用户名" />
    <van-field v-model="nickname" label="昵称" />
    <van-field v-model="gender" label="性别" />
    <van-field v-model="email" type="email" label="邮箱" placeholder="请输入邮箱" />
    <van-field v-model="borth" label="出生年月" />
    <div class="btn">
      <van-button type="primary" size="large" class="save" @click="save">保存</van-button>
      <van-button type="default" size="large" @click="beforeClose">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      head: "",
      email: "",
      borth: "",
      gender: "",
      _id: "",
      nickname: "",
      username: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push("/self");
    },
    save() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您已修改完成，是否保存？"
        })
        .then(() => {
          this.$api
            .saveUser({
              gender: this.gender,
              year: this.userInfos.year,
              month: this.userInfos.month,
              day: this.userInfos.day,
              id: this.userInfos_id,
              nickname: this.nickname,
              email: this.email
            })
            .then(res => {
              if (res.code === 200) {
                this.$toast.success("更改成功");
              } else if (res.code === -1) {
                this.$toast.fail("用户名已存在");
              }
              console.log(res);
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" || file.size !== "3 * 1024 * 1024") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    beforeClose() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您正在修改你的个人资料，是否确认取消"
        })
        .then(() => {
          this.$router.push("/self");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.borth = `${this.userInfos.year}年${this.userInfos.month}月${this.userInfos.day}日`;
    this.username = this.userInfos.username;
    this.nickname = this.userInfos.nickname;
    this.gender = this.userInfos.gender;
  },
  watch: {},
  computed: {
    userInfos() {
      return this.$store.state.userInfos;
    }
  }
};
</script>

<style scoped lang='scss'>
.nav-bar {
  border-bottom: 1px solid #eeeeee;
}
.github {
  padding: 15px 0 15px 20px;
  border-bottom: 1px solid #eeeeee;
}
.save {
  margin: 10px 0;
}
.btn {
  padding: 10px;
}
.toux {
  font-size: 14px;
  color: #323233;
}
.avatar {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
img {
  width: 50px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>