<template>
    <div>
      <div class="col-md-12 contact-flex"><label>Contactos</label></div>
        <div class="col-md-12" v-for="(input,k) in inputs" :key="k">
            <div class="form-group add-input">
                <input type="text" class="form-control" v-model="input.name" @input="handleInput($event.target.input)" :placeholder="placeholder">
                <span>
                    <i class="fa fa-minus-circle" @click="remove(k)" v-show="(k  || ( !k && inputs.length > 1)) && (k != inputs.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k)" v-show="k == inputs.length-1"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<script scoped>
export default {
  name: 'NextInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputs: [{
        name: ''
      }]
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('handleInput', value)
    },
    add (index) {
      this.inputs.push({ name: '' })
    },
    remove (index) {
      this.inputs.splice(index, 1)
    }
  }
}
</script>
<style>
.contact-flex{
    display: flex;
}

.add-input{
    display: flex;
}

.form-group span{
    padding: 5px;
    padding-top: 8px;
}
</style>
