<template>
  <div :class='isBothAppeal?"appeal-main":"appeal-main onlyone"'>
    <div class="appeal-path flex-space"><h3><i class="el-icon-back" @click="goBack()"></i>{{$t('otc.appealDetail')}}</h3>
      <div class="flex-x-start" v-if="appealEntity.status===1||appealEntity.status===2||appealEntity.status===3">
        <button  @click="goToAppeal(appealEntity)" type="button" class="el-button el-button--default el-button--mini"><span>{{$t('otc.addAppealInfo')}}</span></button>
        <button v-show="isAppealUser&&appealEntity.enable!==0" @click="isShowCancelAppeal=true" type="button" class="el-button el-button--default el-button--mini"><span>{{$t('otc.cancelAppeal')}}</span></button>
      </div>
      <div class="flex-x-start" v-if="appealEntity.status===6">
         <!-- 申诉方撤销了的,被申诉方可以重新补充资料发起申诉,防止恶意撤销 -->
        <button  v-show="!isAppealUser" @click="goToAppeal(appealEntity)" type="button" class="el-button el-button--default el-button--mini"><span>{{$t('otc.addAppealInfo')}}</span></button>
      </div>
    </div>
    <!--查看申诉资料-->
    <div class="mid-block flex-c-stretch">
      <div v-show="(isAppealUser&&appealEntity.appealUserDesc)||(!isAppealUser&&appealEntity.matchUserDesc)" class="appeal-data border-blue">
        <!-- 本人申诉资料 开始-->
        <div class="top flex-space">{{$t('otc.myAppeal')}} <span>{{appealStatus[appealEntity.status]}}</span></div>
        <div class="con rel">
          <p v-show="isAppealUser">{{$t('otc.appealReason')}}:{{appealEntity.appealTopic}}</p>

            <ul class="flex-x-start">
              <li class="rel" v-if="appealUserAttach!==''" v-for="appealUserAttach in isAppealUser?appealUserAttachList:matchUserAttachList">
                <div @click="showAppealImgClick(appealUserAttach)"><img :src="appealUserAttach">
                  <span class="el-upload-list__item-actions">
                    <span><i class="el-icon-zoom-in"></i></span>
                  </span>
                </div>
              </li>
            </ul>
          <p>{{$t('otc.appealInfo')}}:{{isAppealUser?appealEntity.appealUserDesc:appealEntity.matchUserDesc}}</p>
        </div>
        <!-- 本人申诉资料 结束-->
      </div>
      <!-- 对方申诉资料 开始-->
      <div v-show="(isAppealUser&&appealEntity.matchUserDesc)||(!isAppealUser&&appealEntity.appealUserDesc)" class="appeal-data border-blue">
        <div class="top flex-space">{{$t('otc.otherSideAppeal')}} <span>{{appealStatus[appealEntity.status]}}</span></div>
        <div class="con rel">
          <div class="not-filed" style="display:none">{{$t('otc.noAppealInfo')}}</div>
          <p v-show="!isAppealUser">{{$t('otc.appealReason')}}:{{appealEntity.appealTopic}}</p>
          <div>
            <ul class="flex-x-start">
              <li  class="rel" v-if="appealUserAttach!==''" v-for="appealUserAttach in isAppealUser?matchUserAttachList:appealUserAttachList">
                <div @click="showAppealImgClick(appealUserAttach)"><img :src="appealUserAttach">
                  <span class="el-upload-list__item-actions">
                    <span><i class="el-icon-zoom-in"></i></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div><p>{{$t('otc.appealInfo')}}:{{isAppealUser?appealEntity.matchUserDesc:appealEntity.appealUserDesc}}</p></div>
        </div>
      </div><!-- 对方申诉资料 结束-->
    </div>
    <!--查看申诉资料END-->
    <!-- 展示申诉图片开始 -->
    <div @click="showAppealImgdiv=false" class="dialog_wrap otc-tips" style="display: block;" v-show="showAppealImgdiv">
      <div class="dialog" style="width:600px;">
        <div class="dia_tit">
          <div><b><i class="iconfont icon-payment"></i></b>
            <div class="float-r"><span class="close" id="dia_close" @click="showAppealImgdiv=false">×</span></div>
          </div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
      <div class="dia_content payment-tips" style="height:500px;text-align:center;padding:20px 0px;display:flex;justify-content:center;align-items: center">
         <img :src="showAppealImgUrl" width="auto" height="auto" style="max-width:560px;max-height:360px;">
      </div>
    </div>
      <div class="dialog_extra"></div>
  </div>
  <!-- 展示申诉图片结束 -->
  <!--补充资料 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowGoToAppeal">
      <div class="dialog" style="width:600px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.appealInformation')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowGoToAppeal=false">×</span></div>
          </div>
        </div>
        <div class="dia_content" style="max-height:400px;padding-top:20px;">
          <el-form autoComplete="on" ref="appealFormRef" :label-position="left" :model="appealForm" :rules="appealRules">
            <!-- 买入 -->
            <div v-show="isAppealUser">
            <el-form-item prop="appealType" :label="$t('otc.selectAppealReason')" v-if="appealEntity&&appealEntity.appealDirection===1">
              <el-select v-model="appealForm.appealType"  name="appealType" :placeholder="$t('otc.selectAppealReason')" style="width:550px;">
                <el-option id="appeal_1" :label="$t('otc.buyAppealReasonOne')" value="1"></el-option>
                <el-option id="appeal_2" :label="$t('otc.buyAppealReasonTwo')" value="2"></el-option>
                <el-option id="appeal_3" :label="$t('otc.buyAppealReasonThree')" value="3"></el-option>
                <el-option :label="$t('otc.appealOther')" value="0"></el-option>
              </el-select>
            </el-form-item>
             <!-- 卖出 -->
            <el-form-item prop="appealType" :label="$t('otc.selectAppealReason')" v-if="appealEntity&&appealEntity.appealDirection===2">
              <el-select v-model="appealForm.appealType" name="appealType" :placeholder="$t('otc.selectAppealReason')" style="width:550px;">
                <el-option id="appeal_4" :label="$t('otc.sellAppealReasonOne')" value="4"></el-option>
                <el-option id="appeal_5" :label="$t('otc.sellAppealReasonTwo')" value="5"></el-option>
                <el-option :label="$t('otc.appealOther')" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="appealTopic" :label="$t('otc.appealOtherReason')" v-if="appealForm.appealType==='0'">
              <el-input v-model="appealForm.appealTopic" name="appealTopic" v-bind:maxlength="128"></el-input>
            </el-form-item>
            </div>
            <div class="group">
              <p class="p01">
               <em>{{$t('otc.appealUploadImg')}}</em>
              </p>
              <el-upload
                action="/app/upload/imageFtp"
                list-type="picture-card"
                name="appealUserAttach"
                accept="image/*"
                :limit="imgNum"
                v-model="isAppealUser?appealForm.appealUserAttach:appealForm.matchUserAttach"
                :headers="headers"
                :on-success="uploadSucc"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p class="p01">
               <em>{{$t('otc.appealNote')}}</em>{{$t('otc.appealNoteOne')}}
               {{$t('otc.appealNoteTwo')}}
              </p>
            </div>
            <el-form-item prop="addAppealDesc" :label="$t('otc.textDocument')">
              <el-input type="textarea" v-model="appealForm.addAppealDesc" v-bind:maxlength="512"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dia_submit flex-box">
          <el-button type="button"
                     @click="goToAppealRequest()" :disabled="buttonStatus" class="el-button btn btn_submit btn-primary el-button--default el-button--medium">
            {{$t('otc.confirm')}}
          </el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--补充资料 End-->
    <!--撤销申诉 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowCancelAppeal">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.cancelAppeal')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowCancelAppeal=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{$t('otc.confirmCancelAppeal')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowCancelAppeal=false"></i><i
            class="iconfont icon-done"  @click="cancelAppealClick(appealEntity.relateOrderId)"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--撤销申诉 End-->
  </div>
