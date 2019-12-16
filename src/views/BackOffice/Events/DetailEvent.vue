<template>
  <div class="panel">
    <div class="panel-header mt-4">
      <p>Event ID: {{ id }}</p>
      <p>Title: {{ title }}</p>
      <p>Description: {{ description }}</p>
      <p>Classificação: {{ classification }}</p>
      <p>Data: {{ starts_at }}</p>
      <p>Organizador: {{ organizer }}</p>
      <p>Localização: {{ location }}</p>
      <p>Estado: {{ status }}</p>
      <p>Vídeo: {{ video_id }}</p>
      <p>Poster: {{ poster_path }}</p>
      <p>Backdrop: {{ backdrop_path }}</p>
      <hr>
    </div>
    <div class="panel-body">
      <p>Sessões:</p>
      <div class="row">
        <div v-for="session in sessions" class="col-md-3 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ formatDate(session.starts_at) }} - {{ session.ends_at }}</h5>
              <div class="card-text">
                <p>Localização: {{ session.location_name }}</p>
                <p>Estado: {{ session.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailEvent',
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      party_event_id: this.id,
      title: '',
      description: '',
      classification: '',
      starts_at: '',
      organizer: '',
      location: '',
      status: '',
      video_id: '',
      poster_path: '',
      backdrop_path: '',
      sessions: [],
      session_data: {
        id: '',
        starts_at: '',
        ends_at: '',
        status: '',
        location_id: ''
      },
      locations: ''
    }
  },
  methods: {
    /*
     * getEventStep: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEvent () {
      try {
        const result = await this.axios.get(
          `/events/${this.id}`
        )
        this.title = result.data.title
        this.description = result.data.description
        // this.location_id = result.data.location.id
        // this.organizer = result.data.organizer.id
        this.starts_at = result.data.starts_at
        this.status = result.data.status
        this.classification = result.data.classification
        this.video_id = result.data.video_id === 'null' ? '' : result.data.video_id
        this.poster_path = result.data.poster_path
        this.backdrop_path = result.data.backdrop_path
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getEventSessions () {
      try {
        const result = await this.axios.get(
          `/event_sessions?eventIds=${this.party_event_id}&types=PARTY`
        )

        const res = result.data
        const itemsCount = result.data.items_count

        for (let i = 0; i < itemsCount; i++) {
          this.sessions.push({
            id: res.data[i].id,
            starts_at: res.data[i].starts_at,
            ends_at: res.data[i].ends_at,
            status: res.data[i].status,
            location_id: res.data[i].location.id,
            location_name: res.data[i].location.name })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    formatDate: function (date) {
      return moment().format(date)
    }
  },
  created () {
    this.getEvent()
    this.getEventSessions()
  }
}
</script>

<style scoped>

</style>
