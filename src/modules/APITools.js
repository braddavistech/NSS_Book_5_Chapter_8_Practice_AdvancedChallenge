const localURL = "http://localhost:8088/"

export default Object.create(null, {
  searchApiInput: {
    value: function (searchValue, objectName) {
      return fetch(`${localURL}${objectName}?q=${searchValue}`).then(results => results.json())
    }
  },
  getAll: {
    value: function (category) {
      return fetch(`${localURL}${category}`).then(results => results.json())
    }
  },
  getOne: {
    value: function (category, id) {
      return fetch(`${localURL}${category}/id=${id}`).then(results => results.json())
    }
  },
  deleteItem: {
    value: function (category, id) {
      return fetch(`http://localhost:8088/${category}/${id}`, {
        method: "DELETE"
      })
        .then(e => e.json())
    }
  }

})

