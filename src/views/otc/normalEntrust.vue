<!--
<template>
  <div class="otc-main bg-color border-blue box box-x-left">
    <div class="issue-left">
      <div class="title">{{$t('otc.currencyCategory')}}</div>
      <ul>
        <li><a href="#">USDT/CNY</a></li>
        <li class="active"><a href="#">BTC/CNY</a></li>
        <li><a href="#">ETH/CNY</a></li>
        <li><a href="#">EOS/CNY</a></li>
      </ul>
    </div>
    <div class="issue-right">
      <div class="top box box-x-center box-space-bettwen">
        <div class="info">
          <span>BTC/CNY</span>
          <span>{{$t('otc.realTimePrice')}}:￥12345.84</span>
          <span>{{$t('otc.upsAndDowns')}}:<font class="color_down">+0.86%</font></span>
          <span>{{$t('otc.highestPrice')}}:￥12345.94</span>
          <span>{{$t('otc.floorPrice')}}：￥12345.54</span>
        </div>
        <a href="" @click.prevent="toBusinessEntrust">{{$t('otc.iAmACertifiedMerchant')}}</a>
      </div>
      <div class="form-con box box-x-center">
        <div class="left">
          <div class="tab-con">
            <div class="tab-hd box box-x-center">
              <a href="#" class="active">{{$t('otc.sell')}}</a>
              <a href="#">{{$t('otc.buy')}}</a>
            </div>
            <div class="tab-bd">
              <div class="box box-x-center box-y-center"><span>￥12345.96</span><em>{{$t('otc.sellEvaluate')}}</em></div>
              <p>{{$t('otc.referenceDayRisesAndFalls')}}<br><span class="color_down font16">+0.86%(￥0.14)</span></p>
            </div>
          </div>
          &lt;!&ndash;支付方式&ndash;&gt;
          <div class="pay">
            <a class="set">{{$t('otc.addOrModify')}}</a>
            <div class="pay-txt">{{$t('otc.selectPaymentMethod')}}</div>
            <div class="pay-con box box-x-center">
              <div class="pay-icon alipay-bg">
                <input id="icon-alipay" action="changeListState" type="checkbox" class="small online-icon">
                <label for="icon-alipay"><i class="iconfont icon-alipay"></i></label>
              </div>
              <div class="pay-icon card-bg">
                <input id="icon-card" action="changeListState" type="checkbox" class="small online-icon">
                <label for="icon-card"><i class="iconfont icon-card"></i></label>
              </div>
              <div class="pay-icon wechat-bg">
                <input id="icon-wechat" action="changeListState" type="checkbox" class="small online-icon">
                <label for="icon-wechat"><i class="iconfont icon-wechat"></i></label>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          &lt;!&ndash;具体操作&ndash;&gt;
          <div class="from-box bg-color02 border-blue box-radius">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.specificOperation')}}</b>

            </div>
            <div class="box-con">
              <div class="box box-x-left">
                <div><label>{{$t('otc.sellVolume')}}</label><input class="input-txt" type="text"/></div>
                <div><label>{{$t('otc.amount')}}</label><input type="text"  class="input-txt"/></div>
              </div>
            </div>
          </div>

          &lt;!&ndash;确认委托&ndash;&gt;
          <div class="from-box bg-color02 border-blue box-radius" style="display:block">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.confirmationCommission')}}</b>
            </div>
            <div class="box-con">
              <div class="box-y-center" style="display:none"><label>{{$t('otc.transactionPassword')}}</label><input type="text" class="input-txt input-pwd"/><input type="text"  class="input-txt input-pwd"/><input type="text"  class="input-txt input-pwd"/><input type="text"  class="input-txt input-pwd"/><input type="text"  class="input-txt input-pwd"/><a class="reset">{{$t('otc.reset')}}</a></div>

              <div class="notes box-y-center">
                <input id="changeListState" action="changeListState" type="checkbox" class="small">
                <label for="changeListState">{{$t('otc.agreedToTheTransaction')}}</label>
              </div>
              <div class="btn-box"><button class="otc-btn">{{$t('otc.confirmRelease')}}</button></div>
            </div>
          </div>
          &lt;!&ndash;确认委托 END&ndash;&gt;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {fundlist,buyFund} from "../../api/fund";

    export default {
        name: "normalEntrust",
      computed: {
        ...mapGetters([ 'token'])

      },
      data(){
        const validOrderVolume = (rule, value, callback) => {
          if (!value || value < 0) {
            callback(new Error(this.$i18n.t('trade.buyRightVolume')))
          } else {
            callback()
          }
        }
        return{
          listLoading: true,
          showdiv:false,
          userDcCode:'',
          dcForm:{
            orderVolume : '',
            payPassword : '',
            fundId:''
          },
          dcFormRules: {
            orderVolume: [{required: true,validator: validOrderVolume}]
          },
          total:0,
          list: null,
          listQuery: {
            page: 1,
            limit: 10
          },
          activeIndex:-1
        }
      },
      created(){

      },
      methods: {
        toggleDialog(id,dcCode){
          this.dcForm.fundId=id;
          this.showdiv = true;
          this.userDcCode = dcCode;
        },
        /**
         * 去商家委托
         */
        toBusinessEntrust() {
          this.$router.push({name: 'businessEntrust'});
        },
        toggle(index){
          this.activeIndex = index;
        },
        doDeal(){
          let $this=this;
          this.$refs.dcForm.validate(isValid  =>{
            if (isValid) {
              buyFund($this.dcForm).then((response)=>{
                if(response.code===200){
                  this.$router.push({path: 'fundorder'});
                }
              })
            }
          });

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
              $this.total = response.total;
              $this.listLoading = false;
            }
          })
        }
      }
    }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
  @import "src/styles/font-css.scss";
</style>
-->
