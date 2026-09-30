import {projects,studio} from './data.js';
import {submitInquiry} from './inquiry.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const arrow='<span aria-hidden="true">↗</span>';
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function header(){
  $('#header').innerHTML=`<div class="header-shell">
    <a class="brand" href="#/" aria-label="PRESCORN home">PRESCORN</a>
    <button class="menu-button" aria-expanded="false" aria-controls="site-nav"><span>Menu</span><i aria-hidden="true"></i></button>
    <nav id="site-nav" aria-label="Primary navigation">
      <a href="#/work">Work</a><a href="#/responsive">Responsive</a><a href="#/pricing">Pricing</a><a class="header-cta" href="#/contact">Start a project ${arrow}</a>
    </nav>
  </div>`;
  const button=$('.menu-button');
  button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));
    $('#site-nav').classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
  });
  $('#site-nav').addEventListener('click',()=>{
    button.setAttribute('aria-expanded','false');$('#site-nav').classList.remove('open');document.body.classList.remove('menu-open');
  });
}

function footer(){
  $('#footer').innerHTML=`<div class="footer-shell">
    <div><a class="brand" href="#/">PRESCORN</a><p>Digital design & creative development.</p></div>
    <div class="footer-links"><a href="#/work">Work</a><a href="#/studio">Studio</a><a href="#/pricing">Pricing</a><a href="#/contact">Start a project</a></div>
    <div class="footer-meta"><span>© ${new Date().getFullYear()} PRESCORN</span><a href="#/">Back to top ↑</a></div>
  </div>`;
}

function visual(p,priority=false){
  if(p.assetAvailable){
    const small=p.coverImage.replace('.webp','-640.webp');
    return `<img src="${p.coverImage}" srcset="${small} 640w, ${p.coverImage} 1348w" sizes="(max-width:760px) 100vw, 70vw" width="1348" height="926" alt="${escapeHTML(p.name)} project preview" loading="${priority?'eager':'lazy'}" ${priority?'fetchpriority="high"':''}>`;
  }
  return `<div class="fallback fallback-${p.slug}" style="--project:${p.color}"><span>${p.number}</span><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.short)}</small>${p.slug==='varel'?'<i class="dial" aria-hidden="true"></i>':''}${p.slug==='renovoltis'?'<i class="energy" aria-hidden="true"></i>':''}</div>`;
}

function projectCard(p,priority=false,large=false){
  return `<article class="project-card ${large?'large':''}">
    <a class="project-media" href="#/project/${p.slug}" style="--project:${p.color}">${visual(p,priority)}<span class="media-cta">View project ${arrow}</span></a>
    <div class="project-info"><div><span>${p.number}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.category)}</p></div><div class="project-links"><a href="#/project/${p.slug}">Project ${arrow}</a><a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Live site ${arrow}</a></div></div>
  </article>`;
}

function studioSection(){
  const rows=[['Strategy','Brand, audience, goals and the right digital direction.'],['Design','Custom UI, visual system and art direction.'],['Development','Responsive implementation with purposeful interaction.'],['Launch','Testing, optimization, deployment and final setup.']];
  return `<section id="studio" class="section split-section reveal">
    <div class="section-index">02 / Studio</div>
    <div><div class="section-copy"><h2>Studio-style websites,<br><em>tailored to your brand.</em></h2><p>We do not force every project into the same template. Each website is shaped around its identity, content and goals.</p></div>
    <div class="service-list">${rows.map(([a,b],i)=>`<article><span>0${i+1}</span><h3>${a}</h3><p>${b}</p></article>`).join('')}</div></div>
  </section>`;
}

function pricingSection(){
  return `<section id="pricing" class="section split-section reveal">
    <div class="section-index">03 / Pricing</div>
    <div><div class="section-copy"><h2>Flexible options,<br><em>clear starting points.</em></h2><p>Final scope and price follow the actual project. These tiers simply make the first conversation easier.</p></div>
    <div class="price-list">${studio.pricing.map((p,i)=>`<article><span class="price-index">0${i+1}</span><div><h3>${p.name}</h3><p>${p.description}</p></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><div class="price"><small>${p.prefix}</small><strong>${p.price}</strong></div><a href="#/contact?plan=${encodeURIComponent(p.name)}" aria-label="Ask about ${p.name}">${arrow}</a></article>`).join('')}</div></div>
  </section>`;
}

