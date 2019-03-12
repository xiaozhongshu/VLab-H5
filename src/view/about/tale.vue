<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="true"></Header>

    <div class="header">
      <b-img class="header-image" src="../../../static/image/tale-01.png"></b-img>
    </div>

    <div class="content-bg">
      <div class="content-box">
        <div class="time-box">
          <span class="time-box-year" @click="handleBoxShow">{{year}}年</span>
          <span class="time-box-month" @click="handleBoxShow">{{month}}月
            <b-img class="next-icon"
                   src="../../../static/image/tale-001.png"
                   :class="boxShow ? 'next-icon-180' : 'next-icon'"></b-img>
          </span>
          <div class="time-box-hide" v-if="boxShow">
            <div class="time-box-header">
              <span class="prev"
                    @click="yearPrev"
                    v-if="yearMonthList.length > 1 && showYearMonth.year != yearMonthList[yearMonthList.length - 1].year">
                <b-img class="prev-img" src="../../../static/image/tale-001.png"></b-img>
              </span>
              <span class="content-year">{{showYearMonth.year}}</span>
              <span class="next"
                    @click="yearNext"
                    v-if="yearMonthList.length > 1 && showYearMonth.year != yearMonthList[0].year">
                <b-img class="next-img" src="../../../static/image/tale-001.png"></b-img>
              </span>
            </div>
            <div class="time-box-content">
              <div class="content-month" v-for="(item , index) in showYearMonth.monthList"
                   :class="showYearMonth.year == year && item == month ? 'content-month-active' : 'content-month'"
                   @click="hanldeSelectYearMonth(showYearMonth.year, item)">{{item}}月
              </div>
            </div>
          </div>
        </div>
        <div class="tale-box index"
             v-for="(item, index) in articleList"
             v-if="!isArticleListShowAll ? (index < 8) : (index < articleList.length)">
          <div v-if="item.articleIsOuterLink">
            <div class="tale-box-item">
              <div class="tale-box-item-box">
                <div class="tale-box-item-titme">
                  <span class="tale-box-item-titme-number">{{item.month}}</span>月
                  <span class="tale-box-item-titme-year">{{item.year}}</span>
                </div>
                <div class="tale-box-item-img">
                  <a :href="item.articleOuterLink">
                    <div class="tale-box-item-img-box">
                      <div class="tale-box-item-img-box-bg"
                           :style="'background-image: url(' + imageHost + item.articleImagePath +')'">
                      </div>
                    </div>
                    <p class="tale-box-item-img-p">{{item.articleTitle}}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!item.articleIsOuterLink">
            <div class="tale-box-item">
              <div class="tale-box-item-box">
                <div class="tale-box-item-titme">
                  <span class="tale-box-item-titme-number">{{item.month}}</span>月
                  <span class="tale-box-item-titme-year">{{item.year}}</span>
                </div>
                <div class="tale-box-item-img">
                  <router-link :to="'/article/details/' + item.articleId + '?isApp=' + false ">
                    <div class="tale-box-item-img-box">
                      <div class="tale-box-item-img-box-bg"
                           :style="'background-image: url(' + imageHost + item.articleImagePath +')'">
                      </div>
                    </div>
                    <p class="tale-box-item-img-p">{{item.articleTitle}}</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="look-more" v-if="!isArticleListShowAll" @click="handleShow">
        <span>查看更多...</span>
      </div>
      <div class="look-more" v-if="isArticleListShowAll" @click="handleShow">
        <span>收起</span>
        <img src="../../../static/image/tale-001.png" style="margin: -6px 0px 0px 2px;" class="next-icon next-icon-180">
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
  import bImg from 'bootstrap-vue/es/components/image/img';
  import bMedia from 'bootstrap-vue/es/components/media/media';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

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
    created() {

    },
    mounted() {
      this.handleLoadYearAndMonthList();
      this.hanldeLoadArticle();
      this.windowScrool();
    },
    methods: {
      handleShow: function () {
        this.isArticleListShowAll = !this.isArticleListShowAll;
      },
      windowScrool: function () {
        window.onscroll = () => {
          if(this.boxShow){
            this.boxShow = false;
          }
        }
      },
      handleLoadYearAndMonthList: function () {
        this.request({
          url: '/xingxiao/article/desktop/v1/yearAndMonthlist',
          data: {},
          success: (data) => {
            if (data && data.length > 0) {
              this.yearMonthList = data;
              var lastedYearMonth = this.yearMonthList[0];
              this.year = lastedYearMonth.year;
              this.month = lastedYearMonth.monthList[0];
              this.showIndex = 0;
            }
          },
          error: () => {

          }
        });
      },
      handleBoxShow: function () {
        if (!this.boxShow) {
          var year = this.year;
          for (var i = 0; i < this.yearMonthList.length; i++) {
            if (year == this.yearMonthList[i].year) {
              this.showYearMonth = this.yearMonthList[i];
              break;
            }
          }
        }
        this.boxShow = !this.boxShow;
      },
      yearPrev: function () {
         var year = this.showYearMonth.year;
         for (var i = 0; i < this.yearMonthList.length; i++) {
           if (year == this.yearMonthList[i].year && i < (this.yearMonthList.length - 1)) {
             this.showYearMonth = this.yearMonthList[i + 1];
             break;
           }
         }
      },
      yearNext: function () {
        var year = this.showYearMonth.year;
        for (var i = 0; i < this.yearMonthList.length; i++) {
          if (year == this.yearMonthList[i].year  && i > 0) {
            this.showYearMonth = this.yearMonthList[i - 1];
            break;
          }
        }
      },
      hanldeSelectYearMonth: function(year, month) {
        this.year = year;
        this.month = month;
        this.boxShow = false;

        this.hanldeLoadArticle();
      },
      hanldeLoadArticle: function () {
        this.request({
          url:'/xingxiao/article/desktop/v1/storyList',
          data:{
            year: this.year,
            month: this.month
          },
          success: (data) => {
            if (data && data.length > 0) {
              this.articleList = data;
            }
          },
          error: () => {

          }
        })
      }
    }
  }
