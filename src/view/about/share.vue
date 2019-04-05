<template>
  <div>
    <!-- 头部 -->
    <Header :index="4"
            :isShowCategoryLeft="true"></Header>

    <!--内容-->
    <div class="banner">
      <img src="../../../static/image/share01.png" class="banner-bg" alt="">
    </div>
    <div class="business">
      <div class="block-title">
        <span class="block-title-line-left"></span>
        通过微信简单创业
        <span class="block-title-line-right"></span>
      </div>
      <div class="block-title-sub">
        Simply start a business with WeChat
      </div>
      <div class="business-brief">
        我们认为微信打通了信息流，现金流以及物流，在此基础上，每个人都可以通过微信开启一份自己的美丽事业！
      </div>
    </div>
    <div class="middle-banner">
      <img src="../../../static/image/share03.png" alt="">
    </div>
    <div class="server">
      <div class="block-title">
        <span class="block-title-line-left"></span>
        创业支持服务
        <span class="block-title-line-right"></span>
      </div>
      <div class="block-title-sub">
        创业支持服务
      </div>
      <div class="server-title">
        V+Lab为每一位希望创业的人士提供全面的创业支持服务
      </div>
      <img src="../../../static/image/share05.png" alt="">
    </div>
    <div class="case">
      <div class="block-title">
        <span class="block-title-line-left"></span>
        代理案例
        <span class="block-title-line-right"></span>
      </div>
      <div class="block-title-sub">
        Agency case
      </div>
      <div class="case-carousel">
        <img src="../../../static/image/agent06.png" class="case-item-image" alt="">
      </div>
      <p class="case-item-text">
        资深个人创业者
      </p>
      <p class="case-item-text">
        黄倩昕
      </p>
    </div>
    <div class="code">
      <img src="../../../static/image/code02.jpg" class="code-img" alt="">
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import bImg from 'bootstrap-vue/es/components/image/img'
  import bMedia from 'bootstrap-vue/es/components/media/media'

  import mixins from '../../mixins/index'

  import Header from '../../component/header/index'
  import Footer from '../../component/footer/index'

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
        }, {
          index: '07',
          brief: '资深个人创业者',
          image: '../../../static/image/agent06.png',
          name: '黄倩昕'
        }, {
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
        loop: false,
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
    created () {

    },
    mounted () {
    },
    methods: {
      handleSelectAgrncyList: function (index) {
        this.isShowAgencyCaseList = false
        this.isShowAgencyCase = true
        for (var i = 0; i < this.AgencyCase.length; i++) {
          if (index == this.AgencyCase[i].index) {
            this.agrncyMaxImage = this.AgencyCase[i].image
          }
        }
        return
      },
      handleSelectAgrncy: function () {
        this.isShowAgencyCaseList = true
        this.isShowAgencyCase = false
      }
    }
  }
</script>

<style src="./share.css" scoped>


</style>
