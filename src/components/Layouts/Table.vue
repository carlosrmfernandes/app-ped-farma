<template>
  <div>
    <div >
      <div class="head-table">
        <div class="searchInput">
          <div class="col-md-8 pl-0">
            <div class="form-group">
              <span class="deleteicon">
                <input type="text" class="form-control" v-model="searchInput"
                      @keyup.enter="Search" id="event-name" placeholder="Buscar.." />
                <span v-if="searchInput" @click="clean">&times;</span>
              </span>
            </div>
          </div>
        </div>
        <div class="gridOrList" v-if="needGrid" @click="tableGrid">
          <span><i class="fas fa-th fa-lg" v-if="gridOrList"></i></span>
          <span><i class="fa fa-bars fa-lg" v-if="!gridOrList"></i></span>
        </div>
      </div>
      <div >
        <table class="table" v-if="!grid">
          <thead class="thead-dark">
            <tr>
              <th v-for="(col, index) in cols" :key="index">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in results"
              :key="index"
              @click="clickArrow({ name: editRoute, params: { id: row.id } })"
            >
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
        </div>
      </div>
    </div>
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
    }
  },
  data () {
    return {
      searchInput: '',
      currentPage: 1,
      elementsPerPage: this.pagination.perPage,
      totalElements: this.data.length,
      showingElements: 0,
      ascending: false,
      sortOrder: false,
      sortColumn: '',
      gridOrList: true,
      grid: false,
      selectedSort: '',
      selectedColumn: '',
      paginationDirection: '',
      paginationArray: []
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
      this.sortMethod('', this.selectedDirection, this.selectedSort)
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
    }
  },
  computed: {
    results () {
      let data = this.data
      let sortColumn = this.sortColumn
      let order = this.sortOrder ? 1 : -1

      // if (this.searchInput) {
      //   data = data.filter(
      //     item =>
      //       item[this.searchParam]
      //         .toLowerCase()
      //         .indexOf(this.searchInput.toLowerCase()) > -1
      //   )
      //   this.paginationArray = data
      // }

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
  background-color: #343A4E !important;
}
tbody tr {
  cursor: pointer;
}

tbody tr:hover {
background-color: #52596F;
color: #fff;
}

.modal-backdrop {
  opacity: 0.5 !important;
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

.number {
  display: inline-block;
  padding: 8.5px 11.5px;
  color: #fff;
  border-radius: 4px;
  background: #343a4e;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 0px;
  margin-left: 5px;
  cursor: pointer;
  font-size: 12px;
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

span.deleteicon {
  /* position: relative; */
}
span.deleteicon span {
  position: absolute;
  display: block;
  top: -2px;
  right: 22px;
  width: 16px;
  height: 16px;
  background: url(http://cdn.sstatic.net/stackoverflow/img/sprites.png?v=4) 0 -690px;
  cursor: pointer;
  font-size: 30px;
}
</style>
