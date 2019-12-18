<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Registar Produto</h3>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
       <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Empresa</label>
            <select class="custom-select" v-model="form.company_id" @change="onChange()">
              <option disabled value="">Choose...</option>
              <option
                :value="company.id"
                v-for="(company, index) of companies"
                :key="index"
              >{{company.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="event-name">Nome do Produto</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Product-name"
             placeholder="Ex: Blue, Coca-Cola"
             v-validate="'required'"
             data-vv-as="Nome do Produto" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
         <div class="col-md-2 mt-4">
          <div class="form-group">
            <UploadPhoto
              :defaultImage="form.image"
              :OnChange="SelectImage"
              :disabled="isEditable"
              width="140px"
              height="180px"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1" >
          <div class="form-group">
            <b-button variant="primary"
            size="sm"
            class="float-left mt-6"
            :disabled="isRequesting ? true : false"
            @click="ProcessForm">
            <span v-if="!isRequesting"> Registar</span>
              <div class="loading-dots" v-if="isRequesting">
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
              </div>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    UploadPhoto
  },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      form: {
        company_id: ''
      },
      hadError: '',
      isRequesting: false,
      file: '',
      companies: [],
      company_id: ''
    }
  },
  methods: {
    /*
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async ProcessForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.RegistProduct() : result
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async RegistProduct () {
      this.isRequesting = true

      try {
        let formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('company_id', this.company_id)
        formData.append('image', this.file)

        // eslint-disable-next-line no-const-assign
        const res = await this.axios({
          url: `/companies/${this.company_id}/company_products`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData
        })

        if (res) {
          // Redirect to the Organizer views
          this.$router.push({ name: 'ListProduct' })
        }

        this.file = ''
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    SelectImage (file) {
      this.file = file
    },
    onChange () {
      this.company_id = this.form.company_id
    },
    async allCompanies () {
      try {
        const result = await this.axios.get(`/companies/pages`)
        const res = result.data
        this.companies = res.data
      } catch (e) {
        this.hadError =
            'Não foi possível carregar as encomendas. Actualize a página.'
      }
    }

  },
  created () {
    this.allCompanies()
  }
}
</script>
<style scoped>

.form-address {
    display: flex;
    flex-direction: column;
}

.mt-6{
  margin-top: 2.2rem !important;
}

</style>
