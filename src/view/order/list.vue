
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="content-container">
      <div class="content-container-item">
        <div class="content-header">
          <div :class="saleOrderStatus === 'ALL' ? 'content-header-item-active' : 'content-header-item'"  @click="handleChangeSaleOrderStatus('ALL')"> 全部</div>
          <div :class="saleOrderStatus === 'WAITING_PAID' ? 'content-header-item-active' : 'content-header-item'" @click="handleChangeSaleOrderStatus('WAITING_PAID')"> 待付款</div>
          <div :class="saleOrderStatus === 'WAITING_DELIVERY' ? 'content-header-item-active' : 'content-header-item'" @click="handleChangeSaleOrderStatus('WAITING_DELIVERY')"> 待发货</div>
          <div :class="saleOrderStatus === 'WAITING_RECEIVE' ? 'content-header-item-active' : 'content-header-item'" @click="handleChangeSaleOrderStatus('WAITING_RECEIVE')"> 待收货</div>
          <div :class="saleOrderStatus === 'COMPLETE' ? 'content-header-item-active' : 'content-header-item'" @click="handleChangeSaleOrderStatus('COMPLETE')"> 已完成</div>
        </div>
        <div class="content-order">
          <div class="content-order-item" v-for="(item, index) in orderList" @click="handleToOrderDetail(item.saleOrderId)">
            <div class="content-order-item-number">
              <div class="order-title">订单号：{{item.saleOrderId}} </div>
              <div class="order-state" v-if="item.saleOrderStatus == 'WAITING_PAID'">待付款</div>
              <div class="order-state" v-if="item.saleOrderStatus == 'WAITING_DELIVERY'">待发货</div>
              <div class="order-state" v-if="item.saleOrderStatus == 'WAITING_RECEIVE'">待收货</div>
              <div class="order-state" v-if="item.saleOrderStatus == 'COMPLETE'">已完成</div>
            </div>
            <div class="order-content">
              <b-media tag="li">
                <b-img slot="aside" :src="imageHost + item.saleOrderProductList[0].productImagePath" width="60" height="60" resize="cover"  />
                <h5 class="product-name">{{item.saleOrderProductList[0].productTitle}}</h5>
                <span class="product-price">￥{{item.saleOrderProductList[0].productPrice}} X {{item.saleOrderProductList[0].productQuantity}}</span>
              </b-media>
              <div class="order-content"></div>
              <div class="order-product-price">
                <div class="order-product-price-text">共{{item.saleOrderTotalQuantity}}件商品，合计：￥{{item.saleOrderPayAccount}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="orderList.length == 0">
        <b-img class="no-data-icon" src="../../../static/image/nodata.png"></b-img>
        <div class="no-data-text">当前没有数据</div>
      </div>

    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .content-container {
    width: 100%;
    min-height: 668px;
    background-color: #F5F5F9;
  }
  .content-header {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
  }
  .content-header-item {
    width: 20%;
    padding: 13px 0px;
    color: #000000;
    text-align: center;
    float: left;
  }
  .content-header-item-active {
    width: 20%;
    padding: 12px 0px;
    text-align: center;
    color: #e994a9;
    border-bottom: 3px solid #e994a9;
    float: left;
  }
  .content-order-item {
    width: 100%;
    margin-top: 10px;
    background-color: #ffffff;
  }
  .content-order-item-number {
    width: 100%;
    padding: 10px 15px;
    position: relative;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .order-title {
    color: #000000;
    font-size: 14px;
  }
  .order-state {
    position: absolute;
    top: 10px;
    right: 15px;
  }
  .order-content {
    width: 100%;
    padding: 15px 0px 0px 15px;
    border-bottom: 1px solid #cccccc;
  }
  .product-name {
    font-size: 15px;
    color: #000000;
    margin-top: 15px;
    margin-left: 2px;
  }
  .product-price {
    font-size: 13px;
  }
  .order-product-price {
    width: 100%;
    padding: 10px 15px;
  }
  .order-product-price-text {
    text-align: right;
    color: #000000;
    font-size: 13px;
  }
  .no-data-icon {
    position: absolute;
    top: 50%;
    margin-top: -100px;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
  }
  .no-data-text {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    left: 50%;
    margin-left: -50px;
    width: 100px;
    height: 30px;
    color: #888;
    font-size: 14px;
    text-align: center;
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
