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
  // Inlined so the QR renders without an external asset (gh-pages publish was
  // dropping the unreferenced assets/qr-arxiv.svg). Regenerate from ARXIV_URL if it changes.
  var RIGHT_PLATE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="QR code linking to arXiv:2411.09182"><rect x="0" y="0" width="600" height="600" fill="#f5efde"/><g fill="#2b211a" shape-rendering="crispEdges"><rect x="36.36" y="36.36" width="127.27" height="18.18"/><rect x="200.0" y="36.36" width="18.18" height="18.18"/><rect x="309.09" y="36.36" width="54.55" height="18.18"/><rect x="400.0" y="36.36" width="18.18" height="18.18"/><rect x="436.36" y="36.36" width="127.27" height="18.18"/><rect x="36.36" y="54.55" width="18.18" height="18.18"/><rect x="145.45" y="54.55" width="18.18" height="18.18"/><rect x="181.82" y="54.55" width="127.27" height="18.18"/><rect x="327.27" y="54.55" width="54.55" height="18.18"/><rect x="400.0" y="54.55" width="18.18" height="18.18"/><rect x="436.36" y="54.55" width="18.18" height="18.18"/><rect x="545.45" y="54.55" width="18.18" height="18.18"/><rect x="36.36" y="72.73" width="18.18" height="18.18"/><rect x="72.73" y="72.73" width="54.55" height="18.18"/><rect x="145.45" y="72.73" width="18.18" height="18.18"/><rect x="181.82" y="72.73" width="72.73" height="18.18"/><rect x="272.73" y="72.73" width="18.18" height="18.18"/><rect x="309.09" y="72.73" width="18.18" height="18.18"/><rect x="363.64" y="72.73" width="54.55" height="18.18"/><rect x="436.36" y="72.73" width="18.18" height="18.18"/><rect x="472.73" y="72.73" width="54.55" height="18.18"/><rect x="545.45" y="72.73" width="18.18" height="18.18"/><rect x="36.36" y="90.91" width="18.18" height="18.18"/><rect x="72.73" y="90.91" width="54.55" height="18.18"/><rect x="145.45" y="90.91" width="18.18" height="18.18"/><rect x="181.82" y="90.91" width="18.18" height="18.18"/><rect x="218.18" y="90.91" width="18.18" height="18.18"/><rect x="327.27" y="90.91" width="90.91" height="18.18"/><rect x="436.36" y="90.91" width="18.18" height="18.18"/><rect x="472.73" y="90.91" width="54.55" height="18.18"/><rect x="545.45" y="90.91" width="18.18" height="18.18"/><rect x="36.36" y="109.09" width="18.18" height="18.18"/><rect x="72.73" y="109.09" width="54.55" height="18.18"/><rect x="145.45" y="109.09" width="18.18" height="18.18"/><rect x="200.0" y="109.09" width="54.55" height="18.18"/><rect x="309.09" y="109.09" width="36.36" height="18.18"/><rect x="381.82" y="109.09" width="18.18" height="18.18"/><rect x="436.36" y="109.09" width="18.18" height="18.18"/><rect x="472.73" y="109.09" width="54.55" height="18.18"/><rect x="545.45" y="109.09" width="18.18" height="18.18"/><rect x="36.36" y="127.27" width="18.18" height="18.18"/><rect x="145.45" y="127.27" width="18.18" height="18.18"/><rect x="200.0" y="127.27" width="18.18" height="18.18"/><rect x="236.36" y="127.27" width="18.18" height="18.18"/><rect x="309.09" y="127.27" width="18.18" height="18.18"/><rect x="400.0" y="127.27" width="18.18" height="18.18"/><rect x="436.36" y="127.27" width="18.18" height="18.18"/><rect x="545.45" y="127.27" width="18.18" height="18.18"/><rect x="36.36" y="145.45" width="127.27" height="18.18"/><rect x="181.82" y="145.45" width="18.18" height="18.18"/><rect x="218.18" y="145.45" width="18.18" height="18.18"/><rect x="254.55" y="145.45" width="18.18" height="18.18"/><rect x="290.91" y="145.45" width="18.18" height="18.18"/><rect x="327.27" y="145.45" width="18.18" height="18.18"/><rect x="363.64" y="145.45" width="18.18" height="18.18"/><rect x="400.0" y="145.45" width="18.18" height="18.18"/><rect x="436.36" y="145.45" width="127.27" height="18.18"/><rect x="181.82" y="163.64" width="90.91" height="18.18"/><rect x="290.91" y="163.64" width="54.55" height="18.18"/><rect x="363.64" y="163.64" width="36.36" height="18.18"/><rect x="36.36" y="181.82" width="18.18" height="18.18"/><rect x="145.45" y="181.82" width="18.18" height="18.18"/><rect x="181.82" y="181.82" width="90.91" height="18.18"/><rect x="327.27" y="181.82" width="54.55" height="18.18"/><rect x="400.0" y="181.82" width="54.55" height="18.18"/><rect x="490.91" y="181.82" width="54.55" height="18.18"/><rect x="72.73" y="200.0" width="18.18" height="18.18"/><rect x="109.09" y="200.0" width="18.18" height="18.18"/><rect x="163.64" y="200.0" width="18.18" height="18.18"/><rect x="200.0" y="200.0" width="18.18" height="18.18"/><rect x="254.55" y="200.0" width="36.36" height="18.18"/><rect x="327.27" y="200.0" width="18.18" height="18.18"/><rect x="381.82" y="200.0" width="18.18" height="18.18"/><rect x="418.18" y="200.0" width="18.18" height="18.18"/><rect x="454.55" y="200.0" width="36.36" height="18.18"/><rect x="509.09" y="200.0" width="36.36" height="18.18"/><rect x="54.55" y="218.18" width="72.73" height="18.18"/><rect x="145.45" y="218.18" width="18.18" height="18.18"/><rect x="200.0" y="218.18" width="36.36" height="18.18"/><rect x="254.55" y="218.18" width="90.91" height="18.18"/><rect x="363.64" y="218.18" width="18.18" height="18.18"/><rect x="454.55" y="218.18" width="36.36" height="18.18"/><rect x="54.55" y="236.36" width="18.18" height="18.18"/><rect x="90.91" y="236.36" width="18.18" height="18.18"/><rect x="181.82" y="236.36" width="36.36" height="18.18"/><rect x="236.36" y="236.36" width="18.18" height="18.18"/><rect x="272.73" y="236.36" width="18.18" height="18.18"/><rect x="381.82" y="236.36" width="18.18" height="18.18"/><rect x="436.36" y="236.36" width="18.18" height="18.18"/><rect x="490.91" y="236.36" width="18.18" height="18.18"/><rect x="36.36" y="254.55" width="18.18" height="18.18"/><rect x="72.73" y="254.55" width="36.36" height="18.18"/><rect x="127.27" y="254.55" width="54.55" height="18.18"/><rect x="200.0" y="254.55" width="90.91" height="18.18"/><rect x="309.09" y="254.55" width="36.36" height="18.18"/><rect x="363.64" y="254.55" width="109.09" height="18.18"/><rect x="545.45" y="254.55" width="18.18" height="18.18"/><rect x="54.55" y="272.73" width="18.18" height="18.18"/><rect x="90.91" y="272.73" width="18.18" height="18.18"/><rect x="127.27" y="272.73" width="18.18" height="18.18"/><rect x="163.64" y="272.73" width="90.91" height="18.18"/><rect x="327.27" y="272.73" width="18.18" height="18.18"/><rect x="381.82" y="272.73" width="36.36" height="18.18"/><rect x="436.36" y="272.73" width="54.55" height="18.18"/><rect x="527.27" y="272.73" width="36.36" height="18.18"/><rect x="36.36" y="290.91" width="18.18" height="18.18"/><rect x="72.73" y="290.91" width="54.55" height="18.18"/><rect x="145.45" y="290.91" width="36.36" height="18.18"/><rect x="200.0" y="290.91" width="72.73" height="18.18"/><rect x="363.64" y="290.91" width="18.18" height="18.18"/><rect x="400.0" y="290.91" width="18.18" height="18.18"/><rect x="436.36" y="290.91" width="18.18" height="18.18"/><rect x="472.73" y="290.91" width="54.55" height="18.18"/><rect x="54.55" y="309.09" width="18.18" height="18.18"/><rect x="90.91" y="309.09" width="18.18" height="18.18"/><rect x="163.64" y="309.09" width="90.91" height="18.18"/><rect x="309.09" y="309.09" width="18.18" height="18.18"/><rect x="400.0" y="309.09" width="18.18" height="18.18"/><rect x="509.09" y="309.09" width="18.18" height="18.18"/><rect x="545.45" y="309.09" width="18.18" height="18.18"/><rect x="72.73" y="327.27" width="36.36" height="18.18"/><rect x="127.27" y="327.27" width="36.36" height="18.18"/><rect x="181.82" y="327.27" width="18.18" height="18.18"/><rect x="218.18" y="327.27" width="18.18" height="18.18"/><rect x="345.45" y="327.27" width="36.36" height="18.18"/><rect x="454.55" y="327.27" width="18.18" height="18.18"/><rect x="490.91" y="327.27" width="36.36" height="18.18"/><rect x="36.36" y="345.45" width="36.36" height="18.18"/><rect x="90.91" y="345.45" width="18.18" height="18.18"/><rect x="127.27" y="345.45" width="18.18" height="18.18"/><rect x="200.0" y="345.45" width="18.18" height="18.18"/><rect x="254.55" y="345.45" width="54.55" height="18.18"/><rect x="345.45" y="345.45" width="72.73" height="18.18"/><rect x="436.36" y="345.45" width="54.55" height="18.18"/><rect x="509.09" y="345.45" width="54.55" height="18.18"/><rect x="36.36" y="363.64" width="90.91" height="18.18"/><rect x="145.45" y="363.64" width="36.36" height="18.18"/><rect x="200.0" y="363.64" width="18.18" height="18.18"/><rect x="309.09" y="363.64" width="36.36" height="18.18"/><rect x="381.82" y="363.64" width="18.18" height="18.18"/><rect x="454.55" y="363.64" width="18.18" height="18.18"/><rect x="490.91" y="363.64" width="18.18" height="18.18"/><rect x="545.45" y="363.64" width="18.18" height="18.18"/><rect x="36.36" y="381.82" width="18.18" height="18.18"/><rect x="72.73" y="381.82" width="18.18" height="18.18"/><rect x="109.09" y="381.82" width="36.36" height="18.18"/><rect x="163.64" y="381.82" width="36.36" height="18.18"/><rect x="218.18" y="381.82" width="36.36" height="18.18"/><rect x="272.73" y="381.82" width="18.18" height="18.18"/><rect x="309.09" y="381.82" width="18.18" height="18.18"/><rect x="363.64" y="381.82" width="90.91" height="18.18"/><rect x="472.73" y="381.82" width="18.18" height="18.18"/><rect x="36.36" y="400.0" width="18.18" height="18.18"/><rect x="109.09" y="400.0" width="90.91" height="18.18"/><rect x="254.55" y="400.0" width="18.18" height="18.18"/><rect x="290.91" y="400.0" width="200.0" height="18.18"/><rect x="509.09" y="400.0" width="54.55" height="18.18"/><rect x="181.82" y="418.18" width="36.36" height="18.18"/><rect x="236.36" y="418.18" width="36.36" height="18.18"/><rect x="290.91" y="418.18" width="54.55" height="18.18"/><rect x="400.0" y="418.18" width="18.18" height="18.18"/><rect x="472.73" y="418.18" width="36.36" height="18.18"/><rect x="36.36" y="436.36" width="127.27" height="18.18"/><rect x="200.0" y="436.36" width="36.36" height="18.18"/><rect x="254.55" y="436.36" width="18.18" height="18.18"/><rect x="309.09" y="436.36" width="18.18" height="18.18"/><rect x="363.64" y="436.36" width="54.55" height="18.18"/><rect x="436.36" y="436.36" width="18.18" height="18.18"/><rect x="472.73" y="436.36" width="54.55" height="18.18"/><rect x="36.36" y="454.55" width="18.18" height="18.18"/><rect x="145.45" y="454.55" width="18.18" height="18.18"/><rect x="200.0" y="454.55" width="18.18" height="18.18"/><rect x="290.91" y="454.55" width="18.18" height="18.18"/><rect x="363.64" y="454.55" width="18.18" height="18.18"/><rect x="400.0" y="454.55" width="18.18" height="18.18"/><rect x="472.73" y="454.55" width="18.18" height="18.18"/><rect x="36.36" y="472.73" width="18.18" height="18.18"/><rect x="72.73" y="472.73" width="54.55" height="18.18"/><rect x="145.45" y="472.73" width="18.18" height="18.18"/><rect x="218.18" y="472.73" width="36.36" height="18.18"/><rect x="272.73" y="472.73" width="36.36" height="18.18"/><rect x="363.64" y="472.73" width="145.45" height="18.18"/><rect x="527.27" y="472.73" width="36.36" height="18.18"/><rect x="36.36" y="490.91" width="18.18" height="18.18"/><rect x="72.73" y="490.91" width="54.55" height="18.18"/><rect x="145.45" y="490.91" width="18.18" height="18.18"/><rect x="218.18" y="490.91" width="36.36" height="18.18"/><rect x="290.91" y="490.91" width="36.36" height="18.18"/><rect x="345.45" y="490.91" width="18.18" height="18.18"/><rect x="381.82" y="490.91" width="54.55" height="18.18"/><rect x="454.55" y="490.91" width="18.18" height="18.18"/><rect x="490.91" y="490.91" width="36.36" height="18.18"/><rect x="545.45" y="490.91" width="18.18" height="18.18"/><rect x="36.36" y="509.09" width="18.18" height="18.18"/><rect x="72.73" y="509.09" width="54.55" height="18.18"/><rect x="145.45" y="509.09" width="18.18" height="18.18"/><rect x="218.18" y="509.09" width="18.18" height="18.18"/><rect x="272.73" y="509.09" width="72.73" height="18.18"/><rect x="363.64" y="509.09" width="36.36" height="18.18"/><rect x="436.36" y="509.09" width="109.09" height="18.18"/><rect x="36.36" y="527.27" width="18.18" height="18.18"/><rect x="145.45" y="527.27" width="18.18" height="18.18"/><rect x="254.55" y="527.27" width="18.18" height="18.18"/><rect x="327.27" y="527.27" width="18.18" height="18.18"/><rect x="436.36" y="527.27" width="90.91" height="18.18"/><rect x="545.45" y="527.27" width="18.18" height="18.18"/><rect x="36.36" y="545.45" width="127.27" height="18.18"/><rect x="181.82" y="545.45" width="36.36" height="18.18"/><rect x="236.36" y="545.45" width="18.18" height="18.18"/><rect x="309.09" y="545.45" width="90.91" height="18.18"/><rect x="418.18" y="545.45" width="36.36" height="18.18"/><rect x="472.73" y="545.45" width="18.18" height="18.18"/><rect x="509.09" y="545.45" width="18.18" height="18.18"/></g></svg>';

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
