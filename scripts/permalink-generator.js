hexo.extend.filter.register("post_permalink", function (permalink) {
  var date = this.date.format("YYYYMMDDHHmmss");
  return date + "/";
});
