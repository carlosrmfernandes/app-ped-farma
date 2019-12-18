<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Produto</h1>
      <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editOrganizer"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="ProcessForm"
        v-show="!isEditable"
      >
        <span v-if="!isRequesting">Salvar</span>
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
        <div class="col-md-3" >
          <div class="form-group">
            <label for="event-name">Nome do Produto</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Product-name"
             placeholder="Ex: Blue, Coca-Cola"
             :disabled="isEditable"
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
              height="140px"
            />
          </div>
        </div>
      </div>
    </div>
     <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Produtos">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="RemoveProduct">
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
import UploadPhoto from '@/components/Form/Photo'
import { RemoveProduct } from './helpers/functions.js'

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
      form: {},
      hadSuccess: '',
      hadError: '',
      isRequesting: false,
      file: '',
      isEditable: true,
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
      return result ? this.UpdateProduct() : result
    },
    /**
     * GetOrganizer: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetProduct () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/company_products/${this.id}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async UpdateProduct () {
      this.isRequesting = true

      try {
        if (this.existCompany) {
          // eslint-disable-next-line no-const-assign
          const result = await this.axios.patch(`/company_products/${this.id}`, this.form)

          if (result) {
            // Redirect to the Organizer views
            this.$router.push({ name: 'ListProduct' })
          }
        } else {
          let formData = new FormData()
          formData.append('name', this.form.name)
          formData.append('image', this.file)

          // eslint-disable-next-line no-const-assign
          const res = await this.axios({
            url: `/company_products/${this.id}`,
            method: 'patch',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
          })

          if (res) {
            // Redirect to the Organizer views
            this.$router.push({ name: 'ListProduct' })
          }
        }

        this.file = ''
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
    RemoveProduct

  },
  created () {
    this.GetProduct()
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
