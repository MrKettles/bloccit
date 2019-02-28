const adQueries = require('../db/queries.advertisements');

module.exports = {
	showAll(req, res, next){
		adQueries.getAllAds((err, advertisements) => {
			if(err){
				res.redirect(500, '../');
			} else {
				res.render('advertisements/index', {advertisements});
			}
		})
	},

	show(req, res, next){
		adQueries.showAd(req.params.id, (err, advertisement) => {
			if(err){
				res.redirect(404, '/');
			} else {
				res.render('advertisements/show', {advertisement});
			}
		})
	},

	showNew(req, res, next){
		res.render('advertisements/new');
	},

	createAd(req, res, next){
		let newAd = {
			title: req.body.title,
			description: req.body.description
		};
		adQueries.addAd(newAd, (err, advertisement) =>{
			if(err){
				res.redirect(500, '../');
			} else {
				res.redirect(303, `/advertisements/${advertisement.id}`);
			}
		})
	},

	edit(req, res, next){
		adQueries.showAd(req.params.id, (err, advertisement) => {
			if(err){
				res.redirect(404, `advertisements/${req.params.id}`);
			} else {
				res.render('advertisements/edit', {advertisement});
			}
		});
	},

	update(req, res, next){
		adQueries.updateAd(req.params.id, req.body, (err, advertisement) => {
			if(err){
				res.redirect(404, `/advertisements/${req.params.id}/edit`);
			} else {
				res.redirect(303, `/advertisements/${req.params.id}`);
			}
		})
	},

	destroy(req, res, next){
		adQueries.destroyAd(req.params.id, (err, advertisement) => {
			if(err){
				res.redirect(500, `/advertisements/${req.params.id}`);
			} else {
				res.redirect(303, '/advertisements');
			}
		})
	}

}