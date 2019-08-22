const axios = require('axios')

module.exports = {
    //Função asincrona
    async findAddress(req, res) {

        //Config de acesso da api.
        configApi = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
            // address: 'Av. Rio branco 1 - Centro, Rio de Janeiro - RJ, Rua 19 de fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, Rua laranjeiras 27, Vilar dos teles, Rua Uruguaiana 22, Centro',
            address: req.params.end,
            keyGoogle: 'YOUR-KEY'
        }

        //Busca na Api do Google a geolocalização dos endereços citados.
        const response = await axios.get(`${configApi.url}${configApi.address}&key=${configApi.keyGoogle}`)

        //Guarda as informações da api do Google.
        let api = response.data.results

        //Lista todas as informações da api do Google e guarda em um objeto.
        const coordinantes = api.map((coordinante) => {

            const data = {
                lat: coordinante.geometry.location.lat,
                lng: coordinante.geometry.location.lng
            }

            return data
        })

        // Conta quandos endereços temos.
        let count = coordinantes.length

        // Pega os endereços pecorrendo a cada vetor e aplica o calculo euclidiano.
        const distance = coordinantes.reduce((indice, value) => {
            let valueCoordinante = Math.pow(value.lat - value.lng, 2)
            let valueDistance = Math.sqrt(valueCoordinante * count)
            return valueDistance
        })

        return res.send({ coordinantes, distance })
    }

}

