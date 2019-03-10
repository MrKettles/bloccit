const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/topics';

const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const Flair = require('../../src/db/models').Flair;

describe('routes : flair', () => {
	beforeEach((done) => {
		this.topic;
		this.post;
		this.flair;

		sequelize.sync({force: true}).then(res => {
			Topic.create({
				title: 'Knitting Corner',
				description: 'For all things knitting'
			})
			.then(topic => {
				this.topic = topic;

				Flair.create({
					name: 'Hardware',
					color: 'Brown'
				})
				.then(flair => {
					this.flair = flair;

					Post.create({
						title: 'Beginner Knitting Needle',
						body: 'Looking for a good needle to learn to knit with',
						topicId: this.topic.id,
						flairId: flair.id
					})
					.then(post => {
						this.post = post;
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					})
				})
			});
		});
	});

	describe('GET topics/:topicId/posts/:postId/addFlair', () => {
		it('should render a form to add a Flair object to a page', (done) => {
			request.get(`${base}/${this.topic.id}/posts/${this.post.id}/addFlair`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('Flair Name');
				expect(body).toContain('Color (Optional)');
				done();
			});
		});
	});

	describe('POST topics/:topicId/posts/:postId/updateFlair', () => {
		it("should add new Flair to model if it doesn't exist and update Post.flairId", (done) => {
			const options = {
				url: `${base}/${this.topic.id}/posts/${this.post.id}/updateFlair`,
				form: {
					name: 'Technique',
					color: 'Purple'
				}
			};

			expect(this.post.flairId).toBe(1);

			request.post(options, (err, res, body) => {
				Flair.findOne({where: {name: 'Technique'}})
				.then(flair => {
					expect(flair).not.toBeNull();
					expect(flair.name).toBe('Technique');
					expect(flair.color).toBe('Purple');
					
					Post.findById(this.post.id).then(post => {
						expect(post.flairId).toBe(2);
						done();
					})

				})
				.catch(err => {
					console.log(err);
					done();
				})
			})
		});

	});

	describe('GET topics/:topic/posts/:id/:flairId/editFlair', () => {
		it('should render a page to allow the flair to be updated', (done) => {
			request.get(`${base}/${this.topic.id}/posts/${this.post.id}/${this.post.flairId}/editFlair`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('Edit Flair');
				expect(body).toContain('Hardware');
				done();
			})
		})
	});

	describe('POST topics/:topic/posts/:id/deleteFlair', () => {
		it('should dissociate Flair from Post', (done) => {
			Post.findById(this.post.id).then(post => {
				expect(post.flairId).toBe(1);

				request.post(`${base}/${this.topic.id}/posts/${this.post.id}/deleteFlair`, (err, res, body) => {
					Post.findById(this.post.id).then(updatedPost => {
						expect(updatedPost.flairId).toBe(null);
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					})
				})
			})
		})
	})

})