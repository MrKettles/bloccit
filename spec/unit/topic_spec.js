const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Topic', () => {
	beforeEach((done) => {
		this.topic;
		this.post;
		sequelize.sync({force: true}).then((res) => {
			Topic.create({
				title: 'Expeditions to Alpha Centauri',
				description: 'A compilation of reports from recent visits to the star system.'
			})
			.then((topic) => {
				this.topic = topic;

				Post.create({
					title: 'My first visit to Proxima Centauri b',
					body: 'I saw some rocks.',
					topicId: this.topic.id
				})
				.then((post) => {
					this.post = post;
					done();
				});
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe('#create()', () => {
		it('should create an object and store it to the database if correct fields are given', (done) => {
			Topic.findAll()
			.then((topics) => {
				const lengthBeforeCreate = topics.length;

				Topic.create({
					title: 'Topical Ointments',
					description: 'Avoiding eczema'
				})
				.then(() => {
					Topic.findAll()
					.then((allTopics) => {
						expect(allTopics.length).toBe(lengthBeforeCreate + 1);
						done();
					})
					.catch((err) => {
						console.log(err);
						done();
					})
				})
			})
		})
	});

	describe('#getPosts()', () => {
		it('should return array of posts associated with topic', (done) => {
			this.topic.getPosts()
			.then((posts) => {
				expect(posts[0].title).toBe('My first visit to Proxima Centauri b');
				done();
			});
		});
	});

})