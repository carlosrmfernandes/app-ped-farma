<template>
<div class="grid-container">
  <div class="menu-icon" @click="openToggle">
    <i class="fas fa-bars"></i>
  </div>
  <farma-header></farma-header>
  <farma-aside></farma-aside>
  <farma-main></farma-main>
  <farma-footer></farma-footer>
</div>
</template>

<script>
import FarmaHeader from '@/components/ClientOffice/Layouts/Farma-Header.vue'
import FarmaAside from '@/components/ClientOffice/Layouts/Farma-Aside.vue'
import FarmaMain from '@/components/ClientOffice/Layouts/Farma-Main.vue'
import FarmaFooter from '@/components/ClientOffice/Layouts/Farma-Footer.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    'farma-aside': FarmaAside,
    'farma-header': FarmaHeader,
    'farma-main': FarmaMain,
    'farma-footer': FarmaFooter
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    ...mapActions('Clients', ['SetClient']),
    /*
     * LoadClientUserToState: This method will check if there is admin information
     * in the localstorage and then load it to the global state.
     */
    LoadClientUserToState () {
      const clientData = localStorage.getItem('app_client')
      if (clientData) {
        this.SetClient(JSON.parse(clientData))
      }
    },
    openToggle () {
      var element = document.querySelector('.sidenav')
      element.classList.toggle('active')
    }
  },
  created () {
    // This method will be executed everytime the App component is created
    // usually on hard
    this.LoadClientUserToState()
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
