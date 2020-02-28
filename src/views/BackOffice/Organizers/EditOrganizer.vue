<template>
  <div class="panel">
    <div class="panel-body">
      <div class="row body-above">
        <div class="body-above-start">
            <div class="organizer-photo-name">
              <div class="organizer-photo">
                <img :src="'https://box.nextbss.co.ao/api/company_logos/' + form.company_logo" style="max-width: 100%">
              </div>
              <div class="organizer-text">
                <div class="organizer-name-box">
                  <h6>{{ form.name }}</h6>
                </div>
                <div class="organizer-description">
                  <p>{{ form.description }}</p>
                </div>
              </div>
            </div>
            <div class="organizer-stars">
                <!-- Stars Code-->
            </div>
        </div>
        <div class="body-above-end">
            <div class="organizer-social-networks">
                <div class="organizer-social-networks-box">
                  <a :href="form.twitter ? form.twitter : ''" >
                    <div class="twitter_color" :style="{ opacity: form.twitter ? '1' : styleOpacity }">
                      <img src="../../../assets/images/social-networks/twitter.png" style="max-width: 100%">
                    </div>
                  </a>
                  <a :href="form.facebook ? form.facebook : ''" >
                    <div class="facebook_color" :style="{ opacity: form.facebook ? '1' :  styleOpacity }">
                      <img src="../../../assets/images/social-networks/facebook.png" style="max-width: 100%">
                    </div>
                  </a>
                  <a :href="form.instagram ? form.instagram : ''" >
                    <div class="instagram_color" :style="{ opacity: form.instagram ? '1' : styleOpacity }">
                      <img src="../../../assets/images/social-networks/instagram.png" style="max-width: 100%">
                    </div>
                  </a>
                  <div class="edit-btn">
                    <span @click="showUpdateOrganizerModal">Editar</span>
                  </div>
                </div>
            </div>
            <div class="organizer-stats">
                <div class="organizer-stats-box">
                  <div class="organizer-stats-box-left">
                    <h6> {{ totalActiveEvents }}</h6>
                    <h6>Eventos Ativos</h6>
                  </div>
                  <div class="organizer-stats-box-center">
                    <h6>{{ totalPastEvents }}</h6>
                    <h6>Eventos Passados</h6>
                  </div>
                  <div class="organizer-stats-box-right">
                    <h6>{{ totalSuppliers }}</h6>
                    <h6>Operadores</h6>
                  </div>
                </div>
            </div>
        </div>
      </div>
       <div class="row body-center">
          <div class="body-center-box">
            <div class="body-center-box-head">
              <div class="head-box-left-side">
                <span>Emails</span>
              </div>
              <div class="head-box-right-side">
                <b-button
                variant="success"
                size="sm"
                class="float-left btn-sm-new"
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
            <div class="body-center-box-body">
              <div class="body-center-box-body-inputs">
                  <div class="form-group" >
                    <div class="col-md-12 input-borders" v-for="(email,k) in emails" :key="k">
                      <input type="text"
                      :class="{'form-control': true, 'is-input-danger': errors.has('email.email')}"
                      name="email.email"
                      placeholder="example@examples.com"
                      v-model="email.email"
                      v-validate="'email'"
                      data-vv-as="Email(s)"/>
                      <span class="addOrRemove">
                          <i class="fa fa-minus-circle" @click="remove(k,'email')" v-show="(k  || ( !k && emails.length > 1)) && (k != emails.length-1) "></i>
                          <i class="fa fa-plus-circle" @click="add(k,'email')" v-show="k == emails.length-1"></i>
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="body-center-box">
            <div class="body-center-box-head">
              <div class="head-box-left-side">
                <span>Telefones</span>
              </div>
              <div class="head-box-right-side">
                <b-button
                    variant="success"
                    size="sm"
                    class="float-left btn-sm-new"
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
            <div class="body-center-box-body">
              <div class="body-center-box-body-inputs">
                <div class="form-group" >
                  <div class="col-md-12 input-borders" v-for="(telephone,k) in telephones" :key="k">
                    <input type="text"
                    :class="{'form-control': true, 'is-input-danger': errors.has('telephone.phone_number')}"
                    name="telephone.phone_number"
                    placeholder="+244 999000444"
                    v-model="telephone.phone_number"
                    data-vv-as="Telefone(s)" />
                    <span class="addOrRemove">
                        <i class="fa fa-minus-circle" @click="remove(k,'phone')" v-show="(k  || ( !k && telephones.length > 1)) && (k != telephones.length-1) "></i>
                        <i class="fa fa-plus-circle" @click="add(k,'phone')" v-show="k == telephones.length-1"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="body-center-box">
            <div class="body-center-box-head">
            <div class="head-box-left-side">
                <span>Endereços</span>
              </div>
              <div class="head-box-right-side">
                <b-button variant="success" size="sm" class="float-right btn-sm-new" @click="addAddress" >
                  <span v-if="!isRequestingAddress">Salvar</span>
                  <div class="loading-dots" v-if="isRequestingAddress">
                    <div class="loading-dots--dot"></div>
                    <div class="loading-dots--dot"></div>
                    <div class="loading-dots--dot"></div>
                  </div>
                </b-button>
              </div>
            </div>
            <div class="body-center-box-body">
              <div class="row input-borders" v-for="(address, j) in addresses" :key="j">
                <input type="text"
                  :class="{'form-control': true, 'is-input-danger': errors.has('address.province'), 'form-input-address' : true}"
                  name="address.province"
                  v-model="address.province"
                  id="Organizer-Province"
                  placeholder="Provincia"
                  v-validate="'required'"
                  data-vv-as="Provincia"
                 />
                <span v-show="errors.has('address.province')" class="help is-danger">{{ errors.first('address.province') }}</span>
                <input type="text"
                  :class="{'form-control': true, 'is-input-danger': errors.has('address.municipality'), 'form-input-address' : true}"
                  name="address.municipality"
                  v-model="address.municipality"
                  id="Organizer-Municipality"
                  placeholder="Municipio"
                  v-validate="'required'"
                  data-vv-as="Municipio"
                />
                <span v-show="errors.has('address.municipality')" class="help is-danger">{{ errors.first('address.municipality') }}</span>
                <input type="text"
                  :class="{'form-control': true, 'is-input-danger': errors.has('address.address'), 'form-input-address' : true}"
                  name="address.address"
                  v-model="address.address"
                  id="Organizer-Address"
                  placeholder="Bairro"
                  v-validate="'required'"
                  data-vv-as="bairro"
                />
                <span v-show="errors.has('address.address')" class="help is-danger">{{ errors.first('address.address') }}</span>
                <div>
                  <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="removeAddress(j)" v-show="(j  || ( !j && addresses.length > 1)) && (j != addresses.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="addNewAddress(j)" v-show="j == addresses.length-1"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
       </div>
       <div class="body-bottom">
         <div class="body-bottom-left">
           <div class="body-center-box-head">
              <div class="head-box-left-side">
                <span>Operadores</span>
              </div>
              <div class="head-box-right-side">
                  <span class="add-text" @click="showAddSupplierModal">Add</span>
              </div>
            </div>
            <div class="body-center-box-body">
              <MiniTable
                :cols="colsSuppliers"
                :data="organizerSuppliers"
                :pagination="pagination"
                :paginationMethod="getOrganizerSuppliers"
                :sortMethod="getOrganizerSuppliers"
                :changePage="changePage"
                resource="supplier"
                editRoute="EditSupplier"
                title="Operadores"
                :canRemove="false"
              />
            </div>
         </div>
         <div class="body-bottom-right">
            <div class="body-center-box-head">
              <div class="head-box-left-side">
                <span>Eventos</span>
              </div>
              <div class="head-box-right-side">
                <!-- <b-button
                    variant="primary"
                    size="sm"
                    class="float-left"
                    @click="addTelephone"
                    :disabled="true"
                  >
                  <span v-if="!isRequestingTel">Add</span>
                </b-button> -->
              </div>
            </div>
            <div class="body-center-box-body">
              <MiniTable
                :cols="colsEvents"
                :data="organizerEvents"
                :pagination="pagination"
                :paginationMethod="getOrganizersEvents"
                :sortMethod="getOrganizersEvents"
                :changePage="changePage"
                resource="events"
                editRoute="DetailsEvent"
                title="Eventos"
                :canRemove="false"
              />
            </div>
         </div>
       </div>
    </div>
    <!-- Add Supplier Modal-->
    <b-modal id="modal-add-supplier" title="Novo Operador" size='lg'>
      <div class="row">
        <div class="col-md-6" >
          <div class="form-group">
            <label for="supplier-name">Nome do Operador</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('supplier.name')}"
             name="form.name"
             v-model="supplier.name"
             id="Supplier-name"
             placeholder="Ex: Winderson Santos"
             v-validate="'required'"
             data-vv-as="Nome do Operador" />
             <span v-show="errors.has('supplier.name')" class="help is-danger">{{ errors.first('supplier.name') }}</span>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-password">Senha</label>
            <input type="password"
             :class="{'form-control': true, 'is-input-danger': errors.has('supplier.password')}"
             name="supplier.password"
             v-model="supplier.password"
             id="Supplier-password"
             placeholder="*************"
             v-validate="'required|numeric|min:6|max:6'"
             data-vv-as="Senha" />
             <span v-show="errors.has('supplier.password')" class="help is-danger">{{ errors.first('supplier.password') }}</span>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="success" size="sm" class="float-right" @click="registOrganizerSupplier">
            <span>Registar</span>
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- Update Organizer Modal-->
    <b-modal id="modal-update-organizer" title="Editar Organizador" size='xl'>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="event-name">Facebook</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.facebook')}"
             name="form.facebook"
             v-model="form.facebook"
             id="Organizer-Facebook"
             placeholder="URL do Facebook"
             data-vv-as="Facebook" />
             <span v-show="errors.has('form.facebook')" class="help is-danger">{{ errors.first('form.facebook') }}</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="event-name">Instagram</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.instagram')}"
             name="form.instagram"
             v-model="form.instagram"
             id="Organizer-Instagram"
             placeholder="URL do Instagram"
             data-vv-as="Instagram" />
             <span v-show="errors.has('form.instagram')" class="help is-danger">{{ errors.first('form.instagram') }}</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="event-name">Twitter</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.twitter')}"
             name="form.twitter"
             v-model="form.twitter"
             id="Organizer-Twitter"
             placeholder="URL do Twitter"
             data-vv-as="Twitter" />
             <span v-show="errors.has('form.twitter')" class="help is-danger">{{ errors.first('form.twitter') }}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="organizer-description">Descrição</label>
            <textarea type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.description')}"
             name="form.description"
             v-model="form.description"
             id="Organizer-Description"
             placeholder="Descricao do Organizador"
             data-vv-as="Descricao"
             rows="4" />
             <span v-show="errors.has('form.description')" class="help is-danger">{{ errors.first('form.description') }}</span>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="success" size="sm" class="float-right" @click="processForm">
            <span>Atualizar</span>
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { removeOrganizer, add, remove, addNewAddress, removeAddress, addEmail, addTelephone, addAddress, getAddress, getEmail, getTelephone, rebuildArrayEmails, rebuildArrayTel, rebuildArrayAddress, getTotalActiveEvents, getTotalPastEvents, getTotalSuppliers } from './helpers/functions.js'
import { RemoveSupplier, GetSuppliers, changePage, removeMostSuppliers } from '../Suppliers/helpers/functions.js'
import { getOrganizerSuppliers, registOrganizerSupplier } from './helpers/suppliers.js'
import { getOrganizersEvents } from './helpers/events.js'

