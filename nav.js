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
})();
