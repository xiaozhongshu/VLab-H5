
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="content-container">
      <div class="content-order">
        <div class="content-order-state">您的订单：{{
          order.saleOrderStatus === 'WAITING_DELIVERY' ?
          '待发货' : order.saleOrderStatus === 'WAITING_PAID' ?
          '待付款' : order.saleOrderStatus === 'WAITING_RECEIVE' ?
          '待收货' : '已完成' }} </div>
        <div class="cell-line"></div>
        <div class="content-order-id">订单编号：{{order.saleOrderId}}</div>
        <div class="cell-line"></div>
        <div class="content-order-time">下单时间：{{order.systemCreateTime}}</div>
      </div>
      <div class="order-address">
        <div class="content-item-desc">
          <div class="content-item-information">{{order.saleOrderReceiveName}} {{order.saleOrderReceiveMobile}}</div>
          <div class="content-item-address">{{order.saleOrderReceiveProvince}}{{order.saleOrderReceiveCity}}{{order.saleOrderReceiveArea}}{{order.saleOrderReceiveAddress}}</div>
        </div>
      </div>
      <div class="order-product">
        <b-media tag="li">
          <b-img slot="aside" :src="imageHost + order.saleOrderProductList[0].productImagePath" width="60" height="60" resize="cover"  />
          <h5 class="product-name">{{order.saleOrderProductList[0].productTitle}}</h5>
          <span class="product-price">￥{{order.saleOrderProductList[0].productPrice}} X {{order.saleOrderProductList[0].productQuantity}}</span>
        </b-media>
      </div>
      <div class="order-desc">
        <div class="order-desc-price">
          <div class="order-desc-price-title">商品金额</div>
          <div class="order-desc-price-text">￥{{order.saleOrderPayAccount}}</div>
        </div>
        <div class="cell-line"></div>
        <div class="order-desc-freight">
          <div class="order-desc-freight-title">运费</div>
          <div class="order-desc-price-text">￥{{order.saleOrderExpressAmount}}</div>
        </div>
        <div class="cell-line"></div>
        <div class="order-desc-discount">
          <div class="order-desc-discount-title">商品优惠</div>
          <div class="order-desc-price-text">￥0</div>
        </div>
      </div>

      <!--<div class="order-logistics">-->
        <!--<div class="order-logistics-title">物流单号：821121154541</div>-->
        <!--<div class="cell-line"></div>-->
        <!--<div class="order-logistics-desc-box">-->
          <!--<span class="order-logistics-title-state">· 状态：顺丰速运（已签收）</span>-->
          <!--<div class="logistics-line">|</div>-->
          <!--· <span class="logistics-time"> 2018-06-22 14:36:08</span>-->
          <!--<span class="logistics-time-position">[汕尾市]已签收，感谢使用顺丰，期待再次为您服务</span>-->
          <!--<div class="logistics-line">|</div>-->
          <!--· <span class="logistics-time"> 2018-06-22 14:36:08</span>-->
          <!--<span class="logistics-time-position">[汕尾市]快件交给陈锡潭，正在派送途中（联系电话：13267713820）</span>-->
          <!--<div class="logistics-line">|</div>-->
          <!--· <span class="logistics-time"> 2018-06-22 14:36:08</span>-->
          <!--<span class="logistics-time-position">[汕尾市]快件交给林镇灏，正在派送途中（联系电话：13192537770）</span>-->
        <!--</div>-->
      <!--</div>-->

      <div class="content-order-footer" v-if=" order.saleOrderStatus === 'WAITING_PAID'">
        <div class="content-order-footer-title">合计：￥{{order.saleOrderPayAccount}}</div>
        <div class="content-order-footer-btn" @click="handleToPayment">立即付款</div>
      </div>
      <div class="content-order-footer"  v-if=" order.saleOrderStatus != 'WAITING_PAID'" >
        <div class="content-order-footer-title">实付款：￥{{order.saleOrderPayAccount}}</div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .content-container {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #F5F5F9;
  }
  .content-order {
    width: 100%;
    background-color: #ffffff;
  }
  .content-order-state {
    padding: 10px;
    font-size: 15px;
    color: #000000;
    border-top: 1px solid #cccccc;
  }
  .content-order-id {
    padding: 10px;
    font-size: 15px;
    color: #000000;
  }
  .content-order-time {
    padding: 10px;
    font-size: 15px;
    color: #000000;
    border-bottom: 1px solid #cccccc;
  }
  .order-address {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
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
  .order-product {
    margin-top: 10px;
    padding: 15px;
    background-color: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .product-name {
    font-size: 15px;
    margin-top: 14px;
    color: #000000;
    margin-left: 2px;
  }
  .product-price {
    font-size: 13px;
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
  }
  .order-desc-freight-title {
    font-size: 15px;
    color: #000000;
    flex: 1;
  }
  .order-desc-discount {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #cccccc;
  }
  .order-desc-discount-title {
    font-size: 15px;
    color: #000000;
    flex: 1;
  }
  .content-order-footer {
    width: 100%;
    margin-top: 80px;
    position: relative;
    padding: 14px 0px 15px 15px;
    background-color: #ffffff;
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
  .order-logistics {
    margin-top: 10px;
    border-top: 1px solid #cccccc;
    background-color: #ffffff;
  }
  .order-logistics-title {
    color: #000000;
    padding: 10px;
    font-size: 15px;
  }
  .order-logistics-desc-box {
    padding: 10px;
  }
  .order-logistics-title-state {
    color: #000000;
    font-size: 14px;
  }
  .logistics-line {
    font-size: 12px;
    padding-left: 20px;
    color: #e994a9;
  }
  .logistics-time {
    font-size: 12px;
    color: #e994a9;
  }
  .logistics-time-position {
    font-size: 12px;
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
