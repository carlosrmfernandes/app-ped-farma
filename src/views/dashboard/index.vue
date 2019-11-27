<template>
  <div>
    <!-- Navbar -->
    <b-navbar></b-navbar>

    <div id="wrapper">
      <!-- Sidebar -->
      <b-sidebar></b-sidebar>

      <div id="content-wrapper">
        <div class="container-fluid">
          <h1>BOX ADMIN!</h1>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-wrapper -->
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
</style>
