<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Edit Produto</div>
      <div class="col col-9">
        <button class="btn btn-success" @click="UpdateProduct">Atualizar</button>
        <div class="float-btn">
          <i class="fas fa-save"></i>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="form-container">
        <div class="row">
          <div class="col col-3">
            <label for>Nome</label>
            <input type="text" v-model="form.name" placeholder="Testando" />
          </div>
          <div class="col col-3">
            <label for>Quantidade</label>
            <input type="text" v-model="form.quantity" id />
          </div>
          <div class="col col-3">
            <label for>Preço</label>
            <input type="text" v-model="form.price" id />
          </div>
        </div>
        <div class="row">
          <div class="col col-3">
            <textarea name="description" v-model="form.description" cols="30" rows="10" placeholder="Descrição"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: { },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      exampleBool: '',
      form: {},
      forms: {
        product: []
      }
    }
  },
  methods: {
    SelectImage (file) {
      this.form.file = file
    },
    /*
     * ProcessForm: This method will validate the RegistProduct() method
     */
    async ProcessForm () {
      const result = await this.$validator.validateAll()
      return result ? this.ChangePassword() : result
    },
    /**
     * GetSubscription: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetSubscription () {
      try {
        const result = await this.axios.get(
          `/product-view/${this.id}`
        )
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
    *
    *  UpdateProduct: This method will make requistion to store a product.
    */
    async UpdateProduct () {
      // this.form.id = this.id
      this.forms.product.push(this.form)
      this.isRequesting = true
      try {
        await this.axios.post(`/auth/product`, this.forms)
        this.$router.push({ name: 'ListProducts' })
      } catch (e) {
        console.error(e)
      }
    }
  },
  created () {
    this.GetSubscription()
  }
}
</script>
<style style="scss" scoped></style>
