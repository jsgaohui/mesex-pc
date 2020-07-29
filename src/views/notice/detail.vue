<template>
  <div class="page_uc user-main">
    <div class="crumbs"><router-link to="notice"><span>{{$t('common.notice')}}</span></router-link></div>
    <div class="mod">
        <div class="l_title_detail"><h1 class="page_notice_title">
          {{noticeDetail.noticeTitle}}</h1>
          <p class="page_notice_time" >{{noticeDetail.createTime}}</p></div>
      <div class="mod_bd">
        <div class="page_notice_content"><p v-html="noticeDetail.remark"></p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {noticeDetail} from "../../api/help";
  import {escape2Html} from "../../utils/stringUtil";

  export default {
    name: "detail",
    data() {
      return {
        noticeDetail:{}//公告内容
      }
    },
    created() {
      if(this.$route.query.detailId){
         this.getDetail(this.$route.query.detailId)
      }
    },
    methods:{
      getDetail(detailId){
        noticeDetail(detailId).then((response)=>{
          if(response.code===200){
            this.noticeDetail= response.data.notice;
            if(this.noticeDetail.remark){
              this.noticeDetail.remark=escape2Html(this.noticeDetail.remark);
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
