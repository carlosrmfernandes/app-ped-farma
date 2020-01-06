<template>
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <avatar :fullname="user.name" :size="96"></avatar>
      <h4>{{user.name}}</h4>
    </div>
    <!-- <ul class="list-unstyled components">
      <p>Admin</p>
    </ul> -->
    <router-link :to="{name: 'Dashboard'}" tag="a">
      <Collapse icon="nextbss-bar-chart" title="Dashboard"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListEvent'}" tag="a">
      <Collapse title="Eventos"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListCompany'}" tag="a">
      <Collapse title="Empresas"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListOrganizer'}" tag="a">
      <Collapse title="Organizadores" ></Collapse>
    </router-link>
    <router-link :to="{name: 'ListSponsor'}" tag="a">
      <Collapse title="Patrocinadores"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListContract'}" tag="a">
      <Collapse title="Contratos"></Collapse>
    </router-link>
    <!-- <Collapse title="Pagamentos">
      <router-link :to="{name: 'ListPayment'}" tag="a">
        <span>Listar</span>
      </router-link>
    </Collapse> -->
    <router-link :to="{name: 'ListLocation'}" tag="a">
      <Collapse title="Localizações"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListProduct'}" tag="a">
      <Collapse title="Produtos"></Collapse>
    </router-link>
    <router-link :to="{name: 'ListDeck'}" tag="a">
      <Collapse title="Decks"></Collapse>
    </router-link>
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
  font-size: 13px;
  margin-right: 10px;
}

.sidebar-header h4{
  margin-top: 20px;
}
</style>
