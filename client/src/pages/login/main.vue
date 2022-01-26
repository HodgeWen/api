<template>
  <div>
    <el-form class="login-form">
      <el-form-item>
        <el-input placeholder="账号" v-model="form.account" />
      </el-form-item>

      <el-form-item>
        <el-input placeholder="密码" v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="text" @click="register">注册</el-button>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  account: '',
  password: ''
})

const submit =  () => {

}

const register = () => {

}
</script>

<style scoped lang="scss">
.login-form {
  width: 300px;
  margin: 100px auto;
}
</style>
