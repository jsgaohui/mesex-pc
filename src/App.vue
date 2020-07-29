<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {disconnectSocket} from '@/utils/quotation'
export default {
  name: 'App',
  watch: {
    '$route'(to, from) {
      disconnectSocket()
    }
  }
}
</script>
<style>
  @import "./styles/global.scss";
  @import "./styles/login.scss";
</style>
