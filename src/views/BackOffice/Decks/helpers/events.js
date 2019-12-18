/*
     *  Getevents: This method will fire a GET request
     *  to fetch the events and the will store the result
     *  into the orders local state property
     */
async function getDecksEvents () {
  this.isRequesting = true

  // API query options like: sorts and pagination
  let query = ''
  query += `&deckIds=${this.id}`

  try {
    const result = await this.axios.get(`/events?${query}`)
    const res = result.data
    this.decksEvents = res.data

    this.pageCount = res.pages_count
  } catch (e) {
    this.hadError =
          'Não foi possível carregar o evento. Actualize a página.'
  }
  this.isRequesting = false
}

/*
     *  Getevents: This method will fire a GET request
     *  to fetch the events and the will store the result
     *  into the orders local state property
     */
async function getAllEvents () {
  this.isRequesting = true

  // API query options like: sorts and pagination
  let query = ''

  try {
    const result = await this.axios.get(`/events?${query}`)
    const res = result.data
    this.allEvents = res.data

    this.pageCount = res.pages_count
  } catch (e) {
    this.hadError =
          'Não foi possível carregar o evento. Actualize a página.'
  }
  this.isRequesting = false
}

function changePage (page) {
  this.pagination.pageable.pageNumber = page
}

export { getDecksEvents, changePage, getAllEvents }
