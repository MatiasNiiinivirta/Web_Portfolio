function palindrome() {
  var sana = document.getElementById("wordInput").value;

  var sanaUpsideDown = "";

  for (let i = sana.length - 1; i >= 0; i--) {
    sanaUpsideDown += sana[i];
  }

  var resultElement = document.getElementById("result");
  if (sana === sanaUpsideDown) {
    resultElement.textContent = "Sana on palindromi.";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Sana ei ole palindromi.";
    resultElement.style.color = "red";
  }
}
