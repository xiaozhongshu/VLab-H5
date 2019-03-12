
<template>
  <div>
    <!-- 头部 -->
    <Header :index="3"
            :isShowCategoryLeft="false"></Header>
    <!-- 内容 -->
    <div class="content-container">
      <div class="content">
        <div class="content-description">
          <div class="content-description-none" style="display: none;">您的收货地址是空的...</div>
          <h2 class="content-description-title">地址编辑</h2>
          <b-form-group
            id="fieldName"
            label="收货人姓名"
            label-for="memberAddressName">
            <b-form-input id="memberAddressName"
                          placeholder="请输入收货人姓名..."
                          v-model="memberAddressName"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldMobile"
            label="收件人手机号码"
            label-for="memberAddressMobile">
            <b-form-input id="memberAddressMobile"
                          placeholder="请输入手机号码..."
                          v-model="memberAddressMobile"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="省份:"
                        label-for="memberAddressProvince">
            <b-form-select id="memberAddressProvince"
                           v-model="memberAddressProvince"
                           @change="handleProvChange">
              <option v-for="option in arr" :value="option.name">
                {{ option.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group label="城市:"
                        label-for="memberAddressCity">
            <b-form-select id="memberAddressCity"
                           v-model="memberAddressCity"
                           @change="handleCityChange">
              <option v-for="option in cityArr" :value="option.name">
                {{ option.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group label="行政区:"
                        label-for="memberAddressArea">
            <b-form-select id="memberAddressArea"
                           v-model="memberAddressArea">
              <option v-for="option in districtArr" :value="option.name">
                {{ option.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="fieldAddressDetail"
            label="地址详情"
            label-for="memberAddressDetail">
            <b-form-input id="memberAddressDetail"
                          placeholder="请输入地址详情..."
                          v-model="memberAddressDetail"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldAddressIsDefault"
            label="是否默认地址"
            label-for="memberAddressIsDefault"
          >
            <b-form-radio-group id="memberAddressIsDefault" v-model="memberAddressIsDefault" :options="isDefaultOptions" name="memberAddressIsDefault">
            </b-form-radio-group>
          </b-form-group>
          <div class="settlement">
            <div class="settlement-delete" v-if="memberAddressId != ''" @click="handleDeleteAddress">删除</div>
            <div class="settlement-sublime" @click="handleSubmit">提交</div>
          </div>
        </div>
      </div>
      <div class="mask"
           v-if="isMask">
        <div class="mask-bg"></div>
        <div class="mask-content">
          <div class="mask-content-header">确定删除</div>
          <div class="mask-content-desc">您确定删除该地址吗？</div>
          <div class="mask-content-return" @click="handleReturn">返回</div>
          <div class="mask-content-determine" @click="handleDetermine">确定</div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .content-container {
    width: 100%;
    padding: 10px 20px;
    background-color: #F5F5F9;
  }
  .content{
    flex: 1;
  }

  .content-description{
    width: 100%;
  }

  .content-description-none{
    font-size: 17px;
  }

  .content-description-title{
    font-size: 22px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .settlement{
    width: 100%;
    height: 70px;
    position: relative;
  }
  .settlement-delete {
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #e994a9;
    border: 1px solid #e994a9;
    position: absolute;
    top: 0px;
    right: 120px;
    border-radius: 3px;
  }
  .settlement-sublime {
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    background-color: #e994a9;
    position: absolute;
    right: 10px;
    top: 0px;
    border-radius: 3px;
  }
  .mask-bg {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: #000000;
    opacity: 0.6;
    z-index: 1000;
  }
  .mask-content {
    width: 288px;
    height: 130px;
    position: fixed;
    background-color: #ffffff;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    margin-top: -72px;
    margin-left: -144px;
    z-index: 1001;
  }
  .mask-content-header {
    font-size: 18px;
    color: #000000;
    text-align: center;
    padding-top: 15px;
  }
  .mask-content-desc {
    padding-top: 6px;
    padding-bottom: 19px;
    text-align: center;
  }
  .mask-content-return {
    width: 50%;
    float: left;
    color: #000000;
    font-size: 17px;
    text-align: center;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    padding: 8px;
  }
  .mask-content-determine {
    width: 50%;
    float: left;
    color: #e994a9;
    font-size: 17px;
    text-align: center;
    border-top: 1px solid #cccccc;
    padding: 8px;
  }

</style>

<script>
  import mixins from '../../mixins/index';
  import bImg from 'bootstrap-vue/es/components/image/img';
  import bMedia from 'bootstrap-vue/es/components/media/media';
  import bForm from 'bootstrap-vue/es/components/form/form';

  import storage from '../../common/storage';
  import china from '../../common/china';
  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';


  export default {
    components: {
      bImg,
      bMedia,
      bForm,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      isMask: false,
      memberAddressId: '',
      memberAddressName: '',
      memberAddressMobile: '',
      memberAddressDetail: '',
      memberAddressIsDefault: false,
      systemVersion: 0,
      arr: china,
      memberAddressProvince: '',
      memberAddressCity: '',
      memberAddressArea: '',
      cityArr: [],
      districtArr: [],
      isDefaultOptions: [{
        text: '是',
        value: true,
        disabled: false
      }, {
        text: '否',
        value: false,
        disabled: false
      }]
    }),
    created() {

    },
    mounted() {
      this.handleLoad();
      if (this.$route.params.memberAddressId) {
        this.memberAddressId = this.$route.params.memberAddressId;
      }
      if (this.memberAddressId.trim() !== '') {
        this.handleLoad();
      } else {
        for (var i = 0; i < this.arr.length; i++) {  //初始化城市列表
          if (this.arr[i].name === this.memberAddressProvince) {
            this.cityArr = this.arr[i].sub;
            for (var j = 0; j < this.cityArr.length; j++) {
              if (this.memberAddressCity === this.cityArr[j].name) {
                this.districtArr = this.cityArr[j].sub;
                break;
              }
            }
            break;
          }
        }
      }
    },
    methods: {
      updateCity: function () {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.memberAddressProvince) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.memberAddressCity = this.cityArr[1].name;
      },
      updateDistrict: function () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.memberAddressCity) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.memberAddressArea = this.districtArr[1].name;
        } else {
          this.memberAddressArea = this.districtArr[0].name;
        }
      },
      handleProvChange (value) {
        this.memberAddressProvince = value;
        this.updateCity(value);
        this.updateDistrict(value);
      },
      handleCityChange (value) {
        this.memberAddressCity = value;
        this.updateDistrict();
      },
      handleLoad() {
        if (this.memberAddressId.trim() === '') {
          return;
        }
        this.request({
          url: '/xingxiao/member/address/desktop/v1/find',
          data: {
            memberAddressId: this.memberAddressId
          },
          success: (data) => {
            if (data) {
              this.memberAddressName = data.memberAddressName;
              this.memberAddressMobile = data.memberAddressMobile;
              this.memberAddressDetail = data.memberAddressDetail;
              this.memberAddressProvince = data.memberAddressProvince;
              this.memberAddressCity = data.memberAddressCity;
              this.memberAddressArea = data.memberAddressArea;
              this.memberAddressIsDefault = data.memberAddressIsDefault;
              this.systemVersion = data.systemVersion;

              for (var i = 0; i < this.arr.length; i++) {  //初始化城市列表
                if (this.arr[i].name === this.memberAddressProvince) {
                  this.cityArr = this.arr[i].sub;
                  for (var j = 0; j < this.cityArr.length; j++) {
                    if (this.memberAddressCity === this.cityArr[j].name) {
                      this.districtArr = this.cityArr[j].sub;
                      break;
                    }
                  }
                  break;
                }
              }
            }
          },
          error: () => {

          }
        });
      },
      handleToAddress () {
        // this.$router.push({path: '/address'});
        window.history.go(-1);
      },
      handleDeleteAddress: function () {
        this.isMask = true
      },
      handleSubmit() {
        if (this.memberAddressName.trim() === '') {
          this.$toasted.show("收货人姓名不能为空");
          return;
        }
        if (this.memberAddressMobile.trim() === '') {
          this.$toasted.show("收货人手机号码不能为空");
          return;
        }
        if (this.memberAddressMobile.trim().length > 11 || this.memberAddressMobile.trim().length < 11) {
          this.$toasted.show("收货人手机号码不合法");
          return;
        }
        if (this.memberAddressProvince.trim() === '') {
          this.$toasted.show("省不能为空");
          return;
        }
        if (this.memberAddressCity.trim() === '') {
          this.$toasted.show("城市不能为空");
          return;
        }
        if (this.memberAddressArea.trim() === '') {
          this.$toasted.show("行政区不能为空");
          return;
        }
        if (this.memberAddressDetail.trim() === '') {
          this.$toasted.show("详情地址不能为空");
          return;
        }

        var url = this.memberAddressId === '' ? '/xingxiao/member/address/desktop/v1/save' : '/xingxiao/member/address/desktop/v1/update';

        this.request({
          url: url,
          data: {
            memberAddressId: this.memberAddressId,
            memberAddressName: this.memberAddressName,
            memberAddressMobile: this.memberAddressMobile,
            memberAddressProvince: this.memberAddressProvince,
            memberAddressDetail: this.memberAddressDetail,
            memberAddressCity: this.memberAddressCity,
            memberAddressArea: this.memberAddressArea,
            memberAddressIsDefault: this.memberAddressIsDefault,
            systemVersion: this.systemVersion
          },
          success: (data) => {
            if (data) {
              this.handleToAddress();
            }
          },
          error: () => {

          }
        });
      },
      handleReturn: function () {
        this.isMask = false
      },
      handleDetermine: function () {
        this.request({
          url: '/xingxiao/member/address/desktop/v1/delete',
          data: {
            memberAddressId: this.memberAddressId
          },
          success: (data) => {
            if (data) {
              this.$toasted.show("删除成功");
              window.history.go(-1);
            }
          },
          error: () => {

          }
        });
      },
    }
  }
</script>
