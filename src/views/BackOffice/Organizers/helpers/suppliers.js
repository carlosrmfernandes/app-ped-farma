/*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
async function getOrganizerSuppliers () {
  this.isRequesting = true

  try {
    const result = await this.axios.get(`/organizers/${this.id}/suppliers`)
    const res = result.data
    this.organizerSuppliers = res.data

    // Set Pagination
  } catch (e) {
    this.hadError =
      'Não foi possível carregar as encomendas. Actualize a página.'
  }
  this.isRequesting = false
}

/*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
async function registOrganizerSupplier () {
  this.isRequesting = true
  this.supplier.role = 'ORGANIZER_AGENT'

  try {
    // Get Organizer Number
    const resultOrgNumber = await this.axios.post(`/organizers/${this.id}/suppliers/available_number`)
    const resOrgNumber = resultOrgNumber.data
    // Verifying if that organizer has number
    if (resOrgNumber.can_add_supplier) {
      // Creating organizer
      await this.axios.post(`/organizers/${this.id}/suppliers`, this.supplier)
    } else {
      // Creating Organizer number, for be able to creater supplier
      await this.axios.post(`/organizers/${this.id}/organizer_numbers`)

      // Creating Organizer-Supplier
      await this.axios.post(`/organizers/${this.id}/suppliers`, this.supplier)
    }

    // Hide Modal and get GetOrganizerSuppliers
    this.hideAddSupplierModal()
    this.getOrganizerSuppliers()
  } catch (e) {
    this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
  }
  this.isRequesting = false
}

export { getOrganizerSuppliers, registOrganizerSupplier }