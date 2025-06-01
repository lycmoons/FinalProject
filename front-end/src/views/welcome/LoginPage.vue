<script setup>
  import {User, Lock} from '@element-plus/icons-vue'
  import {reactive, ref} from "vue";
  import router from "@/router/index.js";

  const form = reactive({
    username: '',
    password: '',
    remember: false
  })

  const formRef = ref()

  const rule = {
    username: [
      {required: true, message: '请输入用户名/邮箱', trigger: ['blur', 'change']}
    ],
    password: [
      {required: true, message: '请输入密码', trigger: ['blur', 'change']}
    ]
  }
</script>

<template>
  <div class="ctt">
    <div style="text-align: center;margin: 0 20px">
      <div style="margin-top: 0">
        <div style="font-size: 25px;font-weight: bold;color: white">登录</div>
      </div>
      <div style="margin-top: 50px">
        <el-form :model="form" :rules="rule" ref="formRef">

          <el-form-item prop="username">
            <el-input v-model="form.username" type="text" placeholder="用户名/邮箱">
              <template #prefix>
                <el-icon><User/></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="form.password" maxlength="20" type="password" placeholder="密码">
              <template #prefix>
                <el-icon><Lock/></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-row>
            <el-col :span="12" style="text-align: left;">
              <el-form-item prop="remember">
                <el-checkbox style="color: white" v-model="form.remember" label="记住密码"/>
              </el-form-item>
            </el-col>

            <el-col :span="12" style="text-align: right">
              <el-link style="color: white" @click="router.push('/reset')">忘记密码？</el-link>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin-top: 40px">
        <el-button class="login" @click="router.push('/index')" style="width: 270px;margin-bottom: 20px">登录</el-button>
      </div>
      <div>
        <el-button class="register" @click="router.push('register')" style="width: 270px">注册</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login{
  border-radius: 50px;
  background: #bea2a7;
  box-shadow: inset 24px 24px 35px #5d4f52,
  inset -24px -24px 35px #fff5fc;
  color: white;
}

::v-deep(.login:hover){
  border-radius: 50px;
  background: #937b80;
  box-shadow: inset 24px 24px 35px #483c3f,
  inset -24px -24px 35px #debac1;
}

.register{
  border-radius: 50px;
  background: #946438;
  box-shadow: inset 24px 24px 35px #49311b,
  inset -24px -24px 35px #df9755;
  color: white;
}

::v-deep(.register:hover){
  border-radius: 50px;
  background: #684627;
  box-shadow: inset 24px 24px 35px #332213,
  inset -24px -24px 35px #9d6a3b;
}


</style>