</script>

<style scoped>
  .content-bg {
    padding: 18px 22px 20px 22px;
    margin-top: 4px;
    background-color: #f7f7f7;
  }
  .header-image {
    width: 100%;
  }
  .time-box {
    font-size: 20px;
    letter-spacing: 1px;
    padding-bottom: 15px;
    position: relative;
  }
  .time-box-year {
    font-size: 20px;
    letter-spacing: 1px;
    padding-bottom: 15px;
  }
  .time-box-month {
    font-size: 20px;
    letter-spacing: 1px;
    padding-bottom: 15px;
  }
  .next-icon {
    width: 15px;
    height: 9px;
  }
  .next-icon-180 {
    width: 15px;
    height: 9px;
    transform: rotate(180deg);
  }
  .tale-box{
    flex: 1;
  }
  .tale-box-item-box{
    display: flex;
    margin-bottom: 43px;
  }
  .tale-box-item-titme{
    width: 65px;
    color: #000000;
    font-size: 12px;
    padding-right: 16px;
    text-align: right;
  }
  .tale-box-item-titme-number{
    font-size: 26px;
    color: #000000;
  }
  .tale-box-item-titme-year{
    width: 42px;
    text-align: center;
    display: inline-block;
    font-size: 12px;
    color: #ffffff;
    background: #f0a7af;
    border-radius: 5px;
  }
  .tale-box-item-img-box{
    flex: 1;
    padding: 6px;
    background-color: #ffffff;
  }
  .tale-box-item-img-box-bg{
    width: 100%;
    height: 198px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .tale-box-item-img-box-bg:hover{
    box-shadow: 0px 0px 2px #888888;
  }
  .tale-box-item-img{
    overflow: hidden;
    width: 100%;
  }
  .tale-box-item-img-p{
    font-size: 12px;
    color: #010101;
    line-height: 20px;
    padding-top: 14px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .tale-box-item-img > p{
    font-size: 12px;
    color: #000000;
    margin-bottom: 106px;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .look-more {
    text-align: center;
    color: #787878;
  }
  .time-box-hide {
    width: 164px;
    background-color: #ffffff;
    border-top: 3px solid #f996aa;
    position: absolute;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    box-shadow: 1px 1px 1px #e9e9e9;
  }
  .time-box-header {
    position: relative;
    height: 34px;
  }
  .prev {
    position: absolute;
    top: 10px;
    left: 8px;
  }
  .prev-img {
    width: 15px;
    height: 8px;
    transform: rotate(90deg);
  }
  .next {
    position: absolute;
    right: 8px;
    top: 10px;
  }
  .next-img {
    width: 15px;
    height: 8px;
    transform: rotate(270deg);
  }
  .time-box-content{
    padding: 20px 0px;
  }
  .content-year {
    font-size: 18px;
    position: absolute;
    top: 8px;
    left: 60px;
  }
  .content-month-active {
    width: 36px;
    height: 36px;
    background-color: #f4a2b0;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    margin: 0px 0px 0px 4px;
    color: #ffffff;
    font-size: 12px;
  }
  .content-month {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    margin: 0px 0px 0px 4px;
    font-size: 12px;
  }

</style>
