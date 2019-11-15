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
        :pagination="pagination"
        :paginationMethod="GetSponsors"
        :searchMethod="GetPosts"
        :sortMethod="GetSponsors"
        :needGrid="true"
        resource="company"
        editRoute="EditSponsor"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Layouts/Table'
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
        { name: 'description', label: 'Nome' },
        { name: 'email', label: 'Email' },
        { name: 'facebook_url', label: 'Facebook' },
        { name: 'instagram_url', label: 'Instagram' },
        { name: 'twitter_url', label: 'Twitter' },
        { name: 'phone_number', label: 'Telefone' }
      ],
      isRequesting: false,
      sponsors: [],
      pagination: {
        perPage: 13
      },
      hadError: '',
      hadSuccess: '',
      editID: ''
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
    async GetSponsors () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/sponsors/all`)
        this.sponsors = result.data
        // Set Pagination
        delete result.data.content
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    }
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
