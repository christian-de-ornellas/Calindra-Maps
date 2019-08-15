const axios = require('axios')

//Config de acesso da api.s
ConfApi = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
    address: 'Av. Rio branco 1 - Centro, Rio de Janeiro - RJ, Rua 19 de fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, Rua laranjeiras 27, Vilar dos teles, Rua Uruguaiana 22, Centro',
    keyGoogle: 'AIzaSyChxyljBxrQ9yvdS5BOJEWywv1C45lpprw'
}

module.exports = {
    async findAddress(req, res) {


        const response = await axios.get(`${ConfApi.url}${ConfApi.address}&key=${ConfApi.keyGoogle}`)

        let geoApi = response.data.results

        const points = geoApi.map(function (point) {
            
            const local = {
                lat: point.geometry.location.lat,
                lng: point.geometry.location.lng,
            }
            
           
            return local
        })

       const distancePoints = {
           cordenades: points,
           distance: Math.sqrt( (points[0].lat-points[0].lng) * (points[1].lat-points[1].lng))
           
       }

        //RECEBER DOIS OU MAIS ENDERECOS E CALCULAR A DISTANCIA
        //const euclidean = (p, q) => Math.sqrt( (p[0]-q[0]) * (p[1]-q[1]));

        // CALCULODEDISTANCIA EUCLIDIANA 

        // RETORNARAS DISTANCIAS CALCULADAS ENTRE TODOS OS ENDERECOS E INDICAR OS ENDECOS MAIS PROXIMOS

        return res.send(distancePoints)
    }

}

