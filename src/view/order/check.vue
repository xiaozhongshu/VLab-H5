
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="content-container">
      <div class="receiving-address">
        <div class="content-item-desc">
          <div class="content-item-information">{{memberAddressName}} {{memberAddressMobile}}</div>
          <div class="content-item-address">{{memberAddressProvince}}{{memberAddressCity}}{{memberAddressArea}}{{memberAddressDetail}}</div>
        </div>
        <div class="content-item-default">
          <b-img class="content-item-icon" src="../../../static/image/tale-001.png"></b-img>
        </div>
      </div>
      <div class="order-desc">
        <div class="order-desc-price">
          <div class="order-desc-price-title">商品金额</div>
          <div class="order-desc-price-text">￥48</div>
        </div>
        <div class="cell-line"></div>
        <div class="order-desc-freight">
          <div class="order-desc-freight-title">运费</div>
          <div class="order-desc-price-text">￥0</div>
        </div>
      </div>
      <textarea class="buyer-message" placeholder="请输入买家留言"></textarea>
      <div class="content-order-footer">
        <div class="content-order-footer-title">总计：￥48</div>
        <div class="content-order-footer-btn" @click="handlePay">立即付款</div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .content-container {
    width: 100%;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: #F5F5F9;
  }
  .receiving-address {
    width: 100%;
    padding: 15px;
    display: flex;
    background-color: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .content-item-desc {
    flex: 1;
  }
  .content-item-information {
    font-size: 17px;
    color: #000000;
  }
  .content-item-address {
    font-size: 13px;
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .content-item-default {
    text-align: center;
    align-items: center;
    padding-top: 10px;
  }
  .content-item-icon {
    width: 12px;
    height: 8px;
    margin-bottom: 2px;
    transform: rotate(270deg);
  }
  .order-desc {
    width: 100%;
    margin-top: 10px;
    background-color: #ffffff;
  }
  .order-desc-price {
    padding: 10px;
    display: flex;
    border-top: 1px solid #cccccc;
  }
  .order-desc-price-title {
    font-size: 15px;
    color: #000000;
    flex: 1;
  }
  .order-desc-price-text {
    text-align: right;
    font-size: 13px;
    padding-top: 2px;
  }
  .cell-line {
    border-top: 1px solid #cccccc;
    margin-left: 10px;
  }
  .order-desc-freight {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #cccccc;
  }
  .order-desc-freight-title {
    font-size: 15px;
    color: #000000;
    flex: 1;
  }
  .buyer-message {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    margin-top: 10px;
    color: #000000;
    border-left: none;
    border-right: none;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .content-order-footer {
    width: 100%;
    margin-top: 80px;
    position: relative;
    padding: 14px 0px 15px 15px;
    background-color: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .content-order-footer-title {
    font-size: 15px;
    color: #000000;
  }
  .content-order-footer-btn {
    padding: 15px;
    top: 0px;
    right: 0px;
    color: #ffffff;
    position: absolute;
    background-color: #e994a9;
  }

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
