function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function fetchDataAndProcess() {
  var url = 'https://raw.githubusercontent.com/DO-Ui/bombparty-bot/master/wordlist.txt';
  let text = document.querySelector('.syllable').textContent;
  let final = "";
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  fetch(url)
    .then(response => response.text())
    .then(html => {
      var tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      var extractedText = tempElement.textContent.split("\n");
      shuffleArray(extractedText);
      extractedText.sort((a, b) => a.length - b.length);

      extractedText.forEach(item => {
        if (item.includes(text) && final.split('\n').length < 4) {
          final += "\n" + item;
        }
      });

      console.log(final);
    })
    .catch(error => {
      console.error("Error fetching the URL:", error);
    });
}

fetchDataAndProcess();

function handleTextChange(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'characterData' || mutation.type === 'childList') {
      fetchDataAndProcess();
    }
  }
}

const observer = new MutationObserver(handleTextChange);
const targetNode = document.querySelector('.syllable');
const config = { characterData: true, childList: true, subtree: true };
observer.observe(targetNode, config);
