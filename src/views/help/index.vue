<template>
  <div>
    <div class="body_main">
      <div class="help_con">
        <div class="help_nav">
              <div class="help_title">{{$t('common.help')}}</div>
              <el-menu
                default-active="1"
                @open="handleOpen"
                @close="handleClose">
              <el-submenu v-for="(value,key,index) in helpMap" :key="key" :index="index.toString()">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{key}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(item,idx) in value" :key="item.id" :index="index.toString()+'-'+idx" @click="showTxt(item.helpTitle,item.content)">{{item.helpTitle}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              </el-menu>
        </div>
        <div class="center_line"></div>
        <div class="help_wrap">
          <div class="help_content">
            <h1 class="title">{{helpTitle}}</h1>
            <div class="help_r_content">
              <p v-html="helpTxt"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {helps} from "../../api/help";
  import {escape2Html} from "../../utils/stringUtil";

  export default {
    name: "index",
    data(){
      return{
        helpMap:{}, //帮助集合
        helpTitle:'',
        helpTxt:''
      }
    },
    created(){
      this.getHelpList();
    },
    methods: {
      getHelpList(){
        let $this=this;
        helps().then((response)=>{
          if(response.code===200){
            $this.helpMap=response.data.helpMap;
          }
        })
      },
      showTxt(title,txt){
        this.helpTitle=title;
        if(txt){
          this.helpTxt=escape2Html(txt);
        }
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>
