
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"
            v-if="isApp == false"></Header>


    <!-- 底部 -->
    <Footer v-if="isApp == false"></Footer>
  </div>

</template>

<style scoped>


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
