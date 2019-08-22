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

        let api = response.data.results


        const coordinantes = api.map((coordinante) => {

            const data = {
                lat: coordinante.geometry.location.lat,
                lng: coordinante.geometry.location.lng,
            }

            return data
        })


        const p1 = Math.pow(coordinantes[0].lat - coordinantes[0].lng, 2)
        const p2 = Math.pow(coordinantes[1].lat - coordinantes[1].lng, 2)
        const p3 = Math.pow(coordinantes[2].lat - coordinantes[2].lng, 2)

        const d = Math.sqrt(p1 + p2 + p3)

        // const p1 = Math.pow('-22.8967601' - '-43.17976549', 2)
        // const p2 = Math.pow('-22.9507173' - '-43.1876474', 2)
        // const d = Math.sqrt(p1 + p2)

        // p1 = Math.pow(x1 - x2, 2)
        //p2 = Math.pow(y1 - y2, 2)
        // d = Math.sqrt(p1 + p2)




        return res.send({coordinantes, distance: d})
    }

}

