
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
