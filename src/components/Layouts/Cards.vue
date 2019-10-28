<template>
  <div>
    <div class="cards">
      <div class="card-principal" v-for="(row, i) in results" :key="i">
        <aside class="profile-card">
          <header>
              <img :src="row.img" v-on:click="showModal(row.id)" />
          </header>
        </aside>
        <div class="profile-bio">
          <!-- <span>{{row.title}}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {},
    roomsItemRoute: {
      type: String
    },
    getImageEndpoint: {
      type: String
    },
    detailMethod: {
      type: Function
    },
    resource: {
      type: String,
      default: 'event'
    }
  },
  data () {
    return {
      filter: {},
      tableSearch: '',
      currentPage: 1,
      pageCount: 0,
      elementsPerPage: 16,
      totalElements: this.data.length,
      showingElements: 0,
      sortColumn: '',
      sortOrder: false,
      root: process.env.VUE_APP_API
    }
  },
  methods: {
    showModal (id) {
      // Set the ID value on store Global variable for using with modal
      this.$store.state.tableDetailID = id
      // Get the especific resource with the saved ID, on your list on table
      this.detailMethod()
      // Show modal for deatils
      this.$bvModal.show('bv-modal-example')
    }
  },
  computed: {
    results () {
      let data = this.data
      let sortColumn = this.sortColumn
      let order = this.sortOrder ? 1 : -1
      let k = 0
      data.forEach(element => {
        const result = this.axios.get(
          `/${this.getImageEndpoint}/${element.id}`
        )
        if (this.resource === 'event') {
          data[k]['img'] = result.poster_path
        } else if (this.resource === 'company') {
          data[k]['img'] = `${this.root}/company_logos/${element.logo_path}`
        }

        k++
      })

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
/*Card Props*/

.cards {
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  padding-left: 0px;
  padding-right: 10px;
  overflow: auto;
  overflow-x: hidden;
}

.card-principal {
  /* border: 1px solid red; */
  width: 195px;
  height: 255px;
  overflow: hidden;
  margin-right: 15px;
  margin-bottom: 15px;
}
.profile-card {
  margin: 0 auto;
  /* background-color: #343a4e; */
  width: 100%;
  height: 250px;
  box-shadow: 0 3px 10px rgba(55, 55, 55, 0.3);
  display: inline-block;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
}

.profile-card,
.profile-card header,
.profile-card header img{
  overflow: hidden;
  position: relative;
  top: 0;
  -webkit-transition: all 0.47s ease-out;
  -moz-transition: all 0.47s ease-out;
  -ms-transition: all 0.47s ease-out;
  -o-transition: all 0.47s ease-out;
  transition: all 0.47s ease-out;
}

.profile-card header {
  width: 100%;
  max-height: 500px;
}

.profile-card header img {
  display: block;
  width: 100%;
  height: 250px;
  position: relative;
  cursor: pointer;
  top: 0;
}

</style>
