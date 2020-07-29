<template>
  <div>

    <div class="fund-content" v-if="item">
      <!--募集中-->
      <div :class="{ 'fund-box': true, 'pass': (item.status >=3)}" >
        <div class="top flex-space">
          <h2>
            <em>{{item.strategyType===1?$t('fund.steady'):$t('fund.aggressive')}}-{{item.fundName}}</em>
            <span v-if="item.status==1">{{$t('fund.wait')}}</span>
            <span  v-else-if="item.status==2">{{$t('fund.collect')}}</span>
            <span  v-else-if="item.status==3">{{$t('fund.collectdone')}}</span>
            <span  v-else-if="item.status==4">{{$t('fund.run')}}</span>
            <span  v-else-if="item.status==5">{{$t('fund.clearing')}}</span>
            <span  v-else-if="item.status==6">{{$t('fund.cleared')}}</span>
          </h2>

          <span v-if="item.status===1">{{$t('fund.deallinebegin')}} : {{item.buyStarttime}}</span>
          <span v-else-if="item.status===2||item.status===3">{{$t('fund.dealline')}} : {{item.buyEndtime}}</span>
          <span v-else-if="item.status===4||item.status===5">{{$t('fund.cycleEndtime')}} : {{item.cycleEndtime}}</span>
          <span  v-else>{{$t('fund.cleartime')}} : {{item.clearTime}}</span>
        </div>
        <div class="buy-con flex-space">
          <div class="left">
            <div class="left-hd flex-x-start">
              <div><label>{{$t('fund.expectProfit')}}</label><br><span class="blue">{{Number.parseFloat(item.expectProfit*100).toFixed(2)}}%</span></div>
              <div><label>{{$t('fund.lockday')}}</label><br><span>{{item.lockDate}}{{$t('fund.day')}}</span></div>
              <div><label>{{$t('fund.investTarget')}}</label><br><span>{{item.investTarget===1?$t('fund.spot'):item.investTarget===2?$t('fund.futures'):$t('fund.options')}}</span></div>
              <div><label>{{$t('fund.distribution')}}</label><br><span>{{Number.parseFloat(item.proportion*100).toFixed(2)}}%+{{Number.parseFloat(100-item.proportion*100).toFixed(2)}}%</span></div>
              <div><label>{{$t('fund.range')}}</label><br><span>{{item.dcCode}}</span></div>
            </div>
            <div class="left-bd flex-space-t">
              <div><label>{{$t('fund.locktime')}}</label><br><span>{{item.cycleStarttime}} （GMT+8）-- {{item.cycleEndtime}}（GMT+8）</span></div>
              <div><label>{{$t('fund.cleartime')}}</label><br><span>{{item.clearTime?item.clearTime:item.cycleEndtime}}（GMT+8）</span></div>
              <div><label>{{$t('fund.expectScale')}}</label><br><span>{{item.expectScale}}&nbsp;{{item.dcCode}}</span></div>
            </div>
          </div>


          <div class="right">
            <!--<div class="right" style="margin:0px 0px 10px 0px;">{{$t('fund.buyVolume')}}<span stlye="font-size:12px;"> {{$t('fund.remain')+' '+remainAmount+ ' '}}</span></div>-->
            <div class="info flex-x-end"><a href="#"><i class="el-icon-transfer"></i><router-link to="fundaccount" >{{$t('fund.trans_in')}}</router-link></a></div>
            <div class="info flex-space" v-if="this.item.overRange !== 1"><label>{{$t('fund.remain')}}：</label><span>{{Number.parseFloat(this.remainAmount).toFixed(8).replace(/[.]?0+$/g,"")}}&nbsp;{{item.dcCode}}</span></div>
            <div class="info flex-space"><label> {{$t('fund.fund_balance')}}：</label><span>{{Number.parseFloat(this.availableAmount).toFixed(8).replace(/[.]?0+$/g,"")}}&nbsp;{{this.dcCode}}</span></div>
            <div class="price flex-space">

              <b  @click="minus(item.minBuyNum)">一</b><span>

                <!--<el-input type="number" v-model="buyFundF     rderVolume"  name="orderVolume"></el-input>-->

              <input type="text" v-model.number="buyFundForm.orderVolume" @keydown="oninput(maxLength,$event)" maxlength="15" autocomplete="off" :placeholder="item.minBuyNum + ' '  + item.dcCode + ' ' + $t('fund.qi')" />
      <!--<em>{{item.minBuyNum}}&nbsp;{{item.dcCode}}&nbsp;{{$t('fund.qi')}}</em>-->
            </span><b @click="plus()">+</b>
            </div>
            <!--<p class="flex-space">-->
              <!--{{$t('fund.rate')}}：{{Number.parseFloat(item.subscripeRate*100).toFixed(2)}}%-->

            <!--</p>-->
            <a  class="btn" @click="buyFund(item)" v-if="item.status === 2 &&  (this.buyStatus === 0)  " >{{$t('fund.buyNow')}}</a>
            <a  class="btn" style="background:#4e556d" v-else>{{$t('fund.buyNow')}}</a>
          </div>

          <!--确认购买-->
          <div class="dialog_wrap" style="display: block;" v-show="showdiv">
              <div class="dialog">

                <div class="dia_tit">
                  <div><b>{{$t('fund.inputPass')}}</b><span class="close" id="dia_close" @click="showdiv=false">×</span></div>
                  <p data="dia_title" class="dia_tit_more"></p>
                </div>
                <div class="dia_content">
                  <div class="fund-buy-tips">
                    <label>{{$t('fund.payPassword')}}<span>  {{$t('fund.fund_balance')}}&nbsp;&nbsp;{{Number.parseFloat(this.availableAmount).toFixed(8).replace(/[.]?0+$/g,"")}}&nbsp;{{this.dcCode}}</span></label>
                    <div class="pwd flex-space"><span><i class="el-icon-pwd"></i></span><input type="password" v-model="buyFundForm.payPassword" maxlength="6" :disabled="this.user.isExitTradePwd === 0?true:false"></div>

                    <div class="text-right">
                      <router-link to="addTradePwd" >{{ this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>


                  </div>

                </div>
                <div class="dia_submit flex-box">
                  <button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="doDeal()" :disabled="this.buyStatus > 0 ? true:false"> {{$t('fund.confirm')}}</button>
                </div>
              </div>
              <div class="dialog_extra"></div>
            </div>
          <!--确认购买END-->
        </div>

      </div>
      <!--募集中END-->
      <!--项目介绍-->
      <div class="info-box">
        <div class="hd"><span>{{$t('fund.iteminro')}}</span></div>
        <div class="bd">
          <div><label>{{$t('fund.manageintro')}}</label><span><b>{{item.manageintro}}</b></span></div>
          <div><label>{{$t('fund.teamintro')}}</label><span>{{item.team}}</span></div>
          <div><label>{{$t('fund.manageidea')}}</label><span>{{item.idea}}</span></div>
        </div>
      </div>
      <!--项目介绍END-->
    </div>
    <!--基金END-->

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {funddetail,buyFund,queryAssertByDcCode} from "../../api/fund";
  import {checkCode} from "../../utils/stringUtil";//只允许输入数字
  export default {
    computed: {
      ...mapGetters([ 'token','user']),
      buyStatus() {
        //大于可用数量或者没有设置交易密码,按钮变灰色
        let aviFlag = Number.parseFloat(this.buyFundForm.orderVolume) > Number.parseFloat(this.availableAmount)
        let ifLogin = this.user.isExitTradePwd === 0
        let minFlag = Number.parseFloat(this.buyFundForm.orderVolume) < Number.parseFloat(this.minNum)
        let remainFlag = this.item.overRange !== 1 && Number.parseFloat(this.buyFundForm.orderVolume)  >  Number.parseFloat(this.remainAmount);
        if(minFlag ||  ifLogin || remainFlag || aviFlag){
          return 1;
        }
        return 0;
      }
    },
    name: "funddetail",
    data(){

      return{
        showdiv:false,
        maxLength:6,
        total:0,
        listLoading: true,
        item: null,
        minNum:0,
        availableAmount:0,
        activeIndex:0,
        dcCode:'',
        buyFundForm:{
          orderVolume : 0,
          fundId : 0,
          payPassword:'',
        }
      }
    },
    created(){
      var id=this.$route.query.id;
     this.getFundDetail(id);
    },
    methods: {
      oninput(length,e) {
        checkCode(length,e);

      },
      validOrderVolume(){
        if(this.buyFundForm.orderVolume <= 0 || this.buyFundForm.orderVolume < this.minNum){
          this.$message({
                  message:this.$i18n.t('trade.buyRightVolume'),
                  type: 'error',
                  center: true
                });
          return false;
        }
        return true;
      },
      validPayPassword(){
        if(this.buyFundForm.payPassword.length < 6){
          this.$message({
            message:this.$i18n.t('fund.paypassword'),
            type: 'error',
            center: true
          });
          return false;
        }
        return true;
      },
      buyFund(item){
        // if(this.user.isExitTradePwd === 0){
        //   //未設置支付密碼
        //   //this.$router.push({path: 'addTradePwd'});
        // }

        this.buyFundForm.fundId=item.fundId;
        this.showdiv = true;
      },
      doDeal(){
        let $this=this;
        if(!this.validOrderVolume()){
          return;
        }
        if(!this.validPayPassword()){
          return;
        }
        buyFund($this.buyFundForm).then((response)=>{
          if(response.code===200){
            $this.$message({
              message:$this.$i18n.t('fund.buy_success'),
              type: 'success',
              center: true
            });
            $this.showdiv = false;
            var id=this.$route.query.id;
            $this.getFundDetail(id);
          }
        })

      },
      plus(){
        this.buyFundForm.orderVolume = Number.parseFloat(Number.parseFloat(this.buyFundForm.orderVolume) + Number.parseFloat(0.1)).toFixed(8).replace(/[.]?0+$/g,"");
      },
      minus(minNum){
        if (Number.parseFloat(this.buyFundForm.orderVolume) - 0.1 >= Number.parseFloat(minNum) ) {
          this.buyFundForm.orderVolume = Number.parseFloat(Number.parseFloat(this.buyFundForm.orderVolume) - Number.parseFloat(0.1)).toFixed(8).replace(/[.]?0+$/g,"");
        }else{
          this.buyFundForm.orderVolume = Number.parseFloat(minNum).toFixed(8).replace(/[.]?0+$/g,"");
        }

      },
      getFundDetail(id){
        let $this=this;
        funddetail({"id":id}).then((response)=>{
          if(response.code===200){
            $this.item = response.data;
            if($this.item.fundManageInfo){
              var jsonOb = JSON.parse($this.item.fundManageInfo);
              $this.$set($this.item, 'manageintro', jsonOb.manageintro);
              $this.$set($this.item, 'team', jsonOb.team);
              $this.$set($this.item, 'idea', jsonOb.idea);
            }
            $this.buyFundForm.orderVolume = $this.item.minBuyNum;
            $this.buyFundForm.fundId=$this.item.id;
            $this.dcCode = $this.item.dcCode;
            $this.minNum = Number.parseFloat($this.item.minBuyNum).toFixed(8).replace(/[.]?0+$/g,"");
            $this.listLoading = false;

            queryAssertByDcCode($this.dcCode).then((response)=>{
              if(response.code===200){
                $this.availableAmount = Number.parseFloat(response.data).toFixed(8).replace(/[.]?0+$/g,"");
                $this.remainAmount =  Number.parseFloat($this.item.expectScale) -  Number.parseFloat($this.item.actualScale)
              }
            })


          }
        })




      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  @import "src/styles/nc.scss";

</style>
