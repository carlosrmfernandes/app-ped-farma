<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Produtos</div>
      <div class="col col-9">
          <router-link :to="{name: 'RegistProducts'}" tag="span">
                <button class="btn btn-primary">Novo Produto</button>
          </router-link>
        <div class="float-btn plus"><i class="fas fa-plus"></i></div>
      </div>
    </div>
    <div class="container">
      <Table
          :cols="cols"
          :data="products"
          title="Produtos"
          :searchMethod="GetProducts"
          :paginationMethod="GetProducts"
          :sortMethod="GetProducts"
          :pagination="pagination"
          :changePage="changePage"
          resource="products"
          editRoute="EditProducts"
        ></Table>
    </div>
  </div>
</template>
<script>
import Table from '@/components/ClientOffice/Layouts/Table.vue'

export default {
  components: {
    Table
  },
  data () {
    return {
      products: [],
      hadError: '',
      isRequesting: false,
      cols: [
        { name: 'name', label: 'Nome' },
        { name: 'price', label: 'Preço' },
        { name: 'quantity', label: 'Quantidade' },
        { name: 'description', label: 'Descrição' }
      ],
      pagination: {
        perPage: 12,
        pageable: { pageNumber: 0 }
      }
    }
  },
  methods: {
    SelectImage (file) {
      this.form.file = file
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    /*
     *  GetOperators: This method will fire a GET request
     *  to fetch the products and the will store the result
     *  into the orders local state property
     */
    async GetProducts () {
      this.isRequesting = true

      try {
        const result = await this.axios.get(`/product`)
        const res = result.data
        this.totalElements = res.items_count
        this.products = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar os Produtos. Actualize a página.'
      }
      this.isRequesting = false
    }
  },
  created () {
    this.GetProducts()
  }
}
</script>
<style style="scss" scoped></style>
