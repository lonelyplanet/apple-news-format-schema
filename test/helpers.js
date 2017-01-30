const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const request = require('request');
const tmpDir = path.join( os.tmpdir(), require('../package.json').name );

function md5( data )
{
  return crypto.createHash('md5').update(data).digest("hex");
}

function ensureTmpDirExists()
{
  return new Promise( (resolve, reject) => {
    try {

      if ( ! fs.existsSync( tmpDir ) ) {
        fs.mkdirSync( tmpDir );
      }

      resolve( tmpDir );

    } catch ( error ) {

      reject( error );

    }
  });
}

function loadSchema( schema )
{
  return new Promise( (resolve, reject) => {
    try {
      ensureTmpDirExists().then( dir => {
        const hashedPath = path.join( dir, md5( schema ) );

        if ( fs.existsSync( hashedPath ) ) {

          resolve( JSON.parse( fs.readFileSync( hashedPath, 'utf8' ) ) );

        } else {

          request( schema, (error, response, body) => {
            if ( ! error && response.statusCode == 200 ) {
              fs.writeFileSync( hashedPath, body );
              resolve( JSON.parse( fs.readFileSync( hashedPath, 'utf8' ) ) );
            } else {
              reject( error );
            }
          });

        }
      });

    } catch ( error ) {

      reject( error );

    }
  });
}

module.exports = {
  md5,
  ensureTmpDirExists,
  loadSchema
};
