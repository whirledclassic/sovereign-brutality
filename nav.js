(function(){
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!here || here === '/' ) here = 'index.html';
  var items = [
    ['index.html','Home'],
    ['roster.html','Roster'],
    ['events.html','Events'],
    ['merch.html','Merch'],
    ['talent.html','Talent'],
    ['apply.html','Apply']
  ];
  var links = items.map(function(it){
    return '<a href="'+it[0]+'"'+(here===it[0]?' class="active"':'')+'>'+it[1]+'</a>';
  }).join('');
  document.write(
    '<style id="sb-navfix">'+
      '.topbar{position:fixed;top:0;left:0;right:0;z-index:90;background:#000;padding:18px 0 0;border-bottom:1px solid #222}'+
      '.topbar nav,.topbar .tabs{position:static!important;left:auto!important;right:auto!important;top:auto!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr));width:100%!important;max-width:none!important;padding:0!important;height:auto!important;background:transparent;border:0;border-top:1px solid #222;box-sizing:border-box}'+
      '.topbar .mark{display:block;text-align:center;font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:1.15rem;color:#d7dbe2;text-decoration:none;padding:4px 16px 8px;white-space:nowrap}'+
      '.topbar .mark b{color:#ff2a33;font-weight:inherit}'+
      '.topbar .tabs a{display:block;text-align:center;color:#d7dbe2;text-decoration:none;font-size:clamp(.62rem,1.1vw,.72rem);letter-spacing:.1em;text-transform:uppercase;font-weight:700;padding:12px 6px;border-right:1px solid #222;border-bottom:2px solid transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
      '.topbar .tabs a:last-child{border-right:0}'+
      '.topbar .tabs a.active,.topbar .tabs a:hover{color:#ff2a33;border-bottom-color:#ff2a33;background:#140404}'+
      'body{padding-top:118px}'+
      '@media(max-width:700px){.topbar .tabs{grid-template-columns:repeat(3,minmax(0,1fr))!important}body{padding-top:148px}}'+
    '</style>'+
    '<header class="topbar">'+
      '<a class="mark" href="index.html">SOVEREIGN <b>BRUTALITY</b></a>'+
      '<nav class="tabs">'+links+'</nav>'+
    '</header>'
  );
  document.write('<script src="house.js"><\/script>');

  /* Avoid restoring mid-page scroll on tab reloads (feels jumpier than a fade). */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /*
   * Optional same-origin topbar intercept for browsers that expose
   * startViewTransition but do not yet honor CSS @view-transition
   * { navigation: auto }. When cross-document VT is available, leave
   * clicks alone so the native opacity crossfade runs. No slide/translate.
   */
  function crossDocViewTransitionsOn(){
    try {
      return !!(window.CSS && CSS.supports && (
        CSS.supports('view-transition-class', 'none') ||
        CSS.supports('selector(:active-view-transition)')
      ));
    } catch (e) {
      return false;
    }
  }

  if (crossDocViewTransitionsOn()) return;
  if (typeof document.startViewTransition !== 'function') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('click', function(e){
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest && e.target.closest('.topbar a');
    if (!a || !a.getAttribute('href')) return;
    if (a.target && a.target !== '_self') return;
    var dest;
    try { dest = new URL(a.href, location.href); }
    catch (err) { return; }
    if (dest.origin !== location.origin) return;
    if (dest.href === location.href) return;
    e.preventDefault();
    document.startViewTransition(function(){
      location.assign(dest.href);
    });
  }, true);
})();
