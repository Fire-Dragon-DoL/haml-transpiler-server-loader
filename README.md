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
setting the following env variables:

- `HAMLTS_IP` the server hostname or IP, defaults to `127.0.0.1`
- `HAMLTS_PORT` the server port, defaults to `5487`
