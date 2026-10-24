
export const call = async (name, page) => {
  let pages = page;
  if (page === undefined || null) {
    pages = 1;
  }

  let url = `https://www.omdbapi.com/?apikey=${process.env.key}&s=${name}&page=${pages}`;
  let answer = await fetch(url);

  return answer.json();
};

export const full_call = async (Id) => {
  let url = `https://www.omdbapi.com/?apikey=${process.env.key}&i=${Id}&plot=full`;
  let ans = await fetch(url);

  return ans.json();
};

export const load_call = async (name, pages) => {
  let url = `https://www.omdbapi.com/?apikey=${process.env.key}&s=${name}&page=${pages}`;
  let answer = await fetch(url);

  return answer.json();
};
