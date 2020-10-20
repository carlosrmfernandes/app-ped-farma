<template>
  <div class="vpos-table">
    <div class="vpos-table-divisor">
      <div class="title-search">
        <div class="title-search-above"></div>
        <div class="title-search-bottom">
          <span class="total-elements">{{data.length}} Itens</span>
        </div>
      </div>
      <div class="content-table">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th
                v-for="(col, index) in columns"
                :key="index"
                @click="Sort(col.name)"
              >{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in results" :key="index" @click="clickArrow({ name: editRoute, params: { id: row.id } })">
              <td v-for="(col, index) in columns" :key="index" >
                <span>{{row[col.name]}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="table__pagination is-flex__space-between" v-if="hasPagination">
          <div class="table__pagination__control is-flex">
            <div
              :class="{'number': true, 'limits': true, 'to-limit': pagination.isFirstPage ? true : false}"
              title="Anterior"
              @click=" pagination.isFirstPage ? '' : PaginateDirection('prev')"
            >
              <i class="arrow lefts"></i>
            </div>
            <div
              class="number middle"
              v-for="(i,idx) in pageCount"
              v-bind:class="[i-1 === pagination.pageable.pageNumber ? 'active' : '']"
              v-on:click="accessPage(i-1)"
              :key="idx"
            >{{i}}</div>
            <div
              :class="{'number': true, 'limits': true, 'to-limit': pagination.isLastPage ? true : false}"
              title="Próxima"
              @click="pagination.isLastPage ? '' : PaginateDirection('next')"
            >
              <i class="arrow rights"></i>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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
    resource: {
      type: String
    },
    editRoute: {
      type: String
    },
    selectedDirection: {
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
      default: false
    },
    removeResource: {
      type: Function
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    hasEdit: {
      type: Boolean,
      default: false
    },
    detailMethod: {
      type: Function
    }
  },
  data () {
    return {
      currentPage: 1,
      elementsPerPage: this.pagination.perPage,
      totalElements: 0,
      showingElements: 0,
      ascending: false,
      sortOrder: false,
      sortColumn: '',
      selectedSort: '',
      selectedColumn: '',
      paginationDirection: '',
      paginationArray: [],
      isRequesting: false,
      created_date_start: '',
      created_date_end: ''
    }
  },
  watch: {},
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
      this.selectedSort = column.toUpperCase()
      this.sortMethod('', this.selectedSort, this.selectedDirection)
    },
    resizeTable () {
      this.sortMethod('', '', '', this.elementsPerPage)
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
    verify (value) {
      if (!value) {
        this.Search(value)
      }
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
    },
    columns () {
      let col = this.cols

      return col
    }
  },
  mounted () {
    this.totalElements = this.results.length
  }
}
</script>
<style lang="scss" scoped>

.vpos-table {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 15px 1px rgba(39,39,39,0.1);
}

.vpos-table-divisor {
  width: 100%;
  height: 70vh;
  max-height: 100vh;
}

.title-search {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
}

