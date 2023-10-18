function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchDataAndProcess() {
  try {
    const url = 'https://raw.githubusercontent.com/DO-Ui/bombparty-bot/master/wordlist.txt';
    const response = await fetch(url);
    const text = document.querySelector('.syllable').textContent;
    const html = await response.text();
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const extractedText = tempElement.textContent.split("\n");
    shuffleArray(extractedText);
    extractedText.sort((a, b) => a.length - b.length);
    const final = extractedText.filter(item => item.includes(text)).slice(0, 4).join("\n");
    console.log(final);
  } catch (error) {
    console.error("Error fetching the URL:", error);
  }
}

fetchDataAndProcess();

const targetNode = document.querySelector('.syllable');

function handleTextChange(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'characterData' || mutation.type === 'childList') {
      fetchDataAndProcess();
    }
  }
}

const observer = new MutationObserver(handleTextChange);
const config = { characterData: true, childList: true, subtree: true };
observer.observe(targetNode, config);
