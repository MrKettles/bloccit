const flairQueries = require('../db/queries.flair');
const postQueries = require('../db/queries.posts');

module.exports = {

	addFlair(req, res, next){
		res.render('posts/addFlair', {topicId: req.params.topicId, postId: req.params.id});
	},

	updateFlair(req, res, next){
		let newFlair = {
			name: req.body.name,
			color: req.body.color
		}

		flairQueries.updateFlair(newFlair, req.params.id, (err, flair) => {
			if(err){
				res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			} else {
				res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			}
		})
	},

	editFlair(req, res, next){
		flairQueries.getFlair(req.params.flairId, (err, flair) => {
			if(err){
				res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			} else {
				res.render(`posts/editFlair`, {topicId: req.params.topicId, postId: req.params.id, flair});
			}
		})
	},

	deleteFlair(req, res, next){
		flairQueries.deleteFlair(req.params.id, req.params.flairId, (err, deletedRecordsCount) => {
			if(err){
				res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			} else {
				res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			}
		})
	}

}