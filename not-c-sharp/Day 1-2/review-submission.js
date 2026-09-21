function reviewSubmission(wordCount, hasReferences, isLate) {
  let verdict = "";
 
  if (wordCount >= 500) {
    verdict = verdict + "Meets word count. ";
  } else {
    verdict = verdict + "Below word count. ";
  }
 
  if (hasReferences) {
    verdict = verdict + "References included. ";
  } else {
    verdict = verdict + "References missing. ";
  }
 
  if (isLate) {
    verdict = verdict + "Submitted late, one grade band lower.";
  } else {
    verdict = verdict + "Submitted on time.";
  }
 
  return verdict;
}
 
console.log(reviewSubmission(620, true, false));
console.log(reviewSubmission(410, false, true));