<template>
  <el-form :model='createNote'>
    <el-form-item>
      <el-input v-model='createNote.title' placeholder='Title' />
    </el-form-item>

    <el-form-item>
      <el-input
        v-model='createNote.text'
        :rows='2'
        type='textarea'
        placeholder='Text'
      />
    </el-form-item>

    <el-form-item>
      <el-button type='primary' @click='onSubmit'>select file</el-button>

      <el-button type='success' @click='onSubmit'>upload to server</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type='primary' @click='onSubmit'>Create</el-button>

      <el-button type='danger' @click='onSubmit'>Clear</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';

const createNote = reactive({
  title: '',
  text: '',
});

const onSubmit = () => {
  alert('submit!');
};
</script>