const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAtArray')

module.exports = {
    async index(req, res){
        const {latitude, longitude, techs} =  req.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                },
                $maxdistance:10000
            },
        })

        return res.json({devs})
    }
}