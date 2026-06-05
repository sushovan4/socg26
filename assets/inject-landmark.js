// Broadsheet title-block injector — masthead, edition line, seal, byline,
// speaker notes, and floating pull-quote. Customize the marked sections
// for each talk; leave the structural scaffolding intact.

(function () {
  // ============================================================
  // CUSTOMIZE PER TALK — title-block content
  // ============================================================
  var ARXIV_URL = 'https://arxiv.org/abs/2411.09182';

  var GAZETTE = {
    volume:   'Vol. 367',
    issue:    'No. 3',
    name:     'The Dagstuhl Gazette',
    edition:  'SoCG Edition',
  };

  var COAUTHORS = [
    'Henry Adams',
    'Fedor Manin',
    'Žiga Virk',
    'Nicolò Zava',
  ];

  var EDITION_LINE = {
    field:    'Computational Geometry · Applied Topology · Gromov–Hausdorff',
    venue:    { text: 'SoCG 2026 · New Brunswick, NJ',
                href: 'https://cgweek26.computational-geometry.org/' },
  };

  var PULLQUOTE = {
    body:    'Too little distortion, and the map would have to tear the graph apart. Connectedness forbids it — so Gromov–Hausdorff and Hausdorff must agree.',
    attrib:  'a dispatch on distortion',
  };

  // Speaker notes for the title slide (HTML; presenter-only).
  // Inline `::: {.notes}` at the top of the .qmd would create a phantom
  // empty slide, so we inject the title's notes here instead.
  var TITLE_NOTES_HTML =
    '<p>Thanks — good morning. The talk is <strong>Lower Bounding the Gromov–Hausdorff Distance in Metric Graphs</strong>. ' +
    'Joint work with Henry Adams, Fedor Manin, Žiga Virk, and Nicolò Zava.</p>' +
    '<p>Here is the one sentence to land. The Gromov–Hausdorff distance is brutal to compute — even approximating it within a factor of three is NP-hard for trees. ' +
    'But for a dense enough sample <em>X</em> of a metric graph <em>G</em>, the Gromov–Hausdorff distance simply <em>equals</em> the easy-to-compute Hausdorff distance. ' +
    'And the reason is pure topology: a map with too little distortion would contradict the connectedness of <em>G</em>.</p>' +
    '<p>Four acts. One — the problem: a distance you cannot compute. Two — the idea: connectedness as an obstruction, with trees as the clean case. ' +
    'Three — the circle, where we sharpen the density threshold from π/6 to π/3, and that is optimal. Four — general metric graphs, and what stays open.</p>';

  // ============================================================
  // STRUCTURAL SCAFFOLDING — usually no edits needed below
  // ============================================================

  function makePlate(cls, label, svg, href) {
    var el = href ? document.createElement('a') : document.createElement('figure');
    el.className = cls;
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('data-plate', label);
    if (href) { el.href = href; el.target = '_blank'; el.rel = 'noopener'; }
    el.innerHTML = svg;
    return el;
  }

  function makeEdition(items) {
    var line = document.createElement('div');
    line.className = 'edition-line';
    items.forEach(function (item) {
      if (!item) return;
      var s = document.createElement('span');
      if (typeof item === 'string') {
        s.textContent = item;
      } else {
        var a = document.createElement('a');
        a.href = item.href; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = item.text;
        s.appendChild(a);
      }
      line.appendChild(s);
    });
    return line;
  }

  // Decorative placeholder SVGs for the left/right title-block "landmark plates".
  // Replace with talk-relevant figures (a thumbnail diagram, QR code, etc.)
  // when you want them; the broadsheet aesthetic also works without them.
  // Left landmark: a metric graph (core loop + hanging trees) with a sparse sample X.
  var LEFT_PLATE_SVG  =
    '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">' +
      '<g stroke="#2b211a" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.78">' +
        '<path d="M 300 150 C 430 150 470 260 430 360 C 390 460 210 460 170 360 C 130 260 170 150 300 150 Z"/>' +
        '<line x1="300" y1="150" x2="300" y2="60"/>' +
        '<line x1="300" y1="60" x2="240" y2="30"/>' +
        '<line x1="300" y1="60" x2="360" y2="30"/>' +
        '<line x1="430" y1="360" x2="520" y2="400"/>' +
        '<line x1="170" y1="360" x2="80" y2="400"/>' +
      '</g>' +
      '<g fill="#6c1d1a" stroke="#f5efde" stroke-width="2.5" opacity="0.95">' +
        '<circle cx="300" cy="150" r="11"/><circle cx="412" cy="208" r="11"/>' +
        '<circle cx="430" cy="360" r="11"/><circle cx="300" cy="445" r="11"/>' +
        '<circle cx="172" cy="312" r="11"/><circle cx="186" cy="196" r="11"/>' +
        '<circle cx="300" cy="60" r="11"/><circle cx="80" cy="400" r="11"/>' +
        '<circle cx="520" cy="400" r="11"/>' +
      '</g>' +
    '</svg>';
  // Right landmark: a scannable QR code to the arXiv paper (assets/qr-arxiv.svg,
  // generated from ARXIV_URL). The plate itself is also a clickable link.
  var RIGHT_PLATE_SVG =
    '<img src="assets/qr-arxiv.svg" alt="QR code to the arXiv paper" />';

  // Wax seal — initials inside a serif circle. Customize the textPaths
  // (top/bottom band) and inner monogram for your name.
  var SEAL_SVG =
    '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="wax-seal" viewBox="0 0 80 80" role="img" aria-label="Author seal">' +
      '<defs>' +
        '<style>' +
          '.seal-ring { stroke: currentColor; fill: none; stroke-width: 1.3; }' +
          '.seal-inner { stroke: currentColor; fill: none; stroke-width: 0.45; }' +
          '.seal-mark { fill: currentColor; stroke: none; }' +
          '.seal-mono { font-family: "EB Garamond", Georgia, serif; font-weight: 700; font-size: 14px; fill: currentColor; }' +
          '.seal-band { font-family: "Alegreya SC", "EB Garamond", Georgia, serif; font-size: 4.6px; letter-spacing: 0.22em; fill: currentColor; }' +
        '</style>' +
        '<path id="seal-top" d="M 11 40 A 29 29 0 0 1 69 40" />' +
        '<path id="seal-bottom" d="M 11 40 A 29 29 0 0 0 69 40" />' +
      '</defs>' +
      '<circle class="seal-ring" cx="40" cy="40" r="36" />' +
      '<circle class="seal-inner" cx="40" cy="40" r="33" />' +
      '<circle class="seal-inner" cx="40" cy="40" r="22" />' +
      '<text class="seal-band"><textPath href="#seal-top" startOffset="50%" text-anchor="middle">SVSHOVAN MAJHI</textPath></text>' +
      '<text class="seal-band"><textPath href="#seal-bottom" startOffset="50%" text-anchor="middle">· ANNO MMXXVI ·</textPath></text>' +
      '<text class="seal-mono" x="40" y="46" text-anchor="middle">SM</text>' +
    '</svg>';

  function inject() {
    var tb = document.querySelector('.quarto-title-block');
    if (!tb || tb.querySelector('.masthead')) return;

    var titleEl    = tb.querySelector('h1.title');
    var subtitleEl = tb.querySelector('.subtitle');
    var authorEl   = tb.querySelector('.quarto-title-author-name, .author');
    var dateEl     = tb.querySelector('p.date, .date');

    var author = authorEl ? authorEl.textContent.trim() : '';
    var date   = dateEl   ? dateEl.textContent.trim()   : '';

    var volBadge = document.createElement('div');
    volBadge.className = 'edition-badge title-volume';
    volBadge.innerHTML =
      '<span>' + GAZETTE.volume  + '</span>' +
      '<span>' + GAZETTE.issue   + '</span>' +
      '<span>' + GAZETTE.name    + '</span>' +
      '<span>' + GAZETTE.edition + '</span>';

    var seal = document.createElement('div');
    seal.className = 'title-seal';
    seal.setAttribute('aria-hidden', 'true');
    seal.innerHTML = SEAL_SVG;

    var masthead = document.createElement('header');
    masthead.className = 'masthead';

    var row = document.createElement('div');
    row.className = 'masthead-row';

    var left  = makePlate('landmark-plate left',  'I',   LEFT_PLATE_SVG);
    var right = makePlate('landmark-plate right qr-plate', 'III', RIGHT_PLATE_SVG, ARXIV_URL);

    var text = document.createElement('div');
    text.className = 'masthead-text';
    if (titleEl)    text.appendChild(titleEl);
    if (subtitleEl) text.appendChild(subtitleEl);

    if (COAUTHORS.length > 0) {
      var byline = document.createElement('p');
      byline.className = 'masthead-byline';
      var names = COAUTHORS.map(function (n) {
        return '<span class="byline-name">' + n + '</span>';
      }).join(' · ');
      byline.innerHTML = '<span class="byline-label">with</span> ' + names;
      text.appendChild(byline);
    }

    row.appendChild(left);
    row.appendChild(text);
    row.appendChild(right);
    masthead.appendChild(row);

    masthead.appendChild(makeEdition([
      author,
      EDITION_LINE.field,
      EDITION_LINE.venue,
      date,
    ]));

    var auths = tb.querySelector('.quarto-title-authors');
    if (auths)  auths.style.display  = 'none';
    if (dateEl) dateEl.style.display = 'none';

    tb.insertBefore(masthead, tb.firstChild);
    tb.insertBefore(volBadge, masthead);
    tb.appendChild(seal);

    var notes = document.createElement('aside');
    notes.className = 'notes';
    notes.innerHTML = TITLE_NOTES_HTML;
    tb.appendChild(notes);

    var quote = document.createElement('aside');
    quote.className = 'title-pullquote';
    quote.innerHTML =
      '<blockquote>' + PULLQUOTE.body + '</blockquote>' +
      '<div class="attribution">' + PULLQUOTE.attrib + '</div>';
    tb.appendChild(quote);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

// Toggle a "finis" class on .reveal while the colophon slide is showing, so the
// theme can drop the running footer and page number on the back page. Quarto
// strips data-state from headings, so we drive it from Reveal's slide events.
(function () {
  function hook() {
    if (typeof Reveal === 'undefined' || !Reveal.on) { setTimeout(hook, 100); return; }
    function update() {
      var cur = Reveal.getCurrentSlide();
      var isColophon = !!(cur && cur.classList && cur.classList.contains('colophon'));
      var r = document.querySelector('.reveal');
      if (r) r.classList.toggle('finis', isColophon);
    }
    Reveal.on('slidechanged', update);
    Reveal.on('ready', update);
    update();
  }
  hook();
})();
