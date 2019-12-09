<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Produtos</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="products"
          title="Produtos"
          :searchMethod="GetProducts"
          :pagination="pagination"
          :paginationMethod="GetProducts"
          :sortMethod="GetProducts"
          :needGrid="true"
          :changePage="changePage"
          resource="product"
          editRoute="EditProduct"
          :pageCount="pageCount"
          :removeResource="removeMostProducts"
          registRoute="RegistProduct"
          buttonRegistName = "Novo Produto"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import { RemoveProduct } from './helpers/functions.js'

import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' }
      ],
      isRequesting: false,
      products: [],
      pagination: {
        perPage: 12,
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
      this.products
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetProducts (type, sort = '', search = '') {
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
        const result = await this.axios.get(`/company_products?${query}`)
        const res = result.data
        this.products = res.data
        // console.log(result)
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
    removeMostProducts (ids) {
      this.RemoveProduct(ids)
    },
    RemoveProduct
  },
  created () {
    // Get customer orders
    this.GetProducts()
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
