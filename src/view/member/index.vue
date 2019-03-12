
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="header-container">
      <div class="header-bg">
        <b-img class="user-avatar"  :src="userAvatar"></b-img>
        <span class="user-name">{{userName ? userName : '用户名'}}</span>
      </div>
      <div class="content">
        <div class="content-order" @click="handleToOrderList('ALL')">
          <div class="content-order-img">
            <b-img class="content-order-icon" src="../../../static/image/form.png"></b-img>
          </div>
          <div class="content-order-title">我的订单</div>
          <div class="content-order-desc">
            <span class="content-order-desc-text">查看全部订单</span>
            <b-img class="content-order-desc-icon" src="../../../static/image/tale-001.png"></b-img>
          </div>
        </div>
        <div class="content-order-details">
          <div class="content-order-details-item" @click="handleToOrderList('WAITING_PAID')">
            <div class="content-order-details-item-icon">
              <b-img class="pay-img" src="../../../static/image/pay.png"></b-img>
              <div class="pay-img-badge" v-if="memberWaitPay > 0">{{memberWaitPay}}</div>
            </div>
            <div class="content-order-details-item-title">待付款</div>
          </div>
          <div class="content-order-details-item" @click="handleToOrderList('WAITING_DELIVERY')">
            <div class="content-order-details-item-icon">
              <b-img class="pay-img" src="../../../static/image/send.png"></b-img>
              <div class="pay-img-badge" v-if="memberWaitSend > 0">{{memberWaitSend}}</div>
            </div>
            <div class="content-order-details-item-title">待发货</div>
          </div>
          <div class="content-order-details-item" @click="handleToOrderList('WAITING_RECEIVE')">
            <div class="content-order-details-item-icon">
              <b-img class="pay-img" src="../../../static/image/deliver.png"></b-img>
              <div class="pay-img-badge" v-if="memberWaitReceive > 0">{{memberWaitReceive}}</div>
            </div>
            <div class="content-order-details-item-title">待收货</div>
          </div>
          <div class="content-order-details-item" @click="handleToOrderList('COMPLETE')">
            <div class="content-order-details-item-icon">
              <b-img class="pay-img" src="../../../static/image/comment.png"></b-img>
          </div>
            <div class="content-order-details-item-title">已完成</div>
          </div>
        </div>
      </div>
      <div class="content-details">
        <router-link class="hot-item" to="/address/index">
          <div class="content-address">
            <div class="content-address-img">
              <b-img class="content-address-icon" src="../../../static/image/location.png"></b-img>
            </div>
            <div class="content-address-title">我的地址</div>
            <b-img class="content-address-more" src="../../../static/image/tale-001.png"></b-img>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .header-container {
    width: 100%;
    min-height: 468px;
    background-color: #F5F5F9;
  }
  .header-bg {
    width: 100%;
    height: 180px;
    padding: 50px;
    background-color: #e994a9;
    text-align: center;
  }
  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block;
    margin: 0px auto 4px auto;
  }
  .user-name {
    font-size: 16px;
    color: #ffffff;
  }
  .content-order {
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 12px 10px;
    position: relative;
    border-top: 1px solid #CCCCCC;
  }
  .content-order-img {
    float: left;
  }
  .content-order-icon {
    width: 20px;
    height: 20px;
  }
  .content-order-title {
    color: #000000;
    font-size: 16px;
    padding-left: 30px;
  }
  .content-order-desc {
    position: absolute;
    top: 14px;
    right: 10px;
  }
  .content-order-desc-text {
    color: #cccccc;
  }
  .content-order-desc-icon {
    width: 12px;
    height: 8px;
    margin-bottom: 2px;
    transform: rotate(270deg);
  }
  .content-order-details {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 73px;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
  }
  .content-order-details-item {
    width: 25%;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    float: left;
  }
  .content-order-details-item-icon {
    position: relative;
    display: inline-block;
  }
  .pay-img {
    width: 30px;
    height: 30px;
  }
  .pay-img-badge {
    display:inline-block;
    padding: 6px 5px;
    min-width: 8px;
    border-radius: 18px;
    background-color: #E64340;
    color: #FFFFFF;
    line-height: 5px;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: -4px;
    right: -4px;
  }
  .content-order-details-item-title {
    color: #000000;
  }
  .content-address {
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 12px 10px;
    position: relative;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .content-address-img {
    float: left;
  }
  .content-address-icon {
    width: 20px;
    height: 20px;
  }
  .content-address-title {
    color: #000000;
    font-size: 16px;
    padding-left: 30px;
  }
  .content-address-more {
    width: 12px;
    height: 8px;
    margin-bottom: 2px;
    position: absolute;
    top: 20px;
    right: 10px;
    transform: rotate(270deg);
  }

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
