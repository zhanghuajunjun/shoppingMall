<template>
  <div class="container">
    <global-top>
      <div slot="back">
        <van-icon name="arrow-left" @click="$parent.flag=false" />
      </div>
      <div slot="title">个人资料</div>
    </global-top>
    <van-list>
      <van-cell>github</van-cell>
      <van-cell>
        <div class="avatar">
          <div class="avatar-title">头像</div>
          <div>
            <img :src="userInfo.avatar" alt />
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div>
          用户名
          <input type="text" :value="userInfo.username" disabled style="color:gray;" />
        </div>
      </van-cell>
      <van-cell>
        <div>
          昵称
          <input type="text" v-model="userInfo.nickname" placeholder="请输入昵称" />
        </div>
      </van-cell>
      <van-cell>
        <div>
          性别
          <div class="gender">
            <van-radio-group v-model="userInfo.gender">
          <van-radio name="男">男</van-radio><van-radio name="女">女</van-radio><van-radio name="保密">保密</van-radio>
        </van-radio-group>
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div>
          邮箱
          <input type="text" v-model="userInfo.email" placeholder="请输入邮箱" />
        </div>
      </van-cell>
      <van-cell>
        <div>出生年月</div>
        <div class="date" @click="flag=true">{{userInfo.year}}年{{userInfo.month}}月{{userInfo.day}}日</div>
      </van-cell>
    </van-list>
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
    <div class="btn-group">
      <van-button class="btn" type="primary" @click="saveUser">保存</van-button>
      <van-button class="btn" type="default" @click="$parent.flag=false">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      userInfo: {
        email: ""
      },
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: "",
      flag: false
    };
  },
  components: {},
  methods: {
    getuser() {
      this.$api.user().then(res => {
        if (res.code === 200) {
          this.userInfo = res.userInfo;
          this.currentDate = new Date(
            this.userInfo.year,
            this.userInfo.month - 1,
            this.userInfo.day
          );
        }
      });
    },
    confirm(val) {
      this.userInfo.year = this.$dayjs(val).format("YYYY");
      this.userInfo.month = this.$dayjs(val).format("MM");
      this.userInfo.day = this.$dayjs(val).format("DD");
      this.flag = false;
    },
    cancel() {
      this.flag = false;
    },
    saveUser() {
      let obj = {
        // saveUser 修改保存用户信息(gender,email,year,month,day,id,nickname,avatar)
        gender: this.userInfo.gender,
        email: this.userInfo.email,
        year: this.userInfo.year,
        month: this.userInfo.month,
        day: this.userInfo.day,
        id: this.userInfo._id,
        nickname: this.userInfo.nickname
      };
      this.$api.saveUser(obj).then(res => {
        if (res.code === 200) {
          this.$toast(res.msg);
          localStorage.setItem("nickname", this.userInfo.nickname);
          this.$store.state.nickname = this.userInfo.nickname;
        } else {
          this.$toast(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getuser();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 999;
}
.gender{
  display:inline-block;
}
/deep/ .van-radio-group{
  display: flex;
}
/deep/ .van-cell__value {
  padding: 0;
  display: flex;
  position: relative;
}
.avatar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .avatar-title {
    line-height: 50px;
  }
  img {
    height: 50px;
    border-radius: 50%;
  }
}
input,
.date,.gender {
  position: absolute;
  left: 60px;
  margin-left: 20px;
  background: none;
  outline: none;
  border: none;
}
.datetime-picker {
  border: none;
  z-index: 99;
  width: 100%;
  position: absolute;
  bottom: 8vh;
  overflow: hidden;
}
.btn-group {
  text-align: center;
  .btn {
    width: 80%;
    margin: 10px;
  }
}
</style>