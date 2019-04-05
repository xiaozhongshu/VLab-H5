
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
