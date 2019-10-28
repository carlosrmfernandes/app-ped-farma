<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Novo Organizador</h1>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text" class="form-control" v-model="form.name" id="organizer-name" placeholder="Nome do organizador" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for>Detalhes</label>
            <div class="form-group">
              <textarea class="form-control" rows="4" placeholder="Descrição do evento"></textarea>
            </div>
          </div>
        </div>
        <NextInput placeholder="Telefone, Email, Facebook, Instagram" />
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
        <button type="submit" class="btn btn-primary float-right ml-2" @click="RegistOrganizer()">Registar</button>
      </div>
    </div>
  </div>
</template>
<script>
import NextInput from '@/components/Form/NextInput'
import Address from '@/components/Form/Address'
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    NextInput,
    Address,
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
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async RegistOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.post('/companies', this.form)
        console.log(result)
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
<style scoped>
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