function contactSection(){
  return `<section id="contact" class="contact-section reveal"><div class="contact-copy"><div class="section-index light">04 / Start a project</div><h2>Have a project<br><em>in mind?</em></h2><p>Tell us what you are building. We will use the details to understand the direction, scope and next step.</p><div class="availability"><i></i>Open for selected projects</div></div>
  <form id="inquiry" novalidate><div class="form-grid">
    <label><span>Your name *</span><input id="name" name="name" autocomplete="name" required maxlength="100" placeholder="Name"><small id="name-error"></small></label>
    <label><span>Email *</span><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@company.com"><small id="email-error"></small></label>
    <label><span>Brand / Company</span><input id="company" name="company" autocomplete="organization" maxlength="150" placeholder="Optional"></label>
    <label><span>What do you need? *</span><select id="service" name="service" required><option value="">Select a service</option>${studio.services.map(x=>`<option>${x}</option>`).join('')}</select><small id="service-error"></small></label>
    <label class="full"><span>Estimated budget *</span><select id="budget" name="budget" required><option value="">Select a range</option>${studio.budgets.map(x=>`<option>${x}</option>`).join('')}</select><small id="budget-error"></small></label>
    <label class="full"><span>Tell us about your project *</span><textarea id="description" name="description" required minlength="20" maxlength="5000" rows="5" placeholder="Goals, timeline, references…"></textarea><small id="description-error"></small></label>
  </div><div class="form-actions"><p id="form-status" role="status" tabindex="-1">${studio.inquiryEndpoint?'Ready to send.':'Online delivery will be connected before public launch.'}</p><button type="submit">Send project request ${arrow}</button></div></form></section>`;
}

function home(){
  const featured=projects.filter(p=>p.featured).slice(0,3);
  const sillage=featured[0],aurel=featured[1],varel=featured[2];

  const heroSlides=featured.map((p,i)=>`
    <button class="hero-project-tab ${i===0?'active':''}" data-slide="${i}" aria-label="Show ${escapeHTML(p.name)}">
      <span>0${i+1}</span><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.category.split('/')[0].trim())}</small>
    </button>`).join('');

  const siteTiles=projects.map((p,i)=>`
    <article class="site-tile">
      <a class="site-tile-media" href="#/project/${p.slug}" style="--project:${p.color}">${visual(p,i<2)}</a>
      <div class="site-tile-copy">
        <div><span>${p.number}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.category)}</p></div>
        <div><a href="#/project/${p.slug}">View project →</a><a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Live site ↗</a></div>
      </div>
    </article>`).join('');

  return `<div class="home">
    <section class="live-hero" aria-label="Latest projects">
      <div class="live-hero-stage">
        <iframe id="hero-site-frame" title="${escapeHTML(featured[0].name)} live website preview" src="${featured[0].liveUrl}" loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <div class="live-hero-shade"></div>
        <div class="live-hero-top">
          <div><span>Latest work</span><strong id="hero-project-name">${escapeHTML(featured[0].name)}</strong></div>
          <a id="hero-live-link" href="${featured[0].liveUrl}" target="_blank" rel="noopener noreferrer">Open live site ↗</a>
        </div>
        <div class="live-hero-bottom">
          <div class="hero-counter"><span id="hero-current">01</span><i></i><span>03</span></div>
          <div class="hero-arrows">
            <button id="hero-prev" aria-label="Previous project">←</button>
            <button id="hero-next" aria-label="Next project">→</button>
          </div>
        </div>
      </div>
      <div class="live-hero-tabs">${heroSlides}</div>
    </section>

    <div class="shell">
      <section class="site-links-section reveal">
        <div class="section-head simple-head">
          <span>01 / Our work</span>
          <div><h2>Explore the websites.</h2><p>Open each project inside PRESCORN or jump directly to the live experience.</p></div>
          <a href="#/work">View all projects ↗</a>
        </div>
        <div class="site-links-grid">${siteTiles}</div>
      </section>

      <section id="responsive" class="responsive-section reveal">
        <div class="responsive-copy">
          <div class="section-index">02 / Responsive by design</div>
          <h2>Designed for<br><em>every screen.</em></h2>
          <p>Phone, desktop and tablet are not afterthoughts. Every project is shaped and tested across the screens people actually use.</p>
          <div class="responsive-notes"><span>Mobile first thinking</span><span>Desktop precision</span><span>Tablet ready</span></div>
        </div>
        <div class="device-stage" aria-label="Responsive website previews">
          <div class="device device-phone">
            <div class="device-bar"><span></span></div>
            <iframe title="SILLAGE mobile preview" src="${sillage.liveUrl}" loading="lazy" tabindex="-1"></iframe>
          </div>
          <div class="device device-desktop">
            <div class="desktop-top"><i></i><i></i><i></i></div>
            <iframe title="VAREL desktop preview" src="${varel.liveUrl}" loading="lazy" tabindex="-1"></iframe>
          </div>
          <div class="device device-tablet">
            <iframe title="AUREL tablet preview" src="${aurel.liveUrl}" loading="lazy" tabindex="-1"></iframe>
          </div>
        </div>
      </section>

      ${pricingSection()}
    </div>

    <div class="contact-band"><div class="shell">${contactSection()}</div></div>
  </div>`;
}

