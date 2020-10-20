<template>
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <h5>{{user.name}}</h5>
    </div>
    <router-link :to="{name: 'Dashboard'}" tag="a" :class="{ active : active_el == 1}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(1)">
          <span class="accordion-title">Dashboard</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
      </div>
    </div>
    </router-link>
    <router-link :to="{name: 'ListEvent'}" tag="a" :class="{ active : active_el == 2}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
          <div class="accordion-header" @click="activate(2)">
            <span class="accordion-title">Eventos</span>
          </div>
          <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
            <div class="accordion-content">
                <slot></slot>
            </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListCompany'}" tag="a" :class="{ active : active_el == 3}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
          <div class="accordion-header" @click="activate(3)">
            <span class="accordion-title">Empresas</span>
          </div>
          <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
            <div class="accordion-content">
                <slot></slot>
            </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListOrganizer'}" tag="a" :class="{ active : active_el == 4}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(4)">
          <span class="accordion-title">Organizadores</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListSupplier'}" tag="a" :class="{ active : active_el == 5}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(5)">
          <span class="accordion-title">Operadores</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListSponsor'}" tag="a" :class="{ active : active_el == 6}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(6)">
          <span class="accordion-title">Patrocinadores</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListContract'}" tag="a" :class="{ active : active_el == 7}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(7)">
          <span class="accordion-title">Contratos</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListLocation'}" tag="a" :class="{ active : active_el == 8}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(8)">
          <span class="accordion-title">Localizações</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListProduct'}" tag="a" :class="{ active : active_el == 9}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(9)">
          <span class="accordion-title">Produtos</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'ListDeck'}" tag="a" :class="{ active : active_el == 10}">
      <div class="accordion" v-bind:class="{ disabled: !active}">
        <div class="accordion-header" @click="activate(10)">
          <span class="accordion-title">Decks</span>
        </div>
        <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
          <div class="accordion-content">
              <slot></slot>
          </div>
        </div>
      </div>
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

export default {
  name: 'Sidebar',
  components: { },
  data () {
    return {
      username: '',
      active: false,
      maxHeight: '0px',
      active_el: 0
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
    },
    activate: function (el) {
      this.active_el = el
    },
    openClose () {
      let containerHeight = this.$el.querySelector('.accordion-body')
        .offsetHeight
      if (this.active) {
        this.maxHeight = '0px'
      } else {
        this.maxHeight = containerHeight + 200 + 'px'
      }
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

.sidebar-header h5{
  margin-top: 20px;
}

/* Start Collapse Styles*/

.accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  /* background-color: #0b132e; */
  cursor: pointer;
}

.accordion.childSidebar {

  background-color: #0b132e;
  cursor: pointer;
}

.accordion .accordion-header {
  box-sizing: border-box;
  padding: 10px;
  padding-left: 30px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid #2e3553; */
  color: #fff;
  transition: all 0.3s ease;
}

.accordion .accordion-header.atual {
  color: #000;
  background: rgba(0,0,0,.08);
}

.accordion .accordion-header.childSidebar {
  color: #000;
  background: rgba(0,0,0,.08);
}

.accordion .accordion-header:hover {
  width: 100%;
  height: 40px;
  background: rgba(0,0,0,.09);
  color: #000;
}

.accordion .accordion-header:active,
.accordion .accordion-header:focus {
  width: 100%;
  height: 40px;
  color: #000;
  background: rgba(0,0,0,.08);
}

.accordion .accordion-header .accordion-title:hover{
  color: #000;
}

.accordion .accordion-header:hover .accordion-title{
  color: #000;
}

.accordion-title {
  /* left: 10%; */
  position: absolute;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  font-size: 12px;
}

.accordion.childSidebar .accordion-title {
  left: 18%;
}

.active {
  color: #000;
  background: rgba(0,0,0,.08);
}

.accordion .accordion-body {
  text-align: start;
  box-sizing: border-box;
  width: 100%;
  /* padding: 10px 16px; */
  transition: all 0.3s ease;
  color: #ffffff;
  font-size: 12px;
  cursor: default;
}

.accordion .accordion-body .accordion-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.accordion .accordion-body .accordion-content a {
  width: 100%;
  height: 35px;
  padding-top: 7px;
  padding-left: 15px;
}
.accordion .accordion-body .accordion-content a:hover {
  width: 100%;
  /* height: 35px; */
  background: rgba(0,0,0,.08);
  color: #2e3553;
}

.accordion .accordion-body .accordion-content a span {
  margin-left: 20px;
  margin-top: 30px;
}

.accordion.childSidebar .accordion-body .accordion-content a span {
  margin-left: 35px;
  margin-top: 30px;
}

.accordion.disabled {
  /* background-color: #343A4E; */
  height: 40px;
}

.accordion.disabled.childSidebar {

  background-color: #343A4E;
  cursor: pointer;
}

.accordion.disabled .accordion-header {
  border-bottom: none;
  height: 40px;
  color: #000;
}

.accordion.disabled .accordion-header:hover {
   color: #ffffff;
   height: 40px;
}

.accordion.disabled .accordion-header i {
  transform: rotate(0deg);
}
.accordion.disabled .accordion-body {
  pointer-events: none;
  padding: 0;
  margin-left: 16px;
  opacity: 0;
  max-height: 0px;
  transform: translateY(50px);
}

/* End Collapse Styles*/
</style>
