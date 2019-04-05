<template>
  <div>
    <!-- 头部 -->
    <Header :index="1"
            :isShowCategoryLeft="true"></Header>

    <!--内容-->
    <div class="relative">
      <div class="body-title">
        真伪查询
      </div>
      <div class="content">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="请输入二维码ID" name="">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="请输入验证码" name="">
        </div>
      </div>
      <div class="sublime">
        查询
      </div>
      <div class="body-box">
        <img src="../../../static/image/antifake.png" class="body-box-img" alt="">
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style src="./antifake.css" scoped>


</style>

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
    data: () => ({}),
    created () {

    },
    mounted () {
      setTimeout(() => {
        window.scrollTo(0, this.$route.query.top)
      }, 500)
    },
    methods: {
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    }
  }
</script>
