<template>
  <div>
    <div class="layout_doc">
      <!--基金-->
      <div class="fund-content">
        <!--跟单交易订单-->
        <div class="order-box">
          <div class="top flex-space">
            <div class="text">{{$t('fund.fundorder')}}</div>
            <div class="r-con">
              <label>{{$t('fund.fundName')}}：</label>
              <input type="text" v-model="listQuery.fundName" maxlength="20"><label>{{$t('fund.orderStatus')}}：</label>
              <!--<input type="text" :placeholder="$t('fund.choose')">-->
              <select  name="status" v-model="listQuery.status" >
                <option value="" selected="selected">{{$t('fund.choose')}}</option>
                <option v-for="item in status" :value="item.code">
                  {{ item.name }}
                </option>
              </select>
              <!--<el-select  no-data-text="$t('common.loading')" v-model="listQuery.fundStatus" name="fundStatus"  :placeholder="$t('fund.choose')" >-->
              <!--<el-option v-for="item in status" :key="item.code" :vale="item.name">-->
              <!--{{ item.name }}-->
              <!--</el-option>-->
              <!--</el-select>-->


              <a><i class="hb_icon_search" @click="getFundOrderList()"></i></a>

            </div>
          </div>
          <div class="order-list">
            <el-table  :empty-text="$t('common.nodata')" :data="list" style="width: 100%"  class="table">
              <el-table-column
                prop="fundName"
                :label="$t('fund.fundName')"
                width="200">
              </el-table-column>
              <el-table-column
                :label="$t('fund.buyVolume')"
                width="200">
                <template slot-scope="scope">
                  {{ Number.parseFloat(scope.row.orderVolume).toFixed(8)}}&nbsp;{{scope.row.dcCode}}
                </template>
              </el-table-column>
              <el-table-column
                 width="180"
                :label="$t('fund.actual_profit')" >
                <template slot-scope="scope">
                  <div class="color-sell">{{Number.parseFloat(scope.row.yield*100).toFixed(2)}}%</div>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--width="200"-->
                <!--:label="$t('fund.orderVolume')">-->
                <!--<template slot-scope="scope">-->
                  <!--{{ Number.parseFloat(scope.row.orderVolume).toFixed(8)}}&nbsp;{{scope.row.dcCode}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                   width="200"
                :label="$t('fund.profitLoss')">
                <template slot-scope="item">
                  {{item.row.profiltVolume?item.row.profiltVolume+" "+item.row.dcCode:(item.row.oneDayProfilt?item.row.oneDayProfilt+" "+item.row.dcCode:"--")}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
                 <!--width="150"-->
                <!--:label="$t('fund.actual_profitLoss')">-->
                <!--<template slot-scope="item">-->
                 <!--{{item.row.profiltVolume?item.row.profiltVolume+" "+item.row.dcCode:"&#45;&#45;"}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
               width="150"
                :label="$t('fund.orderStatus')">
                <template slot-scope="item">
                  <span v-if="item.row.status==1">{{$t('fund.subscribe')}}</span>
                  <span  v-else-if="item.row.status==2">{{$t('fund.running')}}</span>
                  <span  v-else-if="item.row.status==3">{{$t('fund.settleing')}}</span>
                  <span  v-else-if="item.row.status==4">{{$t('fund.settled')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderTime"
                :label="$t('fund.buyTime')">
              </el-table-column>
            </el-table>
            <div v-show="!listLoading">
              <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                               :page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--基金END-->
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {fundOrderList} from "../../api/fund";
  import {escape2Html} from "../../utils/stringUtil";

  export default {
    computed: {
      ...mapGetters([ 'token'])

    },
    name: "index",
    data(){

      return{
        status:
          [
            {code: 1,name:this.$i18n.t('fund.subscribe')},
            {code: 2,name:this.$i18n.t('fund.running')},
            {code: 3,name:this.$i18n.t('fund.settleing')},
            {code: 4,name:this.$i18n.t('fund.settled')}
          ],
        total:0,
        listLoading: true,
        list: null,
        listQuery: {
          page: 1,
          limit: 10,
          status:'',
          fundName:''
        }
      }
    },
    created(){
      this.getFundOrderList();
    },
    methods: {
      toggle(index){
        console.log(index);
        this.activeIndex = index;
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getFundOrderList();
      },
      getFundOrderList(){
        let $this=this;
        fundOrderList(this.listQuery).then((response)=>{
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
  @import "src/styles/nc.scss";
</style>
