<template>
  <div class="right-content">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {}
}
</script>

<style >
.right-content {
  position: absolute;
  width: 90%;
  height: 95%;
  bottom: 0;
  right: 0;
  /* border: 1px solid red; */
}

.dummy-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
  width: 97%;
  height: 90% !important;
  /* padding: 25px 30px; */
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
