<template>
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <avatar :fullname="user.name" :size="96"></avatar>
      <h3>{{user.name}}</h3>
    </div>
    <!-- <ul class="list-unstyled components">
      <p>Admin</p>
    </ul> -->
    <Collapse icon="nextbss-bar-chart" title="Dashboard"></Collapse>
    <Collapse title="Eventos">
      <router-link :to="{name: 'ListEvent'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistEvent'}" tag="a">
        <span>Novo Evento</span>
      </router-link>
    </Collapse>
    <Collapse title="Empresas">
      <router-link :to="{name: 'ListCompany'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistCompany'}" tag="a">
        <span>Nova Empresa</span>
      </router-link>
    </Collapse>
    <Collapse title="Organizadores">
      <router-link :to="{name: 'ListOrganizer'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistOrganizer'}" tag="a">
        <span>Novo Organizador</span>
      </router-link>
    </Collapse>
    <Collapse title="Patrocinadores">
      <router-link :to="{name: 'ListSponsor'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistSponsor'}" tag="a">
        <span>Novo Patrocinador</span>
      </router-link>
    </Collapse>
    <Collapse title="Contratos">
      <router-link :to="{name: 'ListContract'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistContract'}" tag="a">
        <span>Novo Contrato</span>
      </router-link>
    </Collapse>
    <Collapse title="Pagamentos">
      <router-link :to="{name: 'ListPayment'}" tag="a">
        <span>Listar</span>
      </router-link>
    </Collapse>
    <ul class="list-unstyled CTAs">
      <li @click="DoLogout" >
        <a href="#" class="article"><span>Sair</span> <i class="fa fa-power-off fa-lg" aria-hidden="true"></i></a>
      </li>
    </ul>
  </nav>
</template>
<script>
import '../../assets/css/style.scss'
import {
  mapState,
  mapActions
} from 'vuex'
import Avatar from 'vue-avatar-component'
import Collapse from './Collapse'

export default {
  name: 'Sidebar',
  components: { Collapse, Avatar },
  data () {
    return {
      username: ''
    }
  },
  computed: {
    ...mapState('Admins', ['user']),
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    ...mapActions('Admins', ['Logout']),
    async DoLogout () {
      // Call the Logout method from the admin store.
      this.Logout()
      this.$router.push({ name: 'Login' })
    }
  },
  created () {
  }
}
</script>
<style scoped>
li{
 display: flex;
}

li span{
  font-size: 18px;
  margin-right: 10px;
}

.sidebar-header h3{
  margin-top: 20px;
}
</style>
