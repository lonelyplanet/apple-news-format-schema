<?php
/**
 * @author Eric King <eric.king@lonelyplanet.com>
 */

namespace LonelyPlanet\AppleNewsFormat;

/**
 * This class provides some helper methods.
 * It is a class so it can be autoloaded with Composer.
 */
class Schema
{
    public static function getPath()
    {
        return realpath( __DIR__ . '/../docs/schema.json' );
    }

    public static function getContents()
    {
        return file_get_contents( self::getPath() );
    }

    public static function toJSON()
    {
        return json_decode( self::getContents() );
    }

    public static function toArray()
    {
        return json_decode( self::getContents(), true );
    }
}
