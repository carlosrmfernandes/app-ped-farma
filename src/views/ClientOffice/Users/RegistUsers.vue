<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Comprador</div>
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
            <input type="text" v-model="form.name" placeholder="Joao" />
          </div>
          <div class="col col-3">
            <label for>Ultimo Nome</label>
            <input type="text" v-model="form.last_name" placeholder="Pedro" />
          </div>
          <div class="col col-3">
            <label for>Email</label>
            <input type="text" v-model="form.email" placeholder="Testando" />
          </div>
          <div class="col col-3">
            <label for>Passowrd</label>
            <input type="password" v-model="form.password" id />
          </div>
          <div class="col col-3">
            <label for>Telefone</label>
            <input type="text" v-model="form.phone" id />
          </div>
          <div class="col col-3">
            <label for>Endereco</label>
            <input type="text" v-model="form.address" id />
          </div>
          <div class="col col-3">
            <label for>Numero</label>
            <input type="text" v-model="form.number" id />
          </div>
          <div class="col col-3">
            <label for>Cidade</label>
            <input type="text" v-model="form.city" id />
            <input type="text" v-if="false" v-model="form.is_admin" value="0" />
            <input type="text" v-if="false" v-model="form.is_provider" value="0" />
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
     * ProcessForm: This method will validate the RegistBuyer() method
     */
    async ProcessForm () {
      const result = await this.$validator.validateAll()
      return result ? this.RegistBuyer() : result
    },
    /*
    *
    *  RegistBuyer: This method will make requistion to store a product.
    */
    async RegistBuyer () {
      this.forms.product.push(this.form)
      this.isRequesting = true
      try {
        await this.axios.post(`register-user`, this.form)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style style="scss" scoped></style>
