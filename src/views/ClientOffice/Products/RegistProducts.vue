<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Produto</div>
      <div class="col col-9">
        <button class="btn btn-success" @click="ProcessForm">Salvar</button>
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
      return result ? this.RegistProduct() : result
    },
    /*
    *
    *  RegistProduct: This method will make requistion to store a product.
    */
    async RegistProduct () {
      this.forms.product.push(this.form)
      this.isRequesting = true
      try {
        await this.axios.post(`auth/product`, this.forms)
        this.$router.push({ name: 'ListProducts' })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style style="scss" scoped></style>
