<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div>
  <div class="invite-header-ad" :style = "{ background:'url('+require('@/assets/images/invite_banner.jpg')+') no-repeat center'}" ><p class="invite">{{$t('invite.headerAd')}}</p>
    <!--<p class="gain" id="brokerage_rate">{{$t('invite.headerTips')}}</p>-->
    <!--<p class="btn_wrap"><a href="/zh-cn/login/" class="banner_btn" data-action="go_login">登录接受邀请拿返利</a></p>-->
  </div>
  <div class="page_invite">

    <!--分享方式-->
    <div class="user_invite_wrap login_show">
      <div class="user_banner"><p>{{$t('invite.shareType')}}</p></div>
      <div id="invitation">
        <div class="share_style login_show">
          <div class="user_code share_div"><p>{{$t('invite.personVisitCode')}}</p>
            <div class="share_code_wrap"><p class="share_code">{{user.visitCode}}</p>
              <a class="copy_url copy_btn copy_url_1"  @click="handleCopy(user.visitCode,$event)">{{$t('invite.copyVisitCode')}}</a>
            </div>
          </div>
          <div class="user_url share_div"><p>{{$t('invite.personUrl')}}</p>
            <div class="share_code_wrap">
              <p class="url">
                  <input type="text" class="share_link" disabled="disabled"
                        v-model="url+user.visitCode" />
              </p>
              <a class="copy_url copy_btn copy_url_2"
                 @click="handleCopy(url+user.visitCode,$event)">{{$t('invite.copyUrl')}}</a></div>
          </div>
        </div>
      </div>
    </div>
    <!--分享方式END-->
    <!--<a href="" target="_blank" class="user_comm login_show"><p>{{$t('invite.tips')}}</p></a>-->

    <!--邀请人数-->
    <div class="invite_total login_show">
      <div class="total_div left" id="invite_total"><p class="total_title">{{$t('invite.invitePerson')}}</p>
        <p class="total_con">{{$t('invite.inviteTotalPerson')}}<span>{{total}}</span></p>
        <!-- <div>                             <p class="total_con">生效人数<span>0</span></p>                             <p class="total_con">失效人数<span>0</span></p>                         </div> -->
      </div>
      <div class="total_div right" id="brokerage_total"><p class="total_title">{{$t('invite.commission')}}</p>
        <p class="total_con"><em>GOLDT</em><span>0.00</span></p>

      </div>
    </div>
    <!--邀请人数end-->
    <!--邀请记录-返佣记录-->
    <div class="mod_order login_show" id="mod_order">


      <div class="mod_hd">
        <ul class="mod_tab">
          <li class="cur"><span>{{$t('invite.inviteRecord')}}</span></li>
      <!--    <li><span>{{$t('invite.commissionRecord')}}</span></li> -->
        </ul>
      </div>

      <div class="mod_bd" style="display: block;">
        <div class="select">
          <div class="search_wrap">
            <input type="text"   v-model="listQuery.userName"
                   v-bind:placeholder="$t('invite.search')" />
            <i action="clear_key"  class="search_clear hb_icon_clear" style="display: none;"></i>
            <i flag="search_sign" @click="getList" class="hb_icon_search"></i>
          </div>

        </div>

        <el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')"
                    :data="list"
                    style="width: 100%" row-class-name="align_center">
            <el-table-column
              header-align="center"
              prop="createTime"
              :label="$t('order.time')"
              width="180" />
            <el-table-column
              header-align="center"
              prop="mobile"
              :label="$t('invite.mobile')"
              width="180" />
            <el-table-column
              header-align="center"
              prop="email"
              :label="$t('invite.email')"
              width="180" />
            <el-table-column
              header-align="center"
              prop="locationCountry"
              :label="$t('invite.locationCountry')" />
            <el-table-column
              header-align="center"
              :label="$t('invite.isValid')">
              <template slot-scope="scope">
                <span v-if="scope.row.isValid===1">{{$t('invite.failed')}}</span>
                <span v-else>{{$t('invite.success')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              prop="visitCode"
              :label="$t('invite.visitCode')" />
            <el-table-column
              header-align="center"
              :label="$t('invite.teamLevel')" >
              <template slot-scope="scope">
                <span v-if="scope.row.teamId===2">{{$t('invite.corop')}}</span>
                <span v-else-if="scope.row.teamId===1">{{$t('invite.vip')}}</span>
                <span v-else>{{$t('invite.common')}}</span>
              </template>
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

    <!--<div class="active_rule"><p class="rule_title">{{$t('activity.detail')}}</p>-->
      <!--<div class="content" id="rule_content">-->
        <!--<p>{{$t('activity.one')}}</p>-->
        <!--<p>{{$t('activity.two')}}</p>-->
        <!--<p>{{$t('activity.three')}}</p>-->
        <!--<p>{{$t('activity.four')}}</p>-->
        <!--<p>{{$t('activity.five')}}</p>-->
        <!--<div>{{$t('activity.info')}}</div>-->
      <!--</div>-->

    <!--</div>-->
  </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import clip from '../../utils/clipboard'
  import {getOwnMember} from '@/api/user';
    export default {
        name: "invite",
        data() {
          return {
            list: null,
            comList:null,
            total: null,
            url:window.location.host +"/#/register?visitCode=",
            listLoading: true,
            listQuery: {
              page: 1,
              limit: 10,
              userName: ''
            },
            comlistQuery: {
              page: 1,
              limit: 10,
              beginDate:'',
              endDate:'',
            }
          }
        },
      created(){
        this.getList();
        this.getComList();
      },
      computed: {
        ...mapGetters(['user','token'])
      },methods: {
        getList() {
          this.listLoading = true;
          getOwnMember(this.listQuery)
            .then(response => {
              this.list = response.data.result.records;
              if (this.listQuery.userName == '') {
                this.total = response.data.result.total;
              }
              this.listLoading = false;
            })
        },
        getComList(){
          // getOwnCommission(this.comlistQuery)
          //   .then(response => {
          //     this.comList = response.data.result.records;
          //     this.listLoading = false;
          //   })
        },
        handleComCurrentChange(val) {
          this.comlistQuery.page = val;
          this.getComList();
        },
        handleCurrentChange(val) {
          this.listQuery.page = val;
          this.getList();
        },
        handleCopy(text, event) {
          clip(text, event)
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/global.scss";
  @import "src/styles/user.scss";
  @import "src/styles/nc.scss";
</style>
