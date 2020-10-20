<template>
  <aside class="sidenav">
    <div class="sidenav__close-icon" @click="openToggle">
      <i class="fas fa-times"></i>
    </div>
    <div class="sidenav-header">
    </div>
    <ul class="sidenav__list">
      <div class="sidenav-subheader">
          <span>{{ merchantName }}</span>
      </div>
      <router-link class="sidenav__list-item" :to="{name: 'Dashboard'}" tag="li"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></router-link>
      <router-link class="sidenav__list-item" :to="{name: 'ListProducts'}" tag="li" ><i class="fas fa-pen-fancy"></i><span>Produtos</span></router-link>
      <router-link class="sidenav__list-item" :to="{name: 'RegistUsers'}" tag="li" v-if="isAdmin"><i class="fas fa-user"></i><span>Compraddor</span></router-link>
      <router-link class="sidenav__list-item" :to="{name: 'RegistProviders'}" tag="li" v-if="isAdmin"><i class="fas fa-user"></i><span>Fornecedores</span></router-link>
      <li class="sidenav__list-item sidenav__out" @click="DoLogout"><i class="fas fa-sign-out-alt" aria-hidden="true"></i><span>Sair</span></li>
    </ul>
  </aside>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('Clients', ['isAdmin'])
  },
  data () {
    return {
      merchantName: ''
    }
  },
  methods: {
    /*
     * Map all the actions from the Admin module
     */
    ...mapActions('Clients', ['Logout']),
    openToggle () {
      var element = document.querySelector('.sidenav')
      element.classList.remove('active')
    },
    async DoLogout () {
      this.Logout()
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
      }, 1500)
    }
  },
  created () {
    this.merchantName = localStorage.getItem('vpos_body_merchant_name') ? localStorage.getItem('vpos_body_merchant_name') : 'Kevin Durant'
  }
}
</script>
<style lang="scss" scoped>

/* Mobile-first side nav styles */
.sidenav {
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 220px;
  position: fixed;
  overflow-y: auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  z-index: 2; /* Needs to sit above the hamburger menu icon */
  background-color: #2D8A05;
  transform: translateX(-245px);
  transition: all 0.6s ease-in-out;
}

/* The active class is toggled on hamburger and close icon clicks */
.sidenav.active {
  transform: translateX(0);
}

/* Only visible on mobile screens */
.sidenav__close-icon {
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #11559C;
}

.sidenav__out span{
    font-family: 'Open Sans SemiBold';
    font-size: 16px;
    color: #fff;
}

.sidenav-header{
    width: 100%;
    height: 85px;
    position: fixed;
    top: 0;
    z-index: -1;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidenav-header img{
    width: 70px;
}

.sidenav-subheader{
    width: 100%;
    height: 80px;
    top: 0;
    z-index: -1;
    background-color: #3BBE02;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.sidenav-subheader span{
    font-family: 'Open Sans Bold';
    font-size: 16px;
    color: #fff;
}

.sidenav__out{
    width: 100%;
    position: fixed;
    padding: 15px 10px 20px 30px;
    bottom: 0;
}

.config-side{
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Open Sans SemiBold';
  font-size: 13px;
  cursor:default
}

.config-side:hover{
  background-color: transparent;
}

/* Non-mobile styles for side nav responsiveness, 750px breakpoint */
@media only screen and (min-width: 46.875em) {
  .sidenav {
    position: fixed; /* Fixed position on mobile */
    transform: translateX(0);
  }

  .sidenav__close-icon {
    visibility: hidden;
  }
}
</style>
