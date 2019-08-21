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
        const getAddress = address => address.formatted_address

        const latitude = dataApi.map(getLat).reduce((indice, value) => { return indice - value })
        const longitude = dataApi.map(getLng).reduce((indice, value) => { return indice - value })

        const r = Math.sqrt(latitude * longitude)

        // distance: Math.sqrt((points[0].lat - points[0].lng) * (points[1].lat - points[1].lng)),



        return res.send({ longitude, latitude, distance_total: r, address: dataApi })
    }

}

