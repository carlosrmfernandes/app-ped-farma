<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Novo Patrocinador</h1>
    </div>
    <div class="panel-body">
     <div class="row">
       <div class="col-md-3" v-if="existCompany">
          <div class="form-group">
            <label for="event-name">Empresa</label>
            <select class="custom-select" v-model="form.company_id">
              <option selected>Choose...</option>
              <option
                :value="company.id"
                v-for="(company, index) of companies"
                :key="index"
              >{{company.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3" v-if="!existCompany">
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Sponsor-name"
             placeholder="Nome do Patrocinador"
             v-validate="'required'"
             data-vv-as="Nome do Patrocinador" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Facebook</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.facebook')}"
             name="form.facebook"
             v-model="form.facebook_url"
             id="Sponsor-Facebook"
             placeholder="URL do Facebook"
             data-vv-as="Facebook" />
             <span v-show="errors.has('form.facebook')" class="help is-danger">{{ errors.first('form.facebook') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Instagram</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.instagram')}"
             name="form.instagram"
             v-model="form.instagram"
             id="Sponsor-Instagram"
             placeholder="URL do Instagram"
             data-vv-as="Instagram" />
             <span v-show="errors.has('form.instagram')" class="help is-danger">{{ errors.first('form.instagram') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Twitter</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.twitter')}"
             name="form.twitter"
             v-model="form.twitter_url"
             id="Sponsor-Twitter"
             placeholder="URL do Twitter"
             data-vv-as="Twitter" />
             <span v-show="errors.has('form.twitter')" class="help is-danger">{{ errors.first('form.twitter') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="organizer-province">Provincia</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.province')}"
             name="form.province"
             v-model="form.province"
             id="Organizer-Province"
             placeholder="Provincia"
             v-validate="'required'"
             data-vv-as="Provincia" />
             <span v-show="errors.has('form.province')" class="help is-danger">{{ errors.first('form.province') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="organizer-municipality">Municipio</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.municipality')}"
             name="form.municipality"
             v-model="form.municipality"
             id="Organizer-Municipality"
             placeholder="Municipio"
             v-validate="'required'"
             data-vv-as="Municipio" />
             <span v-show="errors.has('form.municipality')" class="help is-danger">{{ errors.first('form.municipality') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="organizer-address">Bairro</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.address')}"
             name="form.address"
             v-model="form.address"
             id="Organizer-Address"
             placeholder="Bairro"
             v-validate="'required'"
             data-vv-as="bairro" />
             <span v-show="errors.has('form.address')" class="help is-danger">{{ errors.first('form.address') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="organizer-description">Descricao</label>
            <textarea type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.description')}"
             name="form.description"
             v-model="form.description"
             id="Sponsor-Description"
             placeholder="Descricao do Organizador"
             v-validate="'required'"
             data-vv-as="Descricao" />
             <span v-show="errors.has('form.description')" class="help is-danger">{{ errors.first('form.description') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" >
            <label for="">Email</label>
            <div class="form-group" >
              <div class="col-md-12" v-for="(email,k) in emails" :key="k">
                <input type="text"
                :class="{'form-control': true, 'is-input-danger': errors.has('email.email')}"
                id="Sponsor-email"
                name="email.email"
                placeholder="Email(s) de Contacto"
                v-model="email.email"
                v-validate="'required'"
                data-vv-as="Email(s)" />
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'email')" v-show="(k  || ( !k && emails.length > 1)) && (k != emails.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'email')" v-show="k == emails.length-1"></i>
                </span>
            </div>
                <span v-show="errors.has('email.email')" class="help is-danger">{{ errors.first('email.email') }}</span>
          </div>
        </div>
        <div class="col-md-3" >
            <label for="">Telefone</label>
            <div class="form-group" >
              <div class="col-md-12" v-for="(telephone,k) in telephones" :key="k">
                <input type="text"
                :class="{'form-control': true, 'is-input-danger': errors.has('telephone.phone_number')}"
                id="Sponsor-Telephone"
                name="telephone.phone_number"
                placeholder="Telefone(s) de Contacto"
                v-model="telephone.phone_number"
                v-validate="'required'"
                data-vv-as="Telefone(s)" />
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'phone')" v-show="(k  || ( !k && telephones.length > 1)) && (k != telephones.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'phone')" v-show="k == telephones.length-1"></i>
                </span>
            </div>
                <span v-show="errors.has('telephone.phone_number')" class="help is-danger">{{ errors.first('telephone.phone_number') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <UploadPhoto
          :defaultImage="form.file"
          :OnChange="SelectImage"
          width="140px"
          height="185px"
          v-if="!existCompany"
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
    <!-- Remove Modal-->
    <b-modal id="modal-company-existence" title="NOVO PATROCINADOR!">
      <p class="my-4">Este Patrocinador pertecence a uma entidade cadastrada?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="lg" class="float-right" @click="yesBelongs">
            <span v-if="!isRequesting">Sim</span>
          </b-button>
          <b-button
            variant="outline-danger"
            size="lg"
            class="float-right mr-2"
            @click="noBelongs"
          >Não</b-button>
        </div>
      </template>
    </b-modal>
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
      companies: [],
      isRequesting: false,
      hadSuccess: false,
      isOrderSaved: false,
      hadError: '',
      file: '',
      emails: [{
        email: ''
      }],
      telephones: [{
        phone_number: ''
      }],
      existCompany: false
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
    showModalExistence () {
      // Show modal for deatils
      this.$bvModal.show('modal-company-existence')
    },
    add (index, type) {
      if (type === 'email') {
        this.emails.push({ name: '' })
      } else if (type === 'phone') {
        this.telephones.push({ name: '' })
      }
    },
    remove (index, type) {
      if (type === 'email') {
        this.emails.splice(index, 1)
      } else if (type === 'phone') {
        this.telephones.splice(index, 1)
      }
    },
    yesBelongs () {
      this.existCompany = true
      this.$bvModal.hide('modal-company-existence')
    },
    noBelongs () {
      this.$bvModal.hide('modal-company-existence')
    },
    /*
     *  RegistSponsor: This method will create a post request to regist a
     *  new Sponsor and then redirect to the ListSponsor component.
     */
    async RegistSponsor () {
      this.isRequesting = true
      try {
        let formData = new FormData()
        // formData.append('company_id', this.form.company_id)
        formData.append('description', this.form.description)
        formData.append('facebookURL', this.form.facebook_url)
        formData.append('instagramURL', this.form.instagram_url)
        formData.append('twitterURL', this.form.twitter_url)
        formData.append('file', this.file)
        formData.append('phoneNumber', this.telephones[0].phone_number)
        formData.append('email', this.emails[0].email)

        const result = await this.axios({
          url: `/sponsors`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData
        })

        if (this.telephones.length > 1) {
          // Send requisition to OrganizerTelephone Endpoint
        }

        if (this.emails.length > 1) {
          // Send requisition to OrganizerEmail Endpoint
        }

        if (result) {
          // Redirect to the Sponsor views
          this.$router.push({ name: 'ListSponsor' })
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
  mounted: function () {
    this.showModalExistence()
  },
  created () {
    this.telephones.push(
      { phone_number: 888999000 },
      { phone_number: 888999111 },
      { phone_number: 888999222 },
      { phone_number: 888999333 }
    )
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

.add-input{
    display: flex;
}

.form-group .addOrRemove{
    padding: 5px;
    padding-top: 8px;
    padding-right: 0;
}

@media (min-width: 768px){
  .col-md-12 {
      flex: 0 0 100%;
      max-width: 100%;
      display: flex;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 20px;
  }
}
</style>
