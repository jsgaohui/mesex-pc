<template>
<!--收款方式-->
<div>
  <div class="payment-con" style="margin-top:20px;">
      <div class="otc-path">
          <h3>{{$t('payment.paymentMethod')}}</h3>
          <div class="user-tinfo">{{$t('payment.payMethodRemark')}}<br></div>
      </div>
    <div class="payment-list flex-x-start" >
      <div class="payment-li" v-for="item in myPayMethodList" :id="item.id">
        <div class="left">
          <div :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
        </div>
        <div class="right">
           <i class="iconfont icon-editor" v-if="item.status===1" @click="modifyClick(item.id)"></i>
           <!--<span style="display:none" v-if="item.status===1" class="delete" @click="modifyClick(item.id)">{{$t('common.edit')}}</span>-->
           <span v-if="item.status===0" class="delete" @click="updateClick(item.id,item.paymentTypeId,null)">{{$t('common.delete')}}</span>

          <div class="select" @click="updateClick(item.id,item.paymentTypeId,item.status)">
              <i v-if="item.status===1" class="iconfont icon-select" ></i>
              <i v-if="item.status===0" class="iconfont icon-select" style="display:none"></i>
          </div>
          <div class="pay-info">
            <h3>{{item.paymentTypeName}}</h3>
            <div><i class="iconfont icon-user"></i><p>{{item.name}}</p></div>
            <div v-if="item.bankName"><i class="iconfont icon-pay-card"></i><p>{{item.bankName}}</p></div>
            <div><i class="iconfont icon-pay-card"></i><p>{{(item.paymentTypeId===5||item.paymentTypeId===6)?item.swiftInfo:item.account}}</p></div>
          </div>
        </div>
      </div>
      <div class="payment-li">
          {{$t('payment.addPayMethod')}}
          <div class="add-btn" @click="addPayMethod"><i class="iconfont icon-add"></i></div>
      </div>
    </div>
  </div>

  <!--实名验证提醒 Begin-->
  <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowRealNameVerification">
    <div class="dialog" style="width:524px;">
      <div class="dia_tit">
        <div><b>{{$t('otc.prompt')}}</b>
          <div class="float-r"><span class="close" id="dia_close" @click="isShowRealNameVerification=false">×</span></div>
        </div>
      </div>
      <div class="dia_content tips-removal">
        <div class="text">{{$t('payment.doVerification')}}</div>
        <div class="icon-btn"><i class="iconfont icon-close" @click="isShowRealNameVerification=false"></i><i class="iconfont icon-done" @click="goUserAuth()"></i></div>
      </div>
    </div>
    <div class="dialog_extra"></div>
  </div>
  <!--实名验证提醒 End-->
   <!--添加收款方式 Begin-->

   <el-form autoComplete="on" :model="AddPaymentMethodForm" :rules="AddPaymentMethodRules" ref="AddPaymentMethodRef" label-position="left"
                 class="form_set">
   <div class="dialog_wrap otc-tips" style="display: block;" v-show="showdiv">
      <div class="dialog" style="width:526px;">
        <div class="dia_tit">
          <div><b><i class="iconfont icon-payment"></i>{{showSelectFlag?$t('payment.addPayMethod'):$t('payment.modifyPayMethod')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="showdiv = false">×</span></div>
          </div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
         <div class="dia_content payment-tips">
          <div class="pay-methods">
            <label class="el-form-item__label">{{$t('payment.paymentMethod')}}</label>
            <div class="rel">
              <div class="pay-name flex-x-start">
              <div :class="'pay-icon'+' '+AddPaymentMethodForm.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+AddPaymentMethodForm.cssName"></i></label></div>
              <div class="txt">{{AddPaymentMethodForm.paymentTypeName}}</div>
              </div>
              <div @click="showSelect=showSelectFlag" >
              <input :placeholder="placeholderText" readonly autocomplete="off" type="text" class="el-input__inner">
              <span class="r-arrow"><i class="iconfont el-icon-arrow-up"></i></span>
              </div>
            </div>
            <div class="pay-option" v-show="showSelect" style="overflow-y:scroll;height:158px;">
              <div @click="toSelectClick(item)" class="pay-name flex-x-start" v-for="item in payTypeList">
                <div :class="'pay-icon'+' '+item.remark+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.remark"></i></label></div>
                <div class="txt">{{item.paymentTypeName}}</div>
              </div>
              <!-- <div class="pay-name flex-x-start">
                  <div class="pay-icon card-bg"><label for="icon-card"><i class="iconfont icon-card"></i></label></div>
                  <div class="txt">银行卡</div>
              </div> -->
            </div>
          </div>

        <div class="el-form-item el-form-item--medium">
          <label for="realName" class="el-form-item__label">{{$t('userinfo.fullname')}}</label>
            <div class="el-form-item__content">
              <div class="el-input el-input--medium">
                <input v-model="AddPaymentMethodForm.name" :readonly="isMerchant===2?false:true" name="name" maxlength="64" autocomplete="off" type="text"  class="el-input__inner">
              </div>
            </div>
        </div>
         <!--银行卡 begin-->
        <div v-show="showCard">
          <div class="el-form-item el-form-item--medium">
              <label for="bankName" class="el-form-item__label">{{$t('payment.bankName')}}</label>
              <div class="el-form-item__content">
                <div class="el-input el-input--medium">
                  <input v-model="AddPaymentMethodForm.bankName" name="bankName" maxlength="64" autocomplete="off" type="text"  class="el-input__inner">
                  </div>
                </div>
          </div>
          <div class="el-form-item el-form-item--medium">
                <label for="subBank" class="el-form-item__label">{{$t('payment.accountBranch')}}</label>
                <div class="el-form-item__content">
                  <div class="el-input el-input--medium">
                    <input v-model="AddPaymentMethodForm.subBank" name="subBank" maxlength="64" autocomplete="off" type="text"  class="el-input__inner">
                    </div>
                  </div>
              </div>
              <div class="el-form-item el-form-item--medium">
                  <label for="account" class="el-form-item__label">{{$t('payment.cardAccount')}}</label>
                  <div class="el-form-item__content">
                    <div class="el-input el-input--medium">
                      <input v-model="AddPaymentMethodForm.account" name="account" maxlength="64" autocomplete="off" type="text" class="el-input__inner">
                      </div>
                    </div>
              </div>
        </div>
          <!--银行卡 end-->
          <!--支付宝 或微信-->
        <div v-show="showAlipay">
          <div class="el-form-item el-form-item--medium">
              <label for="realName" class="el-form-item__label">{{AddPaymentMethodForm.accountType}}</label>
              <div class="el-form-item__content">
                <div class="el-input el-input--medium">
                  <input v-model="AddPaymentMethodForm.account" name="account" maxlength="64" type="text" autocomplete="off"  class="el-input__inner">
                  </div>
                </div>
            </div>
            <div class="group">
             <el-form-item prop="qrCode" :label="$t('assets.qrCode')">
              <el-upload
                list-type="picture"
                name="qrCode"
                accept="image/*"
                v-model="AddPaymentMethodForm.qrCode"
                :headers="headers"
                class="upload-demo"
                drag
                action="/app/upload/imageFtp"
                :on-success="uploadSucc"
                multiple>
                <div class="text-right" style="padding-right:10px" v-show="showDelete"  @click="deleteLoadImg"><span>{{$t('common.delete')}}</span></div>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">{{AddPaymentMethodForm.qrcodeRemark}}</div>
                 <!-- <div class="el-upload__tip" slot="tip">{{$t('userinfo.uploadsize')}}</div>  -->
              </el-upload>
             </el-form-item>
            </div>
        </div>
          <!--支付宝 end-->
          <!--包括PayPal,PayNow,QIWI,Interac e-Transfer支付方式 Begin-->
          <div v-show="showPayPal">
            <div class="el-form-item el-form-item--medium">
                  <label for="account" class="el-form-item__label">{{AddPaymentMethodForm.accountType}}</label>
                  <div class="el-form-item__content">
                    <div class="el-input el-input--medium">
                      <input v-model="AddPaymentMethodForm.account" name="account" maxlength="64" autocomplete="off" type="text" class="el-input__inner">
                      </div>
                    </div>
            </div>
        </div>
      <!--包括PayPal,PayNow,QIWI,Interac e-Transfer支付方式 end-->
      <!--包括西联汇款，SWIFT支付方式 Begin-->
      <div v-show="showWesternUnion">
          <div class="el-form-item el-form-item--medium">
            <label for="account" class="el-form-item__label">{{AddPaymentMethodForm.accountType}}</label>
            <div class="el-form-item__content">
              <div class="el-input el-input--medium">
                <textarea v-model="AddPaymentMethodForm.swiftInfo" name="swiftInfo" maxlength="512" rows="4" autocomplete="off" class="el-textarea__inner"></textarea>
              </div>
            </div>
          </div>
      </div>
      <!--包括西联汇款，SWIFT支付方式 end-->

       <!--IMPS begin-->
        <div v-show="showImps">
          <div class="el-form-item el-form-item--medium">
            <label for="account" class="el-form-item__label">{{$t('payment.bankAccount')}}</label>
            <div class="el-form-item__content">
              <div class="el-input el-input--medium">
                <input v-model="AddPaymentMethodForm.account" name="account" maxlength="64" autocomplete="off" type="text" class="el-input__inner">
                </div>
            </div>
          </div>
          <div class="el-form-item el-form-item--medium">
              <label for="bankName" class="el-form-item__label">{{$t('payment.ifscCode')}}</label>
              <div class="el-form-item__content">
                <div class="el-input el-input--medium">
                  <input v-model="AddPaymentMethodForm.ifscCode" name="ifscCode" maxlength="64" autocomplete="off" type="text"  class="el-input__inner">
                  </div>
                </div>
          </div>
          <div class="el-form-item el-form-item--medium">
                <label for="subBank" class="el-form-item__label">{{$t('payment.bankHead')}}</label>
                <div class="el-form-item__content">
                  <div class="el-input el-input--medium">
                    <input v-model="AddPaymentMethodForm.bankName" name="bankName" maxlength="64" autocomplete="off" type="text"  class="el-input__inner">
                    </div>
                  </div>
              </div>
        </div>
        <!--IMPS end-->
        <div class="el-form-item el-form-item--medium">
          <label for="tradePwd" class="el-form-item__label">{{$t('common.tradePassword')}}</label>
          <div class="el-form-item__content">
            <div class="el-input el-input--medium"><!---->
              <input  v-model="AddPaymentMethodForm.tradePwd" type="password" :disabled='this.user.isExitTradePwd === 0?true:false' autocomplete="off" name="tradePwd"  class="el-input__inner">
              <!-- <div class='pwd flex-space'><span><i class='el-icon-pwd'></i></span><input type='password' v-model='AddPaymentMethodForm.tradePwd' :disabled='this.user.isExitTradePwd === 0?true:false'></div> -->
              <div class='text-right'> <router-link to='addTradePwd' >{{ this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>
            </div>
          </div>
        </div>
        </div>
        <div class="dia_submit flex-box">
          <button  @click="confirmClick" type="button" class="el-button btn btn_submit btn-primary el-button--default el-button--medium">
          <span>{{$t('fund.confirm')}}</span></button></div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    </el-form>

    <!--添加收款方式-支付宝 End-->
</div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {getPayMethodList,updatePaymentMethod,addOrModifyPayMethod} from "../../api/user";

  export default {
    name: "paymentMethod",
    data() {
      return {
        payTypeList:[],
        myPayMethodList:[],
        AddPaymentMethodForm: {
          paymentTypeId: null,
          paymentTypeName: null,//收款方式名称
          cssName: null,//图标样式名
          name:null,//真实姓名
          accountType:null,//账号类型 比如微信账号、支付宝账号等
          account:null,//收款账号
          bankName:null,//开户银行
          subBank:null,//开户支行
          qrcodeRemark:null,//上传二维码图片时的提示
          qrCode: null,//二维码图片
          tradePwd:null,//交易密码
          swiftInfo:null,//SWIFT信息
          ifscCode:null,//IFSC码
        },
        tempName:null,//临时保存用户姓名
        showdiv:false,
        showSelect:false, //单机控制是否会出现下拉选项
        showSelectFlag:false, //用于控制新增和修改页面是否能单机出现下拉选项,可作为新增或修改页面的标识
        placeholderText:this.$i18n.t('payment.selectPayMethod'),
        showCard:false,//添加银行卡控制开关
        showAlipay:false,//添加支付宝,微信,Paytm,UPI支付方式控制开关
        showPayPal: false,//PayPal,PayNow,QIWI,Interac e-Transfer支付方式
        showWesternUnion: false,//西联汇款，SWIFT支付方式
        showImps: false,//IMPS
        showDelete:false,//上传图片后展示删除按钮
        isShowRealNameVerification:false,//是否展示实名认证框
        isValid:false,//实名认证状态 2表示已认证
        isMerchant:false,//是否商家
      }
    },
    created(){
      this.getPayMethodList();
    },
     computed: {
      ...mapGetters(['user', 'token']),
      headers() {
        return {
          'UUID': this.token
        }
      }
    },
    methods: {
      getPayMethodList() {
        let $this = this;
        getPayMethodList().then((response) => {
          if (response.code === 200) {
            var data = response.data
            $this.payTypeList = data.payType;
            $this.myPayMethodList=data.myPayMethod;
            $this.tempName = data.name;
            $this.isValid = data.isValid;
            $this.isShowRealNameVerification=(data.isValid===2?false:true);
            $this.isMerchant = data.isMerchant;//1-投资者  2-商家,商家允许修改支付方式的姓名
          }
        });
      },
      addPayMethod(){
        let $this = this;
        if($this.isValid!==2){
          $this.isShowRealNameVerification = true;
          return;
        }
        $this.showdiv = true;
        $this.showSelect=false;
        $this.showSelectFlag=true;
        $this.AddPaymentMethodForm = {};//清空表单
        $this.AddPaymentMethodForm.name=$this.tempName;//姓名不清空
        $this.placeholderText=this.$i18n.t('payment.selectPayMethod');
        //隐藏所有的收款方式
        $this.showCard = false;
        $this.showAlipay = false;
        $this.showPayPal = false;
        $this.showWesternUnion = false;
        $this.showImps = false;
        $this.deleteLoadImg();
      },
      toSelectClick(item){//下拉选择收款方式
        let $this = this;
        $this.AddPaymentMethodForm = {};//清空表单其他信息
        $this.AddPaymentMethodForm.name=$this.tempName;//姓名不清空
        $this.AddPaymentMethodForm.paymentTypeId = item.paymentTypeId;
        $this.AddPaymentMethodForm.paymentTypeName = item.paymentTypeName;
        $this.AddPaymentMethodForm.cssName = item.remark;
        $this.placeholderText = '';
        $this.commonSelectMethod(item.paymentTypeId);
      },
      updateClick(id,paymentTypeId,status){//是否激活或关闭、删除
        let $this = this;
        updatePaymentMethod(id,paymentTypeId,status).then((response) => {
          if(response.code===200){
            if(status!==0&&status!==1){//删除操作才会提示成功操作
              this.$message({
              message:this.$i18n.t('common.deleteSuccess'),
              type: 'success',
              center: true,
              });//提示删除成功
            }
            this.getPayMethodList();//调方法局部刷新
          }
        });
      },
      modifyClick(id){//修改
        let $this = this;
        for(var i=0;i<$this.myPayMethodList.length;i++){
           if(id===$this.myPayMethodList[i].id){
             $this.AddPaymentMethodForm = $this.deepCopy($this.myPayMethodList[i]);;
           }
        }
        $this.placeholderText = '';
        $this.showdiv = true;
        $this.showSelect=false;
        $this.showSelectFlag=false;
        //$this.AddPaymentMethodForm.name=$this.tempName;//姓名不清空
        $this.commonSelectMethod($this.AddPaymentMethodForm.paymentTypeId);
        $this.AddPaymentMethodForm.qrCode?$this.commonCreatElement($this.AddPaymentMethodForm.qrCode):$this.deleteLoadImg();
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
      commonSelectMethod(paymentTypeId){
        let $this = this;
        $this.showSelect=false;
        $this.showCard = false;
        $this.showAlipay = false;
        $this.showPayPal = false;
        $this.showWesternUnion = false;
        $this.showImps = false;
        if(paymentTypeId===1){//银行卡
           $this.showCard = true;
        }else if(paymentTypeId===2||paymentTypeId===3||paymentTypeId===8||paymentTypeId===12){//支付宝,微信,Paytm,UPI
          $this.showAlipay = true;
          if(paymentTypeId===2){//微信
            $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.wechatAccount');
            $this.AddPaymentMethodForm.qrcodeRemark=$this.$i18n.t('payment.wechatUpload');
          }else if(paymentTypeId===3){//支付宝
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.alipayAccount');
             $this.AddPaymentMethodForm.qrcodeRemark=$this.$i18n.t('payment.alipayUpload');
          }else if(paymentTypeId===8){//Paytm
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.PaytmAccount');
             $this.AddPaymentMethodForm.qrcodeRemark=$this.$i18n.t('payment.paytmUpload');
          }else if(paymentTypeId===12){//UPI
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.UPIAccount');
             $this.AddPaymentMethodForm.qrcodeRemark=$this.$i18n.t('payment.UPIUpload');
          }
          if( document.querySelector(".el-upload__text")){
             document.querySelector(".el-upload__text").innerHTML =$this.AddPaymentMethodForm.qrcodeRemark;
          }
        }else if(paymentTypeId===4||paymentTypeId===7||paymentTypeId===9||paymentTypeId===10){//PayPal,PayNow,QIWI,Interac e-Transfer
          $this.showPayPal = true;
          if(paymentTypeId===4){//PayPal
            $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.payPalAccount');
          }else if(paymentTypeId===7){//PayNow
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.payNowAccount');
          }else if(paymentTypeId===9){//Paytm
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.qiwiAccount');
          }else if(paymentTypeId===10){//Interac e-Transfer
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.interacAccount');
          }
        }else if(paymentTypeId===5||paymentTypeId===6){//西联汇款，SWIFT
          $this.showWesternUnion = true;
          if(paymentTypeId===5){//西联汇款
            $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.westernUnionAccount');
          }else if(paymentTypeId===6){//SWIFT
             $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.swiftAccount');
          }
        }else if(paymentTypeId===11){//IMPS
          $this.showImps = true;
          $this.AddPaymentMethodForm.accountType=$this.$i18n.t('payment.IMPSAccount');
        }
      },
      confirmClick() {//确认提交    
        let $this = this;
        if (!$this.AddPaymentMethodForm.paymentTypeName) {
          $this.$message({
            message:  $this.$i18n.t('payment.selectPayMethod'),
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.name) {
          $this.$message({
            message:  $this.$i18n.t('userinfo.entryname'),
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.bankName&&$this.AddPaymentMethodForm.paymentTypeId===1) {
          $this.$message({
            message:  $this.$i18n.t('payment.bankNameIsNull'),
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.account&&$this.AddPaymentMethodForm.paymentTypeId!==5&&$this.AddPaymentMethodForm.paymentTypeId!==6) {
          var text ;
          if($this.AddPaymentMethodForm.paymentTypeId===11){
            text = $this.$i18n.t('payment.bankAccountIsNull');
          }else{
            text = $this.$i18n.t('payment.accountIsNull');
          }
          $this.$message({
            message: text,
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.qrCode&&$this.AddPaymentMethodForm.paymentTypeId===2) {
          $this.$message({
            message:  $this.$i18n.t('payment.wechatUpload'),
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.swiftInfo&&($this.AddPaymentMethodForm.paymentTypeId===5||$this.AddPaymentMethodForm.paymentTypeId===6)) {
          var text ;
          if($this.AddPaymentMethodForm.paymentTypeId===5){
              text = $this.$i18n.t('payment.westernUnionIsNull');
          }else if($this.AddPaymentMethodForm.paymentTypeId===6){
              text = $this.$i18n.t('payment.swiftIsNull');
          }
           $this.$message({
            message: text,
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.ifscCode&&$this.AddPaymentMethodForm.paymentTypeId===11) {
          $this.$message({
            message:  $this.$i18n.t('payment.ifscCodeIsNull'),
            type: 'error',
            center: true
          })
          return;
        }
        if (!$this.AddPaymentMethodForm.tradePwd) {
          $this.$message({
            message:  $this.$i18n.t('payment.tradePwdIsNull'),
            type: 'error',
            center: true
          })
          return;
        }
        addOrModifyPayMethod($this.AddPaymentMethodForm).then(response => {
          if (response.code === 200) {
            this.$message({
              message:$this.AddPaymentMethodForm.id?this.$i18n.t('payment.editSuccess'):this.$i18n.t('common.addSuccess'),
              type: 'success',
              center: true,
              });//提示新增成功
            $this.showdiv = false;
            this.getPayMethodList();//调方法局部刷新
          }
        })
      },
      uploadSucc(response, file, fileList){//上传图片成功后回调函数
        let $this = this;
        if(document.querySelector(".el-upload-list")){
          document.querySelector(".el-upload-list").innerHTML = ''; //清空组件自带的底部展示照片
        }
        if(response.code===200){
          $this.commonCreatElement(response.fileNames[0])
          $this.AddPaymentMethodForm.qrCode=response.fileNames[0];
        }else{//上传失败                
          if(response.msg==='ExceedeFileSizeLimit'){//超出上传大小限制
            this.$message({type: 'error',message:this.$i18n.t('userinfo.uploadsize')});
          }else{
            this.$message({type: 'error',message:this.$i18n.t('otc.operationFailed')});
          } 
        }
      },
      commonCreatElement(imgUrl){
        let $this = this;
        $this.showDelete = true;
        var pictureDiv = document.querySelector(".el-upload-dragger");
        if(document.querySelector(".el-icon-upload")&&document.querySelector(".el-upload__text")){
          pictureDiv.removeChild( document.querySelector(".el-icon-upload"));
          pictureDiv.removeChild( document.querySelector(".el-upload__text"));
        }
        if(document.querySelector(".delTag")){
           pictureDiv.removeChild(document.querySelector(".delTag"));
        }
        var img = document.createElement("img");
            img.src = imgUrl;img.width=200;img.height=100;img.className ="view-img delTag";
            pictureDiv.appendChild(img);
      },
      deleteLoadImg(){
        let $this = this;
         $this.showDelete = false;
         $this.AddPaymentMethodForm.qrCode = '';
         var pictureDiv = document.querySelector(".el-upload-dragger");
         if(document.querySelector(".delTag")){
           pictureDiv.removeChild(document.querySelector(".delTag"));
         };
         if(document.querySelector(".el-icon-upload")){
           pictureDiv.removeChild(document.querySelector(".el-icon-upload"));
         };
         if(document.querySelector(".el-upload__text")){
           pictureDiv.removeChild(document.querySelector(".el-upload__text"));
         };
         var i = document.createElement("i");i.className="el-icon-upload";//重新恢复上传的样式
         pictureDiv.appendChild(i);
         var div = document.createElement("div");div.className="el-upload__text";
         div.innerHTML=$this.AddPaymentMethodForm.qrcodeRemark?$this.AddPaymentMethodForm.qrcodeRemark:'';
         pictureDiv.appendChild(div);
      },
      //去实名验证
      goUserAuth() {
        this.isShowRealNameVerification = false;
        this.$router.push({name: "userauth"});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
</style>
