(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["faAlbum"],{"7dae":function(t,e,a){},b9a3:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"faAlbum"},[a("div",{staticClass:"sp-title"},[a("h3",{staticStyle:{"font-size":"18px","margin-top":"15px"}},[t._v("相簿收藏夹")]),a("p",{staticStyle:{margin:"15px 0px",color:"#999"}},[t._v(t._s(t.collAlbum.count)+"个相簿")])]),t.collAlbum.count?t._e():a("div",{staticClass:"kong"},[a("p",[t._v("你暂时还没有收藏相簿内容哦~~")])]),a("div",{staticClass:"video-list"},[t._l(t.collAlbum.xyuser,function(e,i){return a("a",{key:i,staticClass:"pd-item",on:{click:function(a){return t.getPic(e.albumid)}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.xyalbum.photo,expression:"item.xyalbum.photo"}]}),a("div"),a("h3",{staticStyle:{margin:"10px 0px"}},[t._v(t._s(e.xyalbum.albumname))]),a("p",{staticStyle:{color:"#999"}},[t._v("收藏于:"+t._s(e.xyalbum.time))])])}),t.collAlbum.count?a("el-pagination",{staticStyle:{"text-align":"center",display:"block","padding-top":"30px"},attrs:{background:"",layout:"prev, pager, next","page-size":10,total:t.collAlbum.count},on:{"current-change":t.handleCurrentChange}}):t._e()],2)])},n=[],l=a("c0d6"),s={store:l["a"],data:function(){return{collAlbum:{},userid:""}},mounted:function(){this.$route.query.userid?this.userid=this.$route.query.userid:this.userid=l["a"].state.user.userid,this.handleCurrentChange(1)},methods:{handleCurrentChange:function(t){var e=this;this.axios.get("xyalbumcollection/findPageAlbumByUserId.do",{params:{userid:this.userid,page:t}}).then(function(t){e.collAlbum=t.data})},getPic:function(t){var e=this.$router.resolve({name:"photoDetail",query:{albumId:t}}),a=e.href;window.open(a,"_blank")}}},u=s,o=(a("c3f9"),a("2877")),r=Object(o["a"])(u,i,n,!1,null,"2d9572cf",null);e["default"]=r.exports},c3f9:function(t,e,a){"use strict";var i=a("7dae"),n=a.n(i);n.a}}]);
//# sourceMappingURL=faAlbum.7d1efb0d.js.map