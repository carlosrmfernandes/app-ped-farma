/*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
async function GetOrganizerSuppliers () {
  this.isRequesting = true

  try {
    const result = await this.axios.get(`/organizers/${this.id}/suppliers`)
    const res = result.data
    // console.log(result)
    this.OrganizerSuppliers = res.data

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
async function RegistOrganizerSupplier () {
  this.isRequesting = true
  this.supplier.role = 'ORGANIZER_AGENT'
  try {
    // eslint-disable-next-line no-const-assign
    const result = await this.axios.post(`/organizers/${this.id}/suppliers`, this.supplier)

    if (result) {
      // Hide Modal and get GetOrganizerSuppliers
      this.hideAddSupplierModal()
      this.GetOrganizerSuppliers()
    }
  } catch (e) {
    this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
  }
  this.isRequesting = false
}

export { GetOrganizerSuppliers, RegistOrganizerSupplier }
