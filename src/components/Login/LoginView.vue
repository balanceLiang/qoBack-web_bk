<template>
  <div class="d-flex align-center login-background" style="height: 100%">
    <div
      class="d-flex flex-column rounded-lg border-thin pa-4 bg-white"
      style="width: 480px; max-width: 100%; height: 100%"
    >
      <div class="d-flex justify-center w-100 mb-2">
        <img :src="logo" style="width: 100%; max-width: 480px">
      </div>
      <div class="text-center">
        <h1>八方點管理系統</h1>
      </div>
      <div v-if="!showForget && !showReset">
        <div class="flex-grow-1 d-flex flex-column justify-start">

          <div
            v-for="(field, index) in fields"
            :key="index"
            class="d-flex flex-column"
          >
            <div class="d-flex">
              <div class="my-3" :class="field.width">
                <v-text-field
                  v-model.trim="field.value"
                  :append-inner-icon="field.appendIcon"
                  density="compact"
                  hide-details
                  hide-spin-buttons
                  :label="field.title"
                  :placeholder="field.placeholder"
                  :type="field.type"
                  variant="outlined"
                  @click:append-inner="viewPwd"
                />
              </div>
              <div
                v-if="field.title === '驗證碼'"
                class="w-50 rounded my-3 d-flex align-center ml-2"
                style="background-color: #909090"
              >
                <img class="rounded-lg" :src="captchaImg" style="height: 40px">
              </div>
            </div>
          </div>
          <div>
            <v-btn block color="primary" size="large" @click="doLogin">登入</v-btn>
            <a href="#" @click.prevent="showForget = true">忘記密碼</a>
          </div>
        </div>
      </div>
      <!--忘記密碼-->
      <div v-else-if="showForget">
        <h3>重設密碼</h3>
        <div
          v-for="(forgetField, index) in forgetFields"
          :key="index"
          class="d-flex flex-column"
        >
          <div class="d-flex">
            <div class="my-3" :class="forgetField.width">
              <v-text-field
                v-model="forgetField.value"
                :append-inner-icon="forgetField.appendIcon"
                density="compact"
                hide-details
                hide-spin-buttons
                :label="forgetField.title"
                :placeholder="forgetField.placeholder"
                :type="forgetField.type"
                variant="outlined"
              />
            </div>
          </div>
          <!-- 如果是 email 欄位，顯示錯誤訊息 -->
          <p v-if="forgetField.data === 'email' && emailError" class="text-red">
            {{ emailError }}
          </p>
        </div>
        <div>
          <p>
            <v-btn block color="primary" size="large" @click="doForget">送出</v-btn>
          </p>
        </div>
        <!--<button @click="showReset = false">返回登入</button>-->
        <!--<p v-if="resetMessage">{{ resetMessage }}</p>-->
      </div>
      <!--更改密碼-->
      <div v-else>
        <h3>更改密碼</h3>
        <div
          v-for="(resetField, index) in resetFields"
          :key="index"
          class="d-flex flex-column"
        >
          <div class="d-flex">
            <div class="my-3" :class="resetField.width">
              <v-text-field
                v-model="resetField.value"
                :append-inner-icon="resetField.appendIcon"
                density="compact"
                hide-details="false"
                hide-spin-buttons
                :label="resetField.title"
                :placeholder="resetField.placeholder"
                :rules="resetField.rules"
                :type="resetField.type"
                variant="outlined"
                @click:append-inner="handleResetViewPwdClick(resetField)"
              />
            </div>
          </div>
          <!-- 自定錯誤訊息顯示 -->
          <div v-if="resetField.data === 'newPassword' && newPasswordError" class="text-error text-caption mt-1">
            {{ newPasswordError }}
          </div>
          <!-- 顯示「密碼不一致」錯誤訊息 -->
          <div
            v-if="resetField.data === 'confirmNewPassword' && passwordMismatchError"
            class="text-error text-caption mt-1"
          >
            {{ passwordMismatchError }}
          </div>
        </div>
        <div>
          <p>
            <v-btn
              block
              color="primary"
              :disabled="!canSubmitNewPassword"
              size="large"
              @click="doReset"
            >更改密碼</v-btn>
          </p>
        </div>
        <!--<button @click="showReset = false">返回登入</button>-->
        <!--<p v-if="resetMessage">{{ resetMessage }}</p>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { useLogin } from '@/Api/Login';
  import logoUrl from '@/assets/logo.svg';

  import { useAppStore } from '@/stores/app';

  export default {
    data () {
      return {
        fields: [
          {
            title: '帳號',
            type: 'text',
            data: 'userId',
            value: null,
            width: 'w-100',
            placeholder: '帳號',
            appendIcon: null,
          },
          {
            title: '密碼',
            type: 'password',
            data: 'password',
            value: null,
            width: 'w-100',
            placeholder: '英數字大小寫8-12碼',
            appendIcon: 'mdi-eye-off',
          },
          {
            title: '驗證碼',
            type: 'number',
            data: 'captcha',
            value: null,
            width: 'w-50',
            placeholder: null,
            appendIcon: null,
          },
        ],
        forgetFields: [
          {
            title: '帳號',
            type: 'text',
            data: 'userId',
            value: null,
            width: 'w-100',
            placeholder: '帳號',
            appendIcon: null,
          },
          {
            title: '電子郵件',
            type: 'text',
            data: 'email',
            value: null,
            width: 'w-100',
            placeholder: '請輸入您的電子郵件',
            appendIcon: null,
          },
        ],
        resetFields: [
          {
            title: '舊密碼',
            type: 'password',
            data: 'oldPassword',
            value: null,
            width: 'w-100',
            placeholder: '英數字大小寫8-12碼',
            appendIcon: 'mdi-eye-off',
            rules: [],
          },
          {
            title: '新密碼',
            type: 'password',
            data: 'newPassword',
            value: null,
            width: 'w-100',
            placeholder: '英數字大小寫8-12碼',
            appendIcon: 'mdi-eye-off',
            rules: [
              v => !!v || '請輸入密碼',
              v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(v) || '密碼需符合英數字大小寫8-12碼',
            ],
          },
          {
            title: '確認新密碼',
            type: 'password',
            data: 'confirmNewPassword',
            value: null,
            width: 'w-100',
            placeholder: '英數字大小寫8-12碼',
            appendIcon: 'mdi-eye-off',
            rules: [
              v => !!v || '請輸入密碼',
              v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(v) || '密碼需符合英數字大小寫8-12碼',
            ],
          },
        ],
        captchaImg: null,
        logo: logoUrl,
        showPwd: false,
        showOldPwd: false,
        showNewPwd: false,
        showConfirmNewPwd: false,
        appStore: null,
        showForget: false,
        showReset: false,
        forgetMessage: '',
        forTest: false,
      };
    },
    computed: {
      pwdIcon () {
        return this.showPwd ? 'mdi-eye' : 'mdi-eye-off';
      },
      oldPwdIcon () {
        return this.showOldPwd ? 'mdi-eye' : 'mdi-eye-off';
      },
      newPwdIcon () {
        return this.showNewPwd ? 'mdi-eye' : 'mdi-eye-off';
      },
      confirmNewPwdIcon () {
        return this.showConfirmNewPwd ? 'mdi-eye' : 'mdi-eye-off';
      },
      pwdType () {
        return this.showPwd ? 'text' : 'password';
      },
      emailError () {
        const emailField = this.forgetFields.find(f => f.data === 'email');
        const email = emailField?.value || '';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) return ''; // 空值不顯示錯誤（使用者可能還在輸入）
        return emailPattern.test(email) ? '' : '電子郵件格式錯誤';
      },
      newPasswordError () {
        const field = this.resetFields.find(f => f.data === 'newPassword');
        const pwd = field?.value || '';
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        if (!pwd) return '';
        return pattern.test(pwd) ? '' : '密碼需包含英數字大小寫，長度 8–12 碼';
      },
      passwordMismatchError () {
        const pwd = this.resetFields.find(f => f.data === 'newPassword')?.value || '';
        const confirm = this.resetFields.find(f => f.data === 'confirmNewPassword')?.value || '';
        if (!confirm) return '';
        return pwd === confirm ? '' : '兩次輸入的密碼不一致';
      },
      canSubmitNewPassword () {
        const oldPwd = this.resetFields.find(f => f.data === 'oldPassword')?.value || '';
        const newPwd = this.resetFields.find(f => f.data === 'newPassword')?.value || '';
        const confirmPwd = this.resetFields.find(f => f.data === 'confirmNewPassword')?.value || '';
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        return (
          pattern.test(newPwd) &&
          oldPwd &&
          newPwd === confirmPwd
        );
      },
    },
    mounted () {
      this.fields[1].appendIcon = this.pwdIcon;
      // this.resetFields[0].appendIcon = this.oldPwdIcon;
      // this.resetFields[1].appendIcon = this.newPwdIcon;
      // this.resetFields[2].appendIcon = this.confirmNewPwdIcon;
      this.appStore = useAppStore();
      this.getCaptcha();
    },
    methods: {
      getCaptcha () {
        useLogin.getCaptcha().then(img => {
          // console.log(img);
          this.captchaImg = img.data;
        });
      },
      viewPwd () {
        this.showPwd = !this.showPwd;
        this.fields[1].type = this.pwdType;
        this.fields[1].appendIcon = this.pwdIcon;
      },
      handleResetViewPwdClick (field) {
        if (field.title === '舊密碼') {
          this.showOldPwd = !this.showOldPwd;
          this.resetFields[0].type = this.showOldPwd ? 'text' : 'password';
          this.resetFields[0].appendIcon = this.oldPwdIcon;
        }else if(field.title === '新密碼'){
          this.showNewPwd = !this.showNewPwd;
          this.resetFields[1].type = this.showNewPwd ? 'text' : 'password';
          this.resetFields[1].appendIcon = this.newPwdIcon;
        }else if(field.title === '確認新密碼'){
          this.showConfirmNewPwd = !this.showConfirmNewPwd;
          this.resetFields[2].type = this.showConfirmNewPwd ? 'text' : 'password';
          this.resetFields[2].appendIcon = this.confirmNewPwdIcon;
        }
      },
      doLogin () {
        if (this.forTest) {
          this.appStore.setToken('rextestonly');
          this.appStore.setUserName('Admin');
          this.$router.push({ path: '/' });
        } else {
          const postData = {};
          for (const field of this.fields) {
            if (!field.value) {
              console.log(field.data, 'no data');
              return;
            }
            postData[field.data] = field.value;
          }
          useLogin
            .doLogin(postData)
            .then(res => {
              console.log('res:' + res.data);
              this.appStore.setToken(res.data.token);
              this.appStore.setUserName(res.data.userName);
              this.$router.push({ path: '/' });
            })
            .catch(error => {
              console.log(error);
              this.getCaptcha();
            });
        }
      },
      doForget () {
        const emailField = this.forgetFields.find(f => f.data === 'email');
        const userIdField = this.forgetFields.find(f => f.data === 'userId');
        const error = [];

        if (!userIdField || !userIdField.value) {
          error.push('[帳號]未輸入');
        }
        if (!emailField || !emailField.value) {
          error.push('[電子郵件]未輸入');
        }

        if (error.length > 0) {
          alert(error.join('\n'));
          return;
        }

        //串接forget api
        const postData = {};
        for (const field of this.forgetFields) {
          if (!field.value) {
            console.log(field.data, 'no data');
            return;
          }
          postData[field.data] = field.value;
        }
        console.log(postData);
        useLogin
          .forget(postData)
          .then(res => {
            console.log('成功:' , res.data);
            this.appStore.setToken(res.data.token);
            this.appStore.setUserName(res.data.userName);
            this.$router.push({ path: '/' });
          })
          .catch(error => {
            console.log(error);
            alert('重設密碼失敗!!!');
            return;
          });

        // 模擬送出
        this.forgetMessage = `重設連結已寄送至 ${emailField.value}`;
        console.log(this.forgetMessage);
        alert(this.forgetMessage);

        // 重設畫面並清空欄位
        this.showForget = false;
        this.forgetFields.forEach(f => f.value = '');
      },
      doReset () {
        const oldPwdField = this.resetFields.find(f => f.data === 'oldPassword');
        const newPwdField = this.resetFields.find(f => f.data === 'newPassword');
        const confirmNewPwdField = this.resetFields.find(f => f.data === 'confirmNewPassword');
        const error = [];

        if (!oldPwdField || !oldPwdField.value) {
          error.push('[舊密碼]未輸入');
        }
        if (!newPwdField || !newPwdField.value) {
          error.push('[新密碼]未輸入');
        }
        if (!confirmNewPwdField || !confirmNewPwdField.value) {
          error.push('[確認新密碼]未輸入');
        }

        if (error.length > 0) {
          alert(error.join('\n'));
          return;
        }

        //串接reset api
        const postData = {};
        for (const field of this.resetFields) {
          if (!field.value) {
            console.log(field.data, 'no data');
            return;
          }
          postData[field.data] = field.value;
        }
        useLogin
          .reset(postData)
          .then(res => {
            console.log(res.data);
            this.appStore.setToken(res.data.token);
            this.appStore.setUserName(res.data.userName);
            this.$router.push({ path: '/' });
          })
          .catch(error => {
            console.log(error);
            alert('更改密碼失敗!!!');
            return;
          });

        // 重設畫面並清空欄位
        this.showReset = false;
        this.resetFields.forEach(f => f.value = '');
      },
    },
  };
</script>

<style scoped>
.login-background {
  background-image: url("@/assets/background.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  padding: 64px;
  justify-content: end;
}

@media (max-width: 960px) {
  .login-background {
    background-image: none;
    padding: 0;
    justify-content: center;
  }
}
</style>
