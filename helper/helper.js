
function compiledResult(texttosearch, subtext) {
  let str = texttosearch.toUpperCase();
  let sub = subtext.toUpperCase();
  let results = [];
  //result.push({"subtext": subtext})
  let pos = [];
  if (sub.length > str.length) return false;
  for (let i = 0; i < str.length - sub.length + 1; i++) {
    if (str[i] !== sub[0]) continue;
    let exists = true;
    for (let j = 1; j < sub.length && exists; j++) {
      if (str[i + j] === sub[j]) continue;
      exists = false;
    }
    if (exists) {
      pos.push(i + 1);
    }
  }
  results.push({ "subtext": subtext, "result": pos.join(",") });
  return results;
}


exports.compiledResult = compiledResult
