const axios = require('axios')

module.exports = {
    async findAddress(req, res) {

        //Config de acesso da api.s
        ConfApi = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
            address: 'Av. Rio branco 127, centro, rj',
            keyGoogle: 'AIzaSyChxyljBxrQ9yvdS5BOJEWywv1C45lpprw'
        }
        const response = await axios.get(`${ConfApi.url}${ConfApi.address}&key=${ConfApi.keyGoogle}`)
        

        return res.send(response.data)
    }
}