<template>
  <div class="page_assetintro user-main">
    <div class="crumbs"><span>Upcoming Events</span></div>
    <div class="mod">

      <div class="cont">
        <div class="l_content">
<!--          <h3>2019</h3>-->
<!--          <ul class="flex-x-start">-->
<!--            <ol>Deember 23</ol>-->
<!--            <li>i5 Global Fintech Summit - Seoul</li>-->
<!--          </ul>-->
          <!--          <ul class="flex-x-start">-->
          <!--            <ol>October 21-22</ol>-->
          <!--            <li><a target="_blank" href="http://www.worldblockchainstosummit.com">World Blockchain STO Summit – Dubai</a></li>-->
          <!--          </ul>-->
          <!--          <ul class="flex-x-start">-->
          <!--          <ol>December 6</ol>-->
          <!--          <li><a  target="_blank" href="http://www.blockchaineventon.com">Blockchain & AI Eventon - Mumbai</a></li>-->
          <!--          </ul>-->
          <h3>2020</h3>
          <ul class="flex-x-start">
            <ol>October 5-7</ol>
            <li><a href="http://www.RitossaFamilySummits.com" target="_blank"> Global Family Office Investment Summit - Fairmont Riyadh Hotel</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol>June  17-18</ol>
            <li><a href="https://sg.worldblockchainstosummit.com/" target="_blank"> World Blockchain STO Summit</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a href="https://sg.worldblockchainstosummit.com" target="_blank"><img width="700" height="400" src="@/assets/images/alan.jpg"></a> </li>
          </ul>
          <ul class="flex-x-start">
            <ol>June 12</ol>
            <li ><a href="http://www.blockchaineventon.com/" target="_blank">Blockchain & AI Eventon - Mumbai</a></li>
          </ul>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "upcomming-events",
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/nc.scss";

  .l_content h3 {
    font-size: 20px;
    font-weight: normal
  }

  ul.flex-x-start {
    margin: 10px 0;
  }

  ul.flex-x-start ol {
    font-weight: bold;
    width:150px;
    flex-shrink: 0;
  }
</style>

