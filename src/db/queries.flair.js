const Topic = require('./models').Topic;
const Post = require('./models').Post;
const Flair = require('./models').Flair;

module.exports = {

	updateFlair(newFlair, postId, callback){
		return Flair.findOne({where: {name: newFlair.name}})
		.then(flair => {
			if(!flair){
				Flair.create(newFlair)
				.then(nuFlair => {
					this.updatePostFlair(postId, nuFlair, callback);
				})
			} else {
				flair.update({color: newFlair.color || flair.color})
				.then(nuFlair => {
					this.updatePostFlair(postId, nuFlair, callback);
				})
			}
		})
	},

	updatePostFlair(postId, flair, callback){
		return Post.findById(postId)
		.then(post => {
			post.update({flairId: flair.id})
			.then(() => {
				callback(null, post);
			})
			.catch(err => {
				callback(err);
			})
		})
	},

	getFlair(flairId, callback){
		return Flair.findById(flairId)
		.then(flair => {
			callback(null, flair);
		})
		.catch(err => {
			callback(err);
		})
	},

	deleteFlair(postId, flairId, callback){
		return Post.update({flairId: null}, {where: {flairId}, returning: true})
		.then(postUpdateCount => {
			Flair.destroy({where: {id: flairId}})
			.then(deleteCount => {
				callback(null, deleteCount);
			})
			.catch(err => {
				callback(err);
			})
		})
	}	

}