import MiniTable from '@/components/Layouts/MiniTable'

export default {
  components: {
    MiniTable
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
      supplier: {},
      companies: [],
      isRequesting: false,
      isRequestingEmail: false,
      isRequestingTel: false,
      isRequestingAddress: false,
      isOrderSaved: false,
      hadError: '',
      hadSuccess: '',
      file: '',
      emails: [],
      telephones: [],
      addresses: [],
      styleOpacity: '0.5',
      colsSuppliers: [
        { name: 'name', label: 'Nome' },
        { name: 'username', label: 'Nome de Usuario' }
      ],
      colsEvents: [
        { name: 'title', label: 'Titulo' },
        { name: 'status', label: 'Status' },
        { name: 'type', label: 'Tipo' },
        { name: 'starts_at', label: 'Data' },
        { name: 'created_at', label: 'Criado Em' }
      ],
      organizerSuppliers: [],
      organizerEvents: [],
      pagination: {
        perPage: 10,
        pageable: { pageNumber: 1 }
      },
      totalActiveEvents: 0,
      totalPastEvents: 0,
      totalSuppliers: 0
    }
  },
  methods: {
    /*
     *  processForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async processForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.updateOrganizer() : result
    },
    /**
     * getOrganizer: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/organizers/${this.id}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateOraganizer: This method will send form to serve, for update
     */
    async updateOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.patch(`/organizers/${this.id}`, this.form)
        this.file = ''

        if (result) {
          // Hide Modal and get getOrganizerSuppliers
          this.hideUpdateOrganizerModal()
          this.getOrganizer()
        }
      } catch (e) {
        this.hadSuccess = ''
        this.hadError = 'Não foi possível realizar esta operação.'
      }
      this.isRequesting = false
      setTimeout(() => {
        this.hadSuccess = ''
      }, 500)
    },
    SelectImage (file) {
      this.file = file
    },
    editOrganizer () {
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
    showAddSupplierModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-add-supplier')
    },
    hideAddSupplierModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-add-supplier')
    },
    showUpdateOrganizerModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-update-organizer')
    },
    hideUpdateOrganizerModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-update-organizer')
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
    removeOrganizer,
    rebuildArrayTel,
    getTotalSuppliers,
    getTotalPastEvents,
    rebuildArrayEmails,
    rebuildArrayAddress,
    getTotalActiveEvents,
    /* Suppliers Methods */
    changePage,
    GetSuppliers,
    RemoveSupplier,
    removeMostSuppliers,
    getOrganizerSuppliers,
    registOrganizerSupplier,
    /* Events Methods */
    getOrganizersEvents

  },
  created () {
    this.getOrganizer()
    this.getEmail()
    this.getTelephone()
    this.getAddress()
    this.getOrganizerSuppliers()
    this.getOrganizersEvents()
    this.getTotalActiveEvents()
    this.getTotalPastEvents()
    this.getTotalSuppliers()
  }
}
</script>
<style lang="scss" scoped>

