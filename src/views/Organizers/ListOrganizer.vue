<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Organizadores</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
        :cols="cols"
        :data="companies"
        title="Organizador"
        :searchMethod="GetPosts"
        :detailMethod="GetCompany"
        :needGrid="true"
        resource="company"
        editRoute="EditOrganizer"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Layouts/Table";
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
      companies: [],
      hadError: "",
      hadSuccess: "",
      editID: ""
    };
  },
  methods: {
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.companies;
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetCompanies() {
      this.isRequesting = true;
      try {
        const result = await this.axios.get(`/companies/pages`);
        const res = result.data;
        this.companies = res.data;
      } catch (e) {
        this.hadError =
          "Não foi possível carregar as encomendas. Actualize a página.";
      }
      this.isRequesting = false
    }
  },
  created() {
    // Get customer orders
    this.GetCompanies();
  }
};
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
