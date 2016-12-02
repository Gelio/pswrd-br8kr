module.exports = function generateNextPassword(alphabet, previousPassword) {
  if (!previousPassword || previousPassword.length == 0)
    return alphabet[0];
  
  let lastCharacter = previousPassword[previousPassword.length - 1];
  let lastCharacterIndex = alphabet.indexOf(lastCharacter);
  if (lastCharacterIndex !== alphabet.length - 1) {
    return previousPassword.slice(0, previousPassword.length - 2) + alphabet[lastCharacterIndex + 1];
  } else {
    return previousPassword + alphabet[0];
  }
}
