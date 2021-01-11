const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Trade',()=>{

    describe("GET /",()=>{
        it("It should GET all the tasks done",(done) =>{
            chai.request(server)
            .get("/")
            .end((err,response)=>{
                response.should.have.status(200);
                done();
            })
        });

        it("It should not GET all the tasks done",(done) =>{
            chai.request(server)
            .get("/xyz")
            .end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        });

    } )


})