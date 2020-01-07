<template>
  <div class="panel">
    <div class="panel-header">
      <h4>Operadores</h4>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="suppliers"
          title="Operadores"
          :searchMethod="GetSuppliers"
          :pagination="pagination"
          :paginationMethod="GetSuppliers"
          :sortMethod="GetSuppliers"
          :needGrid="true"
          :changePage="changePage"
          resource="supplier"
          editRoute="EditSupplier"
          :pageCount="pageCount"
          :removeResource="removeMostSuppliers"
          registRoute="RegistSupplier"
          buttonRegistName = "Novo Operador"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import { RemoveSupplier } from './helpers/functions.js'

import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' },
        { name: 'username', label: 'Nome de Usuario' }
      ],
      isRequesting: false,
      suppliers: [],
      pagination: {
        perPage: 15,
        pageable: { pageNumber: 1 }
      },
      ids: [],
      hadError: '',
      pageCount: 0,
      totalElements: 0
    }
  },
  methods: {
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.suppliers
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetSuppliers (type, sort = '', search = '', size) {
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
      query += size ? `&pageSize=${size}` : `&pageSize=${this.pagination.perPage}`
      // query += sort ? `&sortBy=${sort}` : ''
      query += search ? `&search=${search}` : ''

      try {
        const result = await this.axios.get(`/suppliers?${query}`)
        const res = result.data
        this.suppliers = res.data

        this.pageCount = res.pages_count
        // Set Pagination
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostSuppliers (ids) {
      this.RemoveSupplier(ids)
    },
    RemoveSupplier
  },
  created () {
    // Get customer orders
    this.GetSuppliers()
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
label {
  float: left !important;
}
.modal-content {
  margin-top: 15% !important;
}
</style>
