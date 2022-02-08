<template>
  <div class="login-page">
    <section class="form-wrap">
      <p class="login-title">接口文档管理系统</p>

      <!-- 登录 -->
      <template v-if="!registerVisible">
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="account">
            <el-input clearable placeholder="账号" v-model="form.account" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="密码" v-model="form.password" type="password" />
          </el-form-item>
        </el-form>
        <el-button type="text" @click="registerVisible = true">注册</el-button>
        <el-button style="width: 100%; margin: 0" type="primary" @click="loginSubmit">登录</el-button>
      </template>

      <!-- 注册 -->
      <template v-else>
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="account">
            <el-input placeholder="账号" v-model="form.account" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="密码" v-model="form.password" type="password" />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input placeholder="确认密码" v-model="form.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
        <el-button type="text" @click="registerVisible = false">返回登录</el-button>
        <el-button style="width: 100%; margin: 0;" type="primary" @click="registerSubmit">注册并登录</el-button>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { FormRulesMap } from 'element-plus/es/components/form/src/form.type'
import { reactive, ref } from 'vue'
import { login, register } from '@/apis/common'
import { router } from '@/router'
import { omit } from '@/utils/shared'

let registerVisible = ref(false)

const form = reactive({
  account: '',
  password: '',
  confirmPassword: ''
})

const formRef = ref<any>(null)

const rules: FormRulesMap = {
  account: [{ required: true }],
  password: [
    { required: true },
  ],
  confirmPassword: [
    { required: true },
    {
      validator: (_, v, cb) => {
        if (v !== form.password) {
          cb('两次密码不一致')
        } else {
          cb()
        }
      }
    }
  ]
}

const loginSubmit = async () => {
  await formRef.value.validate()
  const { data } = await login(omit(form, ['confirmPassword']))
  router.replace('/home')
}

const registerSubmit = async () => {
  await formRef.value.validate()
  const { data } = await register(omit(form, ['confirmPassword']))
  loginSubmit()
}
</script>

<style scoped lang="scss">
.form-wrap {
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}

.login-page {
  height: 100%;
  padding: 1px;
  background-image: linear-gradient(0deg,#b721ff, #21d4fd);
}

.login-title {
  text-align: center;
  font-size: 18px;
  margin-top: 0;
  color: #666;
}
</style>
