const newUrl = new URL("https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1")
newUrl.searchParams.delete("page");
console.log(newUrl);