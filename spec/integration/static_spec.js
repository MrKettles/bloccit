const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/';

describe('routes : static', () => {

  describe('GET /', () => {
    it('should return status code 200', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    describe('GET /marco', ()=> {
      //I'm nesting this to appease the DRY principle, so that I 
      //don't have to test the returned status code twice, but I 
      //don't know if nesting is the best way to accomplish this...
      it('should contain "polo" in the body', (done) => {
        request.get(base + 'marco', (err, res, body) => {
          expect(body).toContain('polo');
          done();
        });
      });
    });

  });


});
