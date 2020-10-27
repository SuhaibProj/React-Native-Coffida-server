/*
 Test the unsuccessful creation of users.
 */


const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const filename = path.basename(__filename);

// Require the project-specific JavaScript files
const config = require('./config/config.js');
const userdata = require('./data/users.data.js');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const server_url = config.getProperties().url;
let arrayOfBadUsersData = userdata.usersBadData(); // get an array of the data to test successful POST /users
let test_case_count = 0; // count of test cases

describe('Test malformed creation of users.', function () {

    // Output filename of test script for cross reference
    before(function(){
        console.log('    [Script: ' + filename + ']')
    });

    arrayOfBadUsersData.forEach((user) => {

        it('Should return 4xx status code: ' + user.testDescription, function () {
            return chai.request(server_url)
                .post('/user')
                .send({
                    given_name: user.givenName,
                    family_name: user.familyName,
                    email: user.email,
                    password: user.password
                })
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('id');
                    user.userid = res.body['id'];
                    throw new Error('Incorrectly creating user.');
                })
                .catch(function (err) {
                    // expect(err).to.have.any.status(400, 500);

                    if (typeof err.status !== 'undefined') {
                        if (err.status === 400) {
                            expect(err).to.have.status(400);
                        } else if (err.status === 500) {
                            expect(err).to.have.status(500);
                        }
                    }
                    else {
                        throw err;
                    }
                });
        });
    });
});
