var url         = require("url");
var Promise     = require("bluebird");
var FormData    = require("form-data");
var fetch       = require("node-fetch");
var loaderUtils = require("loader-utils");

function wrapInModuleExport(transpiledText) {
  return "module.exports = " + JSON.stringify(transpiledText) + ";";
}

module.exports = function(content, map) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var result   = null;
  var config   = {
    port:         5487,
    ip:           "127.0.0.1",
    moduleExport: false
  };
  var queryConfig = loaderUtils.getLoaderConfig(
    this,
    "hamlTranspilerServerLoader"
  );

  config = Object.assign(config, queryConfig);

  console.log("configuration: ", config.toJSON());

  var requestUrl = url.format({
    protocol: "http",
    slashes:  true,
    hostname: config.ip,
    port:     config.port,
    pathname: "/content"
  });

  var data = new FormData()
  data.append("content", (content || "").toString());

  var requestOptions = {
    method: "POST",
    body:   data
  };

  if (!callback) throw new Error("Couldn't create async callback");

  function callbackSuccess(response) {
    return response.text()
      .catch(function() {
        return new Error("Can't extract body text from server response");
      });
  }

  function buildHttpError(response) {
    var errorText = "";
    errorText += "HTTP CODE: " + response.status + " ";
    errorText += response.statusText;

    return errorText;
  }

  function callbackError(response) {
    return response.text()
      .then(function(text) {
        return buildHttpError(response) + "\r\n" + text;
      })
      .catch(function() {
        var errorText  = buildHttpError(response);
            errorText += "\r\n[Can't extract body text from server response]";
        return errorText;
      })
      .then(function(errorMessage) {
        return Promise.reject(new Error(errorMessage));
      });
  }

  fetch(requestUrl, requestOptions)
    .then(function(response) {
      if (response.ok) {
        return callbackSuccess(response);
      } else {
        return callbackError(response);
      }
    })
    .then(function(transpiled) {
      if (config.moduleExport)
        transpiled = wrapInModuleExport(transpiled)
      callback(null, transpiled, map)
    })
    .catch(function(error) {
      var errorText = (error || "").toString();
      callback(new Error(errorText), content, map);
    });
}
