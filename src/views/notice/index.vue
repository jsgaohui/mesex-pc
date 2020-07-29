<template>
  <div class="page_uc user-main">
    <div class="crumbs"><span>{{$t('common.notice')}}</span></div>
    <div class="mod">
      <div class="mod_hd">{{$t('common.list')}}</div>
      <div class="mod_bd">
        <ul class="page_notice_list_content">
          <li v-for="item in noticeList" @click="rowClick(item.id)">
            <a href="#"><h2 class="page_notice_title">
              <i class="is-impt" v-if="item.noticeLevel===2">{{$t('notice.important')}}</i>
              <i class="is-top" v-else-if="item.noticeLevel===3">{{$t('notice.urgent')}}</i>{{item.noticeTitle}}</h2><span
            class="page_notice_time">{{item.createTime}}</span> </a></li>
        </ul>
        <div v-show="!listLoading">
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="noticeQuery.page"
                           :page-size="noticeQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {noticeList} from "../../api/help";

  export default {
    name: "index",
    data() {
      return {
        noticeList: [],//公告列表
        listLoading: true,
        noticeQuery:{
          page: 1,
          limit: 10
        },
        total:0
      }
    },
    created() {
      this.initNotice()
    }, methods: {
      initNotice(){
        this.listLoading = true;
        let $this=this;
        noticeList(this.noticeQuery).then((response)=>{
          if(response.code===200){
            var data=response.data;
            $this.noticeList=data.result.records;
            $this.total=data.result.total;
            $this.listLoading = false;
          }
        })
      },
      handleCurrentChange(val) {
        this.noticeQuery.page = val;
        this.initNotice();
      },
      rowClick(detailId){
        this.$router.push({name:'noticedetail',query:{detailId:detailId}})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>

