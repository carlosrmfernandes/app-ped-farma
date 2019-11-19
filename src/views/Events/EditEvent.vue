<template>
  <div>
    Edit Event {{ party_event_id }}
    {{ party_event_data }}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data: function() {
    return {
      party_event_id: this.id,
      party_event_data: ""
    };
  },
  methods: {
    /*
     * updatePartyEvent: This method will fire a PATCH request and then
     * assign the response data into the state property: form
     */
    async updatePartyEvent() {
      try {
      } catch (e) {}
    },
    /*
     * getEventStepOneData: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEventStepOneData() {
      try {
        const result = await this.axios.get(
          `/party_events/${this.party_event_id}/step_1`
        );
        this.party_event_data = result.data;
      } catch (e) {
        this.hadError = "Não foi possível carregar as informações.";
      }
    }
  },
  created() {
    this.getEventStepOneData();
  }
};
</script>

<style>
</style>
