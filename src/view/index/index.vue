<template>
  <div>
    <!-- 头部 -->
    <Header :index="0"
            :isShowCategoryLeft="true"></Header>

    内容

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style src="./index.css" scoped></style>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bImg from 'bootstrap-vue/es/components/image/img'

import mixins from '../../mixins/index'

import Header from '../../component/header/index'
import Footer from '../../component/footer/index'

export default {
  components: {
    swiper,
    swiperSlide,
    bCarousel,
    bImg,
    Header,
    Footer
  },
  mixins: [mixins],
  data: () => ({
    windowWidth: '',
    slide: 0,
    scrollIndex: 1,
    bannerList: [],
    scrollTop: '',
    isShowAgencyCaseList: true,
    isShowAgencyCase: false,
    agrncyMaxImage: '',
    bannerSwiperOption: {
      loop: true,
      pagination: {
        el: '.bannerSwiperOption'
      }
    },
    swiperOption: {
      slidesPerView: 1,
      spaceBetween: 45,
      autoplay: 3000,
      loop: true,
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
    this.handleLoadBannerList()
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
    },
    handleSelectAgrncy: function () {
      this.isShowAgencyCaseList = true
      this.isShowAgencyCase = false
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    handleLoadBannerList: function () {
      this.request({
        url: '/xingxiao/advertisement/desktop/v1/list',
        data: {
          advertisementCategoryCode: 'INDEX_BANNER'
        },
        success: (data) => {
          if (data.list && data.list.length > 0) {
            this.bannerList = data.list
          }
        },
        error: () => {

        }
      })
    }
  }
}
</script>

