const request = require('request');
const server = require('../../src/server.js');
const sequelize = require('../../src/db/models/index').sequelize;
const Ad = require('../../src/db/models/').Advertisement;
const base = 'http://localhost:3000/advertisements/';

describe('routes : advertisements', () => {

	beforeEach((done) => {
		this.advertisement;
		sequelize.sync({force: true}).then((res) => {
			Ad.create({
				title: "Porksmith Baked Beans",
				description: "Beans are good for the soul."
			})
			.then((advertisement) => {
				this.advertisement = advertisement;
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe('GET /advertisements', () => {

		it('should return status code 200 and show all ads', (done) => {
			request.get(base, (err, res, body) => {
				expect(err).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toContain('All Advertisements');
				done();
			});
		});

	});

	describe('GET /advertisements/new', () => {
		it('should render a view with a New Advertisement form', (done) => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('New Advertisement');
				done();
			});
		});
	});

	describe('GET /advertisements/:id', () => {
		it('should show the specific advertisement', (done) => {
			request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain("Porksmith Baked Beans");
				done();
			})
		})
	})

	describe('POST /advertisements/createAd', () => {
		it('should add an advertisement to the database', (done) => {
			const options = {
				url: `${base}createAd`,
				form: {
					title: "Advertisements Galore",
					description: "Wholesale advertisements at a price you can afford!"
				}
			};

			request.post(options, (err, res, body) => {
				Ad.findOne({where: {title: "Advertisements Galore"}})
				.then((ad) => {
					expect(err).toBeNull();
					expect(res.statusCode).toBe(303);
					expect(ad.description).toBe("Wholesale advertisements at a price you can afford!");
					done();
				})
				.catch((err) => {
					console.log(err);
					done();
				});
			});
		});
	});

	describe('GET /advertisements/:id/edit', () => {
		it('should display a form with an editable version of the current ad', (done) => {
			request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('Edit Advertisement');
				expect(body).toContain('Porksmith Baked Beans');
				done();
			})
		})
	})

	describe('POST /advertisements/:id/update', () => {
		it('should update the ad information and redirect to the updated ad view', (done) => {
			const updatedPost = {
				url: `${base}${this.advertisement.id}/update`,
				form: {
					title: 'Gene Ween Baked Beans',
					description: 'Baked beans from Gener'
				}
			};

			request.post(updatedPost, (err, res, body) => {
				expect(err).toBeNull();
				Ad.findById(this.advertisement.id)
				.then((advertisement) => {
					expect(res.statusCode).toBe(303);
					expect(advertisement.title).toBe('Gene Ween Baked Beans');
					done();
				});
			});
		});
	});

	describe('POST /advertisements/:id/destroy', () => {
		it('should delete the specified entry from the database and redirect to index', (done) => {
			request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
				expect(err).toBeNull();
				Ad.findById(this.advertisement.id).then(ad => {
					expect(res.statusCode).toBe(303);
					expect(ad).toBeNull();
					done();
				});
			});
		});
	});

});