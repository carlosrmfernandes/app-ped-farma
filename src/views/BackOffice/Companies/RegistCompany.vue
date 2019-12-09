<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Nova Empresa</h1>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="organizer-name"
             placeholder="Nome da Empresa"
             v-validate="'required'"
             data-vv-as="Nome da Empresa" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <UploadPhoto
          :defaultImage="form.logo"
          :OnChange="SelectImage"
          width="140px"
          height="185px"
          title="Logo"
        />
      </div>
      <div class="panel-footer">
        <b-button
        variant="primary"
        size="lg"
        class="float-right"
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
</template>
<script>
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    UploadPhoto
  },
  data () {
    return {
      form: {},
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
      return result ? this.RegistOrganizer() : result
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async RegistOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.post('/companies', this.form)
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
            // Redirect to the Organizer views
            this.$router.push({ name: 'ListOrganizer' })
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
    SelectImage (file) {
      this.file = file
    }
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
