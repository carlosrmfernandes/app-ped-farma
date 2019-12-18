/*
     *  Getevents: This method will fire a GET request
     *  to fetch the events and the will store the result
     *  into the orders local state property
     */
async function getOrganizersEvents () {
  this.isRequesting = true

  // API query options like: sorts and pagination
  let query = ''
  query += `&organizerIds=${this.id}`

  try {
    const result = await this.axios.get(`/events?${query}`)
    const res = result.data
    this.organizerEvents = res.data

    this.pageCount = res.pages_count
  } catch (e) {
    this.hadError =
          'Não foi possível carregar o evento. Actualize a página.'
  }
  this.isRequesting = false
}

export { getOrganizersEvents }
