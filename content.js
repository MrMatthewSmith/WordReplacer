function replaceWords(regexReplacements) {
  console.log('Starting word replacement...');

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;

  while ((node = walker.nextNode())) {
    let originalText = node.nodeValue;
    let modifiedText = originalText;

    for (const { regex, replacement } of regexReplacements) {
      modifiedText = modifiedText.replace(regex, replacement);
    }

    if (originalText !== modifiedText) {
      console.log(`Modified text: "${originalText}" → "${modifiedText}"`);
    }

    node.nodeValue = modifiedText;
  }

  console.log('Word replacement complete.');
}

chrome.storage.local.get('words', (data) => {
  console.log('Loading words from Chrome storage...');

  const words = data.words || [];
  console.log(`Loaded ${words.length} replacement pairs.`);

  const regexReplacements = words.map((pair) => ({
    regex: new RegExp(pair.word, 'gi'), // Case-insensitive regex
    replacement: pair.replacement,
  }));

  // Call replaceWords with the list of regex replacements
  replaceWords(regexReplacements);
});
