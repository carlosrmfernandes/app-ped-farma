<template>
  <div>
    <div >
      <div class="head-table">
        <div class="searchInput">
          <div class="col-md-8 pl-0">
            <div class="form-group">
              <input type="text" class="form-control" v-model="searchInput"
                    @keyup.enter="Search" id="event-name" placeholder="Buscar.." />
            </div>
          </div>
        </div>
        <div class="gridOrList" v-if="needGrid" @click="tableGrid">
          <span><i class="fas fa-th fa-lg" v-if="gridOrList"></i></span>
          <span><i class="fa fa-bars fa-lg" v-if="!gridOrList"></i></span>
        </div>
      </div>
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
            @click="showModal(row.id)"
          >
            <td v-for="(col, index) in cols" :key="index">{{row[col.name]}}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <Cards
          :data="data"
          roomsItemRoute="RoomsEvent"
          getImageEndpoint="party_events"
        />
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
    deleteButton: {
      type: Boolean,
      default: false
    },
    editButton: {
      type: Boolean,
      default: false
    },
    searchMethod: {
      type: Function
    },
    detailMethod: {
      type: Function
    },
    searchParam: {
      type: String,
      default: 'name'
    },
    detailItemRoute: {
      type: String
    },
    title: {
      type: String
    },
    needGrid: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchInput: '',
      currentPage: 1,
      pageCount: 0,
      elementsPerPage: 8,
      totalElements: this.data.length,
      showingElements: 0,
      ascending: false,
      sortOrder: false,
      sortColumn: '',
      gridOrList: true,
      grid: false
    }
  },
  methods: {
    clickArrow (router) {
      this.$router.push(router)
    },
    showModal (id) {
      // Set the ID value on store Global variable for using with modal
      this.$store.state.tableDetailID = id
      // Get the especific resource with the saved ID, on your list on table
      this.detailMethod()
      // Show modal for deatils
      this.$bvModal.show('bv-modal-example')
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    Search () {
      // Only perform the search if the method is passed as a props
      if (this.searchMethod) {
        this.searchMethod('', '', '', this.searchInput)
      }
    },
    tableGrid () {
      this.gridOrList = !this.gridOrList

      if (this.gridOrList) {
        this.grid = false
      } else if (!this.gridOrList) {
        this.grid = true
      }
    }
  },
  computed: {
    results () {
      let data = this.data
      let sortColumn = this.sortColumn
      let order = this.sortOrder ? 1 : -1

      if (this.searchInput) {
        data = data.filter(
          item =>
            item[this.searchParam]
              .toLowerCase()
              .indexOf(this.searchInput.toLowerCase()) > -1
        )
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.paginationArray = data
      }

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

      return data.slice(start, end)
    }
  }
}
</script>
<style>
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
</style>
