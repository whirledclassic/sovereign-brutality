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
    '<header class="topbar">'+
      '<a class="mark" href="index.html">SOVEREIGN <b>BRUTALITY</b></a>'+
      '<nav class="tabs">'+links+'</nav>'+
    '</header>'
  );

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
