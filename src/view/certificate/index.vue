<template>
  <div>
    <!-- 头部 -->
    <Header :index="-1"
            :isShowCategoryLeft="false"></Header>
    <div class="relative">
      <div class="body-title">真伪查询</div>
      <div class="content">
        <b-form-group
          label-for="mobile">
          <b-form-input v-model="QRCode"
                        type="number"
                        placeholder="请输入二维码ID"></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="mobile">
          <b-form-input v-model="verificationCode"
                        type="number"
                        placeholder="请输入验证码"></b-form-input>
        </b-form-group>
        <div class="sublime-disable"
             v-if="isActive"
             @click="handleQuery">加载中...
        </div>
        <div class="sublime"
             v-if="!isActive"
             @click="handleQuery">查询
        </div>
      </div>
      <div class="result"
           v-if="isQueryFailure">
        <div class="result-content">
          <p>查询结果：{{result.QueryResult}}</p>
        </div>
      </div>
      <div class="body-box">
        <b-img class="body-box-img" src="../../../static/image/antifake.png"></b-img>
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .relative {
    position: relative;
  }

  .content {
    width: 260px;
    margin: 0 auto;
  }

  .body-title {
    color: #000000;
    font-size: 22px;
    text-align: center;
    padding: 20px 0px;
  }

  .sublime {
    width: 120px;
    height: 36px;
    line-height: 36px;
    background: #e994a9;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin: 20px auto 20px auto;
    cursor: pointer;
  }

  .sublime-disable{
    width: 120px;
    height: 36px;
    line-height: 36px;
    background: #cccccc;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin: 20px auto 20px auto;
    cursor: pointer;
  }

  .body-box {
    margin-top: 26px;
    margin-bottom: 100px;
  }

  .body-box-img {
    width: 260px;
    margin: 0 auto;
    display: block;
  }

  .result {
    width: 260px;
    margin: 0 auto;
  }

  .result-content {
    border: 1px solid #e994a9;
    padding: 10px;
  }

  .result-content p {
    font-size: 14px;
    line-height: 28px;
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
      isQueryFailure: false
    }),
    created() {

    },
    mounted() {

    },
    methods: {
      handleQuery: function () {
        if(this.isActive) {
          return;
        }
        if (this.QRCode == '') {
          this.$toasted.show('二维码ID不能为空');
          return;
        }
        if (this.verificationCode == '') {
          this.$toasted.show('验证码不能为空');
          return;
        }
        this.isActive = true;
        this.request({
          url: '/xingxiao/certificate/mobile/v1/qrcode/find',
          data: {
            vcode: this.verificationCode,
            fwcode: this.QRCode
            // fwcode: '1594289614662266',
            // vcode: '4269'
          },
          success: (data) => {
            this.isQueryFailure = true;
            this.$toasted.show('查询成功');
            this.result = eval(data.checkResult);
            this.isActive = false;
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
