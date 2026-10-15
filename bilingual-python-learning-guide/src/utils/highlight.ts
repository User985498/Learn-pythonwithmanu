// Lightweight Python syntax highlighter that escapes HTML safely and wraps tokens.
export function highlightPython(code: string): string {
  // Escape HTML
  let esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const keywordSet = new Set([
    'False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or','pass','raise','return','try','while','with','yield','match','case',
  ]);
  const builtinSet = new Set([
    'print','len','range','list','dict','tuple','set','str','int','float','bool','isinstance','type','open','enumerate','map','filter','zip','sum','min','max','abs','round','sorted','reversed','any','all','next','iter','hasattr','getattr','setattr','super','object','property','staticmethod','classmethod','__init__','__repr__','__str__','__eq__','__lt__','__gt__','__len__','__getitem__','__setitem__','__iter__','__next__','__enter__','__exit__','__name__','__main__','__new__','__get__','__set__','__set_name__','ValueError','TypeError','KeyError','IndexError','ZeroDivisionError','Exception','IOError','FileNotFoundError','StopIteration','NotImplementedError','pytest',
  ]);
  const kwRe = /\b(?<![.])([A-Za-z_]\w*)\b/g;

  // Order matters: comments first (go to end of line), then decorator-ish content
  // Step 1: replace comments
  esc = esc.replace(/(^|[^\\])(#[^\n]*)/g, (_m, pre, comment) => `${pre}<span class="tok-com">${comment}</span>`);

  // Step 2: replace strings (triple and single quoted)
  esc = esc.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (s) => `<span class="tok-str">${s}</span>`);
  esc = esc.replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, (s) => `<span class="tok-str">${s}</span>`);

  // Step 3: numbers
  esc = esc.replace(/\b(\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)\b/g, '<span class="tok-num">$1</span>');

  // Step 4: keywords / builtins / defs
  esc = esc.replace(kwRe, (_m, word) => {
    if (keywordSet.has(word)) return `<span class="tok-kw">${word}</span>`;
    if (builtinSet.has(word)) return `<span class="tok-fn">${word}</span>`;
    return word;
  });

  return esc;
}
