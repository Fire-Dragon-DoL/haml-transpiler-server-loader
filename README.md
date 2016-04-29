# haml-transpiler-server-loader

Simple loader to transpile HAML files into HTML while using
[haml-transpiler-server](https://github.com/Fire-Dragon-DoL/haml-transpiler-server),
which allows proper transpiling with decent performance while using the Ruby
executable (which is the original HAML implementation).

## Requirements

- Ruby
- [haml-transpiler-server](https://github.com/Fire-Dragon-DoL/haml-transpiler-server)

## Installation

    gem install haml-transpiler-server
    npm install haml-transpiler-server-loader --save-dev

## Usage

Use it as a simple loader in your webpack configuration:

```js
{
  test: /\.html\.haml$/,
  loader: "file-loader?name=[path][name].html!haml-transpiler-server-loader",
  exclude: [
    /node_modules/
  ]
}
```

Then, before starting webpack, start the transpiler server:

    hamlts

At this point, you are good to go. Start your webpack config and everything
should work properly.

Check our
[usage example](https://github.com/Fire-Dragon-DoL/haml-transpiler-server-loader/tree/master/example)

## Configuration

You can configure which server `haml-transpiler-server-loader` listens to by
setting the following query values or by setting in webpack config the key
`hamlTranspilerServerLoader` (query has priority):

- `ip` the server hostname or IP, defaults to `"127.0.0.1"`
- `port` the server port, defaults to `5487`
- `moduleExport` boolean, if the loader should output a simple string or a
  `module.exports = "templateContent";`

### Example

```js
var webpackConfig = {
  module: {
    loaders: [
      {
        test: /\.haml$/,
        loader: "haml-transpiler-server-loader?-moduleExport&port=1234",
        exclude: [
          /node_modules/
        ]
      }
    ]
  },
  hamlTranspilerServerLoader: {
    ip:           "127.0.0.1",
    port:         5487,
    moduleExport: true
  }
};
```
