<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Usuario</div>
      <div class="col col-9">
          <router-link :to="{name: 'RegistProducts'}" tag="span">
                <button class="btn btn-primary">Novo Usuario</button>
          </router-link>
        <div class="float-btn plus"><i class="fas fa-plus"></i></div>
      </div>
    </div>
    <div class="container">
      <Table
          :cols="cols"
          :data="users"
          title="Usuarios"
          :searchMethod="GetUsers"
          :paginationMethod="GetUsers"
          :sortMethod="GetUsers"
          :pagination="pagination"
          :changePage="changePage"
          resource="users"
          editRoute="EditUsers"
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
      users: [],
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
    async GetUsers () {
      this.isRequesting = true

      try {
        const result = await this.axios.get(`/users`)
        const res = result.data
        this.totalElements = res.items_count
        this.users = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar os Usuarios. Actualize a página.'
      }
      this.isRequesting = false
    }
  },
  created () {
    this.GetUsers()
  }
}
</script>
<style style="scss" scoped></style>
