<template>
  <div>
    <!-- 头部 -->
    <Header :index="4"
            :isShowCategoryLeft="true"></Header>

    <div class="banner">
      <b-img class="banner-bg" src="../../../static/image/share01.png"></b-img>
    </div>

    <div class="business">
      <div class="block-title">
        <span class="block-title-line-left"></span>通过微信简单创业<span class="block-title-line-right"></span>
        <div class="block-title-sub">Simply start a business with WeChat</div>
      </div>
      <div class="business-brief">
        我们认为微信打通了信息流，现金流以及物流，在此基础上，每个人都可以通过微信开启一份自己的美丽事业！
      </div>
    </div>
    <div class="middle-banner">
      <b-img class="middle-banner-img" src="../../../static/image/share03.png"></b-img>
    </div>
    <div class="server">
        <div class="block-title">
          <span class="block-title-line-left"></span>创业支持服务<span class="block-title-line-right"></span>
          <div class="block-title-sub">Entrepreneurial support services</div>
        </div>
        <div class="server-title">V+Lab为每一位希望创业的人士提供全面的创业支持服务</div>
        <b-img class="server-img" src="../../../static/image/share05.png"></b-img>
    </div>
    <div class="case">
      <div class="block-title">
        <span class="block-title-line-left"></span>代理案例<span class="block-title-line-right"></span>
        <div class="block-title-sub">Agency case</div>
      </div>
      <div class="case-carousel">
        <swiper :options="swiperOption">
          <swiper-slide class="case-item"
                        v-bind:style="{'opacity':isShowAgencyCaseList ? '1':'0'}"
                        :key="index"
                        v-for="(item, index) in AgencyCaseList">
            <b-img class="case-item-image"
                   width="188"
                   height="188"
                   style="margin-bottom: 20px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;"
                   @click="handleSelectAgrncyList(item.index)"
                   :src="item.image"
                   alt=""/>
            <p class="case-item-text">{{item.brief}}</p>
            <p class="case-item-text">{{item.name}}</p>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev"
             @click="handleSelectAgrncy"
             slot="button-prev"></div>
        <div class="swiper-button-next"
             @click="handleSelectAgrncy"
             slot="button-next"></div>
        <div class="case-carousel-agency"
             v-if="!isShowAgencyCaseList">
          <b-img class="case-carousel-agency-image"
                 width="270"
                 height="148"
                 @click="handleSelectAgrncy"
                 :src="agrncyMaxImage"
                 alt=""/>
        </div>
      </div>
    </div>

    <div class="code">
      <b-img
        width="200"
        class="code-img"
        src="../../../static/image/code02.jpg" />
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import bImg from 'bootstrap-vue/es/components/image/img';
  import bMedia from 'bootstrap-vue/es/components/media/media';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      swiper,
      swiperSlide,
      bImg,
      bMedia,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      AgencyCaseList: [
        {
          index: '01',
          brief: '资深个人创业者',
          image: '../../../static/image/agent09.png',
          name: '林嘉莉'
        },
        {
        index: '02',
        brief: '资深个人创业者',
        image: '../../../static/image/agent01.jpg',
        name: '张驰'
      },
        {
        index: '03',
        brief: '资深个人创业者',
        image: '../../../static/image/agent02.png',
        name: '辣妈小娟子'
      }, {
        index: '04',
        brief: '资深个人创业者',
        image: '../../../static/image/agent03.png',
        name: '唐君'
      }, {
        index: '05',
        brief: '资深个人创业者',
        image: '../../../static/image/agent04.png',
        name: '彭子文'
      }, {
        index: '06',
        brief: '资深个人创业者',
        image: '../../../static/image/agent05.png',
        name: '阿Ken'
      },{
        index: '07',
        brief: '资深个人创业者',
        image: '../../../static/image/agent06.png',
        name: '黄倩昕'
      },{
        index: '08',
        brief: '资深个人创业者',
        image: '../../../static/image/agent07.png',
        name: '邱千缘'
      }, {
        index: '09',
        brief: '资深个人创业者',
        image: '../../../static/image/agent08.png',
        name: '曾文娟'
      }],
      AgencyCase: [
        {
          index: '01',
          image: '../../../static/image/agent-09.png',
        },
        {
        index: '02',
        image: '../../../static/image/agent-01.jpg',
      },
        {
        index: '03',
        image: '../../../static/image/agent-02.png',
      }, {
        index: '04',
        image: '../../../static/image/agent-03.png',
      }, {
        index: '05',
        image: '../../../static/image/agent-04.png',
      }, {
        index: '06',
        image: '../../../static/image/agent-05.png',
      }, {
        index: '07',
        image: '../../../static/image/agent-06.png',
      }, {
        index: '08',
        image: '../../../static/image/agent-07.png',
      }, {
        index: '09',
        image: '../../../static/image/agent-08.png',
      }],
      isShowAgencyCaseList: true,
      isShowAgencyCase: false,
      agrncyMaxImage: '',
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 45,
        autoplay: 3000,
        loop : false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }),
    created() {

    },
    mounted() {
    },
    methods: {
      handleSelectAgrncyList: function (index) {
        this.isShowAgencyCaseList = false;
        this.isShowAgencyCase = true;
        for (var i=0; i<this.AgencyCase.length; i++){
          if (index == this.AgencyCase[i].index){
            this.agrncyMaxImage = this.AgencyCase[i].image;
          }
        }
        return;
      },
      handleSelectAgrncy: function () {
        this.isShowAgencyCaseList = true;
        this.isShowAgencyCase = false;
      }
    }
  }
