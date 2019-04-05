<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="true"></Header>
    <!--内容-->
    <div class="header">
      <img src="../../../static/image/tale-01.png"
           class="header-img"
           alt="">
    </div>

    <div class="content-bg">
      <div class="content-box">
        <div class="time-box">
          <span class="time-box-year">
            年
          </span>
          <span class="time-box-month">
            月
          <img src="../../../static/image/tale-001.png"
               alt=""
               class="next-icon">
          </span>
        </div>
        <div class="tale-box-index">
          <div class="tale-box-item">
            <div class="tale-box-item-box">
              <div class="tale-box-item-titme">
                <span class="tale-box-item-titme-number">
                  08
                </span>月
                <span class="tale-box-item-titme-year">
                  2018
                </span>
              </div>
              <div class="tale-box-item-img">
                <div class="tale-box-item-img-box">
                  <div class="tale-box-item-img-box-bg">
                  </div>
                  <p class="tale-box-item-img-p">冲破一切阻碍，我要全身变白</p>
                </div>
              </div>
            </div>

            <div class="tale-box-item-box">
              <div class="tale-box-item-titme">
                <span class="tale-box-item-titme-number">
                  08
                </span>月
                <span class="tale-box-item-titme-year">
                  2018
                </span>
              </div>
              <div class="tale-box-item-img">
                <div class="tale-box-item-img-box">
                  <div class="tale-box-item-img-box-bg">
                  </div>
                  <p class="tale-box-item-img-p">冲破一切阻碍，我要全身变白</p>
                </div>
              </div>
            </div>

            <div class="tale-box-item-box">
              <div class="tale-box-item-titme">
                <span class="tale-box-item-titme-number">
                  08
                </span>月
                <span class="tale-box-item-titme-year">
                  2018
                </span>
              </div>
              <div class="tale-box-item-img">
                <div class="tale-box-item-img-box">
                  <div class="tale-box-item-img-box-bg">
                  </div>
                  <p class="tale-box-item-img-p">冲破一切阻碍，我要全身变白</p>
                </div>
              </div>
            </div>

            <div class="tale-box-item-box">
              <div class="tale-box-item-titme">
                <span class="tale-box-item-titme-number">
                  08
                </span>月
                <span class="tale-box-item-titme-year">
                  2018
                </span>
              </div>
              <div class="tale-box-item-img">
                <div class="tale-box-item-img-box">
                  <div class="tale-box-item-img-box-bg">
                  </div>
                  <p class="tale-box-item-img-p">冲破一切阻碍，我要全身变白</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
  import bImg from 'bootstrap-vue/es/components/image/img'
  import bMedia from 'bootstrap-vue/es/components/media/media'

  import mixins from '../../mixins/index'

  import Header from '../../component/header/index'
  import Footer from '../../component/footer/index'

  export default {
    components: {
      bCarousel,
      bImg,
      bMedia,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      boxShow: false,
      year: '',
      month: '',
      showIndex: 0,
      showYearMonth: '',
      yearMonthList: [],
      articleList: [],
      isArticleListShowAll: false
    }),
    created () {

    },
    mounted () {
      this.handleLoadYearAndMonthList()
      this.hanldeLoadArticle()
      this.windowScrool()
    },
    methods: {
      handleShow: function () {
        this.isArticleListShowAll = !this.isArticleListShowAll
      },
      windowScrool: function () {
        window.onscroll = () => {
          if (this.boxShow) {
            this.boxShow = false
          }
        }
      },
      handleLoadYearAndMonthList: function () {
        this.request({
          url: '/xingxiao/article/desktop/v1/yearAndMonthlist',
          data: {},
          success: (data) => {
            if (data && data.length > 0) {
              this.yearMonthList = data
              var lastedYearMonth = this.yearMonthList[0]
              this.year = lastedYearMonth.year
              this.month = lastedYearMonth.monthList[0]
              this.showIndex = 0
            }
          },
          error: () => {

          }
        })
      },
      handleBoxShow: function () {
        if (!this.boxShow) {
          var year = this.year
          for (var i = 0; i < this.yearMonthList.length; i++) {
            if (year == this.yearMonthList[i].year) {
              this.showYearMonth = this.yearMonthList[i]
              break
            }
          }
        }
        this.boxShow = !this.boxShow
      },
      yearPrev: function () {
        var year = this.showYearMonth.year
        for (var i = 0; i < this.yearMonthList.length; i++) {
          if (year == this.yearMonthList[i].year && i < (this.yearMonthList.length - 1)) {
            this.showYearMonth = this.yearMonthList[i + 1]
            break
          }
        }
      },
      yearNext: function () {
        var year = this.showYearMonth.year
        for (var i = 0; i < this.yearMonthList.length; i++) {
          if (year == this.yearMonthList[i].year && i > 0) {
            this.showYearMonth = this.yearMonthList[i - 1]
            break
          }
        }
      },
      hanldeSelectYearMonth: function (year, month) {
        this.year = year
        this.month = month
        this.boxShow = false

        this.hanldeLoadArticle()
      },
      hanldeLoadArticle: function () {
        this.request({
          url: '/xingxiao/article/desktop/v1/storyList',
          data: {
            year: this.year,
            month: this.month
          },
          success: (data) => {
            if (data && data.length > 0) {
              this.articleList = data
            }
          },
          error: () => {

          }
        })
      }
    }
  }
</script>

<style src="./tale.css" scoped>

</style>
