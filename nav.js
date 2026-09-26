(function(){
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!here || here === '/') here = 'index.html';
  var items = [
    ['index.html','Home'],
    ['roster.html','Roster'],
    ['events.html','Events'],
    ['news.html','News'],
    ['media.html','Media'],
    ['hall-of-fame.html','Hall of Fame'],
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
      '.topbar nav,.topbar .tabs{position:static!important;left:auto!important;right:auto!important;top:auto!important;display:grid!important;grid-template-columns:repeat(9,minmax(0,1fr));width:100%!important;max-width:none!important;padding:0!important;height:auto!important;background:transparent;border:0;border-top:1px solid #222;box-sizing:border-box}'+
      '.topbar .mark{display:block;text-align:center;font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:1.15rem;color:#d7dbe2;text-decoration:none;padding:4px 16px 8px;white-space:nowrap}'+
      '.topbar .mark b{color:#ff2a33;font-weight:inherit}'+
      '.topbar .tabs a{display:block;text-align:center;color:#d7dbe2;text-decoration:none;font-size:clamp(.55rem,.95vw,.68rem);letter-spacing:.08em;text-transform:uppercase;font-weight:700;padding:12px 4px;border-right:1px solid #222;border-bottom:2px solid transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
      '.topbar .tabs a:last-child{border-right:0}'+
      '.topbar .tabs a.active,.topbar .tabs a:hover{color:#ff2a33;border-bottom-color:#ff2a33;background:#140404}'+
      'body{padding-top:118px}'+
      '@media(max-width:900px){.topbar .tabs{grid-template-columns:repeat(3,minmax(0,1fr))!important}body{padding-top:188px}}'+
    '</style>'+
    '<header class="topbar">'+
      '<a class="mark" href="index.html">SOVEREIGN <b>BRUTALITY</b></a>'+
      '<nav class="tabs">'+links+'</nav>'+
    '</header>'
  );
  document.write('<script src="house.js"><\/script>');
})();
