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
        :needGrid="false"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" class="mt-4" size="lg">
      <template v-slot:modal-title >
         <div class="w-100">
            <p class="float-left">Detalhe Organizador</p>
             <b-button
              variant="outline-primary"
              size="lg"
              class="float-right"
              @click="editOrganizer"
              :disabled="isEditable"
            >
              Editar
            </b-button>
            <b-button
              variant="outline-danger"
              size="lg"
              class="float-right mr-2"
              @click="showRemoveModal"
            >
              Remover
            </b-button>
        </div>
      </template>
      <div class="d-block text-center">
        <div class="row flex">
          <div class="form-group m-2">
            <label for="event-name" >Nome</label>
            <input type="text" class="form-control" v-model="form.name" id="event-name" placeholder="Nome do Organizador de Evento" :disabled="!isEditable" />
          </div>
        </div>
      </div>
       <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-secondary"
            size="lg"
            class="float-right"
            @click="hideModal"
          >
            Fechar
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Organizador">
      <p class="my-4">Tem certeza que deseja remover?</p>
       <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="lg"
            class="float-right"
            @click="RemoveCompany"
          >
            Sim
          </b-button>
          <b-button
            variant="outline-danger"
            size="lg"
            class="float-right mr-2"
            @click="hideRemoveModal"
          >
            Nao
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  props: {
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' }
      ],
      data: [
        {
          id: 1,
          name: 'The Club',
          organizer: 'Club Present',
          time: 'All Day',
          img: 'https://media.istockphoto.com/vectors/party-poster-vector-id611862070'
        },
        {
          id: 2,
          name: 'Disney',
          organizer: 'Disney Brasil',
          time: 'All Day',
          img: 'https://http2.mlstatic.com/pster-cartaz-viva-a-vida-e-uma-festa-93x63-cm-D_NQ_NP_941332-MLB27078469427_032018-F.webp'
        },
        {
          id: 3,
          name: 'OctoberFest Luanda',
          organizer: 'Luandina',
          time: 'Ate as 12hrs',
          img: 'https://i2.wp.com/www.wusangola.com/wp-content/uploads/2019/10/9f2b9b71-9fe3-4ca7-8ca2-3bd40890ab50.jpg?w=1023'
        },
        {
          id: 4,
          name: 'Black Santa',
          organizer: 'Povao',
          time: 'All Day',
          img: 'https://i1.wp.com/idontdoclubs.biz/wp-content/uploads/2017/12/noir-noel.jpg?w=640&ssl=1'
        },
        {
          id: 5,
          name: 'Colours',
          organizer: 'Minha Entrada',
          time: 'Ate as 03',
          img: 'https://scontent-lga3-1.cdninstagram.com/vp/718e76e99528f73216a53cca7e7fb5a1/5DB10799/t51.12442-15/e35/p320x320/73134093_176988376807831_2686096669175805374_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=107&ig_cache_key=MjE1OTgzNzYyMzc5OTgwMTg5NQ%3D%3D.2'
        },
        {
          id: 6,
          name: 'Nocal Fest',
          organizer: 'Unitel',
          time: 'Meio Dia',
          img: 'https://www.verangola.net/va/images/cache/290x420/crop/images%7Ccms-image-000009800.png'
        },
        {
          id: 7,
          name: 'Festa Junina',
          organizer: 'As Pretas',
          time: 'as 18hrs',
          img: 'http://www.avmpmpr.com.br/site/wp-content/uploads/2018/05/cartaz-festa-junina.jpg'
        },
        {
          id: 8,
          name: 'Hackaton',
          organizer: 'Criciuma Dev',
          time: 'All Night',
          img: 'http://www.trt12.jus.br/portal/areas/ascom/extranet/imagens/hackathon-bannerdetalhes.jpg'
        }
      ],
      isRequesting: false,
      companies: [],
      hadError: '',
      editID: ''
    }
  },
  methods: {
    editOrganizer () {
      this.isEditable = true
    },
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.companies
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetCompanies () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/companies/pages`)
        const res = result.data
        this.companies = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetCompany () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        const result = await this.axios.get(
          `/companies/${this.editID}`
        )
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async RemoveCompany () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        const result = await this.axios.delete(
          `/companies/${this.editID}`
        )
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível efetuar esta operação.'
      }
      this.isRequesting = false
      this.$store.state.tableDetailID = ''
    },
    hideModal () {
      this.$bvModal.hide('bv-modal-example')
      // Set the value to empty
      this.$store.state.tableDetailID = ''
    },
    showRemoveModal () {
      // this.$store.state.tableDetailID = id
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Set the ID value on store Global variable for using with modal
      this.$store.state.tableDetailID = ''
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    }
  },
  created () {
    // Get customer orders
    this.GetCompanies()
  }
}
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
label{
    float: left !important;
}
.modal-content{
    margin-top: 15% !important;
}
</style>
