<template>
  <div>
    <!-- 头部 -->
    <Header :index="2"
            :isShowCategoryLeft="true"></Header>

    <div class="banner-bg">
      <div class="center">
        <b-img class="content-image" src="../../../static/image/V-lab01.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab02.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab03.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab04.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab05.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab06.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab07.png"></b-img>
        <b-img class="content-image margin-bottom-2" src="../../../static/image/V-lab08.png"></b-img>
        <b-img class="content-image margin-bottom-2" src="../../../static/image/V-lab09.png"></b-img>
        <b-img class="content-image margin-bottom-2" src="../../../static/image/V-lab10.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab11.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab12.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab13.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab14.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab15.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab16.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab17.png"></b-img>
        <b-img class="content-image" src="../../../static/image/V-lab18.png"></b-img>
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style scoped>

  .margin-bottom-2{
    margin-bottom: 2px;
  }
  .banner-bg {
    width: 100%;
  }

  .content-image {
    width: 100%;
    display: block;
  }

  .margin-bottom-2 {
    margin-bottom: 2px;
  }

</style>

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

    }),
    created() {

    },
    mounted() {

    },
    methods: {

    }
  }
</script>
