<template>
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <h3>BOX Admin</h3>
    </div>
    <ul class="list-unstyled components">
        <p>Admin</p>
    </ul>
    <Collapse icon="nextbss-bar-chart" title="Dashboard">
          <a href>
            <span>Brigit</span>
          </a>
          <a href>
            <span>Thomas</span>
          </a>
          <a href>
            <span>Legann</span>
          </a>
    </Collapse>
    <Collapse  title="Eventos">
          <a href>
            <span>Eventos 1</span>
          </a>
          <a href>
            <span>Eventos 2</span>
          </a>
          <a href>
            <span>Eventos 3</span>
          </a>
    </Collapse>
    <Collapse  title="Organizadores">
          <a href>
            <span>Organizadore 1</span>
          </a>
          <a href>
            <span>Organizadore 2</span>
          </a>
          <a href>
            <span>Organizadore 3</span>
          </a>
    </Collapse>
    <Collapse  title="Patrocinadores">
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
import '../../assets/css/style.css'

import Collapse from '@/components/layouts/Collapse'

export default {
  data () {
  },
  components: { Collapse },

  methods: {

  }
}
</script>
