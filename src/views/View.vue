<template>
  <div class="">
    <Sidebar></Sidebar>
    <RightContent></RightContent>
    <Breadcrumbs></Breadcrumbs>
  </div>
</template>

<script>
import Sidebar from '@/components/layouts/Sidebar.vue'
import RightContent from '@/components/layouts/Right-Content.vue'
import Breadcrumbs from '@/components/layouts/Breadcrumbs.vue'

export default {
  name: 'home',
  components: {
    Sidebar,
    RightContent,
    Breadcrumbs

  }
}
</script>
