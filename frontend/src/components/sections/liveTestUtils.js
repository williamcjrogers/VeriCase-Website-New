// What the reader sees typed so far: the visual copy holds the whole line, with the untyped rest
// unseen (.typed-rest), so the typed part is the visual text less that rest.
export const typedSoFar = (typed) => {
  const visual = typed.querySelector('.typed-visual');
  const rest = visual.querySelector('.typed-rest');
  return visual.textContent.slice(0, visual.textContent.length - (rest ? rest.textContent.length : 0));
};
