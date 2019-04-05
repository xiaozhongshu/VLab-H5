<template>
  <div>
    <!-- 头部 -->
    <Header :index="2"
            :isShowCategoryLeft="true"></Header>
    <!--内容-->
    <div class="banner-bg">
      <div class="center">
        <img src="../../../static/image/V-lab01.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab02.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab03.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab04.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab05.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab06.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab07.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab08.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab09.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab10.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab11.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab12.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab13.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab14.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab15.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab16.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab17.png" alt="" class="center-img">
        <img src="../../../static/image/V-lab18.png" alt="" class="center-img">
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style scoped>

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

    },
    methods: {}
  }
</script>
