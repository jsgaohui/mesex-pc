<template>
  <!--公告-->
  <div class="sidebar_notice">
    <div class="tit">{{$t('common.notice')}}</div>
    <div class="in">
      <ul id="notice_list">
        <li v-for="item in noticeList">
          <router-link :to="{name:'noticedetail', query: { detailId : item.id }}"> <p>{{item.noticeTitle}}</p></router-link>
          {{item.createTime}}
        </li>
      </ul>
    </div>
  </div>
  <!--公告END-->
  <!---登录后-委托历史END-->
</template>
<script>
  import {notice } from "../../api/common";
  export default {
    data(){
      return {
        noticeList : []
      }
    },
    name: "notice",
    methods:{
      //设置公告信息
      noticeInfo(){
        let $this = this;
        notice().then((response) => {
          if (response.code === 200) {
            var data = response.data;
            $this.noticeList = data.noticeList;
          }
        })
      },
    }
  }
</script>
