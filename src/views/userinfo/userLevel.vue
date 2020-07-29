<template>
  <div>
    <div class="layout_doc" v-if="this.item">
      <!--我的特权-->
      <div class="privilege-content">
        <div class="path">{{$t('userlevel.privilege')}}</div>
        <!--会员等级-->
        <div class="pri-box">
          <div class="top flex-space">
            <div class="left">
              <h2 class="vip-text">
                {{$t('userlevel.level')}}：
                <span v-if="item.levelId === 0">{{$t('userlevel.common_user')}}</span>
                 <i :class="'el-icon-v v'+item.levelId"  v-else ><b>{{item.levelId}}</b></i>
              </h2>

              <em v-if="item.levelId > 0">{{$t('userlevel.current_pri')}}（{{ item.levelId > 0 ? Number.parseFloat(item.map[item.levelId].rate * 100).toFixed(2) : 0}}%）</em>
            </div>
            <div class="right">
            <span>
              {{$t('userlevel.lock_volume')}}：<em>{{item.freezeAmount}}</em>&nbsp;{{$t('userlevel.currency')}}
            </span>
              <a  v-if="!ifCanUnfreeze">{{$t('userlevel.unlock')}}</a>
              <a  v-else @click="unFreeze()">{{$t('userlevel.unlock')}}</a>
              <!--<a href="#" :class="Number.parseFloat(item.freezeAmount) < 0 ? 'opened': ''">{{$t('userlevel.unlock')}}</a>-->
            </div>
          </div>
          <div class="pri-con flex-space">
            <ul class="vip-list flex-space">
              <li v-for="(value, key,index) in item.map">
                <div class="con">
                  <div class="vip-bg">
                    <div class="vip-top">
                      <span><img src="@/assets/images/vip-img.png"><img :src="getImg('vip-'+(index+1)+'.png')"></span></div>
                    <div class="arrow-down"></div>
                  </div>
                  <p>{{$t('userlevel.tradefee')}} {{Number.parseFloat(item.map[key].rate*100).toFixed(2)}}%<br>{{$t('userlevel.commission')}} {{Number.parseFloat(item.map[key].rate*100).toFixed(2)}}%<br>{{$t('userlevel.lock')}}&nbsp;{{item.map[key].udtFreeze}}&nbsp;{{$t('userlevel.currency')}}</p>
                </div>
                <a href="#" class="open-btn opened" v-if="item.levelId >= key"><i class="el-icon-vip-pwd"></i>{{$t('userlevel.opened')}}</a>
                <a class="open-btn" v-else @click="levelUpDialogShow(key,value)"><i class="el-icon-vip-pwd" ></i>{{$t('userlevel.open')}}</a>
              </li>
            </ul>

          </div>

        </div>
        <!--会员等级END-->
        <!--手续费返佣订单-->
        <div class="info-box">
          <div class="hd flex-space">
            <div class="left">{{$t('userlevel.cmsorder')}}</div>
            <div class="search-con">
              {{$t('userlevel.time')}}：
              <el-date-picker
                v-model="listQuery.beginDate"
                class="time"
                type="date"
                :picker-options="pickerBeginDateBefore"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :placeholder="$t('otc.selectStartDate')">
              </el-date-picker>
              <span class="date-line"></span>
              <el-date-picker
                class="time"
                value-format="yyyy-MM-dd"
                v-model="listQuery.endDate"
                type="date"
                :picker-options="pickerBeginDateAfter"
                format="yyyy-MM-dd"
                :placeholder="$t('otc.selectEndDate')">
              </el-date-picker>
              <a><i class="hb_icon_search" @click="rangeQuery()"></i></a>
            </div>
          </div>
          <div class="bd">
            <!--列表-->
            <div class="order-list">
              <div class="el-table table el-table--fit el-table--enable-row-hover el-table--medium" style="width: 100%;">
                <div class="el-table__header-wrapper">
                  <el-table  :empty-text="$t('common.nodata')" :data="list" style="width: 100%"  class="el-table__header">
                    <el-table-column
                      prop="flowPrimary"
                      :label="$t('userlevel.orderNo')"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      :label="$t('userlevel.userName')"
                      width="200"
                      prop="userName">
                    </el-table-column>
                    <el-table-column
                      :label="$t('userlevel.volume')"
                      width="200">
                      <template slot-scope="scope">
                        {{ Number.parseFloat(scope.row.totalCommission).toFixed(8).replace(/[.]?0+$/g,"")}}&nbsp;{{scope.row.dcCode}}
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('userlevel.commission')"
                      width="200">
                      <template slot-scope="scope">
                        {{ Number.parseFloat(scope.row.commission).toFixed(8).replace(/[.]?0+$/g,"")}}&nbsp;{{scope.row.changeDcCode}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('userlevel.rate')"
                      width="200">
                      <template slot-scope="scope">
                        {{ Number.parseFloat(scope.row.commissionRate*100).toFixed(8).replace(/[.]?0+$/g,"")}}%
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('userlevel.settle_status')"
                      width="200">
                      <template slot-scope="scope">
                        {{Number.parseInt(scope.row.settleStatus) === 0 ? $t('userlevel.settle_failed'):$t('userlevel.settle_success')}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('userlevel.time')"
                      prop="createTime"
                    >
                    </el-table-column>

                  </el-table>
                </div>
              </div>
            </div>
            <!--列表END-->
            <div v-show="!listLoading">
              <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                               :page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
              </div>
            </div>
            <!--特权说明-->
            <div class="explain">
              <p>{{$t('userlevel.pri_descri')}}<br>
                {{$t('userlevel.pri_content_1')}}<br>
                {{$t('userlevel.pri_content_2')}}<br>
                {{$t('userlevel.pri_content_3')}}<br>
                {{$t('userlevel.pri_content_4')}}<br>
                {{$t('userlevel.pri_content_5')}}<br>
              {{$t('userlevel.pri_content_6')}}<br>
              {{$t('userlevel.pri_content_7')}}</p>
            </div>
            <!--特权说明END-->
          </div>
        </div>
        <!--手续费返佣订单END-->
      </div>
      <!--我的特权END-->
    </div>
    <div class="dialog_wrap"  v-show="showdiv" v-if="this.chooseLevel">
      <div class="dialog">
        <div class="dia_tit">
          <div>
            <h2 class="vip-text" v-if="item.levelId > 0"> {{$t('userlevel.level')}}：
            <i :class="'el-icon-v v'+item.levelId"><b>{{item.levelId}}</b></i>
          </h2>
            <h2 class="vip-text" v-else> {{$t('userlevel.level')}}：
              {{$t('userlevel.common_user')}}
            </h2>
            <span class="close" id="dia_close" @click="showdiv = false">×</span></div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
        <div class="dia_content">
          <div class="fund-buy-tips privilege-tip">
            <div class="flex-space"><label>{{$t('userlevel.choose_level')}}</label><span>{{$t('userlevel.cmsrate')}}：（{{  changeForm.levelId > 0 ? Number.parseFloat(item.map[changeForm.levelId].rate * 100).toFixed(2):0 }}%）</span></div>

            <el-select v-model="changeForm.levelId" :placeholder="$t('userlevel.pleasechoose')" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <div class="info-con flex-space"><label>{{$t('userlevel.need')}} : {{changeForm.levelId > 0 ? Number.parseFloat(item.map[changeForm.levelId].udtFreeze-this.item.freezeAmount).toFixed(8).replace(/[.]?0+$/g,""):0}} {{$t('userlevel.currency')}}</label>
              <router-link to="tradeaccount"  v-if="ifCanLevelUp" >{{$t('userlevel.balance_not_enough')}}</router-link>
              <span v-else>{{$t('userlevel.current')}} {{$t('userlevel.currency')}} {{$t('userlevel.balance')}}: {{Number.parseFloat(this.item.availableAmount).toFixed(8).replace(/[.]?0+$/g,"")}}</span>
            </div>

          </div>
        </div>
        <div class="dia_submit flex-box">
          <button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="levelUp()" :disabled="ifCanLevelUp">{{$t('userlevel.levelupnow')}}</button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <div class="dialog_wrap" v-show="freezediv">
      <div class="dialog">
        <div class="dia_tit">
          <div><h2 class="vip-text">
          </h2>
            <span class="close"  @click="freezediv = false">×</span></div>

        </div>
        <div class="dia_content">
          <div class="align_center" style="padding:20px 0px"> {{$t('userlevel.unfreezeTips')}}</div>

        </div>
        <div class="dia_submit flex-space">
          <button class="btn btn_submit btn-primary" pro_name="btn_submit"  @click="freezediv = !freezediv"  style="width:200px;margin-left: 20px;">{{$t('userlevel.cancel')}}</button>
          <button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="changeUserLevel()"  style="width:200px;margin-right: 20px;">{{$t('userlevel.confirm')}}</button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getUserLevel, getOwnCommission, changeUserLevel} from '@/api/user'
export default {
  computed: {
    ...mapGetters(['user', 'token']),
    ifCanUnfreeze () {
      return (Number.parseFloat(this.item.freezeAmount) > 0 || this.item.levelId > 0) && !this.listLoading
    },
    ifCanLevelUp () {
      return Number.parseFloat(this.chooseLevel.udtFreeze - this.item.freezeAmount) > Number.parseFloat(this.item.availableAmount)
    }
  },
  name: 'userLevel',
  data () {
    return {
      freezediv: false,
      showdiv: false,
      item: null,
      list: null,
      listLoading: true,
      chooseLevel: null,
      changeForm: {
        preLevelId: null,
        levelId: null
      },
      listQuery: {
        page: 1,
        limit: 10,
        beginDate: '',
        endDate: ''
      },
      options: [],
      pickerBeginDateBefore:{
        disabledDate: (time) => {
          let endDateDateVal = this.listQuery.endDate;
          if (endDateDateVal) {
            return time.getTime() > new Date(endDateDateVal).getTime() ||  time.getTime() > Date.now()/* - 1000 * 60 * 60 * 24*/;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerBeginDateAfter:{
        disabledDate: (time) => {
          let beginDateVal = this.listQuery.beginDate;
          if (beginDateVal) {
            return time.getTime() < (new Date(beginDateVal).getTime() - 1000 * 60 * 60 * 24) || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
    }
  },
  created () {
    this.getUserLevel()
    this.getCommissionLog()
  },

  methods: {

    getImg (srcImage) {
      return require('@/assets/images/' + srcImage)
    },
    rangeQuery () {
      this.listQuery.page = 1
      this.getCommissionLog()
    },
    levelUpDialogShow (key, value) {
      this.showdiv = true
      this.changeForm.levelId = parseInt(key)
      this.chooseLevel = value
      this.options = []
      for (var i = this.item.levelId + 1; i < 6; i++) {
        let element = {value: i, label: 'VIP' + i}
        this.options.push(element)
      }
    },
    getUserLevel () {
      this.listLoading = true
      getUserLevel()
        .then(response => {
          if (response.code === 200) {
            this.item = response.data.result
            this.listLoading = false
            this.changeForm.preLevelId = this.item.levelId
          }
        })
    },
    getCommissionLog () {
      this.listLoading = true
      let $this = this
      getOwnCommission(this.listQuery).then((response) => {
        if (response.code === 200) {
          $this.list = response.data.result.records
          $this.listLoading = false
          $this.total = response.data.result.total
        }
      })
    },
    unFreeze () {
      this.changeForm.levelId = 0
      this.freezediv = true
      // this.changeUserLevel()
    },
    levelUp () {
      if (this.ifCanLevelUp) return
      this.changeUserLevel()
    },
    changeUserLevel () {
      let $this = this
      changeUserLevel($this.changeForm).then((response) => {
        if (response.code === 200) {
          $this.showdiv = false
          $this.freezediv = false
          $this.$message({
            message: $this.$i18n.t('userlevel.op_success'),
            type: 'success',
            center: true
          })
          setTimeout(function () {
            $this.getUserLevel()
          }, 1000)
        }
      })
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getCommissionLog()
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss'>
  @import 'src/styles/nc.scss';
</style>
