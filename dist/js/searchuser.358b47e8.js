(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchuser"],{"545b":function(t,e,s){"use strict";var a=s("7aa5"),i=s.n(a);i.a},"68de":function(t,e,s){"use strict";var a=s("d6ad"),i=s.n(a);i.a},"7aa5":function(t,e,s){},"8bb5":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"total-wrap"},[s("p",{staticClass:"total-text"},[t._v("共"+t._s(t.total)+"条数据")])])},i=[],n={name:"searchtotal",props:["total"]},r=n,o=(s("9772"),s("2877")),c=Object(o["a"])(r,a,i,!1,null,"300c92ad",null);e["a"]=c.exports},"956d":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"result-wrap clearfix"},[1==t.searchtype?s("ul",{staticClass:"video-contain clearfix"},t._l(t.vvideolist,function(e){return s("li",{key:e.videoid,staticClass:"video matrix",on:{click:function(s){return t.govideo(e.videoid)}}},[s("a",{staticClass:"img-anchor",attrs:{href:"#",title:e.title}},[s("div",{staticClass:"img"},[s("div",{staticClass:"lazy-img"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.picture,expression:"item.picture"}]})]),s("span",{staticClass:"so-imgTag_rb"},[t._v(t._s(e.timelong))])])]),s("div",{staticClass:"info"},[s("div",{staticClass:"headline clearfix"},[s("a",{staticClass:"title",attrs:{title:e.title,href:"#"}},[t._v(t._s(e.title))])]),s("div",{staticClass:"tags"},[s("span",{staticClass:"so-icon watch-num",attrs:{title:"观看"}},[s("i",{staticClass:"icon-playtime"}),t._v("\n            "+t._s(e.click)+"\n          ")]),s("span",{staticClass:"so-icon time",attrs:{title:"上传时间"}},[s("i",{staticClass:"icon-date"}),t._v("\n            "+t._s(t._f("datas")(e.time))+"\n          ")]),s("span",{staticClass:"so-icon",attrs:{title:"up主"}},[s("i",{staticClass:"icon-uper"}),s("a",{staticClass:"up-name",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.getup(e.userid)}}},[t._v(t._s(e.xyuser.username))])])])])])}),0):t._e(),2==t.searchtype?s("ul",{staticClass:"user-list"},t._l(t.vvideolist,function(e,a){return s("li",{key:e.userid,staticClass:"up-item"},[s("div",{staticClass:"up-face"},[s("a",{staticClass:"face-img",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.getup(e.userid)}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.xyuserinfo.userphoto,expression:"item.xyuserinfo.userphoto"}]})])]),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"headline"},[s("a",{staticClass:"title",attrs:{href:"#",title:e.username},on:{click:function(s){return s.preventDefault(),t.getup(e.userid)}}},[t._v(t._s(e.username))]),s("i",{staticClass:"lv",class:t.levon(e.gradeid)}),e.followstatus?s("button",{staticClass:"attention-btn followed",on:{click:function(s){return t.follow(e.userid,a)}}},[t._v("已关注")]):s("button",{staticClass:"attention-btn",on:{click:function(s){return t.follow(e.userid,a)}}},[t._v("关注")])]),s("div",{staticClass:"up-info clearfix"},[s("span",[t._v("性别:"+t._s(e.xyuserinfo.sex))]),s("span",[t._v("粉丝:"+t._s(e.usefulgold))])]),s("div",{staticClass:"desc",attrs:{title:e.xyuserinfo.usershow}},[t._v(t._s(e.xyuserinfo.usershow))])])])}),0):t._e(),3==t.searchtype?s("ul",{staticClass:"photo-list clearfix"},t._l(t.vvideolist,function(e){return s("li",{key:e.albumid,staticClass:"photo"},[s("a",{attrs:{href:"#",title:e.albumname},on:{click:function(s){return s.preventDefault(),t.getPic(e.albumid)}}},[s("div",{staticClass:"img"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.photo,expression:"item.photo"}]}),s("span",{staticClass:"so-imgTag_rb"},[t._v(t._s(e.photocount)+"P")])])]),s("div",{staticClass:"info"},[s("div",{staticClass:"headline clearfix"},[s("a",{staticClass:"title",attrs:{title:e.albumname,href:"#"},on:{click:function(s){return s.preventDefault(),t.getPic(e.albumid)}}},[t._v(t._s(e.albumname))])]),s("div",{staticClass:"tags"},[s("div",{staticClass:"so-icon up",attrs:{title:"up主"}},[s("i",{staticClass:"icon-uper"}),s("a",{staticClass:"up-name",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.getup(e.userid)}}},[t._v(t._s(e.xyuser.username))])]),s("div",{staticClass:"so-icon watch-num",attrs:{title:"浏览数"}},[s("i",{staticClass:"icon-view"}),t._v("\n            "+t._s(e.watch)+"\n          ")]),s("div",{staticClass:"so-icon fav",attrs:{title:"收藏数"}},[s("i",{staticClass:"icon-fav"}),t._v("\n            "+t._s(e.collectioncount)+"\n          ")])])])])}),0):t._e(),s("div",{staticClass:"pager"},[s("el-pagination",{attrs:{"current-page":t.page,background:"","page-size":20,layout:"prev, pager, next",total:t.vtotal},on:{"current-change":t.pagechange}})],1)])},i=[],n=s("f499"),r=s.n(n),o=s("c0d6"),c={store:o["a"],name:"searchresult",props:["searchtype","videolist","total"],data:function(){return{page:1}},filters:{datas:function(t){return t.substring(0,10)}},computed:{vtotal:function(){return this.total},vvideolist:function(){return this.videolist}},methods:{pagechange:function(t){this.page=t,this.$emit("pagechange",t)},govideo:function(t){var e=this.$router.resolve({name:"play",query:{vdId:t}}),s=e.href;this.axios.get("xyvideo/addclick.do",{params:{videoid:t}}).then(function(t){window.open(s,"_blank")})},levon:function(t){return"icon-lv".concat(t)},follow:function(t,e){var s=this;if("{}"===r()(o["a"].state.user))return this.$message({message:"请先登录",type:"warning"});this.axios.get("xyfriend/updateAddUpById.do",{params:{userfriend:t}}).then(function(t){0==t.data.xyuser?(s.$set(s.vvideolist[e],"followstatus",!0),s.$message({message:"关注成功",type:"success"})):1==t.data.xyuser&&(s.$set(s.vvideolist[e],"followstatus",!1),s.$message({message:"取消关注成功",type:"success"}))})},getup:function(t){var e=this.$router.resolve({name:"homepage",query:{userid:t}}),s=e.href;window.open(s,"_blank")},getPic:function(t){var e=this.$router.resolve({name:"photoDetail",query:{albumId:t}}),s=e.href;window.open(s,"_blank")}}},l=c,u=(s("545b"),s("2877")),d=Object(u["a"])(l,a,i,!1,null,"5d81e59c",null);e["a"]=d.exports},9772:function(t,e,s){"use strict";var a=s("fd8a"),i=s.n(a);i.a},"9d06":function(t,e,s){},a122:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.errorshow,expression:"!errorshow"}],staticClass:"user-wrap"},[s("Total",{attrs:{total:t.total}}),t.videolist.length?s("Result",{attrs:{videolist:t.videolist,total:t.total,searchtype:2},on:{pagechange:t.pagechange}}):s("Recom")],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.errorshow,expression:"errorshow"}],staticClass:"error-wrap"},[s("p",{staticClass:"txt"},[t._v("出错了")])])])},i=[],n=(s("ac6a"),s("f499")),r=s.n(n),o=(s("cadf"),s("551c"),s("f751"),s("097d"),s("c0d6")),c=s("8bb5"),l=s("956d"),u=s("c093"),d={store:o["a"],name:"searchuser",components:{Total:c["a"],Result:l["a"],Recom:u["a"]},data:function(){return{total:10,index:1,videolist:[],errorshow:!1,keyword:""}},computed:{user:function(){return o["a"].state.user}},watch:{$route:function(t,e){var s=t.query.keyword;void 0!=s&&(this.errorshow=!1),this.keyword=s,this.getUser(this.keyword)}},methods:{pagechange:function(t){this.index=t},getUser:function(t){var e=this;this.axios.get("xyuser/findPageUserNameByUserName.do",{params:{username:t,page:this.index}}).then(function(t){e.videolist=t.data.xyuser,e.total=t.data.count,e.diffisfollow()})},diffisfollow:function(){var t=this;"{}"!==r()(this.user)&&this.axios.get("xyfriend/findByUserFriends.do",{params:{userid:this.user.userid}}).then(function(e){var s=e.data.xyuser,a=0;t.videolist.forEach(function(e){s.forEach(function(s){e.userid===s.userfriend&&t.$set(t.videolist[a],"followstatus",!0)}),a++})})}},mounted:function(){var t=this.$route.query.keyword;void 0!==t?(this.keyword=t,this.getUser(this.keyword)):this.errorshow=!0}},v=d,f=(s("a60e"),s("2877")),p=Object(f["a"])(v,a,i,!1,null,"bfd1f702",null);e["default"]=p.exports},a60e:function(t,e,s){"use strict";var a=s("9d06"),i=s.n(a);i.a},c093:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"recom-wrap"},[s("div",{staticClass:"no-result recom none"})])}],n={name:"searchrecom"},r=n,o=(s("68de"),s("2877")),c=Object(o["a"])(r,a,i,!1,null,"3957d8ca",null);e["a"]=c.exports},d6ad:function(t,e,s){},fd8a:function(t,e,s){}}]);
//# sourceMappingURL=searchuser.358b47e8.js.map