</template>

<script>
import {getAppealDetailRequest,goToAppealRequest,cancelAppealRequest} from "../../api/otc";
import {mapGetters} from "vuex";

  export default {
    name: "viewAppealDetail",
    computed: {
      ...mapGetters(['user', 'token']),
      headers() {
        return {
          'UUID': this.token
        }
      }
    },
    data() {
      const validAppealType= (rule, value, callback) => {
        if(!this.appealForm.appealType){
          callback(new Error( this.$i18n.t('otc.selectAppealReason')))
        }else{
          callback()
        }
      }
      const validAppealTopic= (rule, value, callback) => {
        if(this.appealForm.appealType==='0'){
          if (!this.appealForm.appealTopic) {
            callback(new Error( this.$i18n.t('otc.requireOtherReason')))
          }else {
            callback()
          }
        }else{
          callback()
        }
      }
      const validAppealUserDesc= (rule, value, callback) => {
        if(!this.appealForm.addAppealDesc){
          callback(new Error( this.$i18n.t('otc.requireTextDocument')))
        }else{
          callback()
        }
      }
      return {
        // 1-2申诉待处理;3.申诉处理中;4.申诉成功;5.申诉失败;6.申诉已撤销;
        appealStatus: {
          1: this.$i18n.t('otc.toBeAppealOne'),
          2: this.$i18n.t('otc.toBeAppealOne'),
          3: this.$i18n.t('otc.toBeAppealTwo'),
          4: this.$i18n.t('otc.toBeAppealThree'),
          5: this.$i18n.t('otc.toBeAppealFour'),
          6: this.$i18n.t('otc.toBeAppealFive'),
        },
        appealEntity:{},//数据库返回过来的数据
        appealRules: {
          appealType: [{validator:validAppealType}],
          appealTopic: [{validator:validAppealTopic}],
          addAppealDesc:[{validator:validAppealUserDesc}]
        },
        dialogImageUrl: '',//上传图片组件变量
        dialogVisible: false,//上传图片组件变量
        isShowGoToAppeal:false,//我要申诉弹框
        buttonStatus:false,//提交申诉按钮是否置灰
        appealForm:{
          appealType:null,//申诉原因类型
          appealTopic:null,//申诉原因
          appealUserAttach:'',//申诉图片链接,多张图片以逗号","隔开
          appealUserDesc:null,//申诉描述文字资料
          matchUserAttach:'',//对手方申诉图片链接,多张图片以逗号","隔开
          matchUserDesc:null,//对手方申诉描述文字资料
          addAppealDesc:null,//补充文字描述
        },
        appealUserAttachList:[],//申诉方所有图片集合
        matchUserAttachList:[],//被申诉方所有图片集合
        showAppealImgdiv:false,//是否展示图片弹出框
        showAppealImgUrl:null,//展示的图片链接
        imgNum:6,//申诉图片还能上传的数量
        buttonStatus:false,//提交申诉按钮是否置灰
        isShowCancelAppeal:false,//是否取消申诉
        isAppealUser:null,//当前用户是否申诉方
        isBothAppeal:false,//双方是否都提交了申诉资料(主要是用来控制排版布局)
      }
    },
    created() {
      if(this.$route.query.takerId){
        this.initAppealDetailRequest(this.$route.query.takerId);
      }
    },
    methods: {
      initAppealDetailRequest(takerId){
        let $this = this;
        getAppealDetailRequest(takerId).then((response)=>{
          $this.appealEntity=response.data;
          $this.appealEntity.appealType = response.data.appealType+'';
          if($this.appealEntity.appealUserAttach){
            $this.appealUserAttachList=$this.appealEntity.appealUserAttach.split(",");
          }
          if($this.appealEntity.matchUserAttach){
            $this.matchUserAttachList=$this.appealEntity.matchUserAttach.split(",");
          }
          $this.isAppealUser = ($this.user.id=== $this.appealEntity.appealUserId)?true:false;
          if($this.isAppealUser){//此账号是申诉人账号
            $this.imgNum = $this.appealUserAttachList.length>0?6-$this.appealUserAttachList.length+1:6;//还能上传的申诉图片数量
            $this.appealEntity.addAppealDesc = $this.appealEntity.appealUserDesc;
          }else if(!$this.isAppealUser){//此账号是对手方账号
            $this.imgNum = $this.matchUserAttachList.length>0?6-$this.matchUserAttachList.length+1:6;//还能上传的申诉图片数量
            $this.appealEntity.addAppealDesc = $this.appealEntity.matchUserDesc;
          }
          if($this.imgNum===0){$this.imgNum = -1;}//为零组件不限制上传数量
          $this.isBothAppeal=($this.appealEntity.matchUserDesc&&$this.appealEntity.appealUserDesc)?true:false;
        });
      },
      //展示申诉图片
      showAppealImgClick(appealUserAttach){
        this.showAppealImgdiv = true;
        this.showAppealImgUrl = appealUserAttach;
      },
      //补充资料弹框
      goToAppeal(record){
        let $this = this;
         $this.buttonStatus = false;
        this.isShowGoToAppeal = true;
        $this.appealForm=$this.deepCopy(record);
        $this.appealForm.appealType = record.appealType+'';
        $this.deleteLoadImg();//清掉上传组件里的图片
      },
      deleteLoadImg(){
        this.appealImgList = [];//清空临时
        //清掉上传组件里的图片
        var ul = document.querySelector(".el-upload-list--picture-card");
        for(var i=0;i<ul.children.length;i++){ //当ul下还存在子节点时 循环继续
          if(document.querySelector(".el-icon-delete")){
            document.querySelector(".el-icon-delete").click();//模拟触发点击图片删除按钮
          }
          //ul.removeChild(ul.firstChild);
        }
      },
      handleRemove(file, fileList) {
        this.appealImgList = fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSucc(response, file, fileList){
        let $this = this;
        if(response.code===200){
          $this.appealImgList = fileList;
        }else{//上传失败
          if(document.querySelector(".el-upload-list--picture-card").children.length>0){
            document.querySelector(".el-upload-list--picture-card").lastChild.remove();
            $this.appealImgList = fileList;
          }
          if(response.msg==='ExceedeFileSizeLimit'){//超出上传大小限制
            $this.$message({type: 'error',message:this.$i18n.t('userinfo.uploadsize')});
          }else{
            $this.$message({type: 'error',message:this.$i18n.t('otc.operationFailed')});
          }
        }
      },
      goToAppealRequest(){
        let $this = this;
        $this.appealForm.createTime = null;
        if($this.appealForm.appealType!=='0'&&document.getElementById("appeal_"+$this.appealForm.appealType)){
           $this.appealForm.appealTopic = document.getElementById("appeal_"+$this.appealForm.appealType).firstChild.innerHTML;
        }
        if(!$this.isAppealUser){//被申诉方补充资料
          $this.appealForm.appealUserDesc = null;
          $this.appealForm.matchUserDesc=$this.appealForm.addAppealDesc;
        } else {
          $this.appealForm.appealUserDesc=$this.appealForm.addAppealDesc;
        }
        $this.$refs.appealFormRef.validate(isValid => {
          if(!isValid) return
          if(!$this.isAppealUser){//被申诉方补充资料
              $this.appealForm.matchUserAttach=$this.appealForm.matchUserAttach===null?'':$this.appealForm.matchUserAttach;
              for(var i=0;i<$this.appealImgList.length;i++){
                if($this.appealImgList[i].response.code===200){
                  $this.appealForm.matchUserAttach+=$this.appealImgList[i].response.fileNames[0]+",";
                }
              }
            } else {
              for(var i=0;i<$this.appealImgList.length;i++){
                if($this.appealImgList[i].response.code===200){
                  $this.appealForm.appealUserAttach+=$this.appealImgList[i].response.fileNames[0]+",";
                }
              }
            }
            $this.buttonStatus = true;
            goToAppealRequest($this.appealForm).then((response)=>{
            if(response.code===200){
              $this.buttonStatus = false;
              $this.isShowGoToAppeal = false;
              $this.initAppealDetailRequest($this.appealEntity.relateOrderId);
              //清掉上传组件里的图片
              var ul = document.querySelector(".el-upload-list--picture-card");
              $this.deleteLoadImg();//清掉上传组件里的图片
              $this.$message({
                message:$this.$i18n.t('otc.submitAppealSuccess'),
                type: 'success',
                center: true,
              });//提示提交成功
            }
          });
        });
      },
      //撤销申诉
      cancelAppealClick(relateOrderId){
        let $this = this;
        cancelAppealRequest(relateOrderId).then((response)=>{
            if(response.code===200){
              $this.isShowGoToAppeal = false;
              $this.isShowCancelAppeal = false;
              this.$router.push({name:'appealOrder'});
              $this.$message({
              message:$this.$i18n.t('otc.cancelAppealSuccess'),
              type: 'success',
              center: true,
              });//提示撤销成功
            }
          });

      },
      deepCopy(obj){//深复制,以防更改当前对象,将被复制对象也做更改
      let $this = this;
      if(typeof obj != 'object'){
          return obj;
      }
      if(!obj){
        var newobj = null;
      }else{
        var newobj = {};
      }
      for ( var attr in obj) {
          newobj[attr] = $this.deepCopy(obj[attr]);
      }
      return newobj;
    },
    goBack(){
      this.$router.go(-1);//返回
    },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";

</style>
