<template>
    <div class="ml-2">
        <div class="row ">
            <div class="col-xs-2 p-4">
                <button type="button" @click="addNewAddress" class="btn btn-block btn-success">
                    Add +
                </button>
            </div>
            <div class="col-xs-10 p-4">
                Gostaria de adicionar endereços?
            </div>
        </div>
        <div v-for="(address, index) in addresses" :key="index">
            <div class="row">
                <div class="form-group col-xs-5 p-4">
                    <label>Provincia</label>
                    <input v-model="address.province"
                           class="form-control" placeholder="Luanda">
                </div>
                <div class="form-group col-xs-5 p-4">
                    <label>Municipio</label>
                    <input v-model="address.city"
                            class="form-control" placeholder="Maianga">
                </div>
                <div class="form-group col-xs-5 p-4">
                    <label>Bairro</label>
                    <input v-model="address.neighborhood"
                            class="form-control" placeholder="Catambor">
                </div>
                <div class="col-xs-2 p-4">
                    <label>&nbsp;</label>
                    <button type="button" @click="removeAddress(index)" class="btn btn-block btn-danger">
                        Rem -
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      address: {
        province: '',
        city: '',
        neighborhood: ''
      },
      addresses: []
    }
  },
  mounted: function () {
    /*
     * The "data-apartments" could come from serverside (already saved apartments)
     */
    // this.addresses = JSON.parse(this.$el.dataset.addresses)
  },
  methods: {
    addNewAddress: function () {
      this.addresses.push(this.address)
      // this.addresses.push(Vue.util.extend({}, this.address))
    },
    removeAddress: function (index) {
      this.addresses.splice(index, 1)
      // Vue.delete(this.addresses, index);
    },
    sumbitForm: function () {
      /*
       * You can remove or replace the "submitForm" method.
       * Remove: if you handle form sumission on server side.
       * Replace: for example you need an AJAX submission.
       */
      console.info('<< Form Submitted >>')
      console.info('Vue.js apartments object:', this.addresses)
      window.testSumbit()
    }
  }
}
</script>
<style>
</style>
