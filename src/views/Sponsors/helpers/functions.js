async function addEmail () {
  this.isRequesting = true
  var result = ''
  try {
    for (const email of this.emails) {
      result = await this.axios.put(`/organizers/${this.id}/emails`,
        {
          email: email.email,
          is_default: false
        })
    }

    if (result) {
      this.hadError = ''
      this.hadSuccess = 'Emails inseridos com sucesso.'
    }
  } catch (e) {
    this.hadSuccess = ''
    this.hadError = 'Não foi possível realizar esta operação.'
  }
  this.isRequesting = false
  setTimeout(() => {
    this.hadSuccess = ''
  }, 500)
}

async function addTelephone () {
  this.isRequesting = true
  var result = ''
  try {
    for (const telephone of this.telephones) {
      result = this.axios.put(`/organizers/${this.id}/phone_numbers`,
        {
          phone_number: telephone.phone_number,
          id_default: false
        })
    }

    if (result) {
      this.hadError = ''
      this.hadSuccess = 'Telefones inseridos com sucesso.'
    }
  } catch (e) {
    this.hadSuccess = ''
    this.hadError = 'Não foi possível realizar esta operação.'
  }
  this.isRequesting = false
  setTimeout(() => {
    this.hadSuccess = ''
  }, 500)
}

async function addAddress () {

}

async function getAddress () {

}

async function getEmail () {
  let query = `&organizerIds=${this.id}`

  try {
    const result = await this.axios.get(`/organizer_emails?${query}`)
    const res = result.data
    for (const eml of res.data) {
      this.emails.push({ email: eml.email })
    }
  } catch (e) {
    this.hadError =
      'Não foi possível carregar as encomendas. Actualize a página.'
  }
}

async function getTelephone () {
  let query = `&organizerIds=${this.id}`

  try {
    const result = await this.axios.get(`/organizer_phone_numbers?${query}`)
    const res = result.data
    for (const tel of res.data) {
      this.telephones.push({ phone_number: tel.phone_number })
    }
  } catch (e) {
    this.hadError =
      'Não foi possível carregar as encomendas. Actualize a página.'
  }
}

async function add (index, type) {
  if (type === 'email') {
    this.emails.push({ name: '' })
  } else if (type === 'phone') {
    this.telephones.push({ name: '' })
  }
}

async function remove (index, type) {
  if (type === 'email') {
    this.emails.splice(index, 1)
  } else if (type === 'phone') {
    this.telephones.splice(index, 1)
  }
}

export { add, remove, addEmail, addTelephone, addAddress, getAddress, getEmail, getTelephone }
