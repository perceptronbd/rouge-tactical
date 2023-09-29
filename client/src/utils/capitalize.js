export function capitalizeFirstWord(str) {
  const words = str.split(" ");
  if (words.length === 0) {
    return str;
  }
  const capitalizedWords = [capitalizeFirstLetter(words[0]), ...words.slice(1)];
  return capitalizedWords.join(" ");
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
