
/*
    dependencias
*/
  const express = require('express')

/*
    config - express
*/
  const app = express()
  // const port = 3000

  /*
      endpoint
*/
app.get('/post', (request, response) => {
  let post = [
    {
      caption: 'Golden Gate Brid',
      location: 'Cidade de Maputo'
    },
    {
      caption: 'London Eye',
      location: 'London'
    }
  ]
    response.send(post)
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

/*
  listen

*/
app.listen(3000)
