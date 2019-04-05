
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
      emberAddressId: '',
      memberAddressName: '',
      memberAddressMobile: '',
      memberAddressProvince: '',
      memberAddressCity: '',
      memberAddressArea: '',
      memberAddressDetail: '',
      saleOrderProductList: [],
      totalAmount: 0,
      expressAmount: 0,
      productSkuId: '',
      number: '',
      sumPrice: '',
      product: '',
    }),
    created() {

    },
    mounted() {
      if (this.$route.params.productSkuId && this.$route.params.number && this.$route.params.sumPrice && this.$route.params.product) {
        this.productSkuId = this.$route.params.productSkuId;
        this.number = this.$route.params.number;
        this.sumPrice = this.$route.params.sumPrice;
        this.product = this.$route.params.product;
        console.log(this.productSkuId, this.number, this.sumPrice, this.product);
      };
      this.handleLoadDefaultAddress();
    },
    methods: {
      handleLoadDefaultAddress: function () {
        this.request({
          isToast: true,
          url: '/xingxiao/member/address/mobile/v1/find/default',
          data: {},
          success: function (data) {
            console.log('data', data)
            if (data.data && data.memberAddressId) {
              this.setData({
                memberAddressId: data.memberAddressId,
                memberAddressName: data.memberAddressName,
                memberAddressMobile: data.memberAddressMobile,
                memberAddressProvince: data.memberAddressProvince,
                memberAddressCity: data.memberAddressCity,
                memberAddressArea: data.memberAddressArea,
                memberAddressDetail: data.memberAddressDetail
              });
            }
          }.bind(this)
        })
      },
      handleCreateOrder: function () {
        if (this.data.memberAddressId == '') {
          return;
        }
        if (this.data.totalAmount <= 0) {
          return;
        }
        if (this.data.saleOrderProductList.length == 0) {
          return;
        }
        this.request({
          isToast: true,
          url: '/xingxiao/sale/order/mobile/v1/save',
          data: {
            saleOrderProductList: this.data.saleOrderProductList,
            memberAddressId: this.data.memberAddressId,
            memberCouponId: "",
            memberInvoiceId: "",
            saleOrderDeliverPattern: "",
            saleOrderIsOpenInvoice: false,
            saleOrderRemark: "",
            saleOrderFrom: "V+Lab_wx",
          },
          success: function (data) {
            if (data.result && data.data && data.data.saleOrderId && data.data.saleOrderPayAccount) {
              this.handlePay(data.data.saleOrderId,  data.data.saleOrderPayAccount);
            }
          }.bind(this)
        });
      },
      handlePay: function (outTradeNo, totalFee) {
        wechat.auth({
          success: function (data) {
            http.request({
              isToast: true,
              url: '/wechat/wechat/pay/mobile/v1/unified/order',
              data: {
                outTradeNo: outTradeNo,
                openId: storage.getOpenId(),
                tradeType: 'JSAPI',
                body: '微信支付',
                totalFee: totalFee * 100,
                notifyUrl: ''
              },
              success: function (data) {
                wx.requestPayment({
                  nonceStr: data.data.nonceStr,
                  package: data.data.packageStr,
                  signType: data.data.signType,
                  paySign: data.data.paySign,
                  appId: data.data.appId,
                  timeStamp: data.data.timeStamp,
                  success: function (response) {

                  },
                  complete: function (response) {
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '/div/product/index?saleOrderId=' + outTradeNo,
                      });
                    }, 300)
                  }
                })
              }.bind(this),
              file: function(){

              }
            });
          }.bind(this),
          fail: function () {

          }
        });
      },
    }
  }
</script>
