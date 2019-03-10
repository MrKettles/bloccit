const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const Flair = require('../../src/db/models').Flair;

describe('Flair', () => {
	beforeEach(done => {
		this.topic;
		this.post;
		this.flair;

		sequelize.sync({force: true}).then(res => {
			Topic.create({
				title: 'Knitting Corner',
				description: 'All things knitting'
			})
			.then(topic => {
				this.topic = topic;

				Post.create({
					title: 'Beginner Needle Size',
					body: 'I am just getting started knitting, and I am unsure what needle size I should start with. Any suggestions?',
					topicId: topic.id 
				})
				.then(post => {
					this.post = post;

					Flair.create({
						name: 'Hardware',
						color: 'Red'
					})
					.then(flair => {
						this.flair = flair;
						done();
					})
				})
			})
			.catch(err => {
				console.log(err);
				done();
			})
		})
	});

	describe('#create()', () => {
		it('should create a new Flair object with the included fields', (done) => {
			Flair.create({
				name: 'Technique',
				color: 'Purple'
			})
			.then(flair => {
				expect(flair.name).toBe('Technique');
				expect(flair.color).toBe('Purple');
				done();
			})
			.catch(err => {
				console.log(err);
				done();
			});
		});

		it('should not create a Flair if the name field is not included', (done) => {
			Flair.create({
				name: '',
				color: 'blue'
			})
			.then(flair => {
				done();
			})
			.catch(err => {
				expect(err.message).toBe('Flair.name cannot be null');
				done();
			});
		});
	});

});