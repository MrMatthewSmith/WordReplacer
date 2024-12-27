// Function to replace the word 'Trump' with 'idiot'
function replaceWords() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;

  while ((node = walker.nextNode())) {
    node.nodeValue = node.nodeValue.replace(/Trump/gi, 'idiot');
  }
}

// Run the function when the content script is loaded
replaceWords();
