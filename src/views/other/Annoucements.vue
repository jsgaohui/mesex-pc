<template>
  <div class="page_assetintro user-main">
    <div class="crumbs"><span>Annoucements</span></div>
    <div class="mod">

      <div class="cont" >
        <div class="l_content">

          <ul class="flex-x-start"><ol>August 1, 2019</ol><li>Interview with Aaron Tsai | Discussion on Security Challenges on Exchanges</li></ul>
          <ul class="flex-x-start"><ol>July 23, 2019 </ol><li>World First STO Listing on MASEx   </li></ul>
          <ul class="flex-x-start"><ol>June 21, 2019</ol><li>‘Key to Innovating Financial Services’ - Forbes China   </li></ul>
          <ul class="flex-x-start"><ol>October 29, 1999</ol><li>Creation of 101 public shell companies, known as “King of Shells” - Wall Street Journal   </li></ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Annoucements",
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/nc.scss";
  .l_content h3{
    font-size:20px;
    font-weight: normal
  }
  ul.flex-x-start{
    margin:10px 0;
  }
  ul.flex-x-start ol{
    font-weight: bold;
    width:150px;
    flex-shrink: 0;
  }
</style>

