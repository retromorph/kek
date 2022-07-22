<template>
  <div class='c-create-note'>
    <h1>Create note</h1>
    <CreateNote />
  </div>
</template>

<script lang='ts' setup>
import CreateNote from '../components/CreateNote.vue';
</script>

<style scoped lang='scss'>
.c-create-note {
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
</style>