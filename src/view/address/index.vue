
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="content-container">
      <div class="content-item" v-for="(item, index) in addressList" :key="item.memberAddressId" @click="handleToAddressDetail(item.memberAddressId)">
        <div class="content-item-desc">
          <div class="content-item-information">{{item.memberAddressName}} {{item.memberAddressMobile}}</div>
          <div class="content-item-address">{{item.memberAddressProvince}}{{item.memberAddressCity}}{{item.memberAddressArea}}{{item.memberAddressDetail}}</div>
        </div>
        <div class="content-item-default">
          <span class="content-item-default-text" v-if="item.memberAddressIsDefault">默认</span>
          <b-img class="content-item-icon" src="../../../static/image/tale-001.png"></b-img>
        </div>
      </div>
      <router-link class="add-address" to="/address/add">
        <div class="add-address-btn">新增收货地址</div>
      </router-link>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .content-container {
    width: 100%;
    min-height: 428px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #F5F5F9;
  }
  .content-item {
    width: 100%;
    margin-bottom: 10px;
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

  .add-address{

  }

  .add-address-btn {
    width: 90%;
    padding: 10px;
    font-size: 17px;
    margin: 90px auto 10px auto;
    text-align: center;
    background-color: #e994a9;
    color: #ffffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
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
      addressList: [],
      memberAddressId: '',
    }),
    created() {

    },
    mounted() {
      this.handleAddressList();
    },
    methods: {
      handleAddressList: function () {
        this.request({
          url: '/xingxiao/member/address/mobile/v1/list',
          data: {},
          success: (data) => {

            this.addressList = data.list;
            for (var i = 0; i < data.list.length; i++) {
              this.memberAddressId = data.list[i].memberAddressId
            }
          },
          error: () => {

          }
        });
      },
      handleToAddressDetail: function (memberAddressId) {
        this.$router.push({name:'addressList', params:{memberAddressId: memberAddressId}});
      }
    }
  }
</script>
