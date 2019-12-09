<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Nova Localização</h1>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
       <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Tipo de Localização</label>
            <select class="custom-select" v-model="form.type">
              <option disabled value="">Selecione...</option>
              <option
                :value="type.id"
                v-for="(type, index) of locationsTypes"
                :key="index"
              >{{type.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Location-name"
             placeholder="Ex: Lookal, Club S"
             v-validate="'required'"
             data-vv-as="Nome do Local" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="organizer-description">Descrição</label>
            <textarea type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.description')}"
             name="form.description"
             v-model="form.description"
             id="Location-Description"
             placeholder="Descricao da Localização"
             data-vv-as="Descricao da Localização"
             rows="4" />
             <span v-show="errors.has('form.description')" class="help is-danger">{{ errors.first('form.description') }}</span>
          </div>
        </div>
         <div class="col-md-2 mt-4">
          <div class="form-group">
            <UploadPhoto
              :defaultImage="form.logo"
              :OnChange="SelectImage"
              width="140px"
              height="140px"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group form-address">
            <label for="organizer-description">Endereço</label>
            <gmap-autocomplete
            @place_changed="setPlace"
            placeholder="Ex: Centralidade do Kilamba, Luanda..."
            class="form-control"
            style="width: 100%"
            country="ao">
            </gmap-autocomplete>
          </div>
        </div>
        <div class="col-md-1" >
          <div class="form-group">
            <b-button variant="primary" size="sm" class="float-left mt-6" @click="addMarker">
              <span>Escolher</span>
            </b-button>
          </div>
        </div>
        <div class="col-md-2" >
          <div class="form-group">
            <label for="Location-longitude">Longitute</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.longitude')}"
             name="form.longitude"
             v-model="form.longitude"
             id="Location-longitude"
             placeholder="Ex: 0.00043435"
             v-validate="'required'"
             data-vv-as="longitude" />
             <span v-show="errors.has('form.longitude')" class="help is-danger">{{ errors.first('form.longitude') }}</span>
          </div>
        </div>
        <div class="col-md-2" >
          <div class="form-group">
            <label for="Location-latitude">Latitude</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.latitude')}"
             name="form.latitude"
             v-model="form.latitude"
             id="Location-latitude"
             placeholder="Ex: 0.00043435"
             v-validate="'required'"
             data-vv-as="latitude" />
             <span v-show="errors.has('form.latitude')" class="help is-danger">{{ errors.first('form.latitude') }}</span>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="event-name">Tornar esta localização visivel?</label>
            <select class="custom-select" v-model="form.display">
              <option disabled value="">Selecione....</option>
              <option
                :value="type.id"
                v-for="(type, index) of display"
                :key="index"
              >{{type.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row px-3">
        <gmap-map
          :center="center"
          :zoom="12"
          style="width:100%;  height: 400px;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </div>
      <div class="row">
        <div class="col-md-1" >
          <div class="form-group">
            <b-button variant="primary"
            size="lg"
            class="float-left mt-6"
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
      form: {
        type: '',
        display: ''
      },
      locationsTypes: [
        { id: 'STADIUM', name: 'Estádio' },
        { id: 'UNDEFINED', name: 'Indefinido' },
        { id: 'PARK', name: 'Parques' },
        { id: 'MUSEUM', name: 'Museus' },
        { id: 'MOVIE_THEATER', name: 'Cinema' },
        { id: 'MALL', name: 'Shopping' }
      ],
      display: [
        { id: true, name: 'Sim' },
        { id: false, name: 'Não' }
      ],
      hadSuccess: false,
      hadError: '',
      isRequesting: false,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      file: '',
      currentPlace: null,
      address: ''
    }
  },
  mounted () {
    this.geolocate()
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
      return result ? this.RegistLocation() : result
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async RegistLocation () {
      this.isRequesting = true

      try {
        if (this.existCompany) {
          // eslint-disable-next-line no-const-assign
          const result = await this.axios.post('/locations', this.form)

          if (result) {
            // Redirect to the Organizer views
            this.$router.push({ name: 'ListLocation' })
          }
        } else {
          let formData = new FormData()
          formData.append('name', this.form.name)
          formData.append('description', this.form.description)
          formData.append('address', this.form.address)
          formData.append('latitude', this.form.latitude)
          formData.append('longitude', this.form.longitude)
          formData.append('type', this.form.type)
          formData.append('display', this.form.display)
          formData.append('image', this.file)

          // eslint-disable-next-line no-const-assign
          const res = await this.axios({
            url: `/locations`,
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
          })

          if (res) {
            // Redirect to the Organizer views
            this.$router.push({ name: 'ListLocation' })
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
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.form.latitude = marker.lat
        this.form.longitude = marker.lng
        this.form.address = this.currentPlace.formatted_address
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    SelectImage (file) {
      this.file = file
    }

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
