<template>
  <div>
    <div v-if="!grid">
      <div class="head-table">
        <div class="searchInput">
          <div class="col-md-8 pl-0">
          <div class="form-group">
            <input type="text" class="form-control" id="event-name" placeholder="Buscar.." />
          </div>
        </div>
        </div>
        <div class="gridOrList">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
          >
            Grid
          </b-button>
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right mr-2"
          >
            List
          </b-button>
        </div>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th v-for="(col, index) in cols" :key="index">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in results"
            :key="index"
            @click="$bvModal.show('bv-modal-example')"
          >
            <td v-for="(col, index) in cols" :key="index">{{row[col.name]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else></div>
  </div>
</template>
<script>
export default {
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
    grid: {
      type: Boolean,
      default: false
    },
    searchMethod: {
      type: Function
    },
    detailItemRoute: {
      type: String
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      searchInput: '',
      tableSearch: '',
      currentPage: 1,
      pageCount: 0,
      elementsPerPage: 14,
      totalElements: this.data.length,
      showingElements: 0,
      ascending: false,
      sortOrder: false,
      sortColumn: ''
    }
  },
  methods: {
    clickArrow (router) {
      this.$router.push(router)
    },
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  },
  computed: {
    results () {
      let data = this.data
      let sortColumn = this.sortColumn
      let order = this.sortOrder ? 1 : -1

      if (this.tableSearch) {
        data = data.filter(
          item =>
            item[this.searchParam]
              .toLowerCase()
              .indexOf(this.tableSearch.toLowerCase()) > -1
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

.gridOrList button{
  float: right;
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
