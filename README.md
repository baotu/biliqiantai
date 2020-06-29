# 仿BiliBili项目(前台页面)

该项目使用Vue2.0 + Vuex + VueRouter + elementUi + axios + vue-lazy

Vue2.0 渲染页面,Vuerouter作为路由管理,Vuex作为状态管理,vue-lazy作为图片懒加载.

本项目 所有大型图片资源均使用远端CDN图片 下载即可使用.

远端接口为Java作为后台数据查询,使用SSM工程.

主要功能有:

1. 用户登录注册
2. 视频类型一级分类,如:动画,番剧,国创
3. 视频播放,**弹幕发送(高级弹幕发送)**
4. 视频搜索,用户搜索,相簿搜索(支持高级搜索)
5. 用户上传视频,上传相簿,用户个人资料修改
6. 视频,相簿 **评论,点赞,收藏**
7. 用户关注,粉丝,私聊,系统公告,用户个人资料修改
8. 页面路由判断,404页面
9. 其他功能请自主研究,***不断更新中,如有帮助请订阅***

项目部分截图:

1. 首页:<img src="http://cdn.hwzhj.top/bilibili/md/index.png" width="500" />

2. 视频播放:<img src="http://cdn.hwzhj.top/bilibili/md/video.png" width="500"/>

3. 视频评论点赞:<img src="http://cdn.hwzhj.top/bilibili/md/videopl.png" width="500">

4. 个人空间:<img src="http://cdn.hwzhj.top/bilibili/md/user.png" width="500"/>

5. 视频投稿:<img  width="500" src="http://cdn.hwzhj.top/bilibili/md/tougao.png"/>

6. 搜索:<img src="http://cdn.hwzhj.top/bilibili/md/serah.png" width="500">


其他项目链接:

+ 后台管理项目:<a href="https://github.com/baotu/bilihoutai" title="友情链接">后台管理项目</a>

使用方法:

 + 下载 https://github.com/baotu/biliqiantai

   ```javascript
   npm i
   ```

+  若想自主使用,或者更改代码,除dist目录下,其他目录随缘更改  进行打包编译

   ```javascript
   npm run build
   ```

   项目运行

   ```javascript
   npm run serve
   ```

+  dist 目录下 可直接放在服务器中运行 推荐使用nginx作为代理服务器. 友情链接<a href="http://nginx.org/en/">nginx官方网站</a>

   该项目作为Vuerouter的HTML5 History 模式 配置nginx的 location 请加上

   ```javascript
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   具体配置 请看 <a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90">Vuerouter官网</a>

感谢使用! 若觉得有帮助请star thinks.



## 不可作为商业用途,本项目绝无侵犯bilibili,仅供学习自助娱乐使用. 若侵犯到企业权益请联系1163123808@qq.com

