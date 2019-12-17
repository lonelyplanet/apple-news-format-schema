const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const request = require('request');
const { name } = require('../package.json');

function md5( data )
{
  return crypto.createHash('md5').update(data).digest('hex');
}

function ensureTmpDirExists()
{
  const tmpDir = path.join( os.tmpdir(), name );

  return fs.ensureDir( tmpDir ).then( () => tmpDir );
}

function loadSchema( uri )
{
  return new Promise( (resolve, reject) => {
    try {
      ensureTmpDirExists().then( dir => {
        const hashedPath = path.join( dir, md5( uri ) );

        fs.pathExists( hashedPath ).then( exists => {
          if ( exists ) {
            fs.readFile( hashedPath, (err, content) => err ? reject( err ) : resolve( content ) );
          } else {
            request( uri ).pipe( fs.createWriteStream( hashedPath ) ).on('finish', () => {
              fs.readFile( hashedPath, (err, content) => err ? reject( err ) : resolve( content ) );
            });
          }
        });
      });
    } catch ( err ) {
      reject( err );
    }
  });
}

module.exports = {
  md5,
  ensureTmpDirExists,
  loadSchema,
};
