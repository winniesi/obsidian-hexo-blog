hexo.extend.filter.register("before_post_render", function (data) {
  // Generate a 6-digit random number
  let random_number = Math.floor(Math.random() * 900000) + 100000;
  // Replace the :rand placeholder with the random number
  data.permalink = data.permalink.replace(":rand", random_number.toString());
  return data;
});
