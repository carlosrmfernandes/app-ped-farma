/**
 * RemoveOrganizer: This method will fire a DELETE request and then
 * remove all organizers id
 */
async function RemoveSupplier (ids = []) {
  this.isRequesting = true
  try {
    if (ids.length >= 1) {
      for (const id of ids) {
        await this.axios.delete(`/suppliers/${id}`)

        // Redirect to the Suppliers views
        this.$router.go()
      }
    } else {
      // Redirect to the Organizer views
      await this.axios.delete(`/suppliers/${this.id}`)

      // Redirect to the Suppliers views
      this.$router.go()
    }
  } catch (e) {
    this.hadError = 'Não foi possível efetuar esta operação.'
  }
  this.isRequesting = false
}

/*
 *  GetCompanies: This method will fire a GET request
 *  to fetch the companies and the will store the result
 *  into the orders local state property
 */
async function GetSuppliers (type, sort = '', search = '') {
  this.isRequesting = true

  if (type === 'next') {
    this.pagination.pageable.pageNumber += 1
  }

  if (type === 'prev') {
    this.pagination.pageable.pageNumber -= 1
  }

  // API query options like: sorts and pagination
  let query = ''
  query += `pageNumber=${this.pagination.pageable.pageNumber}`
  query += `&pageSize=${this.pagination.perPage}`
  // query += sort ? `&sortBy=${sort}` : ''
  query += search ? `&search=${search}` : ''

  try {
    const result = await this.axios.get(`/suppliers?${query}`)
    const res = result.data
    this.suppliers = res.data

    this.pageCount = res.pages_count
    // Set Pagination
  } catch (e) {
    this.hadError =
      'Não foi possível carregar as encomendas. Actualize a página.'
  }
  this.isRequesting = false
}

function changePage (page) {
  this.pagination.pageable.pageNumber = page
}

function removeMostSuppliers (ids) {
  this.RemoveSupplier(ids)
}

export { RemoveSupplier, GetSuppliers, changePage, removeMostSuppliers }
