
<template>
  <div>
    <!-- 头部 -->
    <Header :index="-1"
            :isShowCategoryLeft="false"></Header>
    <div class="relative">
      <div class="body-title">查询授权书</div>
      <div class="content">
        <b-form-group
          label-for="mobile">
          <b-form-input
            v-model="verificationCode"
            type="number"
            placeholder="请输入授权书编号"></b-form-input>
        </b-form-group>
        <div class="sublime-disable"
             v-if="isActive"
             @click="handleQuery">加载中...</div>
        <div class="sublime"
             v-if="!isActive"
             @click="handleQuery">查询</div>
      </div>
      <div class="body-box">
        <b-img class="body-box-img"
               @click="handleShowMask"
               :src="isQueryFailure ? result : '../../../static/image/certificate.jpg'"></b-img>
        <div>
          <div class="body-box-line"></div>
          <span class="authorization-number">授权编号</span>
        </div>
      </div>
    </div>

    <div @click="handleCloneMask" v-if="isShoeMask">
      <div class="mask-bg"></div>
      <b-img class="mask-bg-img"
             :src="isQueryFailure ? result : '../../../static/image/certificate.jpg'"></b-img>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .relative{
    position: relative;
  }
  .content{
    width: 260px;
    margin: 40px auto 0px auto;
  }
  .body-title {
    color: #000000;
    font-size: 28px;
    text-align: center;
    padding-top: 20px;
  }
  .sublime{
    width: 120px;
    height: 36px;
    line-height: 36px;
    background: #e994a9;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin: 20px auto 0px auto;
    cursor: pointer;
  }
  .sublime-disable{
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin: 20px auto 0px auto;
    cursor: pointer;
    background: #cccccc !important;
  }
  .body-box {
    text-align: center;
    padding: 40px 0px;
    position: relative;
  }
  .body-box-img{
    width: 160px;
  }
  .body-box-line{
    width: 60px;
    height: 1px;
    position: absolute;
    top: 80px;
    right: 82px;
    background: #000000;
  }
  .authorization-number{
    position: absolute;
    top: 70px;
    right: 24px;
    color: #000000;
  }

  .mask-bg{
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: #000000;
    opacity: 0.6;
    z-index: 1000;
  }
  .mask-bg-img{
    width: 320px;
    height: 427px;
    position: fixed;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    margin-top: -212px;
    margin-left: -160px;
    z-index: 1001;
  }
</style>

<script>
  import bForm from 'bootstrap-vue/es/components/form/form';
  import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bForm,
      bFormGroup,
      bFormInput,
      bImg,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      isActive: false,
      verificationCode: '',
      QRCode: '',
      result: '',
      isShoeMask: false,
      isQueryFailure: false
    }),
    created() {

    },
    mounted() {

    },
    methods: {
      handleCloneMask: function () {
        this.isShoeMask = false
      },
      handleShowMask: function () {
        this.isShoeMask = true
      },
      handleQuery: function () {
        if(this.isActive) {
          return;
        }
        if (this.verificationCode == ''){
          this.$toasted.show('授权书不能为空');
          return;
        }
        this.isActive = true;
        this.request({
          url: '/xingxiao/certificate/desktop/v1/list',
          data: {
            certificateNumber: this.verificationCode
          },
          success: (data) => {
            this.isActive = false;
            if(data.length <= 0) {
              this.$toasted.show('请输入正确的编号');
              return
            }
            this.$toasted.show('查询成功');
            this.isQueryFailure = true;
            this.result = this.imageHost + data[0].certificateFilePath;
          },
          error: (data) => {
            this.isQueryFailure = false;
            this.$toasted.show('查询失败');
            this.isActive = false;
          }
        });
      }
    }
  }
</script>
