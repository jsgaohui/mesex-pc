<template>
  <div>
    <div class="layout_doc">
      <!--基金-->
      <div class="fund-content" v-if="list">
        <!--<el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')"-->
                  <!--:data="list"-->
                  <!--style="width: 100%">-->
            <div :class="{ 'fund-box': true, 'pass': (item.status >=3  )}"   v-for="(item, index) in list">
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
              <div class="con flex-space"  >
                <div class="left flex-x-start" @click="toDetail(item)">
                  <div v-if="item.status === 6"><label>{{$t('fund.actual_profit')}}&nbsp;({{item.lockDate}}&nbsp;{{$t('fund.day')}})</label><br><span class="color-sell" style="font-size:18px;"><b>{{Number.parseFloat((item.currOneWorth - 1)*100).toFixed(2)}}%</b></span></div>
                  <!--<div><label> {{$t('fund.worth')}}</label><br><span>{{item.currOneWorth?item.currOneWorth:"&#45;&#45;"}}</span></div>-->
                  <div><label> {{$t('fund.expectProfit')}}</label><br><span>{{Number.parseFloat(item.expectProfit*100).toFixed(2)}}%</span></div>
                  <div><label> {{$t('fund.lockday')}}</label><br><span>{{item.lockDate}}&nbsp;{{$t('fund.day')}}</span></div>
                  <div><label> {{$t('fund.investTarget')}}</label><br><span>{{item.investTarget===1?$t('fund.spot'):item.investTarget===2?$t('fund.futures'):$t('fund.options')}}</span></div>
                  <div><label> {{$t('fund.range')}}</label><br><span>{{item.dcCode}}</span></div>
                  <div><label> {{$t('fund.investment')}}</label><br><span>{{item.minBuyNum}}&nbsp;{{item.dcCode}}</span></div>
                </div>
                <div class="right">
                  <div class="flex-space"><span><b class="bg"></b><b class="bg-color" :style="{'width': (item.status > 2 && item.rate < 100 ? 100 : (item.rate > 100 ? 100 : item.rate)) + '%'}"></b></span><em>{{(item.status > 2 && item.rate < 100 ? 100 : item.rate)}}%</em></div>

                  <a class="btn" v-if="item.status === 5">{{$t('fund.clearing')}}</a>
                  <a class="btn"  v-else-if="item.status===3">{{$t('fund.collectdone')}}</a>
                  <a class="btn"  v-else-if="item.status===4">{{$t('fund.run')}}</a>
                  <a class="btn" v-else-if="item.status ===6">{{$t('fund.cleared')}}</a>
                  <a v-else>
                    <!--不允許超額認購   按鈕变成灰色-->
                    <a    v-if="item.status === 1 || (item.rate >= 100 && item.overRange == 2 &&item.status==2)" class="btn" style="background:#4e556d" >{{$t('fund.buyNow')}}</a>
                    <a @click="toggleDialog(item)"   v-else-if="token" class="btn" >{{$t('fund.buyNow')}}</a>
                    <router-link to="login" class="btn" v-else>{{$t('fund.buyNow')}}</router-link>
                  </a>

                  <!--<a class="btn"  v-else>  <router-link to="login" class="logout">{{$t('login.logIn')}}</router-link></a>-->
                  <p class="flex-space">
                 <span @click="toggle(item)">{{$t('fund.detail')}}<i class="hb_icon_caret_down" ></i></span>
                  </p>
                </div>
                </div>

              <div class="con-hide" style="display:block"  v-show="item.showStatus" >

                <div class="more-con">
                  <i class="angle" style="right: 25px;"></i>
                  <div class="box-hd flex-space">
                    <div><label>{{$t('fund.distribution')}}</label><br><span>{{Number.parseFloat(item.proportion*100).toFixed(2)}}%+{{Number.parseFloat(100-item.proportion*100).toFixed(2)}}%</span></div>
                    <div><label>{{$t('fund.locktime')}}</label><br><span>{{item.cycleStarttime}}（GMT+8）--{{item.cycleEndtime}}（GMT+8）</span></div>
                    <div><label>{{$t('fund.cleartime')}}</label><br><span>{{item.clearTime?item.clearTime:item.cycleEndtime}}（GMT+8）</span></div>
                    <div><label>{{$t('fund.expectScale')}}</label><br><span>{{item.expectScale}}&nbsp;{{item.dcCode}}</span></div>
                  </div>
                  <div class="box-bd">
                    <div><label>{{$t('fund.manageintro')}}</label><span><b>{{item.manageintro}}</b></span></div>
                    <div><label>{{$t('fund.teamintro')}}</label><span>{{item.team}}</span></div>
                    <div><label>{{$t('fund.manageidea')}}</label><span>{{item.idea}}</span></div>
                  </div>
                </div>
              </div>

            </div>

        <div v-show="!listLoading">
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
          </div>
        </div>

      </div>
      <!--基金END-->

      <!--确认购买-->

        <div class="dialog_wrap" style="display: block;" v-show="showdiv" v-if="this.user">
          <div class="dialog">
            <div class="dia_tit">
              <div><b>{{$t('fund.amountPass')}}</b><span class="close" id="dia_close" @click="showdiv=false">×</span></div>
              <p data="dia_title" class="dia_tit_more"></p>
            </div>
            <div class="dia_content">
              <div class="fund-buy-tips">
                <label>{{$t('fund.buyVolume')}}<span v-if="overRange !== 1"> {{$t('fund.remain')+' '+remainAmount+ ' ' + userDcCode}}</span></label>
                <div class="price flex-space" style="margin-bottom:10px;">
                  <b @click="minus()">一</b><span>
                    <input name="orderVolume" v-model="dcForm.orderVolume" @keydown="oninput(6,$event)" maxlength="15" type="text" :placeholder="minNum+' '+userDcCode+' '+($t('fund.qi'))"/>
               </span><b @click="plus()">+</b>

                </div>
                <div class="text-right">  {{$t('fund.fund_balance')}}&nbsp;&nbsp;{{this.availableAmount}}&nbsp;{{this.userDcCode}}&nbsp;<router-link to="fundaccount"  >{{$t('fund.trans_in')}}</router-link></div>
                <label>{{$t('fund.payPassword')}}</label>
                <div class="pwd flex-space"><span><i class="el-icon-pwd"></i></span><input type="password" v-model="dcForm.payPassword" maxlength="6" :disabled="this.user.isExitTradePwd === 0?true:false"></div>
                <div class="text-right">  <router-link to="addTradePwd" >{{  this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>
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
    <!--实名验证提醒 Begin-->
      <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowRealNameVerification">
        <div class="dialog" style="width:524px;">
          <div class="dia_tit">
            <div><b>{{$t('otc.prompt')}}</b>
              <div class="float-r"><span class="close" id="dia_close" @click="isShowRealNameVerification=false">×</span></div>
            </div>
          </div>
          <div class="dia_content tips-removal" style="margin-top:0px;">
            <div class="text align_center" style="padding-top:0px;">{{$t('otc.doRealNameVerification')}}</div>
            <div class="icon-btn align_center"><i class="iconfont icon-close" @click="isShowRealNameVerification=false"></i><i class="iconfont icon-done" @click="goUserAuth()"></i></div>
          </div>
        </div>
        <div class="dialog_extra"></div>
      </div>
      <!--实名验证提醒 End-->
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {fundlist,buyFund,queryAssertByDcCode} from "../../api/fund";
  import {checkCode} from "../../utils/stringUtil";//只允许输入数字

  export default {
    computed: {
      ...mapGetters([ 'token','user']),
      buyStatus() {
        let aviFlag = Number.parseFloat(this.dcForm.orderVolume) > Number.parseFloat(this.availableAmount)
        let ifLogin = this.user.isExitTradePwd === 0
        let minFlag = Number.parseFloat(this.dcForm.orderVolume) < Number.parseFloat(this.minNum)
        let remainFlag = this.overRange !== 1 && Number.parseFloat(this.dcForm.orderVolume)  >  Number.parseFloat(this.remainAmount);
        if(minFlag ||  ifLogin || remainFlag || aviFlag) {
          return 1;
        }
        return 0;
      },
    },
    name: "fundindex",
    data(){
      const validOrderVolume = (rule, value, callback) => {
        if (!value || value < 0) {
          callback(new Error(this.$i18n.t('trade.buyRightVolume')))
        } else {
          callback()
        }
      }
      return {
        overRange: null,
        listLoading: true,
        showdiv: false,
        toggleStatus: [],
        availableAmount: 0,
        userDcCode: '',
        minNum: 0,
        remainAmount: 0,
        dcForm: {
          orderVolume: '',
          payPassword: '',
          fundId: ''
        },
        total:0,
        list: null,
        listQuery: {
          page: 1,
          limit: 10
        },
        activeIndex:-1,
        //实名验证
        validStatus: null,
        //是否显示实名验证
        isShowRealNameVerification:false,
      }
    },
    created(){
      this.getFundList();
    },
    methods: {
      oninput(length,e) {
        checkCode(length,e);

      },
      validOrderVolume(){
        if(this.dcForm.orderVolume <= 0 || this.dcForm.orderVolume < this.minNum){
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
        if(this.dcForm.payPassword.length < 6){
          this.$message({
            message:this.$i18n.t('fund.paypassword'),
            type: 'error',
            center: true
          });
          return false;
        }
        return true;
      },
      //去实名验证
      goUserAuth() {
        this.isShowRealNameVerification = false;
        this.$router.push({name: "userauth"});
      },
      toggleDialog(item){
        this.overRange = item.overRange
        queryAssertByDcCode(item.dcCode).then((response)=>{
          if(response.code===200){
            if (response.validStatus !== 2) {
              this.isShowRealNameVerification = true;
              return;
            }
            this.availableAmount = Number.parseFloat(response.data).toFixed(8).replace(/[.]?0+$/g,"");
            this.dcForm.fundId=item.fundId;
            this.showdiv = true;
            this.userDcCode = item.dcCode;
            this.minNum = item.minBuyNum;
            this.dcForm.orderVolume=item.minBuyNum;
            this.remainAmount =  Number.parseFloat(item.expectScale) -  Number.parseFloat(item.actualScale)
            this.dcForm.payPassword = ''
           // this.remainAmount = (Number.parseFloat(item.expectScale).toFixed(8) * ((Number.parseFloat(100)-Number.parseFloat(item.rate))/Number.parseFloat(100)).toFixed(8)).toFixed(8);
          }
        })


      },
      toDetail (item){
        if (this.token&& item.status===2 && (item.rate < 100 || item.overRange === 1)) {
          this.$router.push({name: 'funddetail',query:{ id:item.fundId }});
        }
      },
      toggle(item){
        item.showStatus = !item.showStatus;
      },
      plus(){
        this.dcForm.orderVolume = Number.parseFloat(Number.parseFloat(this.dcForm.orderVolume) + Number.parseFloat(0.1)).toFixed(8).replace(/[.]?0+$/g,"");
      },
      minus(){
        if (Number.parseFloat(this.dcForm.orderVolume) - 0.1 >= Number.parseFloat(this.minNum) ) {
          this.dcForm.orderVolume = Number.parseFloat(Number.parseFloat(this.dcForm.orderVolume) - Number.parseFloat(0.1)).toFixed(8).replace(/[.]?0+$/g,"");
        }
      },
      doDeal(){
        let $this=this;
        if(!this.validOrderVolume()){
          return;
        }
        if(!this.validPayPassword()){
          return;
        }
        buyFund($this.dcForm).then((response)=>{
          if(response.code===200){
            $this.$message({
              message:$this.$i18n.t('fund.buy_success'),
              type: 'success',
              center: true
            });
            this.getFundList()
            this.showdiv = false;
           //setTimeout("location.reload()", 1000);
          }
        })

      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getFundList();
      },
      getFundList(){
        let $this=this;
        fundlist(this.listQuery).then((response)=>{
          if(response.code===200){
            $this.list = response.rows;
            for(var i = 0 ;i<$this.list.length;i++){
              $this.$set($this.list[i], 'showStatus', false);
              if($this.list[i].fundManageInfo){
                var jsonOb = JSON.parse($this.list[i].fundManageInfo);
                $this.$set($this.list[i], 'manageintro', jsonOb.manageintro);
                $this.$set($this.list[i], 'team', jsonOb.team);
                $this.$set($this.list[i], 'idea', jsonOb.idea);
              }
              // var jsonObj = JSON.parse($this.list[i]);
              // jsonObj["showStatus"] = false;
              // $this.list[i] = JSON.parse(jsonObj);
            }

            $this.total = response.total;
            $this.listLoading = false;
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>