.title-search-above {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 45px;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.title-search-bottom {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.title-search-bottom span {
  text-align: left;
  font-family: 'Open Sans Regular';
  font-size: 12px;
  letter-spacing: 0;
  color: #7c7c7d;
  opacity: 1;
}

.title-search .title {
  width: 30%;
  display: flex;
  align-items: flex-start;
}

.title-search .title span {
  text-align: left;
  font-family: 'Open Sans Semibold';
  font-size: 16px;
  letter-spacing: 0;
  color: #595a5b;
  opacity: 1;
}

.title-search .search {
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.title-search .search .col {
  margin-bottom: 0;
}

.filter-circle {
  width: 30px;
  height: 30px;
  border: 1px solid #b1b1b1;
  border-radius: 50px;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
}

.filter-circle img{
  width: 15px;
  height: 20px;
}

.search-news-btn {
  width: 156px;
  height: 40px;
  border-radius: 5px;
  margin: 0 8px;
  margin-right: 0;
}

.content-table {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.table{
  width: 100%;
}

.reload-table{
  margin-right: 16px;
  border: 1px solid darkgrey;
  padding: 4px 8px;
  border-radius: 5px;
  cursor: pointer;
}

.reload-table i {
  color: #7c7c7d;
}

@media screen and (max-width: 425px){
  .table {
      max-width: 280px;
      display: flex;
      flex-direction: column;
      overflow-x: auto;
  }
}

@media screen and (max-width: 320px){
  .table {
      max-width: 230px;
  }
}

.table thead{
 border-bottom: 2px solid #595a5b;
}

.table thead th {
  height: 31px;
  text-align: left;
  font-family: 'Open Sans Semibold';
  font-size: 13px;
  letter-spacing: 0;
  padding-left: 10px;
  color: #7c7c7d;
  opacity: 1;
  background: #fff 0% 0% no-repeat padding-box;
  border-color: #fff;
  cursor: pointer;
}

.table thead th:hover{
  background: #e3e4e6 0% 0% no-repeat padding-box;
  color: #fff;
}

tbody tr {
  cursor: pointer;
}

tbody tr td {
  text-align: left;
  font-family: 'Open Sans Regular';
  font-size: 12px;
  letter-spacing: 0;
  color: #7c7c7d;
  opacity: 1;
  padding: 10px;
}
.table thead th.is-money {
  text-align: right;

}
.is-money{
  text-align: right;
}

tbody tr td span{
  width: 115px;
}

tbody tr:hover {
  background-color: #e3e4e6;
  color: #7c7c7d;
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

/* === PAGINATION ON TABLE STARTS HERE === */

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

span.deleteicon {
  display: flex;
}

span.deleteicon span {
  position: absolute;
  margin-left: 200px;
  width: 16px;
  height: 16px;
  background: url(http://cdn.sstatic.net/stackoverflow/img/sprites.png?v=4) 0 -690px;
  cursor: pointer;
  font-size: 30px;
}

.table__pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.table__pagination__control {
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
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
  width: 29px;
  height: 29px;
  margin: 5px;
  margin-bottom: 0px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans SemiBold';
  font-size: 14px;
  letter-spacing: 0;
  background: #fff;
  color: #75ac0b;
  opacity: 1;
}

.number.active {
  width: 29px;
  height: 29px;
  background: #75ac0b 0% 0% no-repeat padding-box;
  color: #fff;
  opacity: 1;
  font-family: 'Open Sans Semibold';
}

.number:hover {
  background: #11559C;
  color: #fff;
}

.limits {
  background: #fff;
  color: #11559C;
  border: 1px solid #11559C;
}

.to-limit {
  background: #11559C;
  opacity: 0.5;
}

.float-right {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -5px;
}

.float-right {
  margin-left: 10px;
  margin-top: -5px;
}

/* === MODAL CSS === */
.date-filter {
  height: 35px;
  border: 1px solid #d4cdcd;
}

.content {
  width: 100%;
}

.content input {
  margin: 0 16px;
}

.content .content-above {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 16px;
  justify-content: space-between;
}

.content .content-above span {
  display: flex;
  align-items: center;
}

.content .content-center {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 16px;
}

.content .content-center span {
  display: flex;
  align-items: center;
}

.content-bottom {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

/* === LOADING CSS === */

.ap-list {
  position: relative;
  display: flex;
  flex-direction: column;
  --ap-list--chevron-color: #cbd2dd;
  --ap-list--border: #ccd4dd;
  --ap-list--hover: #f4f5f6;
  --ap-list--placeholder-bg: #f6f7f8;
  --ap-list--placeholder-bg2: #eee;
  --ap-list--placeholder-shim: #ddd;
}

.ap-list__header {
  display: flex;
  margin-bottom: 0.5rem;
}

.ap-list__header-back {
  color: var(--ap-list--chevron-color);
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.ap-list__title {
  font-weight: 400;
  font-style: normal;
  font-size: 1.125rem;
}

.ap-list__title--loading {
  width: auto;
  min-width: 250px;
  border-radius: 50rem;
  height: 24px;
  color: transparent;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: listPlaceHolderShimmer;
  animation-timing-function: linear;
  background: var(--ap-list--placeholder-bg);
  background: var(--ap-list--placeholder-bg2);
  background: linear-gradient(
    to right,
    var(--ap-list--placeholder-bg2) 8%,
    var(--ap-list--placeholder-shim) 18%,
    var(--ap-list--placeholder-bg2) 33%
  );
  background-size: 300% 50px;
  position: relative;
}

/* === COMMON TABLE / TABLE-LOADING === */

.ap-list__table {
  width: 100%;
  border-collapse: collapse;
  counter-reset: listItem;
  will-change: auto;
}

.ap-list__table-body {
  position: relative;
  display: flex;
  flex-direction: column;
}

.ap-list__table-row {
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  border: solid 1px var(--ap-list--border);
}

.ap-list__table-row:hover {
  transform: scale(1.01);
}

.ap-list__table-column {
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.ap-list__table-row--indexed > .ap-list__table-column:first-child::before {
  counter-increment: listItem;
  content: counter(listItem);
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 1.5rem;
  transform: translateY(-50%);
  font-size: 0.875rem;
}

.ap-list__table-column > i {
  font-size: 0.875rem;
}

.ap-list__table-row > td[data-title]::before {
  content: attr(data-title);
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.4rem;
  display: block;
  margin-bottom: 0.2rem;
}

/* === RESPONSIVE === */

@media (min-width: 37.5em) {
  .ap-list__table-body {
    display: table-row-group;
  }

  .ap-list__table-row {
    display: table-row;
    transition: background 0.1s ease-in-out;
    border: none;
    border-bottom: solid 1px var(--ap-list--border);
  }

  .ap-list__table-row:hover {
    background-color: var(--ap-list--hover);
    transform: none;
  }

  .ap-list__table-row--indexed > .ap-list__table-column:first-child {
    padding-left: 2.5rem;
  }

  .ap-list__table-row > td[data-title]::before {
    content: none;
  }

  .ap-list__table-column {
    padding: 0.8rem 0.5rem;
  }

  .ap-list__table-column:first-child {
    padding-left: 1.5rem;
  }

  .ap-list__placeholder {
    display: flex;
    flex-direction: column;
  }

  .ap-list__placeholder-row {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--ap-list--border);
    padding: 1rem 0;
  }

  .ap-list__placeholder-item {
    flex: 1;
    margin: 0 0.5rem;
    border-radius: 50rem;
    height: 1rem;
    color: transparent;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: listPlaceHolderShimmer;
    animation-timing-function: linear;
    background: var(--ap-list--placeholder-bg);
    background: var(--ap-list--placeholder-bg2);
    background: linear-gradient(
      to right,
      var(--ap-list--placeholder-bg2) 8%,
      var(--ap-list--placeholder-shim) 18%,
      var(--ap-list--placeholder-bg2) 33%
    );
    background-size: 300% 50px;
    position: relative;
  }

  .ap-list__placeholder-item:first-child {
    margin-left: 0;
  }

  .ap-list__placeholder-item:last-child {
    margin-right: 0;
  }

  .ap-list__placeholder-item--large {
    flex: 3;
  }
}

/* === ANIMATIONS === */

.ap-list__table.ng-hide-remove {
  animation-name: listTableShow;
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  animation-iteration-count: 1;
}

.ap-list__placeholder.ng-hide-remove,
.ap-list__title--loading.ap-list__title--loading-add {
  animation-name: listLoadingShow;
  animation-duration: 250ms;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  animation-iteration-count: 1;
}

.ap-list__placeholder.ng-hide-add,
.ap-list__table.ng-hide-add,
.ap-list__title--loading.ap-list__title--loading-remove {
  animation-name: listLoadingHide;
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  animation-iteration-count: 1;
  position: absolute;
  top: 35px;
}

@keyframes listLoadingShow {
  from {
    transform: translateX(150px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes listLoadingHide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes listTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes listPlaceHolderShimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
