var React = require('react');
import path from 'path';
var renderToString = require('react-dom/server').renderToString;
import Main from '../components/Main';
var fs = require('fs');

module.exports = {
  
  handleRender(req, res) {
    const html = renderToString(
      <Main />
    );
    fs.readFile(path.resolve(__dirname, '../../public/index2.html'), 'utf8', function (err, file) {
      if (err) {
        return console.log(err);
      }
      const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
      res.send(document);
    });
  }
  
};