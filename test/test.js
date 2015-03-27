var should = require('chai').should(),
    t_inlettere = require('inlettere');

describe('conversione', function() {
  it('per 1.23 (parametro come unità "123")', function() {
    t_inlettere('123').should.equal('uno/23');
  });
  it('per 21.59 (parametro come unità "2159")', function() {
    t_inlettere('2159').should.equal('ventuno/59');
  });
  it('per 68.10 (parametro come unità "6810")', function() {
    t_inlettere('6810').should.equal('sessantotto/10');
  });
  it('per 1241.78 (parametro come unità "124178")', function() {
    t_inlettere('124178').should.equal('milleduecentoquarantuno/78');
  });
  it('per 28568.00 (parametro come unità "2856800")', function() {
    t_inlettere('2856800').should.equal('ventottomilacinquecentosessantotto/00');
  });
  it('per 1578421.00 (parametro come unità "157842100")', function() {
    t_inlettere('157842100').should.equal('unmilionecinquecentosettantottomilaquattrocentoventuno/00');
  });
});