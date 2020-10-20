<template>
  <header class="header">
    <bread-crumbs></bread-crumbs>
    <div class="header__avatar header-user-name">{{ userName }}</div>
  </header>
</template>
<script>
import Breadcrumbs from '@/components/BackOffice/Layouts/Breadcrumbs.vue'

export default {
  components: {
    'bread-crumbs': Breadcrumbs
  },
  created () {
    this.userName = localStorage.getItem('vpos_body_name') ? localStorage.getItem('vpos_body_name') : 'Kevin Durant'
  }
}
</script>
