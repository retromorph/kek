<template>
  <el-card class='box-card'>
    <h2>{{ title }}</h2>

    <div>
      {{ text }}
    </div>

    <el-button type='primary'>Edit</el-button>

    <el-button type='danger'>Delete</el-button>
  </el-card>
</template>

<script lang='ts'>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang='scss'>

</style>