const Ad = require('./models').Advertisement;

module.exports = {
	getAllAds(callback){
		return Ad.all()
		.then(advertisement => {
			callback(null, advertisement);
		})
		.catch(err => {
			callback(err);
		})
	},

	showAd(adID, callback){
		return Ad.findById(adID)
		.then(advertisement => {
			callback(null, advertisement);
		})
		.catch(err => {
			callback(err);
		})
	},

	addAd(adContent, callback){
		return Ad.create({
			title: adContent.title,
			description: adContent.description
		})
		.then(advertisement => {
			callback(null, advertisement);
		})
		.catch(err => {
			callback(err);
		})
	},

	updateAd(id, updatedAd, callback){
		return Ad.findById(id)
		.then(advertisement => {
			if(!advertisement){
				return callback('Advertisement not found');
			}
			advertisement.update(updatedAd, {
				fields: Object.keys(updatedAd)
			})
			.then(()=>{
				callback(null, advertisement);
			})
			.catch(err => {
				callback(err);
			})
		})
	},

	destroyAd(id, callback){
		return Ad.destroy({
			where: {id}
		})
		.then(advertisement => {
			callback(null, advertisement);
		})
		.catch(err => {
			callback(err);
		})
	}

}