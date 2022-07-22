<template>
  <div class='c-main'>
    <el-button type='primary' @click='toCreateNote'>Create new Note</el-button>
    <div style='margin: 20px 0' />
    <Note title='Kek' text='Lipsum' />
  </div>
</template>

<script lang='ts' setup>
import Note from '../components/Note.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toCreateNote = () => {
  router.push('/create');
};
</script>

<style scoped lang='scss'>
.c-main {
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
</style>