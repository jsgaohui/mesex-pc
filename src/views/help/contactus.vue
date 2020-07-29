<template>
  <div>
    <div class="layout_doc">
      <!--账户安全-->
      <div class="page_assetintro user-main">
        <div class="crumbs"><span>{{$t('common.contactus')}}</span></div>
        <div class="mod">
          <div class="cont"><div class="l_content">
            <div class="contact-us">
              <h1>{{$t('common.customerHelp')}}</h1>
              <p>{{$t('common.helpDetail')}}</p>
              <ul>
                <!--<ol><img src="@/assets/logo.png" width="30" height="19"></ol>-->
                <li>
                  <p><span><img src="@/assets/images/mail.png" width="30" height="30"><a href="mailto:">service@masex.io</a></span></p>
                  <p><span><img src="@/assets/images/mail.png" width="30" height="30"><a href="mailto:">listing@masex.io</a></span></p>
                  <!--<p><i class="el-icon-wechat"></i></p>-->
                </li>
              </ul>
            </div>
          </div></div>
        </div>
      </div>
      <!--账户安全 END-->
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
