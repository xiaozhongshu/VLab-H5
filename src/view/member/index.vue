
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
  import storage from '../../common/storage';
  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bImg,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      userAvatar: '',
      userName: '',
      memberWaitPay: 0,
      memberWaitSend: 0,
      memberWaitReceive: 0,
    }),
    created() {

    },
    mounted() {
      this.handleUserDetails();
      this.handleUserOrderList();
    },
    methods: {

      handleUserDetails: function () {
        if (storage.getToken() != '') {
          this.request({
            url: '/xingxiao/member/mobile/v1/view',
            data: {},
            success: (data) => {
              if (data) {
                this.userAvatar = data.memberAvatarPath;
                this.userName = data.memberNickName;
              }
            },
            error: () => {

            }
          });
        }
      },
      handleUserOrderList: function () {
        if (storage.getToken() != ''){
          this.request({
            url: '/xingxiao/sale/order/mobile/v1/statistics',
            data: {},
            success: (data) => {
              for (var i = 0; i < data.length; i++){
                if (data[i].saleOrderStatus == "COMPLETE") {
                }
                else if (data[i].saleOrderStatus === "WAITING_DELIVERY") {
                  this. memberWaitSend = data[i].total
                }
                else if (data[i].saleOrderStatus === "WAITING_PAID") {
                  this.memberWaitPay = data[i].total
                }
                else if (data[i].saleOrderStatus && data[i].saleOrderStatus === "WAITING_RECEIVE") {
                  this.memberWaitReceive = data[i].total
                }
              }
            },
            error: () => {

            }
          });
        }
      },
      handleToOrderList: function (saleOrderStatus) {
        this.$router.push({name:'orderList', params:{saleOrderStatus: saleOrderStatus}});
      }
    }
  }
</script>
