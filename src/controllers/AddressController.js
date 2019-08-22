const axios = require('axios')

module.exports = {
    async findAddress(req, res) {

        //Config de acesso da api.
        configApi = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
            // address: 'Av. Rio branco 1 - Centro, Rio de Janeiro - RJ, Rua 19 de fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, Rua laranjeiras 27, Vilar dos teles, Rua Uruguaiana 22, Centro',
            address: req.params.end,
            keyGoogle: 'AIzaSyChxyljBxrQ9yvdS5BOJEWywv1C45lpprw'
        }

        const response = await axios.get(`${configApi.url}${configApi.address}&key=${configApi.keyGoogle}`)

        let dataApi = response.data.results

        // Recebe a latitude e a longitudade
        const getLat = latitude => latitude.geometry.location.lat
        const getLng = longitude => longitude.geometry.location.lng

        const latitude = dataApi.map(getLat).reduce((indice, value) => { return indice + value })
        const longitude = dataApi.map(getLng).reduce((indice, value) => { return indice + value })

        const p = Math.pow(latitude - longitude, 2)
        const r = Math.sqrt(p)


        const p1 = Math.pow('-22.8967601' - '-43.17976549', 2)
        const p2 = Math.pow('-22.9507173' - '-43.1876474', 2)
        const d = Math.sqrt(p1 + p2)

        // p1 = Math.pow(x1 - x2, 2)
        //p2 = Math.pow(y1 - y2, 2)
        // d = Math.sqrt(p1 + p2)




        return res.send({d, longitude, latitude, distance_total: r, address: dataApi })
    }

}