function work(){
  return `<div class="shell work-page"><section class="page-hero reveal"><div><span>Project collection / 08</span><h1>Selected<br><em>digital work.</em></h1></div><p>Websites across fragrance, jewellery, watches, skincare, architecture, hospitality, technology and sustainability.</p></section><section class="work-grid">${projects.map((p,i)=>projectCard(p,i<2,i%3===0)).join('')}</section><section class="work-cta reveal"><div><span>Next project</span><h2>Yours.</h2></div><a href="#/contact">Start a project ${arrow}</a></section></div>`;
}

function project(slug){
  const p=projects.find(x=>x.slug===slug); if(!p)return `<div class="shell not-found"><h1>Project not found.</h1><a href="#/work">Return to work</a></div>`;
  const i=projects.indexOf(p),next=projects[(i+1)%projects.length];
  return `<div class="shell project-page"><a class="back" href="#/work">← All work</a><section class="project-head reveal"><div><span>${p.number} / ${escapeHTML(p.category)}</span><h1>${escapeHTML(p.name)}</h1><p>${escapeHTML(p.short)}</p></div><div><p>${escapeHTML(p.description)}</p><a class="dark-button" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Open live site ${arrow}</a></div></section>
  <div class="project-hero reveal" style="--project:${p.color}">${visual(p,true)}</div>
  <section class="project-about reveal"><div class="section-index">About</div><div><h2>${escapeHTML(p.short)}</h2><p>${escapeHTML(p.description)}</p>${p.concept?'<p class="note">Independent concept work. It does not represent a real company or products offered for sale.</p>':''}</div><dl><dt>Category</dt><dd>${escapeHTML(p.category)}</dd><dt>Role</dt><dd>${escapeHTML(p.role)}</dd><dt>Year</dt><dd>${p.year}</dd></dl></section>
  <section class="live-preview reveal"><div><div class="section-index">Interactive view</div><h2>Experience the website.</h2><p>The real site only loads when you ask for it, keeping PRESCORN fast.</p></div><div class="preview-actions">${p.previewType==='iframe'?`<button id="launch-preview" class="dark-button">Launch interactive preview ${arrow}</button>`:''}<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Open live site ${arrow}</a></div><div id="preview-frame"></div></section>
  <a class="next-project" href="#/project/${next.slug}"><div><span>Next project</span><strong>${next.name}</strong></div>${arrow}</a></div>`;
}

