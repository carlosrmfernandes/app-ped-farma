<template>
  <div>
    <Breadcrumbs></Breadcrumbs>
    <Sidebar></Sidebar>
    <RightContent></RightContent>
  </div>
</template>

<script>
import Sidebar from '@/components/Layouts/Sidebar.vue'
import RightContent from '@/components/Layouts/Right-Content.vue'
import Breadcrumbs from '@/components/Layouts/Breadcrumbs.vue'

export default {
  name: 'home',
  components: {
    Sidebar,
    RightContent,
    Breadcrumbs
  }
}
</script>
