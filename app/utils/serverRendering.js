import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import Main from '../components/Main';
import fs from 'fs';

module.exports = {

    handleRender(req, res) {
        const html = renderToString(
            <Main />
        );
        fs.readFile(path.resolve(__dirname, '../../public/index2.html'), 'utf8', function(err, file) {
            if (err) {
                return console.log(err);
            }
            const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
            res.send(document);
        });
    }

};
