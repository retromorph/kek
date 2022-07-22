<template>
  <el-form :model='login'>
    <el-form-item>
      <el-input v-model='login.nickname' placeholder='Nickname' />
    </el-form-item>

    <el-form-item>
      <el-input v-model='login.password' type='password' placeholder='Password' />
    </el-form-item>

    <el-form-item>
      <el-button type='primary' @click='onSubmit'>Create</el-button>

      <el-button type='info' @click='onSubmit'>Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';

const login = reactive({
  nickname: '',
  password: '',
});

const onSubmit = () => {
  alert('submit!');
};
</script>