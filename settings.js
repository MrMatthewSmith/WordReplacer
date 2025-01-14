console.log('settings.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const wordList = document.getElementById('word-list');
  const newWordInput = document.getElementById('new-word');
  const replacementInput = document.getElementById('replacement');
  const addWordButton = document.getElementById('add-word');
  const clearListButton = document.getElementById('clear-list');

  console.log('here');
  // Load words from storage
  chrome.storage.local.get('words', (data) => {
    const words = data.words || [];
    console.log(words);
    words.forEach((pair) => {
      addWordToUI(pair.word, pair.replacement);
    });
  });

  clearListButton.addEventListener('click', () => {
    console.log('clearing list');
    chrome.storage.local.remove('words', () => {
      if (chrome.runtime.lastError) {
        console.error('Error clearing words:', chrome.runtime.lastError);
      } else {
        console.log('List cleared successfully');

        const wordList = document.getElementById('word-list');
        if (wordList) {
          wordList.innerHTML = '';
        }
      }
    });
  });

  // Add word to the UI and storage
  addWordButton.addEventListener('click', () => {
    console.log('clickity');
    const newWord = newWordInput.value.trim();
    const replacement = replacementInput.value.trim();

    if (newWord && replacement) {
      chrome.storage.local.get('words', (data) => {
        const words = data.words || [];
        words.push({ word: newWord, replacement });
        chrome.storage.local.set({ words });

        addWordToUI(newWord, replacement);
        newWordInput.value = '';
        replacementInput.value = '';
      });
    }
  });

  // Add word to the UI
  function addWordToUI(word, replacement) {
    console.log('add word to UI');
    const li = document.createElement('li');
    li.textContent = `${word} : ${replacement}`;
    wordList.appendChild(li);
  }
});
