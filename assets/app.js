(function(){
  document.querySelectorAll('.cp').forEach(function(b){
    b.addEventListener('click',function(){
      var o=b.textContent;
      try{navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent=o},1400)},function(){b.textContent='Select and copy';setTimeout(function(){b.textContent=o},1800)})}catch(e){}
    });
  });
})();

(function(){
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO='IntersectionObserver' in window;
  var VIEWS=[].map.call(document.querySelectorAll('.view'),function(v){return v.getAttribute('data-view')});
  var views={};VIEWS.forEach(function(n){views[n]=document.getElementById('v-'+n)});
  var nav=document.getElementById('nav'),burger=document.getElementById('burger');
  var navLinks=[].slice.call(document.querySelectorAll('#links a[data-v],#drawer a[data-v]'));
  var dds=[].slice.call(document.querySelectorAll('.dd'));

  /* ---- progress bar ---- */
  var prog=document.getElementById('prog'),tick=false;
  function onScroll(){
    if(tick)return;tick=true;
    requestAnimationFrame(function(){
      var h=document.documentElement.scrollHeight-innerHeight;
      prog.style.setProperty('--p',h>0?Math.min(1,Math.max(0,scrollY/h)):0);
      tick=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});

  /* ---- menus ---- */
  function closeDD(except){dds.forEach(function(d){if(d!==except){d.classList.remove('open');d.querySelector('.ddb').setAttribute('aria-expanded','false')}})}
  dds.forEach(function(d){
    var b=d.querySelector('.ddb');
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var o=!d.classList.contains('open');
      closeDD(d);d.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));
    });
  });
  document.addEventListener('click',function(){closeDD()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDD();setDrawer(false)}});
  function setDrawer(o){nav.classList.toggle('nav-open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close menu':'Open menu')}
  burger.addEventListener('click',function(e){e.stopPropagation();setDrawer(!nav.classList.contains('nav-open'))});

  /* ---- motion helpers ---- */
  function count(el){
    var to=+el.getAttribute('data-count'),from=+el.getAttribute('data-from')||0,t0=null,dur=1500;
    function step(t){
      if(t0===null)t0=t;
      var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);
      el.textContent=Math.round(from+(to-from)*e);
      if(p<1)requestAnimationFrame(step);
    }
    el.textContent=from;requestAnimationFrame(step);
  }
  var cio=hasIO&&new IntersectionObserver(function(es){
    es.forEach(function(en){if(en.isIntersecting){cio.unobserve(en.target);count(en.target)}});
  },{threshold:.6});
  var sel='.sec-head,.about>*,.mini-stats,.chips,.mach .card,.prop,.prop .it,.prods .card,.mv .card,.vals .card,.qgrid .card,.steps .card,.loopnote,.org .nd,.org small,.inst .card,.cust .card,.tablebox,.two>div>h3,.dl .r,.globe,.form,.grid4 .card,.qual .sys,.qual>div>p,.qual h2,.enq-card,.feat,.fact,.cta-band';
  var io=hasIO&&new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting)return;
      var el=en.target;io.unobserve(el);el.classList.add('shown');
      var done=function(ev){
        if(ev&&ev.propertyName!=='opacity')return;
        el.classList.remove('rv','shown');el.style.removeProperty('--d');el.removeEventListener('transitionend',done);
      };
      el.addEventListener('transitionend',done);
      setTimeout(done,1800);
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.05});
  function prepare(v){
    if(rm||!hasIO)return;
    [].forEach.call(v.querySelectorAll('[data-count]'),function(el){
      if(el.__c)return;el.__c=1;
      if(el.closest('.float')){el.textContent=el.getAttribute('data-from');setTimeout(function(){count(el)},1100)}else cio.observe(el);
    });
    var vh=innerHeight;
    [].slice.call(v.querySelectorAll(sel)).forEach(function(el){
      if(el.__r)return;
      if(el.getBoundingClientRect().top<vh*.92)return;
      el.__r=1;
      var sibs=[].filter.call(el.parentNode.children,function(c){return c.matches(sel)});
      el.style.setProperty('--d',Math.min(Math.max(0,sibs.indexOf(el)),9)*70+'ms');
      el.classList.add('rv');io.observe(el);
    });
  }


  /* ---- router: one view per hash ---- */
  var current=null;
  function show(name){
    var first=current===null,changed=name!==current;
    current=name;
    VIEWS.forEach(function(n){views[n].hidden=(n!==name)});
    navLinks.forEach(function(a){var on=a.getAttribute('data-v')===name;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    dds.forEach(function(d){d.querySelector('.ddb').classList.toggle('on',!!d.querySelector('a.on'))});
    dds.forEach(function(d){d.classList.add('closing')});closeDD();setDrawer(false);
    setTimeout(function(){dds.forEach(function(d){d.classList.remove('closing')})},700);
    if(changed&&!first)window.scrollTo({top:0,left:0,behavior:'instant'});
    onScroll();
    requestAnimationFrame(function(){prepare(views[name])});
  }
  function route(){
    var h=(location.hash||'').replace(/^#/,'');
    show(VIEWS.indexOf(h)>-1?h:'home');
  }
  show(document.body.getAttribute('data-page'));

  /* ---- pointer parallax on home hero ---- */
  var hero=document.querySelector('.hero');
  if(hero&&matchMedia('(pointer:fine)').matches&&!rm){
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));
      hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));
    });
    hero.addEventListener('pointerleave',function(){hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0)});
  }
})();
