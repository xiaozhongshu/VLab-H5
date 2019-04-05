<template>
  <div>
    <!-- 头部 -->
    <Header :index="0"
            :isShowCategoryLeft="true"></Header>
    <div class="banner">
      <b-carousel controls
                  indicators
                  :interval="4000"
                  img-width="100%"
                  img-height="578">
        <!--<b-carousel-slide-->
          <!--v-for="item in bannerList"-->
          <!--:img-src="imageHost + item.advertisementImagePath"></b-carousel-slide>-->

        <b-carousel-slide img-src="../../../static/image/banner02.jpg"></b-carousel-slide>
        <b-carousel-slide img-src="../../../static/image/banner.png"></b-carousel-slide>
      </b-carousel>
    </div>

    <div class="snacks-body">
      <div class="snacks-body-title">
        全球独创的美容零食现已来临
      </div>
      <div class="snacks-body-text">
        爆水丸通过添加小分子透明质酸、纳米胶原蛋白和维C，将皮肤最需要的锁水营养物质透过口服实现补充，
        同时又用QQ软糖的性状实现口感佳，无抗拒感！
      </div>
      <img src="../../../static/image/index01.png" alt="">
    </div>
    <div class="idea">
      <div class="block-title">
        <div class="block-title">
          <span class="block-title-line"></span>
          薇嘉实验室核心理念
          <span class="block-title-line"></span>
          <div class="block-title-sub">
            Core Idea Of V+lab
          </div>
        </div>
      </div>

      <div class="idea-carousel">
        <swiper :options="swiperOption">
          <swiper-slide class="case-item">
            <div class="idea-carousel">
              <div class="idea-body-item">
                <div class="idea-body-item-image-box">
                  <img src="../../../static/image/idea02.png"
                       alt=""
                       class="idea-body-item-image">
                </div>
                <div class="idea-body-title">
                  分享
                </div>
                <div class="idea-body-sub">
                  SHARE
                </div>
                <div class="idea-body-item-msg">
                  <div class="idea-body-item-float-text">
                    所有的营销最终需要的是用户口碑才能支撑，所以与其大笔宣传不如让每个用户成为我们的传播者。
                    薇嘉在市场营销方面更注重于用户的口碑宣传，
                    甚至在渠道的选择上也选择社会化分享式的营销渠道就是为了让有效的用户传播我们的产品功效和产品理念。
                    我们相信只有用户的认可和有效背书才能让我们的品牌被更多的接受和体验，从而改变整个市场格局。
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="case-item">
            <div class="idea-carousel">
              <div class="idea-body-item">
                <div class="idea-body-item-image-box">
                  <img src="../../../static/image/idea01.png"
                       alt=""
                       class="idea-body-item-image">
                </div>
                <div class="idea-body-title">
                  趣味
                </div>
                <div class="idea-body-sub">
                  INTEREST
                </div>
                <div class="idea-body-item-msg">
                  <div class="idea-body-item-float-text">
                    我们一直认为用最简单的方式即可完成的事情不需要做更复杂，就犹如我们的产品负责人提出的理念：
                    用最简单且有趣的方式帮助每位女性改善皮肤。我们在研究了全球超过80%的护肤品后发现，
                    大多护肤品都还停留在很原始的使用方式，但科学上来说却不是最有效的。
                    通过结合女性最需要和最喜爱两个属性，我们将护肤做了CrossExperience（交叉式体验）式的升级，
                    于是美容零食的概念由此而生
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="case-item">
            <div class="idea-carousel">
              <div class="idea-body-item">
                <div class="idea-body-item-image-box">
                  <img src="../../../static/image/idea03.png"
                       alt=""
                       class="idea-body-item-image">
                </div>
                <div class="idea-body-title">
                  科技
                </div>
                <div class="idea-body-sub">
                  TECHNOLOGY
                </div>
                <div class="idea-body-item-msg">
                  <div class="idea-body-item-float-text">
                    我们一直认为用最简单的方式即可完成的事情不需要做更复杂，就犹如我们的产品负责人提出的理念：
                    用最简单且有趣的方式帮助每位女性改善皮肤。我们在研究了全球超过80%的护肤品后发现，
                    大多护肤品都还停留在很原始的使用方式，但科学上来说却不是最有效的。
                    通过结合女性最需要和最喜爱两个属性，我们将护肤做了CrossExperience（交叉式体验）式的升级，
                    于是美容零食的概念由此而生
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev"
             slot="button-prev"></div>
        <div class="swiper-button-next"
             slot="button-next"></div>
      </div>
    </div>

    <div class="case">
      <div class="block-title">
        <span class="block-title-line"></span>
        客户案例
        <span class="block-title-line"></span>
        <div class="block-title-sub">
          Customer
        </div>
        <div class="case-body">
          <img src="../../../static/image/index02.png"
               alt=""
               class="case-body-image">
          <img src="../../../static/image/index03.png"
               alt=""
               class="case-body-image">
        </div>
      </div>
    </div>
    <div class="country">
      <div class="block-title">
        <span class="block-title-line"></span>
        <span class="block-title">
          全球超过
        </span>
        <span class="block-title-pink">
          20
        </span>
        <span class="block-title">
          个国家和地区有售
        </span>
        <span class="block-title-line"></span>
        <div class="block-title-sub">
          <span class="block-title-sub">
            More than 20 countries and regions are
          </span>
          <p class="block-title-sub">
            sold around the world
          </p>
        </div>
        <div class="case-body">
          <img src="../../../static/image/country.png"
               alt=""
               class="case-body-image">
        </div>
      </div>
    </div>
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
          url:'/xingxiao/advertisement/desktop/v1/list',
          data: {
            advertisementCategoryCode:'INDEX_BANNER'
          },
          success: (data) => {
            if (data.list && data.list.length > 0) {
              this.bannerList = data.list
            }
          }
        })
      }
    }
  }
</script>
