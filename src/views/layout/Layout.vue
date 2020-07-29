<template>
  <div>
    <top-header></top-header>
    <app-main></app-main>
    <indax-footer></indax-footer>
  </div>
</template>

<script>
  import {AppMain, TopHeader} from './components'
  import IndaxFooter from "./components/Footer";

  export default {
    name: 'layout',
    components: {
      IndaxFooter,
      TopHeader,
      AppMain
    }
  }
</script>
