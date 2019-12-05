<template>
 <div class="panel">
    <div class="panel-header">
      <h1>Contratos</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
        :cols="cols"
        :data="contracts"
        title="Contratos"
        :searchMethod="GetContracts"
        :detailMethod="GetContracts"
        :pagination="pagination"
        :paginationMethod="GetContracts"
        :sortMethod="GetContracts"
        :changePage="changePage"
        :needGrid="false"
        resource="contract"
        editRoute="EditContract"
        :pageCount="pageCount"
        :showSearch="false"
        :removeResource="removeMostCrontracts"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
  </div>
</template>
<script>
import { RemoveContract } from './helpers/functions.js'

import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      cols: [
        { name: 'name', label: 'Nome' }
      ],
      isRequesting: false,
      pagination: {
        perPage: 10,
        pageable: { pageNumber: 1 }
      },
      contracts: [],
      hadError: '',
      editID: '',
      pageCount: 0,
      organizer_id: 0

    }
  },
  methods: {
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetContracts (type, sort = '', search = '') {
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

      try {
        const result = await this.axios.get(`/v1/contracts?${query}`)
        const res = result.data
        this.contracts = res.data

        this.pageCount = res.pages_count
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostCrontracts (ids) {
      this.RemoveContract(ids)
    },
    RemoveContract
  },
  created () {
    // Get contracts orders
    this.GetContracts()
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
