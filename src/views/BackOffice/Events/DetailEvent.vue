<template>
  <h1 class="page-title">
    {{ id }}
  </h1>
</template>

<script>
export default {
  name: 'DetailEvent',
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return { }
  }
}
</script>

<style scoped>

</style>
