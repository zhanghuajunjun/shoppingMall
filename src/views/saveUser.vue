<template>
  <div>
    <van-nav-bar title="个人资料" left-text left-arrow @click-left="onClickLeft" class="nav-bar" />
    <div class="github">编辑个人资料</div>
    <div class="avatar">
      <div class="toux">头像</div>
      <div class="flex-a-c">
        <img :src="userInfos.avatar" alt />
        <van-uploader multiple :max-count="1" :before-read="beforeRead" :after-read="afterRead">
          <van-icon name="arrow" />
        </van-uploader>
      </div>
    </div>
    <van-field v-model="username" label="用户名" />
    <van-field v-model="nickname" label="昵称" />
    <van-cell>
      <div class="d-flex">
        性别
        <van-radio-group v-model="gender" class="sex">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
          <van-radio name="保密">保密</van-radio>
        </van-radio-group>
      </div>
    </van-cell>
    <van-field v-model="email" type="email" label="邮箱" placeholder="请输入邮箱" />
    <van-cell>
      <div class="d-flex">
        <div>出生年月</div>
        <div class="date" @click="flag=true">{{this.year}}年{{this.month}}月{{this.day}}日</div>
      </div>
    </van-cell>
    <div class="datetime-picker">
      <van-datetime-picker
        v-show="flag"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </div>
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
      gender: "",
      _id: "",
      nickname: "",
      username: "",
      year: "",
      month: "",
      day: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: "",
      flag: false
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    confirm(val) {
      this.year = this.$dayjs(val).format("YYYY");
      this.month = this.$dayjs(val).format("MM");
      this.day = this.$dayjs(val).format("DD");
      this.flag = false;
    },
    cancel() {
      this.flag = false;
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
              year: this.year,
              month: this.month,
              day: this.day,
              id: this.userInfos_id,
              nickname: this.nickname,
              email: this.email
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$toast(res.msg);
                localStorage.setItem("user", res.user);
              } else {
                this.$toast.fail(res.msg);
              }
              
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" ) {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
     afterRead(file) {
      localStorage.setItem('avatar',file.content)
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
    this.username = this.userInfos.username;
    this.nickname = this.userInfos.nickname;
    this.gender = this.userInfos.gender;
    this.year = this.userInfos.year;
    this.month = this.userInfos.month;
    this.day = this.userInfos.day;
    this.currentDate = new Date(
      this.year,
      this.month - 1,
      this.day
    );
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
.sex {
  margin-left: 60px;
  display: flex;
}
.date {
  margin-left: 35px;
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