</script>

<style scoped>

  .banner {
    width: 100%;
  }
  .banner-bg {
    width: 100%;
  }
  .business {
    position: relative;
    width: 100%;
    height: 577px;
    padding-top: 42px;
    background-image: url("../../../static/image/share02.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .business-brief{
    width: 143px;
    position: absolute;
    top: 200px;
    left: 38px;
    line-height: 15px;
    font-size: 12px;
    color: #010101;
    letter-spacing: 1px;
  }
  .block-title{
    color: #000000;
    font-size: 21px;
    text-align: center;
  }
  .block-title-line-left{
    width: 55px;
    margin-right: 16px;
    display: inline-block;
    border-bottom: 1px solid #000000;
  }
  .block-title-line-right {
    width: 55px;
    margin-left: 16px;
    display: inline-block;
    border-bottom: 1px solid #000000;
  }
  .block-title-sub{
    font-size: 12px;
    color: #020202;
  }
  .middle-banner {
    margin-top: 7px;
  }
  .middle-banner-img {
    width: 100%;
  }
  .server {
    width: 100%;
    position: relative;
    padding-top: 42px;
    margin-top: 7px;
    background-image: url("../../../static/image/share04.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .server-title{
    font-size: 12px;
    text-align: center;
    color: #010101;
    margin: 15px 0px 25px 0px;
  }
  .server-img {
    width: 100%;
  }
  .case{
    padding-top: 58px;
  }
  .case-carousel{
    width: 100%;
    height: 360px;
    margin: 0 auto;
    padding-top: 50px;
    position: relative;
  }

  .case-carousel-agency{
    position: absolute;
    left: 52px;
    top: 92px;
  }

  .case-carousel-agency-image{
    position: relative;
    z-index: 99;
  }

  .case-carousel .swiper-button-prev{
    width: 30px;
    height: 52px;
    position: absolute;
    top: 154px;
    right: 22px;
    background-image: url("../../../static/image/arrow.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }

  .case-carousel .swiper-button-prev:focus{
    outline: none !important;
  }

  .case-carousel .swiper-button-next{
    width: 30px;
    height: 52px;
    position: absolute;
    top: 154px;
    right: 12px;
    background-image: url("../../../static/image/arrow.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .case-carousel .swiper-button-next:focus{
    outline: none !important;
  }

  .case-item{
    text-align: center;
    padding-top: 10px;
  }

  .case-item-image{
    margin-bottom: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -moz-box-shadow: 10px 10px 5px #e3e3e3;
    box-shadow: 0px 0px 10px #e3e3e3;
  }

  .case-item-text{
    font-size: 12px;
    color: #1b1b1b;
  }

  .code{
    margin-bottom: 20px;
  }

  .code-img{
    margin: 0 auto;
    display: block;
  }


</style>
