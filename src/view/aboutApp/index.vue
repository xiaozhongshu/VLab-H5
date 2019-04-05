
<template>


</template>

<style scoped>

</style>

<script>
  import mixins from '../../mixins/index';

  export default {
    components: {

    },
    mixins: [mixins],
    data: () => ({
      articleContent: ''
    }),
    created() {

    },
    mounted() {
      this.handleLoad();
    },
    methods: {
      handleLoad: function () {
        this.request({
          url: '/xingxiao/product/mobile/v1/view',
          data: {

          },
          success: (data) => {
            this.articleContent = data.productDetail.productDetailContentMobile;
          },
          error: () => {

          }
        });
      }
    }
  }
</script>
