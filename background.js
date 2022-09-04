const excludes = [
  'email',
  'id',
  'identifier',
  'username',
  'pw',
  'rpw',
  'pass',
  'password',
  'passwd'
];

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameType === 'outermost_frame') {
    chrome.scripting.executeScript({
      args: [excludes],
      world: 'MAIN',
      target: {
        tabId: details.tabId
      },
      func: (excludes) => {
        document.querySelectorAll('input:not([type=hidden]):not([type=submit])').forEach((el) => {
          if (el.autocomplete || (el.name || '').toLowerCase().includes(excludes)) return;
          
          el.setAttribute('autocomplete', 'off');
        });
      }
    });
  }
}, {
  url: [
    {
      schemes: ['http', 'https'],
    }
  ]
});
