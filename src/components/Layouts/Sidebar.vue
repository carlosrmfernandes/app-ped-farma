<template>
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <h3>BOX Admin</h3>
    </div>
    <ul class="list-unstyled components">
      <p>Admin</p>
    </ul>
    <Collapse icon="nextbss-bar-chart" title="Dashboard"></Collapse>
    <Collapse title="Eventos">
      <router-link :to="{name: 'ListEvent'}" tag="a">
        <span>Listar</span>
      </router-link>
      <router-link :to="{name: 'RegistEvent'}" tag="a">
        <span>Novo Evento</span>
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
      <a href>
        <span>Patrocinadore 1</span>
      </a>
      <a href>
        <span>Patrocinadore 2</span>
      </a>
      <a href>
        <span>Patrocinadore 3</span>
      </a>
    </Collapse>
    <ul class="list-unstyled CTAs">
      <li>
        <a href="#" class="article">Sair</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import "../../assets/css/style.css";

import Collapse from "./Collapse";

export default {
  data() {},
  components: { Collapse },
  methods: {}
};
</script>
