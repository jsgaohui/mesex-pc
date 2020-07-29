<template>
  <div class="coin_detail">
    <div class="mod" :class="parentClass">
      <div class="mod_hd" style="padding-left:15px;"><span class="mod_show_btn">
      <!--<button @click="isActive=!isActive"><i></i></button>-->
      <span>{{$t('trade.coinInfo')}}</span></span> <router-link to="intro" class="f_l">{{$t('trade.aboutmore')}}</router-link></div>
      <CollapseTransition ref="CollapseTransition">
        <div class="mod_bd" id="coin_detail_in"  v-show="isActive">
          <!--<div class="left">-->
            <!--<h3><span class="uppercase">{{digitalSymbol.dcName}}</span> {{digitalSymbol.dcName}}</h3>-->
            <!--<div class="in"><span>{{$t('trade.intro')}}</span>-->
              <!--&lt;!&ndash;<pre v-html="digitalSymbol.summary"></pre>&ndash;&gt;-->
              <!--<p v-html="digitalSymbol.summary"></p>-->
            <!--</div>-->
          <!--</div>-->
          <div class="right">
            <ul>
<!--              <li><span>{{$t('Market Cap')}}</span>-->
<!--                <p>45,690,014,956</p>-->
<!--              </li>-->
              <li><span>{{$t('Authorized Shares')}}</span>
                <p>{{digitalSymbol.issueNum}}</p>
              </li>
              <li><span>{{$t('Outstanding Shares')}}</span>
                <p>{{digitalSymbol.circulationNum}}</p>
              </li>
              <li><span>{{$t('Restricted')}}</span>
                <p>Not Available</p>
              </li>
              <li><span>{{$t('Unrestricted')}}</span>
                <p>{{digitalSymbol.circulationNum}}</p>
              </li>
              <li><span>{{$t('Held at DTC')}}</span>
                <p>Not Available</p>
              </li>
              <li><span>{{$t('Float')}}</span>
                <p>{{digitalSymbol.circulationNum}}</p>
              </li>
              <li><span>{{$t('Par Value')}}</span>
                <p>Not Available</p>
              </li>
            </ul>
          </div>
        </div>
      </CollapseTransition>
    </div>
  </div>
  <!---登录后-委托历史END-->
</template>
<script>
  import {symbolIntro } from "../../api/common";
  import {escape2Html} from "../../utils/stringUtil";
  import CollapseTransition from "../../components/animate-contract";
  export default {
    computed: {
      parentClass(){
        return this.isActive?"":" hide";
      }

    },
    components:{CollapseTransition},
    name: "digitalSymbol",
    data(){
      return {
        isActive:true,
        digitalSymbol : '',
      }
    },
    methods:{
      //设置简介信息
      symbolIntro(symbol){
        //当前交易币种
        let $this = this;
        let param = "/"+symbol;
        symbolIntro(param).then((response) => {
          if (response.code === 200) {
            var data = response.data;
            $this.digitalSymbol = data.intro;
            if($this.digitalSymbol.summary){
              $this.digitalSymbol.summary = escape2Html($this.digitalSymbol.summary);
            }
            $this.$parent.tradeInfo.digitalSymbol=$this.digitalSymbol
          }
        })
      },
    }
  }
</script>