function bindHeroSlider(){
  const frame=$('#hero-site-frame');
  if(!frame)return;
  const featured=projects.filter(p=>p.featured).slice(0,3);
  let current=0;
  const name=$('#hero-project-name');
  const counter=$('#hero-current');
  const live=$('#hero-live-link');
  const tabs=$('.hero-project-tab');

  const show=(index)=>{
    current=(index+featured.length)%featured.length;
    const p=featured[current];
    frame.classList.add('switching');
    window.setTimeout(()=>{
      frame.src=p.liveUrl;
      frame.title=`${p.name} live website preview`;
      name.textContent=p.name;
      counter.textContent=String(current+1).padStart(2,'0');
      live.href=p.liveUrl;
      tabs.forEach((tab,i)=>tab.classList.toggle('active',i===current));
      window.setTimeout(()=>frame.classList.remove('switching'),220);
    },160);
  };

  $('#hero-prev')?.addEventListener('click',()=>show(current-1));
  $('#hero-next')?.addEventListener('click',()=>show(current+1));
  tabs.forEach((tab,i)=>tab.addEventListener('click',()=>show(i)));
}

function bindForm(){
  const form=$('#inquiry'); if(!form)return;
  const params=new URLSearchParams(location.hash.split('?')[1]||'');
  const chosen=studio.pricing.find(x=>x.name===params.get('plan')); if(chosen)$('#budget').value=chosen.budget;
  const validate=input=>{const error=$(`#${input.id}-error`);if(!error)return true;let msg='';const v=input.value.trim();if(!v)msg='Please complete this field.';else if(input.type==='email'&&input.validity.typeMismatch)msg='Please enter a valid email.';else if(input.id==='description'&&v.length<20)msg='Please add a little more detail.';error.textContent=msg;input.setAttribute('aria-invalid',String(!!msg));return !msg;};
  form.querySelectorAll('[required]').forEach(i=>i.addEventListener('blur',()=>validate(i)));
  form.addEventListener('submit',async e=>{e.preventDefault();const req=[...form.querySelectorAll('[required]')];if(!req.map(validate).every(Boolean)){form.querySelector('[aria-invalid="true"]')?.focus();return;}const button=form.querySelector('button'),status=$('#form-status');button.disabled=true;button.textContent='Sending…';try{await submitInquiry(Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,v.trim()])));status.textContent='Thank you. Your request has been received.';status.className='ok';form.reset();}catch(err){status.textContent=err.message;status.className='error';}finally{button.disabled=false;button.innerHTML=`Send project request ${arrow}`;status.focus();}});
}

function bindReveal(){
  const items=$$('.reveal');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(x=>x.classList.add('visible'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px -30px'});items.forEach(x=>io.observe(x));
}

function bindPreview(){
  const button=$('#launch-preview'); if(!button)return; const slug=(location.hash.split('/')[2]||'').split('?')[0]; const p=projects.find(x=>x.slug===slug); if(!p)return;
  button.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.title=`${p.name} interactive preview`;frame.src=p.liveUrl;frame.loading='eager';frame.referrerPolicy='strict-origin-when-cross-origin';frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');const host=$('#preview-frame');host.replaceChildren(frame);host.classList.add('loaded');button.remove();});
}

function render(){
  const route=(location.hash.slice(1)||'/').split('?')[0];
  const section=['/responsive','/pricing','/contact'].includes(route)?route.slice(1):null;
  $('#main').innerHTML=route==='/work'?work():route.startsWith('/project/')?project(route.split('/')[2]):home();
  bindHeroSlider();bindForm();bindReveal();bindPreview();
  requestAnimationFrame(()=>{if(section)document.getElementById(section)?.scrollIntoView({behavior:'instant'});else{scrollTo(0,0);$('#main').focus({preventScroll:true});}});
}

header();footer();
const onScroll=()=>$('#header').classList.toggle('scrolled',scrollY>16);addEventListener('scroll',onScroll,{passive:true});onScroll();
render();addEventListener('hashchange',render);
