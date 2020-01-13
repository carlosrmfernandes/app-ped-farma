<template>
  <div>
    <div >
      <div class="head-table">
        <div class="searchInput">
          <div class="col-md-8 pl-0">
            <div class="form-group">
              <span class="deleteicon">
                <input type="text" class="form-control" v-model="searchInput" v-show="showSearch"
                      @keyup.enter="Search" id="event-name" placeholder="Buscar.." />
                <span v-if="searchInput" @click="clean">&times;</span>
              </span>
            </div>
          </div>
        </div>
        <div class="gridOrList" @click="tableGrid">
          <span><i class="fas fa-th fa-lg" v-if="needGrid && gridOrList"></i></span>
          <span><i class="fa fa-bars fa-lg" v-if="needGrid && !gridOrList"></i></span>
          <b-button
          variant="outline-primary"
          size="sm"
          class="float-right"
          v-on:click.stop
          @click="registResource"
          v-show="showNewResourceButton"
          >{{ buttonRegistName }}</b-button>
          <b-button
          variant="outline-danger"
          size="sm"
          class="float-right"
          v-on:click.stop
          @click="showRemoveModal"
          v-show="selected.length >= 1"
          >Apagar</b-button>
        </div>
      </div>
      <div >
        <table class="table" v-if="!grid">
          <thead class="thead-dark">
            <tr>
              <th v-if="canRemove">
                <label class="checkbox first" :class="{'active': selectAll}">
                <input type="checkbox" v-model="selectAll" @click="select" />
                <div class="square"></div>
              </label>
              <!-- <span>Tudo</span> -->
              </th>
              <th class="header-table" v-for="(col, index) in cols" :key="index" @click="Sort(col.name)"><i class="fa fa-sort" aria-hidden="true" style="margin-right: 3px;"></i>{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in results"
              :key="index"
              @click="clickArrow({ name: editRoute, params: { id: row.id } })"
            >
            <td class="chcBox" v-on:click.stop v-if="canRemove">
              <label class="checkbox">
                <input type="checkbox" :value="row.id" v-model="selected" />
                <div class="square"></div>
              </label>
            </td>
              <td v-for="(col, index) in cols" :key="index">{{row[col.name]}}</td>
            </tr>
          </tbody>
        </table>
        <!-- CARDS -->
        <div v-else>
          <Cards
            :data="data"
            roomsItemRoute="RoomsEvent"
            getImageEndpoint="party_events"
            :editRoute="editRoute"
            :resource="resource"
          />
        </div>
        <!-- PAGINATION -->
        <div  class="table__pagination is-flex__space-between">
          <div class="table__pagination__control is-flex">
            <div
              :class="{'number': true, 'to-limit': pagination.pageable.pageNumber <= 1 ? true : false}"
              title="Anterior"
              @click=" pagination.pageable.pageNumber <= 1 ? '' : PaginateDirection('prev')">
                <i class="fas fa-angle-left"></i>
            </div>
            <div
              class="number middle"
              v-for="(i,idx) in pageCount"
              v-bind:class="[i == pagination.pageable.pageNumber ? 'active' : '']"
              v-on:click="accessPage(i)"
              :key="idx"
            >{{i}}</div>
            <div
              :class="{'number': true, 'to-limit': pagination.pageable.pageNumber + 1 > pageCount ? true : false}"
              title="Próxima"
              @click="pagination.pageable.pageNumber + 1 > pageCount ? '' : PaginateDirection('next')">
                <i class="fas fa-angle-right"></i>
            </div>
          </div>
          <div class="pagination-right">
              <div class="label-maker">
                <select id="p-name" class="budget" v-model="elementsPerPage" @change="resizeTable">
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <label
                  for="p-name"
                >Mostrando {{showingElements}} - {{elementsPerPage}} de {{totalElements}}</label>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" :title="title">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="remove">
            <span>Sim</span>
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right mr-2"
            @click="hideRemoveModal"
          >Não</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Cards from '@/components/Layouts/Cards.vue'

export default {
  components: {
    Cards
  },
  props: {
    data: {},
    cols: {},
    searchMethod: {
      type: Function
    },
    searchParam: {
      type: String,
      default: 'name'
    },
    title: {
      type: String
    },
    needGrid: {
      type: Boolean,
      default: true
    },
    resource: {
      type: String
    },
    editRoute: {
      type: String
    },
    sortMethod: {
      type: Function
    },
    pagination: {
      type: Object
    },
    paginationMethod: {
      type: Function
    },
    changePage: {
      type: Function
    },
    pageCount: {
      type: Number
    },
    allowMultiSelect: {
      type: Boolean,
      default: true
    },
    removeResource: {
      type: Function
    },
    canRemove: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showNewResourceButton: {
      type: Boolean,
      default: true
    },
    buttonRegistName: {
      type: String
    },
    registRoute: {
      type: String
    },
    totalElements: {
      type: Number
    }
  },
  data () {
    return {
      searchInput: '',
      currentPage: 1,
      elementsPerPage: this.pagination.perPage,
      showingElements: 0,
      ascending: false,
      sortOrder: false,
      sortColumn: '',
      gridOrList: true,
      grid: false,
      selectedSort: '',
      selectedColumn: '',
      paginationDirection: '',
      paginationArray: [],
      selected: [],
      selectAll: false
    }
  },
  methods: {
    clickArrow (router) {
      this.$router.push(router)
    },
    Search () {
      // Only perform the search if the method is passed as a props
      if (this.searchMethod) {
        this.searchMethod('', '', this.searchInput)
      }
    },
    SortBy (column) {
      // Set sort column
      this.sortColumn = column
      if (this.sortOrder) {
        this.sortOrder = false
      } else {
        this.sortOrder = true
      }
    },
    Sort (column = '') {
      this.selectedSort = column
      this.sortMethod('', this.selectedSort, this.selectedDirection)
    },
    resizeTable () {
      this.sortMethod('', '', '', this.elementsPerPage)
    },
    tableGrid () {
      this.gridOrList = !this.gridOrList

      if (this.gridOrList) {
        this.grid = false
      } else if (!this.gridOrList) {
        this.grid = true
      }
    },
    clean () {
      this.searchInput = ''
      this.searchMethod('', '', this.searchInput)
    },
    accessPage (i) {
      this.changePage(i)
      this.sortMethod()
    },
    Direction (direction = '') {
      this.selectedDirection = direction
      this.sortMethod('', this.selectedSort)
    },
    PaginateDirection (direction = '') {
      this.paginationDirection = direction
      this.sortMethod(
        this.paginationDirection,
        this.selectedSort
      )
    },
    select () {
      this.selected = []
      this.$store.state.ids = []
      if (!this.selectAll) {
        for (let i in this.results) {
          this.selected.push(this.results[i].id)
          // this.$store.state.ids.push(this.results[i].id)
        }
      }
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    },
    remove () {
      this.removeResource(this.selected)
    },
    registResource () {
      this.$router.push({ name: this.registRoute })
    }
  },
  computed: {
    results () {
      let data = this.data
      let sortColumn = this.sortColumn
      let order = this.sortOrder ? 1 : -1

      if (sortColumn) {
        data = data.slice().sort((a, b) => {
          a = a[sortColumn]
          b = b[sortColumn]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      var start = (this.currentPage - 1) * this.elementsPerPage
      var end = start + this.elementsPerPage
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showingElements = data.slice(start, end).length
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.paginationArray = data

      return data.slice(start, end)
    }
  }
}
</script>
<style scoped>
.head-table{
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}
.searchInput{
  width: 50%;
}
.gridOrList{
  width: 50%;
}

.gridOrList span{
  float: right;
}

.gridOrList span i{
  color: #343A4E;
  cursor: pointer;
}

.table .thead-dark th{
  background-color: #fff;
  font-size: 12px;
}

.table .thead-dark th {
  color: rgba(0,0,0,.65);
  background-color: #fff;
  border-color: #fff;
}

.table thead th {
  padding: 0.45rem;
  padding-top: 0.75rem;
  vertical-align: bottom;
  border-bottom: 1px solid #dee2e6 !important;
}

tbody {
  background-color: #fff;
}

tbody tr {
  cursor: pointer;
}

tbody tr:hover {
background-color: rgba(0,0,0,.04);
border: 1px solid rgba(0,0,0,.08);
color: #000;
}

.table td{
  max-width: 70px;
  overflow: hidden;
  font-size: 11.4px;
  padding: 0.45rem;
}

.header-table{
  cursor: pointer;
}

.modal-title {
    width: 100% !important;
}

.close{
  display: none;
}

.table__pagination__control{
  display: inline-flex;
}

.pagination-right {
  float: right;
  padding-top: 0px;
  margin-top: 0px;
  width: 15%;
  /* border: 1px solid red; */
}

.pagination-right .label-maker {
  display: flex;
  justify-content: flex-end;
}

.pagination-right .label-maker select {
  width: 23%;
  height: 28px;
  margin: 10px;
  font-size: 12px;
  background-color: #fff;
  border: 1px solid #cfd4da;
  border-radius: 4px;
}

.pagination-right .label-maker label {
    font-size: 12px;
    margin-top: 15px;
}

.number {
  /* padding: 8.5px 11.5px; */
  color: #fff;
  border-radius: 4px;
  background: #343a4e;
  width: 23px;
  height: 23px;
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 0px;
  margin-left: 5px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.number.active {
  background: #d05d1c;
  font-family: 'Montserrat Bold';
}
.number:hover {
  background: #8C93A8;
}

.to-limit{
  background: #8C93A8;
  cursor: none;
}

span.deleteicon span {
  position: absolute;
  display: block;
  top: -2px;
  right: 22px;
  width: 12px;
  height: 16px;
  background: url(http://cdn.sstatic.net/stackoverflow/img/sprites.png?v=4) 0 -690px;
  cursor: pointer;
  font-size: 25px;
}

.checkbox {
  user-select: none;
}

.checkbox .square {
  width: 13px;
  height: 13px;
  border: 1px solid #343A4E;
  border-radius: 3px;
  display: inline-block;
}

thead.thead-dark .checkbox .square {
   display: none;
}
.checkbox.first {
  width: 13px;
  height: 13px;
  border: 1px solid #343A4E;
  border-radius: 3px;
  display: inline-block;
}

thead.thead-dark .checkbox.first.active {
  background-color: #d05d1c;
}

.checkbox.first .square {
  border: 1px solid #fff;
}

.checkbox.first input:checked + .square {
  border: none;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkbox input:checked + .square {
  background-color: #d05d1c;
  /* border: 1px solid #fff; */
}

.float-right{
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -5px;
}
</style>
