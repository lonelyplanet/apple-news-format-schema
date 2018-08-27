# Apple News Format schema

[![Build Status](https://travis-ci.org/lonelyplanet/apple-news-format-schema.svg?branch=master)](https://travis-ci.org/lonelyplanet/apple-news-format-schema)

This schema describes the Apple News Format (`article.json` documents).

https://lonelyplanet.github.io/apple-news-format-schema/schema.json

## Tests

I've included the [example articles from Apple](https://developer.apple.com/news-publisher/download/Apple-News-Example-Articles.zip) and I use this [schema](docs/schema.json) to validate them when running tests.

```shell
make install
make test
```

## Links

- [JSON Schema validators](http://json-schema.org/implementations.html)
- [Apple News](http://www.apple.com/news/)
- [Apple News Format Tutorials](https://developer.apple.com/documentation/apple_news/apple_news_format_tutorials)
- [Apple News Format reference](https://developer.apple.com/documentation/apple_news/apple_news_format)
- [News API reference](https://developer.apple.com/documentation/apple_news/apple_news_api)
