const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const request = require('request');
const { name } = require('../../package.json');

function md5( data )
{
  return crypto.createHash('md5').update(data).digest('hex');
}

function getTempDir(name)
{
  return path.join( os.tmpdir(), name );
}

async function ensureTmpDirExists()
{
  const tmpDir = getTempDir( name );

  await fs.ensureDir( tmpDir );

  return tmpDir;
}

async function loadSchema( uri )
{
  const dir = await ensureTmpDirExists();
  const hashedPath = path.join( dir, md5( uri ) );

  if ( await fs.pathExists( hashedPath ) ) {
    return fs.readFileSync( hashedPath, { encoding: 'utf8' } );
  } else {
    request( uri )
      .pipe( fs.createWriteStream( hashedPath ) )
      .on('finish', () => fs.readFileSync( hashedPath, { encoding: 'utf8' } ) );
  }
}

module.exports = {
  md5,
  getTempDir,
  ensureTmpDirExists,
  loadSchema,
};
