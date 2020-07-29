<template>
    <!--实时成交记录-->
    <div class="mod " :class="parentClass">
      <div class="mod_hd"><span class="mod_show_btn">
      <button @click="isActive=!isActive"><i></i></button>
      <span>{{$t('trade.realTrade')}}</span></span></div>
      <CollapseTransition ref="CollapseTransition">
      <div :class="showHideClass"  v-show="isActive">
        <div class="market_trades_list" style="overflow-x:auto">
          <el-table  :empty-text="$t('common.nodata')" :data="tradeInfo.tradeList"
                      v-loading.body="tradeInfo.listLoading"
                      style="width: 100%">
              <el-table-column
                prop="tradeTime"
                width="100"
                :label="$t('order.time')">
              </el-table-column>
              <el-table-column
                :label="$t('order.direction')" width="80"
                prop="direction">
                <template slot-scope="scope">
                  <el-tag :class="tradeInfo.color_buy" v-if="scope.row.direction===1">{{$t('common.buy')}}</el-tag>
                  <el-tag :class="tradeInfo.color_sell" v-else>{{$t('common.sell')}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                :render-header="priceHeader" width="120">
                <template slot-scope="scope">
                  <el-tag >{{scope.row.price.toFixed($parent.tradePriceDigit)}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                :render-header="volumnHeader" width="120">
              </el-table-column>
            </el-table>
          </div>
        </div>
        </CollapseTransition>
    </div>
    <!--实时成交记录END-->
  <!---登录后-委托历史END-->
</template>
<script>
  import CollapseTransition from "../../components/animate-contract";
  import {mapGetters} from "vuex";
  export default {
    computed: {
      ...mapGetters(['tradeInfo']),
      showHideClass(){
        return this.isActive?"mod_bd":"mod-hidden";
      },
      parentClass(){
        return this.isActive?"market_trades":"market_trades hide";
      }
    },
    components:{CollapseTransition},
    name: "realTimeTradeRecord",
    data(){
      return{
        isActive:true,

      }
    },
    methods:{
      priceHeader() {
        return this.$i18n.t('order.price')+ '('+(this.tradeInfo.basicSymbol?this.tradeInfo.basicSymbol:'')+')';
      },
      volumnHeader() {
        return this.$i18n.t('order.volume') + "("+(this.tradeInfo.tradeSymbol?this.tradeInfo.tradeSymbol:'')+")";
      }
    }


  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .mod-hidden{
    height:0px;

  }
  .market_trades_hidden{
    margin-top: 10px;
  }


  /*币种资料*/
  .market_trades_hidden.mod .mod_hd{
    padding-left: 10px;
    color:#0062df;
    margin:0;
    background-color: #fff;
  }
</style>
