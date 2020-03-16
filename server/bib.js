const michelin = require('./michelin');
const maitre = require('./maitre');
const stringSimilarity = require('string-similarity');
const geolib = require('geolib');

/**
 * Get all France located Maitre restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
    let matechedRestaurants = []
    const michelinRestaurants = await michelin.get();
    const maitreRestaurants = await maitre.get();

    maitreRestaurants.forEach(maitreRestaurant => {
        let MaxSimilarity = -1;
        let indexSimilirity = -1;
        let indexDistance = -1;
        const maitreRestaurantName = maitreRestaurant[3].entreprise.toLowerCase()
        const maitreLatitude = maitreRestaurant[0]
        const maitreLongitude = maitreRestaurant[1]
        for (const index in michelinRestaurants) {
            const { lat, lng } = michelinRestaurants[index]._geoloc;
            const distance = geolib.getDistance({ latitude: maitreLatitude, longitude: maitreLongitude },{ latitude: lat, longitude: lng });
            const michelinRestaurantName = michelinRestaurants[index].name.toLowerCase();
            const similarity = stringSimilarity.compareTwoStrings(maitreRestaurantName, michelinRestaurantName); 
            if(similarity>MaxSimilarity && similarity>0.5 && distance<2000){
                MaxSimilarity = similarity;
                indexSimilirity = index;
                indexDistance = distance;
            }
        }
        if(indexSimilirity != -1) {
            const { city_name, country_name, name, michelin_award, guide_year, cuisine_type, image, _geoloc, url } = michelinRestaurants[indexSimilirity];
            let { street, postcode } = michelinRestaurants[indexSimilirity]._highlightResult;

            if(street !== undefined) street = street.value
            if(postcode !== undefined) postcode = postcode.value

            const restaurant = {"address": street, postcode, city_name, country_name, name, michelin_award, guide_year, cuisine_type, image,"geoloc":_geoloc,"url":"https://guide.michelin.com"+url}
            matechedRestaurants.push(restaurant)
        }
    })

    return matechedRestaurants;
};



