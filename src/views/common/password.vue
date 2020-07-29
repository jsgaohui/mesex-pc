<template>
  <div>
    <template v-if="showPwd">
      <el-input name="password" v-model="password"
                autoComplete="on" type="text" @change="sendPassword" v-bind:maxlength="20"/>
      <span class="eye"><i class="hb_icon_visible-off"></i></span>
    </template>
    <template v-else>
      <el-input name="password" v-model="password"
                autoComplete="on" type="password" @change="sendPassword" v-bind:maxlength="20" />
    </template>
    <span class="eye" @click="showPwd=!showPwd"><i :class="{'hb_icon_visible':!showPwd,'hb_icon_visible-off':showPwd}"></i></span>
  </div>
</template>

<script>
  export default {
    name: "password",
    data() {
      return {
        showPwd: false,
        password: '',
      }
    },
    props: {
      callBackName: '',
    },
    methods: {
       sendPassword() {
         this.$emit(this.callBackName,this.password)
       }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/global.scss";
</style>
