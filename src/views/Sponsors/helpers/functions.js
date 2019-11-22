/**
 * RemoveOrganizer: This method will fire a DELETE request and then
 * remove all organizers id
 */
async function RemoveSponsors (ids = []) {
  this.isRequesting = true
  try {
    if (ids.length >= 1) {
      for (const id of ids) {
        await this.axios.delete(`/sponsors/${id}`)
      }

      this.$router.go()
    } else {
      // Redirect to the Organizer views
      await this.axios.delete(`/sponsors/${this.id}`)

      // Redirect to the Organizer views
      this.$router.go()
    }
  } catch (e) {
    this.hadError = 'Não foi possível efetuar esta operação.'
  }
  this.isRequesting = false
}
async function addEmail () {
  this.isRequesting = true
  var result = ''
  const allEmails = this.rebuildArrayEmails(this.emails)
  try {
    result = await this.axios.put(`/sponsors/${this.id}/sponsor_emails`, allEmails)

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
  const allTelephones = this.rebuildArrayTel(this.telephones)
  try {
    result = this.axios.put(`/sponsors/${this.id}/sponsor_phone_numbers`, allTelephones)

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
  // Code Implementation dor Address
  this.isRequestingAddress = true
  var result = ''
  const allAddresses = this.rebuildArrayAddress(this.addresses)
  try {
    result = this.axios.put(`/sponsors/${this.id}/sponsor_addresses`, allAddresses)

    if (result) {
      this.hadError = ''
      this.hadSuccess = 'Telefones inseridos com sucesso.'
    }
  } catch (e) {
    this.hadSuccess = ''
    this.hadError = 'Não foi possível realizar esta operação.'
  }
  this.isRequestingAddress = false
  setTimeout(() => {
    this.hadSuccess = ''
  }, 500)
}

async function getAddress () {
  // Code Implementation dor Address
  let query = `sponsorIds=${this.id}`

  try {
    const result = await this.axios.get(`/sponsor_addresses?${query}`)
    const res = result.data
    for (const address of res.data) {
      this.addresses.push({ province: address.province, municipality: address.province, address: address.address })
    }
  } catch (e) {
    this.hadError =
      'Não foi possível carregar as encomendas. Actualize a página.'
  }
}

async function getEmail () {
  let query = `&sponsorIds=${this.id}`

  try {
    const result = await this.axios.get(`/sponsor_emails?${query}`)
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
  let query = `&sponsorIds=${this.id}`

  try {
    const result = await this.axios.get(`/sponsor_phone_numbers?${query}`)
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

async function addNewAddress () {
  this.addresses.push({ province: '', municipality: '', address: '' })
}

async function removeAddress (index) {
  this.addresses.splice(index, 1)
}

function rebuildArrayEmails (datas) {
  const result = []
  let emails = {}
  for (const data of datas) {
    result.push(data.email)
  }

  if (result[0] === '') {
    result.shift()
  }

  emails = { emails: result.reverse() }

  return emails
}

function rebuildArrayTel (datas) {
  const result = []
  let telephones = {}
  for (const data of datas) {
    result.push(data.phone_number)
  }

  if (result[0] === '') {
    result.shift()
  }

  telephones = { phone_numbers: result.reverse() }

  return telephones
}

function rebuildArrayAddress (datas) {
  const result = []
  let addresses = {}
  for (const data of datas) {
    result.push({
      address: data.address,
      municipality: data.municipality,
      province: data.province
    })
  }

  if (result[0].address === '' && result[0].municipality === '' && result[0].province === '') {
    result.shift()
  }

  addresses = { addresses: result.reverse() }

  return addresses
}

export { RemoveSponsors, add, remove, addEmail, addTelephone,
  addAddress, getAddress, getEmail, getTelephone, addNewAddress,
  removeAddress, rebuildArrayEmails, rebuildArrayTel, rebuildArrayAddress }
