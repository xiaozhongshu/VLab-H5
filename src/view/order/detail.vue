
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->

    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>


</style>

<script>
  import mixins from '../../mixins/index';
  import bImg from 'bootstrap-vue/es/components/image/img';
  import bMedia from 'bootstrap-vue/es/components/media/media';

  import storage from '../../common/storage';
  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';


  export default {
    components: {
      bImg,
      bMedia,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      saleOrderId: '',
      order: {

      },
      saleOrderPayAccount: '',
    }),
    created() {

    },
    mounted() {
      this.handleLoadProduct();
      if (this.$route.params.saleOrderId) {
        this.saleOrderId = this.$route.params.saleOrderId;
        this.handleLoadProduct();
      }
    },
    methods: {
      handleLoadProduct() {
        this.request({
          url: '/xingxiao/sale/order/desktop/v1/find',
          data: {
            saleOrderId: this.saleOrderId
          },
          success: (data) => {
            this.order = data;
            this.saleOrderPayAccount = data.saleOrderPayAccount;
          },
          error: () => {

          }
        });
      },
      handleToPayment: function () {

      }
    }
  }
</script>
