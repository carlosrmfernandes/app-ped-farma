<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Patrocinador</h1>
      <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editSponsor"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="UpdateSponsor"
        v-show="!isEditable"
      >
        <span v-if="!isRequesting">salvar</span>
        <div class="loading-dots" v-if="isRequesting">
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
        </div>
      </b-button>
      <b-button
        variant="outline-danger"
        size="sm"
        class="float-right mr-2"
        @click="showRemoveModal"
      >Remover</b-button>
      <div class="alert alert-success col-md-10" v-if="hadSuccess" role="alert">
        {{hadSuccess}}
      </div>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
       <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Facebook</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.facebook')}"
             name="form.facebook"
             v-model="form.facebook"
             id="Sponsor-Facebook"
             placeholder="URL do Facebook"
             :disabled="isEditable"
             data-vv-as="Facebook" />
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
             :disabled="isEditable"
             data-vv-as="Instagram" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Twitter</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.twitter')}"
             name="form.twitter"
             v-model="form.twitter"
             id="Sponsor-Twitter"
             placeholder="URL do Twitter"
             :disabled="isEditable"
             data-vv-as="Twitter" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="sponsor-description">Descricao</label>
            <textarea type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.description')}"
             name="form.description"
             v-model="form.description"
             id="Sponsor-Description"
             placeholder="Descricao do Organizador"
             v-validate="'required'"
             :disabled="isEditable"
             data-vv-as="Descricao"
             rows="4" />
             <span v-show="errors.has('form.description')" class="help is-danger">{{ errors.first('form.description') }}</span>
          </div>
        </div>
      </div>
      <div class="row" v-for="(address, j) in addresses" :key="j">
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-province">Provincia</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.province')}"
              name="address.province"
              v-model="address.province"
              id="Organizer-Province"
              placeholder="Provincia"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="Provincia" />
              <span v-show="errors.has('address.province')" class="help is-danger">{{ errors.first('address.province') }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-municipality">Municipio</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.municipality')}"
              name="address.municipality"
              v-model="address.municipality"
              id="Organizer-Municipality"
              placeholder="Municipio"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="Municipio" />
              <span v-show="errors.has('address.municipality')" class="help is-danger">{{ errors.first('address.municipality') }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-address">Bairro</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.address')}"
              name="address.address"
              v-model="address.address"
              id="Organizer-Address"
              placeholder="Bairro"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="bairro" />
              <span v-show="errors.has('address.address')" class="help is-danger">{{ errors.first('address.address') }}</span>
            </div>
          </div>
          <div class="col-md-1 btns">
              <span class="addOrRemove">
                  <i class="fa fa-minus-circle" @click="removeAddress(j)" v-show="(j  || ( !j && addresses.length > 1)) && (j != addresses.length-1) "></i>
                  <i class="fa fa-plus-circle" @click="addNewAddress(j)" v-show="j == addresses.length-1"></i>
                  <b-button variant="success" size="sm" class="float-right" @click="addAddress" v-show="j == addresses.length-1">
                    <span v-if="!isRequestingAddress">Salvar</span>
                    <div class="loading-dots" v-if="isRequestingAddress">
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                    </div>
                </b-button>
              </span>
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
                :disabled="isEditable"
                data-vv-as="Email(s)" />
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'email')" v-show="(k  || ( !k && emails.length > 1)) && (k != emails.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'email')" v-show="k == emails.length-1"></i>
                </span>
            </div>
            <span v-show="errors.has('email.email')" class="help is-danger">{{ errors.first('email.email') }}</span>
              <b-button
                variant="success"
                size="sm"
                class="float-left"
                @click="addEmail"
              >
                <span v-if="!isRequestingEmail">Salvar</span>
                <div class="loading-dots" v-if="isRequestingEmail">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </b-button>
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
                :disabled="isEditable"
                data-vv-as="Telefone(s)" />
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'phone')" v-show="(k  || ( !k && telephones.length > 1)) && (k != telephones.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'phone')" v-show="k == telephones.length-1"></i>
                </span>
            </div>
                <span v-show="errors.has('telephone.phone_number')" class="help is-danger">{{ errors.first('telephone.phone_number') }}</span>
                <b-button
                  variant="success"
                  size="sm"
                  class="float-left"
                  @click="addTelephone"
                >
                <span v-if="!isRequestingTel">Salvar</span>
                <div class="loading-dots" v-if="isRequestingTel">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </b-button>
          </div>
        </div>
      </div>
      <div class="panel-footer">
      </div>
    </div>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Organizador">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="RemoveOrganizer">
            <span v-if="!isRequesting">Sim</span>
            <div class="loading-dots" v-if="isRequesting">
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
            </div>
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right mr-2"
            @click="hideRemoveModal"
          >Não</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { RemoveSponsors, add, remove, addNewAddress, removeAddress, addEmail, addTelephone, addAddress, getAddress, getEmail, getTelephone, rebuildArrayEmails, rebuildArrayTel, rebuildArrayAddress } from './helpers/functions.js'

export default {
  components: {
  },
  props: {
    id: {
      type: String
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      companies: [],
      isRequesting: false,
      isRequestingEmail: false,
      isRequestingTel: false,
      isRequestingAddress: false,
      isOrderSaved: false,
      hadError: '',
      hadSuccess: '',
      file: '',
      emails: [{
        email: ''
      }],
      telephones: [{
        phone_number: ''
      }],
      addresses: [{
        province: '',
        municipality: '',
        address: ''
      }]
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
      return result ? this.UpdateSponsor() : result
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetSponsor () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/sponsors/${this.id}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateCompany: This method will send form to serve, for update
     */
    async UpdateSponsor () {
      this.isRequesting = true
      try {
        const result = await this.axios.patch(`/sponsors/${this.id}`, this.form)

        if (result) {
          this.hadError = ''
          this.hadSuccess = 'Informações actualizadas com sucesso.'
        }
      } catch (e) {
        this.hadSuccess = ''
        this.hadError = 'Não foi possível realizar esta operação.'
      }
      this.isRequesting = false
      setTimeout(() => {
        this.hadSuccess = ''
      }, 5000)
    },
    SelectImage (file) {
      this.file = file
    },
    editSponsor () {
      this.isEditable = false
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    },
    add,
    remove,
    getEmail,
    addEmail,
    getAddress,
    addAddress,
    getTelephone,
    addTelephone,
    addNewAddress,
    removeAddress,
    RemoveSponsors,
    rebuildArrayTel,
    rebuildArrayEmails,
    rebuildArrayAddress
  },
  created () {
    this.GetSponsor()
    this.getEmail()
    this.getTelephone()
    this.getAddress()
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
.float-right{
  margin-left: 10px;
}
.btns{
  display: flex;
  margin-top: 40px;
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
