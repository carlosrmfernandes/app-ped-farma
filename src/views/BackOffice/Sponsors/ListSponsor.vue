<template>
 <div class="panel">
    <div class="panel-header">
      <h1>Patrocinadores</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
        :cols="cols"
        :data="sponsors"
        title="Patrocinador"
        :searchMethod="GetSponsors"
        :pagination="pagination"
        :paginationMethod="GetSponsors"
        :sortMethod="GetSponsors"
        :needGrid="true"
        :changePage="changePage"
        resource="company"
        editRoute="EditSponsor"
        :pageCount="pageCount"
        :removeResource="removeMostSponsors"
        registRoute="RegistSponsor"
        buttonRegistName = "Novo Patrocinador"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Layouts/Table'

import { RemoveSponsors } from './helpers/functions.js'

export default {
  components: {
    Table
  },
  props: {
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' },
        { name: 'email', label: 'Email' },
        { name: 'facebook', label: 'Facebook' },
        { name: 'instagram', label: 'Instagram' },
        { name: 'twitter', label: 'Twitter' },
        { name: 'phone_number', label: 'Telefone' }
      ],
      isRequesting: false,
      sponsors: [],
      pagination: {
        perPage: 10,
        pageable: { pageNumber: 1 }
      },
      ids: [],
      hadError: '',
      hadSuccess: '',
      editID: '',
      pageCount: 0
    }
  },
  methods: {
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.sponsors
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetSponsors (type, sort = '', search = '') {
      this.isRequesting = true

      if (type === 'next') {
        this.pagination.pageable.pageNumber += 1
      }

      if (type === 'prev') {
        this.pagination.pageable.pageNumber -= 1
      }

      // API query options like: sorts and pagination
      let query = ''
      query += `pageNumber=${this.pagination.pageable.pageNumber}`
      query += `&pageSize=${this.pagination.perPage}`
      // query += sort ? `&sortBy=${sort}` : ''
      query += search ? `&search=${search}` : ''

      try {
        const result = await this.axios.get(`/sponsors?${query}`)
        const res = result.data
        this.sponsors = res.data

        this.pageCount = res.pages_count
        // Set Pagination
        // delete res.data.content
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostSponsors (ids) {
      this.RemoveSponsors(ids)
    },
    RemoveSponsors
  },
  created () {
    // Get customer orders
    this.GetSponsors()
  }
}
</script>
<style>
.panel {
  /* border: 1px solid red; */
  padding: 20px;
}
.panel-header {
  /* border: 1px solid red; */
  top: 0px;
  width: 100%;
  height: 15%;
}
.panel-body {
  /* border: 1px solid red; */
  margin-top: 40px;
}
.panel-footer {
  /* border: 1px solid red; */
  margin-top: 40px;
  height: 40px;
}
label{
    float: left !important;
}
.modal-content{
    margin-top: 15% !important;
}
</style>
