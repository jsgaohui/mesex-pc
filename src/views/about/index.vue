<template>
  <div class="main">
    <div class="about-con" >
      <div class="top flex-center" :style="getUrlImage('about/about.jpg','center bottom no-repeat')"><h1>About Us</h1></div>
      <div class="p-con">
        <p>MAS Capital Universal Exchange Inc. (“MASEx”) is a Global Security Token Exchange. MASEx aims to become the leading security token exchange in the universe, using AI and blockchain technology, to form a decentralized exchange in the future, to trade securities, commodities, FOREX and digital assets.</p>
        <p>Incorporated in Anguilla, British West Indies on August 14, 2018, MASEx is operational and ready to list equity security token on MASEx’s Stock Listing in this coming Q3 2019. MASEx will be a platform to deliver greater transparency, economies of scale and liquidity on a global basis. MASEx aims to list 11,000 Chinese and Asian companies’ equity securities tokens within 3 years on the Stock Listing Board.</p>
        <p>MASEx’s target markets include companies and investors from both the emerging and underdeveloped countries. On our Stock Listing Board, MASEx plans to adopt AI-based continuous due diligence on companies with monthly reporting standard. Cloud-based internal controls and accounting systems will be deployed to transform the securities, commodities and FOREX listing industry to a new and a higher standard.</p>
        <p>Aaron Tsai, our Founder and Chief Capitalist, established <a href="http://www.mascapital.com/" target="_blank">MAS Capital</a> in the United States in 1995. The Wall Street Journal reported Tsai to be the “King of Shells” (October 19, 1999) for his financial engineering work in the creation of 101 public shell companies, a financial structure used to take private companies public. MASEx is managed by a team of experienced professionals from both financial and technology sectors. Our AI advisors include Dr. Ben Goertzel, CEO of <a href="https://singularitynet.io" target="_blank">SingularityNET</a> and Chief Scientist of <a href="https://www.hansonrobotics.com" target="_blank">Hanson Robotics</a>, creator of Sophia, the world’s most famous humanoid robot.</p>
        <p>MASEx’s investment banking affiliate <a href="http://www.mascapital.cn/" target="_blank">MAS Capital Group</a>, with operations in China and Asia, provides STO and IPO advisory services and originate security token listings on MASEx.</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
          getUrlImage(imageName,styleParams,joinstyle){
            if(styleParams){
              if(joinstyle){
                joinstyle.background= 'url(' + require('@/assets/images/'+imageName+'') + ') '+styleParams;
                return joinstyle;
              }else{
                return {background: 'url(' + require('@/assets/images/'+imageName+'') + ') '+styleParams}
              }
            }
            return {background: 'url(' + require('@/assets/images/'+imageName+'') + ') no-repeat center '}
          },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  *{
    margin:0px;
    padding:0px;
  }
  body{
    background: #0d1426;
    font-size:14px;
    color:#fff;
  }
  .flex-start{
    display: flex;
    justify-content: flex-start;
    align-items: center
  }
  .flex-center{
    display: flex;
    justify-content: center;
    align-items: center
  }
  ul li{
    float: left;
    list-style: none;
    margin-left:30px;
    height:60px;
    line-height:60px;
  }
  header{
    height:60px;
    line-height:60px;
    padding:0px 20px;
    margin:0 auto;


  }
  a{
    color:#0000ff;
    text-decoration: none
  }
  a:hover{
    color:#0000ff;
  }


  .logo{
    background:rgba(255, 255, 255, 1);
    border-radius: 4px;
    height:30px;
    padding:5px;
  }
  .logo img{
    width:50px;
  }
  .about-con .p-con{
    width:1200px;
    margin:0 auto;
    line-height:24px;
  }
  .about-con .p-con p{
    margin-top:20px;
  }
  .about-con .top{
    /*background:url(@/assets/images/about/about.jpg) center bottom no-repeat;*/
    height:450px;
    margin-bottom:60px;
  }
  .about-con .top h1{
    color:#fff;
    font-size:80px;
    text-align: center
  }
</style>
