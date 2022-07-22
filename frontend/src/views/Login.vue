<template>
  <div class='c-login'>
    <h1>Login/Register</h1>
    <Login />
  </div>
</template>

<script lang='ts' setup>
import Login from '../components/Login.vue';
</script>

<style scoped lang='scss'>
.c-login {
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
</style>