<template>
 <div class="panel">
    <div class="panel-header">
      <h1>Organizadores</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
        :cols="cols"
        :data="data"
        title="Organizador"
        :searchMethod="GetPosts"
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
              @click="$bvModal.hide('bv-modal-example')"
            >
              Remover
            </b-button>
        </div>
      </template>
      <div class="d-block text-center">
        <div class="row flex">
          <div class="form-group m-2">
            <label for="event-name" >Nome</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" :disabled="!isEditable" />
          </div>
          <div class="form-group m-2">
            <label for="event-name" >Teste</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" :disabled="!isEditable" />
          </div>
          <div class="form-group m-2">
            <label for="event-name" >Nome</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" :disabled="!isEditable"/>
          </div>
          <div class="form-group m-2">
            <label for="event-name" >Teste</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" :disabled="!isEditable"/>
          </div>
        </div>
      </div>
       <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-secondary"
            size="lg"
            class="float-right"
            @click="$bvModal.hide('bv-modal-example')"
          >
            Fechar
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
      cols: [
        { name: 'id', label: 'Id' },
        { name: 'name', label: 'Nome' },
        { name: 'organizer', label: 'Organizador' },
        { name: 'time', label: 'Tempo' }
      ],
      data: [
        {
          id: 1,
          name: 'O Partido',
          organizer: 'Man renas',
          time: 'All Day'
        },
        {
          id: 2,
          name: 'Deadshot',
          organizer: 'Dj Havaiana',
          time: 'All Day'
        },
        {
          id: 3,
          name: 'October Fest',
          organizer: 'Luandina',
          time: 'Ate as 12hrs'
        },
        {
          id: 4,
          name: 'Black Santa',
          organizer: 'Povao',
          time: 'All Day'
        },
        {
          id: 5,
          name: 'Colours',
          organizer: 'Minha Entrada',
          time: 'Ate as 03'
        },
        {
          id: 6,
          name: 'Nocal Fest',
          organizer: 'Unitel',
          time: 'Meio Dia'
        },
        {
          id: 7,
          name: 'Cha de Mulheres',
          organizer: 'As Pretas',
          time: 'as 18hrs'
        },
        {
          id: 8,
          name: 'Hackaton',
          organizer: 'Criciuma Dev',
          time: 'All Night'
        }
      ]
    }
  },
  methods: {
    editOrganizer () {
      this.isEditable = true
    },
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.data
    }
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
