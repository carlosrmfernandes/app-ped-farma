<template>
  <div class="panel">
    <!-- <div class="panel-header">
      <h1>Editar Organizador</h1>
    </div> -->
    <div class="panel-body">
      <div class="row body-above">
        <div class="body-above-start">
            <div class="organizer-photo-name">
              <div class="organizer-photo">
                <img :src="'https://box.nextbss.co.ao/api/company_logos/' + form.company_logo" style="max-width: 100%">
              </div>
              <div class="organizer-text">
                <div class="organizer-name-box">
                  <h3>{{ form.name }}</h3>
                </div>
                <div class="organizer-description">
                  <p>{{ form.description }}</p>
                </div>
              </div>
            </div>
            <div class="organizer-stars">

            </div>
        </div>
        <div class="body-above-end">
            <div class="organizer-social-networks">
                <div class="organizer-social-networks-box">
                  <div class="twitter_color" :style="{ opacity: styleOpacity }">
                    <img src="../../../assets/images/social-networks/twitter.png" style="max-width: 100%">
                  </div>
                  <div class="facebook_color" :style="{ opacity: styleOpacity }">
                    <img src="../../../assets/images/social-networks/facebook.png" style="max-width: 100%">
                  </div>
                  <div class="instagram_color" :style="{ opacity: styleOpacity }">
                    <img src="../../../assets/images/social-networks/instagram.png" style="max-width: 100%">
                  </div>
                </div>
            </div>
            <div class="organizer-stats">
                <div class="organizer-stats-box">
                  <div class="organizer-stats-box-left">
                    <h4>13</h4>
                    <h6>Eventos Ativos</h6>
                  </div>
                  <div class="organizer-stats-box-center">
                    <h4>20</h4>
                    <h6>Eventos Passados</h6>
                  </div>
                  <div class="organizer-stats-box-right">
                    <h4>30</h4>
                    <h6>Operadores</h6>
                  </div>
                </div>
            </div>
        </div>
      </div>
       <div class="row body-center">
          <div class="body-center-box">
            <div class="body-center-box-head">

            </div>
            <div class="body-center-box-body">

            </div>
          </div>
          <div class="body-center-box">
            <div class="body-center-box-head">

            </div>
            <div class="body-center-box-body">

            </div>
          </div>
          <div class="body-center-box">
            <div class="body-center-box-head">

            </div>
            <div class="body-center-box-body">

            </div>
          </div>
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
import { RemoveOrganizer, add, remove, addNewAddress, removeAddress, addEmail, addTelephone, addAddress, getAddress, getEmail, getTelephone, rebuildArrayEmails, rebuildArrayTel, rebuildArrayAddress } from './helpers/functions.js'

export default {
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
      }],
      styleOpacity: '0.5'
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
      return result ? this.UpdateOrganizer() : result
    },
    /**
     * GetOrganizer: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetOrganizer () {
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
    async UpdateOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.patch(`/organizers/${this.id}`, this.form)
        this.file = ''

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
    RemoveOrganizer,
    rebuildArrayTel,
    rebuildArrayEmails,
    rebuildArrayAddress
  },
  created () {
    this.GetOrganizer()
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.panel-body .body-above {
  width: 100%;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
}

.body-above-start{
  // border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.body-above-end{
  // border: 1px solid green;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  align-items: stretch;
}

.organizer-photo-name{
  // border: 1px solid black;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
}

.organizer-photo{
  width: 180px;
  height: 200px;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}

.organizer-text{
  // border: 1px solid black;
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.organizer-name-box{
  // border: 1px solid black;
  padding: 5px;
  display: flex;
}

.organizer-description{
  // border: 1px solid black;
  height: 100%;
  padding: 5px;
  padding-left: 35px;
  display: flex;
  width: 500px;
}

.organizer-description p{
  word-break: break-all;
}

.organizer-name-box h3{
  margin-left: 30px;
}

.organizer-stars{
  // border: 1px solid black;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  // flex-grow: 1;
  width: 715px;
}

.organizer-social-networks{
  // border: 1px solid black;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-grow: 1;
}

.organizer-social-networks-box{
  // border: 1px solid #C3C7D9;
  border-radius: 4px;
  width: 70%;
  height: 70px;
}

$twitter_color: #55acee;
$facebook_color: #3b5998;
$instagram_color: #3f729b;

.twitter_color { background: $twitter_color; }
.facebook_color { background: $facebook_color; }
.instagram_color { background: $instagram_color; }

$size: 60px;

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
  // border: 1px solid black;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.organizer-stats-box{
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  width: 70%;
  height: 130px;
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.organizer-stats-box-left{
  flex-grow: 1;
  // border: 1px solid #C3C7D9;
  // border-radius: 4px;
  border-bottom: 1px solid #308acf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.organizer-stats-box-center{
  flex-grow: 1;
  // border: 1px solid #C3C7D9;
  // border-radius: 4px;
  border-bottom: 1px solid rgba(243, 56, 56, 0.911);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.organizer-stats-box-right{
  flex-grow: 1;
  // border: 1px solid #C3C7D9;
  // border-radius: 4px;
  border-bottom: 1px solid rgb(96, 219, 71);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* End of Body Above Styles*/

/* Start Body Center Styles*/
.panel-body .body-center {
  width: 100%;
  // border: 1px solid #000;
  // border-radius: 4px;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 50px;
}

.body-center-box {
  height: 400px;
  width: 500px;
  border: 1px solid #C3C7D9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.body-center-box-head{
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #C3C7D9;
}

.body-center-box-body{
  width: 100%;
  height: 100%;
  // border: 1px solid #C3C7D9;
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
