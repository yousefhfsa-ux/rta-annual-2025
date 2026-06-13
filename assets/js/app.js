/* RTA Annual Report 2025 — interactions & build */
(function(){
  const D = window.RTA, pad = n => String(n).padStart(3,'0');
  const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};

  /* build an animated scene: static plate + moving cut-out elements (real art) */
  async function buildScene(holder,ch){
    let s; try{ s=await (await fetch(`assets/scenes/${ch.scene}/scene.json`)).json(); }
    catch(err){ return; }
    const wrap=el('div','scene r');
    const stage=el('div','scene-stage'); stage.style.aspectRatio=s.ar;
    stage.appendChild(Object.assign(new Image(),{className:'scene-plate',
      src:`assets/scenes/${ch.scene}/plate.jpg`, alt:ch.cap||''}));
    s.elements.forEach(e=>{
      const img=el('img','scene-el sc-'+e.name);
      img.src=`assets/scenes/${ch.scene}/${e.file}`; img.alt='';
      img.style.top=e.top+'%'; img.style.width=e.w+'%'; img.style.setProperty('--w',e.w+'%');
      if(e.dur>0){ const k=e.dir==='ltr'?'flowR':'flowL';
        img.style.animation=`${k} ${e.dur}s linear ${e.delay||0}s infinite`; }
      else { img.style.left=e.left+'%'; img.style.animation='sunbob 5.5s ease-in-out infinite'; }
      stage.appendChild(img);
    });
    wrap.appendChild(stage);
    wrap.appendChild(el('div','scene-cap',ch.cap||'رسم من التقرير — حُرّكت عناصره الأصلية'));
    holder.appendChild(wrap); watch(wrap);
  }


  /* ---------- inline icons ---------- */
  const ICON = {
    eye:'<path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="2.4" fill="currentColor"/>',
    calendar:'<rect x="2" y="3" width="14" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 7h14M6 1.5v3M12 1.5v3" stroke="currentColor" stroke-width="1.6"/>',
    star:'<path d="M9 1l2.3 4.8 5.2.7-3.8 3.7.9 5.2L9 13.7 4.4 15.4l.9-5.2L1.5 6.5l5.2-.7z" fill="currentColor"/>',
    road:'<path d="M5 17L7 1h4l2 16" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 3v2.5M9 8v2.5M9 13v2.5" stroke="currentColor" stroke-width="1.6"/>',
    metro:'<rect x="3" y="2" width="12" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 8h12" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><path d="M5 16l-1 1M13 16l1 1" stroke="currentColor" stroke-width="1.6"/>',
    globe:'<circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 9h14M9 2c2.5 2.5 2.5 11.5 0 14M9 2C6.5 4.5 6.5 13.5 9 16" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    chip:'<rect x="4" y="4" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1v3M11 1v3M7 14v3M11 14v3M1 7h3M1 11h3M14 7h3M14 11h3" stroke="currentColor" stroke-width="1.4"/>',
    leaf:'<path d="M3 15C3 7 9 3 16 3c0 8-5 12-13 12z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 15c4-5 7-7 11-8" stroke="currentColor" stroke-width="1.4" fill="none"/>',
    people:'<circle cx="6.5" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 16c0-3 2-4.5 4.5-4.5S11 13 11 16M11.5 16c0-2.4 1.4-3.6 3.5-3.6S18 13.6 18 16" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    flag:'<path d="M4 1v16" stroke="currentColor" stroke-width="1.7"/><path d="M4 2h10l-2 3 2 3H4z" fill="currentColor"/>',
    trophy:'<path d="M5 2h8v4a4 4 0 01-8 0z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 3H2v2a3 3 0 003 2.5M13 3h3v2a3 3 0 01-3 2.5M9 10v3M6 16h6M7.5 16l.5-3h2l.5 3" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    handshake:'<path d="M2 6l4-2 3 2 3-2 4 2v6l-4 2-3-2-3 2-4-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 6v8" stroke="currentColor" stroke-width="1.3"/>'
  };

  /* ---------- count-up ---------- */
  function countUp(node,target,dec,sep){
    const dur=1500,t0=performance.now();
    function fmt(v){ v = dec?v.toFixed(dec):Math.round(v);
      return sep? Number(v).toLocaleString('en-US') : v; }
    function step(t){ let p=Math.min(1,(t-t0)/dur); p=1-Math.pow(1-p,3);
      node.textContent=fmt(target*p);
      if(p<1)requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* ---------- reveal + count + chapter bg ---------- */
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(!e.isIntersecting)return;
      const t=e.target; t.classList.add('in');
      t.querySelectorAll?.('[data-count]').forEach(n=>{
        if(n.dataset.done)return; n.dataset.done=1;
        countUp(n,parseFloat(n.dataset.count),+n.dataset.dec||0,n.dataset.sep==='1');
      });
      io.unobserve(t);
    });
  },{threshold:.18});
  const watch = n => io.observe(n);

  /* ---------- build chapters ---------- */
  const root = document.getElementById('app');
  const nav  = document.getElementById('navlinks');

  /* mobile menu toggle (hamburger <-> X) */
  const topbar=document.getElementById('topbar'), navtoggle=document.getElementById('navtoggle');
  const setMenu=open=>{ topbar.classList.toggle('open',open);
    navtoggle.setAttribute('aria-expanded',open);
    navtoggle.querySelector('.bars').setAttribute('d',
      open?'M5 5L19 19M5 19L19 5':'M3 6h18M3 12h18M3 18h18'); };
  navtoggle.addEventListener('click',()=>setMenu(!topbar.classList.contains('open')));
  nav.addEventListener('click',e=>{ if(e.target.tagName==='BUTTON') setMenu(false); });

  const ILLUS=[];
  D.chapters.forEach((ch,idx)=>{
    nav.appendChild(el('button',null,ch.ar)).addEventListener('click',
      ()=>document.getElementById(ch.id).scrollIntoView({behavior:'smooth'}));

    const sec = el('section','section'); sec.id=ch.id;
    sec.style.setProperty('--sec',ch.color);

    /* divider — modular colour block + swoosh-cut photo */
    const n = idx+1;
    const chap = el('div','chapter');
    chap.appendChild(el('div','c',
      `<span class="kicker"><span class="num">${n}</span>
         <svg class="ic" viewBox="0 0 18 18">${ICON[ch.icon]||''}</svg>${ch.en}</span>
       <h2>${ch.ar}</h2><div class="en2 en">${ch.en}</div>
       <p>${ch.blurb||''}</p>`));
    const bg = el('div','bg'); bg.style.backgroundImage=`url(assets/hero/${ch.hero})`;
    chap.appendChild(bg);
    chap.appendChild(el('span','swoosh sw',`<img src="assets/brand/logo/logo-white.svg" alt="RTA">`));
    chap.appendChild(el('div','no',String(n)));
    sec.appendChild(chap); watch(chap);

    /* stats */
    if(ch.stats){
      const w=el('div','statwrap'); const g=el('div','statgrid');
      ch.stats.forEach((s,i)=>{
        const card=el('div','stat r d'+((i%4)+1));
        card.innerHTML=`<div class="num"><span data-count="${s.v}" data-dec="${s.dec||0}" data-sep="${s.sep?1:0}">0</span>${s.suf||''}</div>
                        <div class="lbl">${s.lbl}</div>`;
        g.appendChild(card); watch(card);
      });
      w.appendChild(g); sec.appendChild(w);
    }

    /* animated SCENE — real art with moving cut-out elements */
    if(ch.scene){
      const holder=el('div'); sec.appendChild(holder); buildScene(holder,ch);
    }
    /* full illustration, placement-safe (all numbers visible) + reveal + ken-burns */
    else if(ch.staticIll){
      const wrap=el('div','scene static r');
      wrap.innerHTML=`<div class="scene-stage"><img class="scene-plate" loading="lazy"
          src="assets/pages/spread_${pad(ch.staticIll)}.jpg" alt="${ch.cap||''}"></div>
        <div class="scene-cap">${ch.cap||''}</div>`;
      sec.appendChild(wrap); watch(wrap);
    }
    /* animated real illustration (extracted from the report) */
    else if(ch.illus){
      const st=el('div','illus r');
      st.innerHTML=`<div class="illus-frame" style="aspect-ratio:${ch.illus.ar}">
          <img class="illus-img" loading="lazy" src="assets/ill/${ch.illus.src}" alt="${ch.illus.cap}">
          <span class="illus-sheen"></span></div>
        <div class="illus-cap">${ch.illus.cap}</div>`;
      sec.appendChild(st); watch(st); ILLUS.push(st);
    }

    /* faithful spread gallery */
    const sp=el('div','spreads');
    for(let p=ch.spreads[0];p<=ch.spreads[1];p++){
      const fig=el('figure','spread r');
      fig.innerHTML=`<img loading="lazy" src="assets/pages/spread_${pad(p)}.jpg" alt="صفحة ${p}">`;
      sp.appendChild(fig); watch(fig);
    }
    sec.appendChild(sp);
    root.appendChild(sec);
  });

  /* ---------- KPI band: reveal + count-up when scrolled into view ---------- */
  watch(document.getElementById('kpibar'));

  const bar=document.querySelector('#progress > i'),
        totop=document.getElementById('totop'), navBtns=[...nav.children];
  const ids=D.chapters.map(c=>c.id);
  addEventListener('scroll',()=>{
    const st=scrollY, max=document.body.scrollHeight-innerHeight;
    bar.style.width=(st/max*100)+'%';
    topbar.classList.toggle('solid',st>60);
    totop.classList.toggle('show',st>700);
    let cur=-1;
    ids.forEach((id,i)=>{const s=document.getElementById(id);
      if(s && s.getBoundingClientRect().top<innerHeight*.45)cur=i;});
    navBtns.forEach((b,i)=>b.classList.toggle('active',i===cur));
  },{passive:true});
  totop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  /* ---------- real-illustration parallax + pointer tilt ---------- */
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function compose(el){const img=el.querySelector('.illus-img');
    img.style.setProperty('--px',((el._sx||0)+(el._mx||0)).toFixed(1)+'px');
    img.style.setProperty('--py',((el._sy||0)+(el._my||0)).toFixed(1)+'px');}
  function parallax(){ if(reduce) return;
    ILLUS.forEach(el=>{ const r=el.getBoundingClientRect();
      if(r.bottom<-40||r.top>innerHeight+40) return;
      const t=0.5-(r.top+r.height/2)/innerHeight;   // -0.5 (below) .. 0.5 (above)
      el._sx=(t*36).toFixed(1)*1; el._sy=(t*58).toFixed(1)*1; compose(el); }); }
  ILLUS.forEach(el=>{ const f=el.querySelector('.illus-frame');
    f.addEventListener('pointermove',e=>{ if(reduce)return; const b=f.getBoundingClientRect();
      el._mx=((e.clientX-b.left)/b.width-0.5)*-34;
      el._my=((e.clientY-b.top)/b.height-0.5)*-22; compose(el); });
    f.addEventListener('pointerleave',()=>{ el._mx=0; el._my=0; compose(el); }); });
  let raf=0;
  addEventListener('scroll',()=>{ if(raf)return; raf=requestAnimationFrame(()=>{raf=0;parallax();}); },{passive:true});
  addEventListener('resize',parallax); parallax();
})();
