<template>
  <div class="reply-item">
    <a href="#" class="reply-face">
      <img :src="Vreplylist.xyuserinfo.userphoto" alt>
    </a>
    <div class="reply-con">
      <div class="user">
        <a href="#" class="name">{{Vreplylist.xyuser.username}}</a>
        <a href="#">
          <i class="level" :class="levon"></i>
        </a>
        <span class="text-con">{{Vreplylist.vrcontent}}</span>
      </div>
      <div class="info">
        <span class="time">{{Vreplylist.time}}</span>
        <!-- <span class="like">
                <i></i>
                <span>10</span>
        </span>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoreply",
  props: ["replylist"],
  data() {
    return {
      Vreplylist: this.replylist
    };
  },
  computed: {
    levon() {
      return `i${this.Vreplylist.xyuser.gradeid}`;
    }
  }
};
</script>

<style scoped lang="scss">
.reply-item {
  padding: 10px 0px;
  .reply-face {
    float: left;
    margin: 5px 0;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  .reply-con {
    margin-left: 34px;
    .user {
      & > a {
        position: relative;
        top: -2px;
        i {
          &.level {
            margin: 0 15px 0 8px;
          }
        }
      }
    }
  }
}
</style>