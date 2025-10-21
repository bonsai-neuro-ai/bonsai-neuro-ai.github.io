const mathjaxPlugin = require("eleventy-plugin-mathjax");

const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Thanks to https://www.dawidsblog.com/posts/tutorial_11ty_github_pages/
  // necessary to automatically prepend the prefix to internal links
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Add a copy of static assets files
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("date", require("./src/assets/js/date.js"));
  
  eleventyConfig.addPlugin(mathjaxPlugin);

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      output: "_site"
    }
  };
};
