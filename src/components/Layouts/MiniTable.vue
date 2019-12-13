<template>
  <div class="main-mini-table">
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th v-if="canRemove">
              <label class="checkbox first">
                <input type="checkbox" v-model="selectAll" @click="select" />
                <div class="square"></div>
              </label>
              <!-- <span>Tudo</span> -->
            </th>
            <th v-for="(col, index) in cols" :key="index">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in results"
            :key="index"
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
export default {
  props: {
    data: {},
    cols: {},
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
    title: {
      type: String
    }
  },
  data () {
    return {
      elementsPerPage: 100,
      showingElements: 0,
      currentPage: 1,
      ascending: false,
      sortOrder: false,
      sortColumn: '',
      paginationArray: [],
      selected: [],
      selectAll: false
    }
  },
  methods: {
    clickArrow (router) {
      this.$router.push(router)
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
      this.sortMethod()
    },
    accessPage (i) {
      this.changePage(i)
      this.sortMethod()
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
      // console.log(data)
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
.main-mini-table {
  width: 100%;
}

.table .thead-dark th {
  background-color: #343a4e !important;
}
tbody tr {
  cursor: pointer;
}

tbody tr:hover {
  background-color: #52596f;
  color: #fff;
}

.table td {
  max-width: 70px;
  overflow: hidden;
}
.modal-backdrop {
  opacity: 0.5 !important;
}

.modal-title {
  width: 100% !important;
}

.close {
  display: none;
}

.table__pagination__control {
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
  font-family: "Montserrat Bold";
}
.number:hover {
  background: #8c93a8;
}

.to-limit {
  background: #8c93a8;
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

.checkbox {
  user-select: none;
}

.checkbox .square {
  width: 20px;
  height: 20px;
  border: 1px solid #343a4e;
  border-radius: 4px;
  display: inline-block;
}
.checkbox.first {
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 4px;
  display: inline-block;
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

.float-right {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -5px;
}
</style>
