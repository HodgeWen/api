<template>
  <div class="login-page">
    <section class="form-wrap">
      <p class="login-title">接口文档管理系统</p>

      <!-- 登录 -->
      <template v-if="!registerVisible"> 登录 </template>

      <!-- 注册 -->
      <template v-else> 注册 </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
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

const loginSubmit = async () => {
  await formRef.validate()

  const { data } = await login(omit(form, ['confirmPassword']))
  router.replace('/workspace')
}

const registerSubmit = async () => {
  await formRef.validate()
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
  background-image: linear-gradient(0deg, #b721ff, #21d4fd);
}

.login-title {
  text-align: center;
  font-size: 18px;
  margin-top: 0;
  color: #666;
}
</style>
