<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Novo Patrocinador</h1>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Empresa</label>
            <select class="custom-select" v-model="form.company_id">
                <option selected>Choose...</option>
                <option :value="company.id" v-for="(company, index) of companies" :key="index" >{{company.name}}</option>
            </select>
            <!-- <input type="text" class="form-control" v-model="form.email" id="Sponsor-name" placeholder="Nome do organizador" /> -->
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Email</label>
            <input type="text" class="form-control" v-model="form.email" id="Sponsor-name" placeholder="Email" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Facebook</label>
            <input type="text" class="form-control" v-model="form.facebook_url" id="Sponsor-name" placeholder="URL do Facebook" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Instagram</label>
            <input type="text" class="form-control" v-model="form.instagram_url" id="Sponsor-name" placeholder="URL do Instagram" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Twitter</label>
            <input type="text" class="form-control" v-model="form.twitter_url" id="Sponsor-name" placeholder="URL do Twitter" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Telefone</label>
            <input type="text" class="form-control" v-model="form.phone_number" id="Sponsor-name" placeholder="999 999 999" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for>Detalhes</label>
            <div class="form-group">
              <textarea class="form-control" rows="4" placeholder="Descrição do evento" v-model="form.description"></textarea>
            </div>
          </div>
        </div>
        <!-- <NextInput placeholder="Telefone, Email, Facebook, Instagram" /> -->
      </div>
      <div class="row flex">
          <Address></Address>
      </div>
      <div class="row">
        <UploadPhoto
          :defaultImage="form.logo"
          :OnChange="SelectImage"
          width="140px"
          height="185px"
        />
      </div>
      <div class="panel-footer">
        <b-button
        variant="primary"
        size="lg"
        class="float-right"
        :disabled="isRequesting ? true : false"
        @click="RegistSponsor">
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
</template>
<script>
// import NextInput from '@/components/Form/NextInput'
import Address from '@/components/Form/Address'
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    Address,
    UploadPhoto
  },
  data () {
    return {
      form: {},
      companies: [],
      isRequesting: false,
      hadSuccess: false,
      isOrderSaved: false,
      hadError: '',
      file: ''
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
      return result ? this.RegistSponsor() : result
    },
    /*
     *  RegistSponsor: This method will create a post request to regist a
     *  new Sponsor and then redirect to the ListSponsor component.
     */
    async RegistSponsor () {
      this.isRequesting = true
      try {
        const result = await this.axios.post('/sponsors', this.form)
        if (result) {
          // Create a new form data object
          const fData = new FormData()
          fData.append('logo', this.file)
          // Fire the PUT request
          const res = await this.axios({
            url: `/companies/${result.data['id']}/company_logos`,
            method: 'put',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: fData
          })
          this.file = ''

          if (res) {
            // Redirect to the Sponsor views
            this.$router.push({ name: 'ListSponsor' })
          }
        }
        this.hadSuccess = true
        this.isOrderSaved = true
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
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
    },
    SelectImage (file) {
      this.file = file
    }
  },
  created () {
    this.allCompanies()
  }
}
</script>
<style lang="scss" scoped>
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

</style>
