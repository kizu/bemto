/**
 * Module dependencies.
 */

var pug = require('pug')
  , fs = require('fs');

// test cases

var cases = fs.readdirSync('test/cases').filter(function(file){
  return ~file.indexOf('.pug');
}).map(function(file){
  return file.replace('.pug', '');
});

cases.forEach(function(test){
  var name = test.replace(/[-.]/g, ' ');
  if (!fs.existsSync('test/cases/' + test + '.html')) return;
  it(name, function(){
    var path = 'test/cases/' + test + '.pug';
    var str = fs.readFileSync(path, 'utf8');
    var html = fs.readFileSync('test/cases/' + test + '.html', 'utf8').trim().replace(/\r/g, '');
    var fn = pug.compile(str, { filename: path, pretty: true });
    var actual = fn({ title: 'Pug' });
    actual.trim().should.equal(html);
  })
});
