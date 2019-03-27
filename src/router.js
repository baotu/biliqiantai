import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import User from './views/user.vue'
import Animation from './views/SecondaryViews/Animation.vue'
import Bangumi from './views/SecondaryViews/Bangumi.vue'
import China from './views/SecondaryViews/China.vue'
import Music from './views/SecondaryViews/Music.vue'
import Dance from './views/SecondaryViews/Dance.vue'
import Game from './views/SecondaryViews/Game.vue'
import Technology from './views/SecondaryViews/Technology.vue'
import Movie from './views/SecondaryViews/Movie.vue'
import Life from './views/SecondaryViews/Life.vue'
import Guichu from './views/SecondaryViews/Guichu.vue'
import Fasion from './views/SecondaryViews/Fasion.vue'
import Yule from './views/SecondaryViews/Yule.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'on',
  nkExactActiveClass: ' ',
  routes: [{
      path: '/',
      component: Home,
      meta: {
        title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
      },
      children: [{
          // 首页路由
          path: '',
          name: 'indexBody',
          meta: {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "indexBody" */ './components/home/index.vue')
        },
        {
          //动画路由
          path: '/animation',
          name: 'animation',
          meta: {
            title: "动画-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Animation
        },
        {
          //番剧路由
          path: '/bangumi',
          name: 'bangumi',
          meta: {
            title: "番剧-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Bangumi
        },
        {
          //国产系列路由
          path: '/china',
          name: 'china',
          meta: {
            title: "国产-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: China
        },
        {
          //音乐路由
          path: '/music',
          name: 'music',
          meta: {
            title: "音乐-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Music
        },
        { //舞蹈路由
          path: '/dance',
          name: 'dance',
          meta: {
            title: "舞蹈-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Dance
        },
        {
          //游戏路由
          path: '/game',
          name: 'game',
          meta: {
            title: "游戏-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Game
        },
        {
          //科技路由
          path: '/technology',
          name: 'technology',
          meta: {
            title: "科技-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Technology
        },
        {
          //电影路由
          path: '/movie',
          name: 'movie',
          meta: {
            title: "电影-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Movie
        },
        {
          //生活路由
          path: '/life',
          name: 'life',
          meta: {
            title: "生活-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Life
        },
        {
          //鬼畜路由
          path: '/guichu',
          name: 'guichu',
          meta: {
            title: "鬼畜-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Guichu
        },
        {
          //时尚路由
          path: '/fasion',
          name: 'fasion',
          meta: {
            title: "时尚-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Fasion
        },
        {
          //娱乐路由
          path: '/yule',
          name: 'yule',
          meta: {
            title: "娱乐-哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: Yule
        }
      ]
    },
    { //个人中心
      path: '/user',
      // name: 'user',
      meta: {
        title: "个人空间",
      },
      component: User,
      children: [{ //动态
          path: 'trends',
          name: 'trends',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "trends" */ './components/user/trends.vue')
        },
        { //投稿
          path: 'contribute',
          name: 'contribute',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "contribute" */ './components/user/contribute.vue')
        },
        { //频道
          path: 'channel',
          name: 'channel',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "channel" */ './components/user/channel.vue')
        },
        { //频道内容
          path: 'detail',
          name: 'detail',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "detail" */ './components/user/detail.vue')
        },
        { //收藏夹
          path: 'favorite',
          // name: 'favorite',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "favorite" */ './components/user/favorite.vue'),
          children: [{ //视频收藏夹
              path: '',
              name: 'faVideo',
              component: () => import( /* webpackChunkName: "faVideo" */ './components/user/favorite/faVideo.vue')
            },
            { //相簿收藏夹
              path: 'faAlbum',
              name: 'faAlbum',
              component: () => import( /* webpackChunkName: "faAlbum" */ './components/user/favorite/faAlbum.vue')
            }
          ]
        },
        { //关注，粉丝
          path: 'fans',
          name: 'fans',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "fans" */ './components/user/fans.vue')
        },
        { //订阅
          path: 'subscribe',
          name: 'subscribe',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "subscribe" */ './components/user/subscribe.vue')
        },
        { //主页
          path: '',
          name: 'homepage',
          meta: {
            title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
          },
          component: () => import( /* webpackChunkName: "homepage" */ './components/user/home_page.vue')
        }

      ]
    },
    { //视频播放页面路由
      path: '/play',
      name: 'play',
      meta: {
        title: "_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
      },
      component: () => import( /* webpackChunkName: "play" */ './views/play.vue'),
    },
    { //视频错误路由
      path: '/play/error',
      name: 'playerror',
      meta: {
        title: "视频去哪了呢？_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
      },
      component: () => import( /* webpackChunkName: "playerror" */ './components/videopaly/VideoError.vue'),
    },
    { //登录路由
      path: '/login',
      name: 'login',
      meta: {
        title: "哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
      },
      component: () => import( /* webpackChunkName: "login" */ './views/login.vue')
    },
    { //注册路由
      path: '/register',
      name: 'register',
      meta: {
        title: "哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
      },
      component: () => import( /* webpackChunkName: "register" */ './views/register.vue')
    },
    { //关键词搜索路由
      path: '/search',
      meta: {
        title: "哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
      },
      component: () => import( /* webpackChunkName: "search" */ './views/search.vue'),
      children: [{
        path: '',
        name: 'search',
        meta: {
          title: "哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
        },
        component: () => import( /* webpackChunkName: "search" */ './components/search/Searchindex.vue'),
      }, {
        path: 'all',
        component: () => import( /* webpackChunkName: "searchhead" */ './components/search/SearchAll.vue'),
        children: [{
            path: '',
            name: 'searchall',
            meta: {
              title: "搜索--哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
            },
            component: () => import( /* webpackChunkName: "all" */ './components/search/All.vue'),
          }, {
            path: '/search/searchvideo',
            name: 'searchvideo',
            meta: {
              title: "搜索视频--哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
            },
            component: () => import( /* webpackChunkName: "searchvideo" */ './components/search/SearchVideo.vue'),
          },
          {
            path: '/search/searchuser',
            name: 'searchuser',
            meta: {
              title: "搜索用户--哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
            },
            component: () => import( /* webpackChunkName: "searchuser" */ './components/search/Searchuser.vue'),
          },
          {
            path: '/search/photo',
            name: 'searchphoto',
            meta: {
              title: "搜索相簿--哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ 乾杯~ - bilibili"
            },
            component: () => import( /* webpackChunkName: "searchphoto" */ './components/search/Searchphoto.vue'),
          }
        ]
      }]
    },
    { //相片详情
      path: '/photoDetail',
      name: 'photoDetail',
      component: () => import( /* webpackChunkName: "photoDetail" */ './views/photoDetail.vue')
    },
    { //创作中心 投稿
      path: '/create',
      // name: 'create',
      meta: {
        title: "创作中心",
        requireAuth: true
      },
      component: () => import( /* webpackChunkName: "create" */ './views/create.vue'),
      children: [{ //添加视频
          path: '',
          name: 'addVideo',
          component: () => import( /* webpackChunkName: "addVideo" */ './components/create/addVideo.vue')
        },
        { //新增相册
          path: 'addAlbum',
          name: 'addAlbum',
          component: () => import( /* webpackChunkName: "addAlbum" */ './components/create/addAlbum.vue')
        }
      ]
    },
    { //新增相册
      path: '/insertAlbum',
      name: 'insertAlbum',
      meta: {
        title: "编辑相簿",
        requireAuth: true
      },
      component: () => import( /* webpackChunkName: "insertAlbum" */ './views/insertAlbum.vue')
    },
    { //添加视频
      path: '/insertVideo',
      name: 'insertVideo',
      meta: {
        title: "编辑视频",
        requireAuth: true
      },
      component: () => import( /* webpackChunkName: "insertVideo" */ './views/insertVideo.vue')
    },
    //个人中心
    {
      path: '/personalData',
      name: 'personalData',
      meta: {
        title: "个人中心",
        requireAuth: true
      },
      component: () =>
        import( /* webpackChunkName: "personalData" */ './views/personal_data.vue')
    },
    //我的消息路由
    {
      path: '/mymessage',
      name: 'mymessage',
      component: () =>
        import( /* webpackChunkName: "message" */ './views/my_message.vue'),
      children: [{
          path: '/sys',
          name: 'sys',
          component: () =>
            import( /* webpackChunkName: "sys" */ './components/messages/sys.vue')
        },
        {
          path: '/mym',
          name: 'mym',
          component: () =>
            import( /* webpackChunkName: "mym" */ './components/messages/mym.vue')
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    // },
    { //这是 404页面
      path: '*',
      name: 'error',
      meta: {
        title: "出错啦! - ( [-_ -])つロ bilibili"
      },
      component: () => import( /* webpackChunkName: "Error" */ './views/Error.vue')
    }
  ]
})