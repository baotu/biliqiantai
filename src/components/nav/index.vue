<template>
  <nav id="nav">
    <div class="page-width clearfix border-b">
      <ul class="nav-list">
        <li class="item item-home">
          <router-link :to="{name:'indexBody'}" class="link">首页</router-link>
        </li>
        <template v-for="item in navlists.xyvideotype">
          <router-link tag="li" class="item" :to="{name:item.typeurl}" :key="item.typeid">
            <a class="link">
              <div class="num">
                <i>887</i>
              </div>
              {{item.typename}}
            </a>
            <!-- <ul class="nav-item__hover">
              <template v-for="(todo, i) in Naverlist">
                <li :key="i">
                  <a href="#">
                    <em>
                      {{todo.title}}
                      <i></i>
                    </em>
                  </a>
                </li>
              </template>
            </ul> -->
          </router-link>
        </template>
        <li class="item item-square">
          <a href="#" class="link">广场</a>
        </li>
        <li class="item item-live">
          <a href="#" class="link">直播</a>
        </li>
        <li class="item item-room">
          <a href="#" class="link">小黑屋</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Homepagenavigation",
  data() {
    return {
      navlists: [],
    };
  },
  mounted() {
    this.axios
      .get("http://111.230.247.223/SameBWeb/xyvideotype/findAll.do")
      .then(result => {
        this.navlists = result.data;
      });
  }
};
</script>

<style scoped lang="scss">
#nav {
  .page-width {
    &.border-b {
      border-bottom: 1px solid #e5e9ef;
    }
    .item {
      padding-top: 2px;
      &.on {
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: #00a1d6;
          bottom: -3px;
          left: 0;
        }
        a {
          color: #00a1d6;
        }
      }
    }
  }
}
</style>