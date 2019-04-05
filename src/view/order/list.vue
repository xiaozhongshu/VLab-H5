
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
      pageIndex: 1,
      pageSize: 8,
      orderList: [],
      saleOrderId: '',
      productImagePath: '',
      saleOrderStatus: 'ALL'
    }),
    created() {

    },
    mounted() {
      if (this.$route.params.saleOrderStatus) {
        this.saleOrderStatus = this.$route.params.saleOrderStatus;
      }
      this.handleOrderDetails();
    },
    methods: {
      handleOrderDetails: function () {
        this.request({
          url: '/xingxiao/sale/order/mobile/v1/list',
          data: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            saleOrderStatus: this.saleOrderStatus === 'ALL' ?  '' : this.saleOrderStatus
          },
          success: (data) => {
            this.orderList = data.list;
            for (var i = 0; i < data.list.length; i++) {
              this.saleOrderId = data.list[i].saleOrderId
            }
          },
          error: () => {

          }
        });
      },
      handleChangeSaleOrderStatus: function (saleOrderStatus) {
        if (this.saleOrderStatus != saleOrderStatus) {
          this.saleOrderStatus = saleOrderStatus;
          this.handleOrderDetails();
        }
      },
      handleToOrderDetail: function (saleOrderId) {
        this.$router.push({name:'orderDetail', params:{saleOrderId: saleOrderId}});
      }
    }
  }
</script>
