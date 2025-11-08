// public/common.js
let hii = document.querySelector(".hii")
async function fetchAllMovies() {
  const res = await fetch('/api/movies');
  if (!res.ok) throw new Error('Failed to load movies');
  return res.json();
}

// Access variables as a,b,c,d,e...
async function getMovieVariables() {
  const movies = await fetchAllMovies();
  if (movies.length === 0) return null;

  const latest = movies[0]; // latest added movie (unshifted at top)
  const { id, title, image, year, genre, quality, description, link480, link720, link1080 } = latest;

  // create simple labeled vars
  let xhamster = {
  id: id,
  title: title,
  image: image,
  year: year,
  genre: genre,
  quality: quality,
  description: description,
  link480: link480,
  link720: link720,
  link1080: link1080
}
 hii.innerText=title; 
 console.log(xhamster)
  // return them together
//   return { a, b, c, d, e, f, g, h, i, j };
}
getMovieVariables()