.panel {
  padding: 20px;
}
.panel-header {
  top: 0px;
  width: 100%;
  height: 15%;
}
.panel-body {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
}
span{
  font-size: 13px;
}

/* Start Body Above Styles*/
.panel-body .body-above {
  width: 100%;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
}

.body-above-start{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff;
}

.body-above-end{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  align-items: stretch;
  background-color: #fff;
}

.organizer-photo-name{
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
}

.organizer-photo{
  width: 160px;
  height: 170px;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 2px;
}

.organizer-text{
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.organizer-name-box{
  padding: 5px;
  display: flex;
}

.organizer-description{
  height: 100%;
  padding: 5px;
  padding-left: 35px;
  display: flex;
  width: 500px;
}

.organizer-description p{
  word-break: break-all;
  font-size: 0.8rem;
}

.organizer-name-box h6{
  margin-left: 30px;
}

.organizer-stars{
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 715px;
}

.organizer-social-networks{
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-grow: 1;
}

.organizer-social-networks-box{
  border-radius: 4px;
  width: 70%;
  height: 70px;
  display: flex;
  align-items: flex-end;
}

$twitter_color: #55acee;
$facebook_color: #3b5998;
$instagram_color: #3f729b;

.twitter_color { background: $twitter_color; }
.facebook_color { background: $facebook_color; }
.instagram_color { background: $instagram_color; }

$size: 35px;

.edit-btn{
  display: flex;
  align-items: flex-end;
  padding-left: 10px;
}

.edit-btn span{
  font-weight: 500;
  cursor: pointer;
}

.organizer-social-networks-box div {
  height: $size;
  width: $size;
  border-radius: 50%;
  margin: 5px;
  float: left;
  display: flex;
  justify-content: flex-start
}

.organizer-stats{
  padding: 20px;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.organizer-stats-box{
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  width: 50%;
  height: 100px;
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.organizer-stats-box-left{
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.organizer-stats-box-center{
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.organizer-stats-box-right{
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* End of Body Above Styles*/

/* Start Body Center Styles*/
.panel-body .body-center {
  width: 100%;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;
}

.body-center-box {
  height: 230px;
  width: 20%;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 10px;
  background-color: #fff;
}

.body-center .body-center-box:last-child{
  height: 230px;
  flex-grow: 1;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 0px;
  background-color: #fff;
}

.body-center-box-head{
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #C3C7D9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.head-box-left-side{
  display: flex;
  width: 50%;
  height: 40px;
  padding-left: 5px;
  align-items: center
}
.head-box-right-side{
  display: flex;
  width: 50%;
  justify-content: flex-end;
  padding-right: 5px;
}
.head-box-right-side .add-text{
  cursor: pointer;
  font-weight: 500;
}

.body-center-box-body-inputs{
  width: 100%;
}

.col-md-12.input-borders{
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #C3C7D9;
  display: flex;
  flex-wrap: nowrap;
}

.row.input-borders{
  width: 100%;
  padding-top: 8px;
  border-bottom: 1px solid #C3C7D9;
  display: flex;
  flex-wrap: nowrap;
}
.body-center-box-body{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 5px;
  padding-top: 10px;
}

.body-center .body-center-box:last-child .body-center-box-body{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/*End Body Center Styles*/

/*Start of Body Bottom Styles*/

.body-bottom{
  width: 100%;
  border-radius: 4px;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;
}

.body-bottom-left{
  height: 260px;
  width: 40.5%;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 10px;
  background-color: #fff;
}

.body-bottom-right{
  height: 260px;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fff;
}

/*End Body Bottom Styles*/
.add-input{
  display: flex;
}

.form-input-address{
  width: 32%;
  margin-top: 0;
  margin-right: 2px;
  margin-left: 2px;
  margin-bottom: 8px;
}

.form-group .addOrRemove{
  padding: 5px;
  padding-top: 8px;
  padding-right: 0;
}

.body-center .body-center-box:last-child .body-center-box-body span i{
  margin-top: 12px;
  margin-right: 15px;
}

.float-right{
  margin-left: 10px;
}
.btns{
  display: flex;
  margin-top: 20px;
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
