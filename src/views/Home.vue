<template>
  <div>
    <Breadcrumbs></Breadcrumbs>
    <Sidebar></Sidebar>
    <RightContent></RightContent>
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
