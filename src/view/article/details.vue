
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"
            v-if="isApp == false"></Header>

    <!-- 内容 -->
    <div class="header-container">
      <div class="header-content">
        <h2 class="header-content-title">{{articleTitle}}</h2>
        <div class="header-content-data">
          <span class="header-content-author">作者：{{articleAuthor ? articleAuthor : '薇嘉实验室'}}</span>
          <em class="publish-time">时间：{{articlePublishTime}}</em>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-text" v-html="articleContent"></div>
    </div>

    <!-- 底部 -->
    <Footer v-if="isApp == false"></Footer>
  </div>

</template>

<style scoped>

  .header-container {
    width: 100%;
    position: relative;
    padding: 0px 10px;
  }
  .content {
    width: 100%;
  }
  .content-text {
    width: 100%;
    padding: 20px 10px;
    white-space:pre-wrap;
  }
  .header-content {
    width: 100%;
    padding: 40px 0px;
    text-align: center;
  }
  .header-content-title {
    padding-bottom: 10px;
    margin-bottom: 6px;
    border-bottom: 1px solid #e7e7eb;
    color: #000000;
    font-size: 30px;
  }
  .header-content-data {
    line-height: 20px;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 14px;
  }
  .header-content-author {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 10px 0;
    color: #1b1b1b;
  }
  .publish-time {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 10px 0;
    color: #1b1b1b;
  }
  .code{
    position: fixed;
    left: 0;
    right: 0;
    top: 20px;
  }
  .code-box {
    position: relative;
    width: 740px;
    margin-left: auto;
    margin-right: auto;
    color: #717375;
    text-align: center;
  }

  .code-img {
    position: absolute;
    right: -140px;
    top: 130px;
    width: 140px;
    border: 1px solid #cccccc;
  }

</style>

<script>
  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      articleId: '',
      articleContent: '',
      articleTitle: '',
      articleAuthor: '',
      articlePublishTime: '',
      isApp: false
    }),
    created() {

    },
    mounted() {
      if (this.$route.params.articleId) {
        this.articleId = this.$route.params.articleId;
      }
      if(this.$route.query.isApp == 'true'){
        this.isApp = true;        //是否APP加载，然后隐藏头部
      }
      this.handleLoadArticle();
    },
    methods: {
      handleLoadArticle: function () {
        this.request({
          url: '/xingxiao/article/desktop/v1/find',
          data: {
            articleId: this.articleId
          },
          success: (data) => {
            if (data && data.articleContent) {
              this.articleContent = data.articleContent;
              this.articleTitle = data.articleTitle;
              this.articleAuthor = data.articleAuthor;
              this.articlePublishTime = this.timeToDateStr(data.articlePublishTime);
            }
          },
          error: () => {

          }
        });
      },
      timeToDateStr: function (time) {
        var differTime = parseInt((new Date().getTime() - time) / 1000);
        if (differTime <= 0) {
          return "刚刚";
        } else if (differTime < 60) {
          return differTime + "秒前";
        } else if (differTime < 3600) {
          return parseInt(differTime/60) + "分钟前";
        } else if (differTime < 86400) {
          return parseInt(differTime/3600) + "小时前";
        } else if (differTime < 2592000) {
          return parseInt(differTime / 86400) + "天前";
        } else if (differTime < 31104000) {
          return parseInt(differTime / 2592000) + "月前";
        } else {
          return parseInt(differTime / 31104000) + "年前";
        }
      }
    }
  }
</script>
