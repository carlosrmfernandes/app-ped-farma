<template>
  <div class="general-app">
    <div class="left-side">
          <Sidebar></Sidebar>
    </div>
    <div class="right-side">
      <Breadcrumbs></Breadcrumbs>
      <RightContent></RightContent>
    </div>
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
<style lang="scss" scoped>

.general-app{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  position: absolute;
}

.left-side{
  // width: 270px;
  // height: 100%;
  // border: 1px solid red;
}

.right-side{
  display: flex;
  flex-grow: 1;
  // border: 1px solid yellow;
  flex-direction: column;
  overflow-y: auto;
}
</style>
