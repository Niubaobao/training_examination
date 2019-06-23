<template>
  <div class="about">
    <div style="flex:1">
      <img src="../assets/denglu.png" alt="" width="100%" height="200xp" />
      <!-- <div class="bigtitle">注册</div> -->
      <div>
        <van-cell-group>
          <van-field
            v-model="userid"
            required
            type="number"
            label="警号"
            placeholder="输入你的警号"
            @blur="errUserid"
            :error-message="errorUserid"
          />
          <van-field
            v-model="xm"
            label="姓名"
            placeholder="输入你的姓名"
            :error-message="errorXm"
            @blur="errxm"
            required
          />
          <van-field
            v-model="department"
            label="部门"
            placeholder="请选择你的部门"
            required
            @click="onClose"
            readonly
          />
          <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker
              show-toolbar:true
              :columns="columns"
              @change="onChange"
              show-toolbar
              @cancel="onCancel"
              @confirm="onConfirm"
              :visible-item-count="5"
              :loading="showLoading"
            />
          </van-popup>
          <van-field
            v-model="phone"
            label="手机"
            type="number"
            @blur="errphone"
            :error-message="errorPhone"
            placeholder="输入你的手机号"
            required
          />
          <van-field
            style="margin-bottom:54px;"
            v-model="sfzmhm"
            label="身份证号"
            type="number"
            placeholder="输入你的身份证号"
            required
          />
        </van-cell-group>
        <van-button
          size="large"
          class="submitBtn"
          type="primary"
          @click="submitForm"
          :loading="submiting"
          loading-text="提交中..."
          >注 册</van-button
        >
      </div>
    </div>
    <!-- <div class="lastDesc">Copyright © 2019-2020 同济大学</div> -->
  </div>
</template>

<script>
import { Field, CellGroup, Popup, Picker, Button, Toast } from "vant";
// import { RegisterUser } from "@/api/index.js";
// import { getDepartmentsOne, registerUser } from "@/api/api.js";
export default {
  name: "reg",
  data() {
    return {
      department: "",
      errorUserid: "",
      errorXm: "",
      errorPhone: "",
      sfzmhm: "", //身份证号
      xm: "",
      phone: "",
      userid: "",
      glbm: "",
      show: false,
      listOne: [],
      valueArrOne: [],
      listTwo: [],
      valueArrTwo: [],
      listThree: [],
      valueArrThree: [],
      currentOne: "",
      currentTwo: "",
      currentThree: "",
      picker: "",
      columns: [
        {
          values: [],
          className: "firstCol"
        },
        {
          values: [],
          className: "secondCol"
        }
      ],
      selectedIndexs: [],
      idx: [0, 0],
      indexO: "",
      index1: "",
      index2: "",
      posiLoading: false,
      submiting: false,
      valueTwo: 310000000000,
      showLoading: false,
      originApartmentData: []
    };
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  mounted() {
    document.title = this.$route.meta.title;
    // this.getDepartmentsOne();
  },
  methods: {
    errphone() {
      if (!this.phone || !/^1[34578]\d{9}$/.test(this.phone)) {
        this.errorPhone = "手机号为空或格式不正确！";
      } else {
        this.errorPhone = "";
      }
    },
    errUserid() {
      if (!this.userid && typeof this.userid !== Number) {
        this.errorUserid = "警号不能为空或警号格式不正确";
      } else {
        this.errorUserid = "";
      }
    },
    errxm() {
      if (!this.xm) {
        this.errorXm = "姓名不能为空";
      } else {
        this.errorXm = "";
      }
    },
    // async getDepartmentsOne(sjbm = "310000000000", colIdx = 0) {
    //   const res = await getDepartmentsOne({
    //     sjbm
    //   });
    //   const { data, status } = res || {};
    //   if (status === 200) {
    //     this.originApartmentData[colIdx] = data.data;
    //     const colData = data.data.map(item => item.dmms);
    //     if (this.picker) {
    //       this.picker.setColumnValues(1, colData);
    //     } else {
    //       this.columns[colIdx].values = colData;
    //     }
    //     if (colIdx === 0) {
    //       this.getDepartmentsOne(this.originApartmentData[0][0].dmz, 1);
    //     }
    //   }
    // },
    // async submitForm() {
    //   const { code } = this.$route.query;
    //   const apartments = this.department.split("/");
    //   let from = {
    //     sfzmhm: this.sfzmhm,
    //     wxcode: code,
    //     xm: this.xm,
    //     password: 111111,
    //     phone: this.phone,
    //     userid: this.userid,
    //     glbm: this.glbm,
    //     bmmc: apartments.length === 2 ? apartments[1] : apartments[0]
    //   };
    //   if (!this.xm || !this.phone || !this.userid) {
    //     Toast("请填写全部信息！");
    //     return;
    //   }
    //   console.info(from, "form00000000_12");
    //   this.submiting = true;
    //   try {
    //     const res = await registerUser(from);
    //     const { data, status } = res || {};
    //     this.submiting = false;
    //     if (status === 200) {
    //       if (data.data && data.data.userid) {
    //         window.localStorage.setItem(
    //           "trouble_investigation_user",
    //           JSON.stringify(data.data)
    //         );
    //         Toast(data.msg);
    //         setTimeout(() => {
    //           this.$router.push(`/epolice-my`);
    //         }, 300);
    //       } else {
    //         Toast(data.Message);
    //       }
    //     }
    //   } catch (error) {
    //     this.submiting = false;
    //   }
    // },
    onClose() {
      this.show = true;
    },
    onChange(picker) {
      this.picker = picker;
      let arr = picker.getIndexes();
      if (arr[0] !== this.selectedIndexs[0]) {
        this.getDepartmentsOne(this.originApartmentData[0][arr[0]].dmz, 1);
      }
      this.selectedIndexs = arr;
    },
    onCancel() {
      console.log("onCancel");
      this.show = false;
    },
    onConfirm(value, index) {
      const data = this.originApartmentData;
      this.glbm = value[1] ? data[1][index[1]].dmz : data[0][index[0]].dmz;
      this.department = value[0] + (value[1] ? `/${value[1]}` : "");
      this.show = false;
    }
  }
};
</script>

<style scoped lang="less">
.about {
  width: 100%;
  min-height: 100vh;
  background: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .lastDesc {
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 13px;
    line-height: 30px;
  }
  .submitBtn {
    width: 90%;
    border-radius: 6px;
    margin-left: 5%;
    height: 48px;
    background: linear-gradient(
      90deg,
      rgba(122, 119, 252, 1) 0%,
      rgba(89, 161, 254, 1) 100%
    );
    border-radius: 4px;
  }
}
</style>
