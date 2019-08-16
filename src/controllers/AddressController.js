const axios = require('axios')



module.exports = {
    async findAddress(req, res) {

        //Config de acesso da api.s
        ConfApi = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
            // address: 'Av. Rio branco 1 - Centro, Rio de Janeiro - RJ, Rua 19 de fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, Rua laranjeiras 27, Vilar dos teles, Rua Uruguaiana 22, Centro',
            address: req.params.end,
            keyGoogle: 'AIzaSyChxyljBxrQ9yvdS5BOJEWywv1C45lpprw'
        }

        const response = await axios.get(`${ConfApi.url}${ConfApi.address}&key=${ConfApi.keyGoogle}`)

        let geoApi = response.data.results

        const points = geoApi.map(function (point) {

            const local = {
                address: point.formatted_address,
                lat: point.geometry.location.lat,
                lng: point.geometry.location.lng
            }

            return local
        })

        const distancePoints = {
            cordenades: points,
            distance: Math.sqrt((points[0].lat - points[0].lng) * (points[1].lat - points[1].lng)),

        }


        return res.send(distancePoints)
    }

}

