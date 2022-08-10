var fs = require("fs");
var browserify = require("browserify");
var browserifyCss = require("browserify-css");
var svgify = require("svgify");

browserify("./src/index.js").transform("babelify", {
  presets: ["@babel/preset-env", "@babel/preset-react", {plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]]}],
}).transform(browserifyCss).transform(svgify).bundle().pipe(fs.createWriteStream("./bin/bundle.js"));
