<template>
  <div class="dialog_wrap otc-tips" style="display: block;" v-if="isShowInstructions">
    <div class="dialog" style="width:900px;">
      <div class="dia_tit">
        <div><b>{{$t('otc.tradingInstructionsTitle')}}</b>
          <div class="float-r"><span class="close" id="dia_close" @click="setShowInstructions(false)">×</span></div>
        </div>
      </div>
      <div class="dia_content trade-notes">
        <div class="text">
          <h3>
            {{$t('otc.tradingInstructionsDes')}}
          </h3>
          <p>
            {{$t('otc.tradingInstructionsDes1')}}<br>
            {{$t('otc.tradingInstructionsDes2')}}<br>
            {{$t('otc.tradingInstructionsDes3')}}<br>
            {{$t('otc.tradingInstructionsDes4')}}<br>
            {{$t('otc.tradingInstructionsDes5')}}<br>
            {{$t('otc.tradingInstructionsDes6')}}<br>
            {{$t('otc.tradingInstructionsDes7')}}<br>
            {{$t('otc.tradingInstructionsDes8')}}<br>
            {{$t('otc.tradingInstructionsDes9')}}<br>
            {{$t('otc.tradingInstructionsDes10')}}<br>
            {{$t('otc.tradingInstructionsDes11')}}<br>
            {{$t('otc.tradingInstructionsDes12')}}<br>
            {{$t('otc.tradingInstructionsDes13')}}<br>
          </p>
        </div>

      </div>

    </div>
    <div class="dialog_extra"></div>
  </div>
</template>

<script>
    export default {
        name: "tradingInstructions",
      props: {
        isShowInstructions: {
          type: Boolean,
          default: false
        },
        setShowInstructions: {
          type: Function,
          default: null
        }
      },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
</style>
