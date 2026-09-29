import {projects,studio} from './data.js';
import {submitInquiry} from './inquiry.js';

const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
const arrow='<span aria-hidden="true">↗</span>';

const escapeHTML = (s) => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const liveLink = (p, className='text-link') =>
  `<a class="${className}" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(p.name)} live site in a new tab">Live site ${arrow}</a>`;

function projectVisual(p,priority=false){
  if(p.assetAvailable){
    return `<img src="${p.coverImage}" srcset="${p.coverImage.replace('.webp','-640.webp')} 640w, ${p.coverImage} 1348w" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 72vw" alt="${escapeHTML(p.name)} — ${escapeHTML(p.category)} project visual" width="1348" height="926" loading="${priority?'eager':'lazy'}" ${priority?'fetchpriority="high"':''}>`;
  }
  return `<div class="project-fallback project-fallback-${p.slug}" aria-label="${escapeHTML(p.name)} project preview">
    <span class="fallback-index">${p.number}</span>
    <strong>${escapeHTML(p.name)}</strong>
    <small>${escapeHTML(p.short)}</small>
    ${p.slug==='varel'?'<i class="watch-ring" aria-hidden="true"></i>':''}
    ${p.slug==='renovoltis'?'<i class="energy-line" aria-hidden="true"></i>':''}
  </div>`;
}

function card(p,priority=false,variant=''){
  return `<article class="project-card ${p.slug} ${variant}" style="--project-color:${p.color}">
    <a class="project-image" href="#/project/${p.slug}" aria-label="View ${escapeHTML(p.name)} project">
      ${projectVisual(p,priority)}
      <span class="view-tag">View project ${arrow}</span>
    </a>
    <div class="project-caption">
      <div class="caption-title"><span>${p.number}</span><div><h3><a href="#/project/${p.slug}">${escapeHTML(p.name)}</a></h3><p>${escapeHTML(p.category)}</p></div></div>
      <div class="caption-actions"><a class="text-link" href="#/project/${p.slug}">Project ${arrow}</a>${liveLink(p)}</div>
    </div>
  </article>`;
}

function header(){
  $('#header').innerHTML=`<div class="header-inner">
    <a class="wordmark" href="#/" aria-label="PRESCORN home">PRESCORN</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation"><span>Menu</span><i aria-hidden="true"></i></button>
    <nav id="navigation" aria-label="Main navigation">
      ${studio.navigation.map(n=>`<a href="${n.href}">${n.label}</a>`).join('')}
      <a class="nav-cta" href="#/contact">Start a project ${arrow}</a>
    </nav>
  </div>`;
  const button=$('.menu-toggle');
  button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));
    $('#navigation').classList.toggle('open',open);
  });
  $('#header').addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      button.setAttribute('aria-expanded','false');
      $('#navigation').classList.remove('open');
      button.focus();
    }
  });
}

function footer(){
  $('#footer').innerHTML=`<div class="footer-top">
    <div><a class="wordmark" href="#/">PRESCORN</a><p>Digital design & creative development.</p></div>
    <nav aria-label="Footer navigation">
      <a href="#/work">Work</a><a href="#/studio">Studio</a><a href="#/pricing">Pricing</a><a href="#/contact">Start a project</a>
    </nav>
  </div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} PRESCORN</span><span>Independent digital studio</span><a href="#/">Back to top ↑</a></div>`;
}

function studioSection(){
  const steps=[
    ['Strategy','Brand, audience, goals and the right digital direction.'],
    ['Design','Custom interface, visual system and art direction.'],
    ['Development','Responsive implementation with purposeful interaction.'],
    ['Launch','Testing, optimization, deployment and final setup.']
  ];
  return `<section id="studio" class="section studio-section reveal-block">
    <div class="section-label">01 / Studio</div>
    <div class="studio-content">
      <div class="section-lead"><h2>Studio-style websites,<br><em>tailored to your brand.</em></h2><p>We do not force every project into the same template. Each website is shaped around its identity, content and goals.</p></div>
      <div class="process-list">${steps.map(([title,copy],i)=>`<article><span>0${i+1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
    </div>
  </section>`;
}

function pricing(){
  return `<section id="pricing" class="section pricing-section reveal-block">
    <div class="section-label">02 / Pricing</div>
    <div class="pricing-content">
      <div class="section-lead"><h2>Flexible options<br><em>for different needs.</em></h2><p>These are starting points. Final scope and price are shaped around the actual project.</p></div>
      <div class="pricing-list">${studio.pricing.map((p,i)=>`<article class="price-plan ${i===1?'price-featured':''}">
        <span class="plan-index">0${i+1}</span>
        <div class="plan-name"><h3>${p.name}</h3><p>${p.description}</p></div>
        <ul>${p.features.slice(0,4).map(f=>`<li>${f}</li>`).join('')}</ul>
        <div class="plan-price"><small>${p.prefix}</small><strong>${p.price}</strong></div>
        <a href="#/contact?plan=${encodeURIComponent(p.name)}" aria-label="Ask about ${p.name}">${arrow}</a>
      </article>`).join('')}</div>
      <p class="pricing-note">Starting prices are indicative. Every proposal is tailored to your scope.</p>
    </div>
  </section>`;
}

function contact(){
  return `<section id="contact" class="contact-section reveal-block">
    <div class="contact-intro">
      <div class="section-label light">03 / Let's work together</div>
      <h2>Have a project<br><em>in mind?</em></h2>
      <p>Tell us what you are building. We will use the details to understand the scope and direction.</p>
    </div>
    <form id="inquiry" novalidate>
      <div class="form-grid">
        <div class="field"><label for="name">Your name <span>*</span></label><input id="name" name="name" autocomplete="name" required maxlength="100" placeholder="Name"><small class="error" id="name-error"></small></div>
        <div class="field"><label for="email">Email <span>*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@company.com"><small class="error" id="email-error"></small></div>
        <div class="field"><label for="company">Brand / Company</label><input id="company" name="company" autocomplete="organization" maxlength="150" placeholder="Optional"></div>
        <div class="field"><label for="service">What do you need? <span>*</span></label><select id="service" name="service" required><option value="">Select a service</option>${studio.services.map(x=>`<option>${x}</option>`).join('')}</select><small class="error" id="service-error"></small></div>
        <div class="field full"><label for="budget">Estimated budget <span>*</span></label><select id="budget" name="budget" required><option value="">Select a range</option>${studio.budgets.map(x=>`<option>${x}</option>`).join('')}</select><small class="error" id="budget-error"></small></div>
        <div class="field full"><label for="description">Tell us about your project <span>*</span></label><textarea id="description" name="description" required minlength="20" maxlength="5000" rows="4" placeholder="Goals, timeline and anything important…"></textarea><small class="error" id="description-error"></small></div>
      </div>
      <div class="form-bottom"><p id="form-status" role="status" aria-live="polite" tabindex="-1">${studio.inquiryEndpoint?'Ready to send.':'The submission endpoint will be connected before launch.'}</p><button type="submit" class="light-button">Send project request <span aria-hidden="true">↗</span></button></div>
    </form>
  </section>`;
}

function home(){
  const featured=projects.filter(p=>p.featured).slice(0,3);
  return `<div class="wrap">
    <section class="intro reveal-block">
      <div class="intro-main"><div class="eyebrow">Independent digital studio / 2026</div><h1>Websites<br>with <em>character.</em></h1><p>PRESCORN designs and develops distinctive digital experiences for brands, products and ideas.</p></div>
      <div class="intro-side"><div><span>Selected work</span><strong>03</strong></div><p>Strategy, design and development — kept simple enough to let the work speak first.</p><a href="#featured">See selected work ↓</a></div>
    </section>
    <section class="featured" id="featured" aria-labelledby="featured-title">
      <div class="work-heading"><h2 id="featured-title">Selected work <span>(03)</span></h2><a class="text-link" href="#/work">Explore all work ${arrow}</a></div>
      <div class="featured-grid">${featured.map((p,i)=>card(p,i===0,i===0?'feature-primary':'')).join('')}</div>
    </section>
    ${studioSection()}
    ${pricing()}
  </div>
  <div class="contact-band"><div class="wrap">${contact()}</div></div>`;
}

function work(){
  return `<div class="wrap">
    <section class="page-intro reveal-block"><div><div class="eyebrow">Project collection / 08</div><h1>Selected<br><em>work.</em></h1></div><p>Eight projects across fragrance, jewellery, watches, skincare, architecture, hospitality, technology and sustainability.</p></section>
    <section class="work-grid" aria-label="All projects">${projects.map((p,i)=>card(p,i<2,i%3===0?'work-wide':'')).join('')}</section>
    <div class="work-end reveal-block"><div><span>Next project</span><h2>Yours.</h2></div><a class="dark-button" href="#/contact">Start a project ${arrow}</a></div>
  </div>`;
}

function project(slug){
  const p=projects.find(p=>p.slug===slug);
  if(!p)return `<div class="wrap empty-page"><h1>Project not found.</h1><a href="#/work">Return to all work</a></div>`;
  const i=projects.indexOf(p),prev=projects[(i+projects.length-1)%projects.length],next=projects[(i+1)%projects.length];
  const preview=p.previewType==='iframe'
    ? `<button class="dark-button" id="launch-preview">Launch interactive preview ${arrow}</button>`
    : `<a class="dark-button" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Open live site ${arrow}</a>`;
  return `<div class="wrap project-page">
    <a class="back-link" href="#/work">← All work</a>
    <section class="project-intro reveal-block"><div><div class="eyebrow">Project ${p.number} / ${escapeHTML(p.category)}</div><h1>${escapeHTML(p.name)}</h1><p class="project-line">${escapeHTML(p.short)}</p></div><div class="project-intro-side"><p>${escapeHTML(p.description)}</p>${liveLink(p,'dark-button')}</div></section>
    <div class="project-hero reveal-block" style="--project-color:${p.color}">${projectVisual(p,true)}</div>
    <section class="project-details reveal-block"><div class="section-label">About the project</div><div><h2>${escapeHTML(p.short)}</h2><p>${escapeHTML(p.description)}</p>${p.concept?'<p class="concept-note">Independent concept work. It does not represent a real company or products offered for sale.</p>':''}</div><dl><dt>Discipline</dt><dd>${escapeHTML(p.category)}</dd><dt>Role</dt><dd>${escapeHTML(p.role)}</dd>${p.year?`<dt>Year</dt><dd>${p.year}</dd>`:''}</dl></section>
    <section class="preview-section reveal-block"><div><div class="section-label">Interactive view</div><h2>Experience the website.</h2><p>Open the real project here when embedding is supported, or continue to the live site in a new tab.</p></div><div class="preview-action">${preview}</div><div id="preview-frame"></div></section>
    <nav class="project-pagination" aria-label="Project navigation"><a href="#/project/${prev.slug}"><small>← Previous</small><span>${prev.name}</span></a><a href="#/project/${next.slug}"><small>Next →</small><span>${next.name}</span></a></nav>
  </div>`;
}

function bindForm(){
  const form=$('#inquiry');
  if(!form)return;
  const params=new URLSearchParams(location.hash.split('?')[1]||'');
  const selected=studio.pricing.find(p=>p.name===params.get('plan'));
  if(selected)$('#budget').value=selected.budget;
  const validate=input=>{
    const error=$(`#${input.id}-error`);
    if(!error)return true;
    const value=input.value.trim();
    let message='';
    if(!value)message='Please complete this field.';
    else if(input.type==='email'&&input.validity.typeMismatch)message='Please enter a valid email address.';
    else if(input.id==='description'&&value.length<20)message='Please tell us a little more (at least 20 characters).';
    error.textContent=message;
    input.setAttribute('aria-invalid',String(!!message));
    input.setAttribute('aria-describedby',error.id);
    return !message;
  };
  form.querySelectorAll('[required]').forEach(input=>{
    input.addEventListener('blur',()=>validate(input));
    input.addEventListener('input',()=>{if(input.getAttribute('aria-invalid')==='true')validate(input);});
  });
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const inputs=[...form.querySelectorAll('[required]')];
    if(!inputs.map(validate).every(Boolean)){
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const button=form.querySelector('[type="submit"]'),status=$('#form-status');
    button.disabled=true;
    button.textContent='Sending request…';
    form.setAttribute('aria-busy','true');
    try{
      await submitInquiry(Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,v.trim()])));
      status.textContent='Thank you. Your project request has been received.';
      status.className='success';
      form.reset();
    }catch(error){
      status.textContent=error.name==='TimeoutError'?'The request timed out. Delivery is not confirmed. Please try again.':error.message;
      status.className='send-error';
    }finally{
      button.disabled=false;
      button.innerHTML='Send project request <span aria-hidden="true">↗</span>';
      form.removeAttribute('aria-busy');
      status.focus();
    }
  });
}

function bindMotion(){
  const items=$$('.reveal-block');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(x=>x.classList.add('in-view'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -40px'});
  items.forEach(x=>io.observe(x));
}

function bindHeader(){
  const el=$('#header');
  const onScroll=()=>el.classList.toggle('scrolled',scrollY>16);
  onScroll();
  addEventListener('scroll',onScroll,{passive:true});
}

function render(){
  const route=(location.hash.slice(1)||'/').split('?')[0];
  const section=['/studio','/pricing','/contact'].includes(route)?route.slice(1):null;
  $('#main').innerHTML=route==='/work'?work():route.startsWith('/project/')?project(route.split('/')[2]):route==='/'||section?home():`<div class="wrap empty-page"><h1>Page not found.</h1><a href="#/">Return home</a></div>`;
  const current=projects.find(p=>route===`/project/${p.slug}`);
  document.title=current?`${current.name} — PRESCORN`:route==='/work'?'Selected Work — PRESCORN':'PRESCORN — Websites with character.';
  $('.menu-toggle').setAttribute('aria-expanded','false');
  $('#navigation').classList.remove('open');
  $$('#navigation a').forEach(a=>{
    if(a.getAttribute('href')===`#${route}`)a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  bindForm();
  bindMotion();
  const launch=$('#launch-preview');
  if(launch&&current)launch.addEventListener('click',()=>{
    const frame=document.createElement('iframe');
    frame.src=current.liveUrl;
    frame.title=`${current.name} interactive website preview`;
    frame.loading='lazy';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
    const host=$('#preview-frame');
    host.replaceChildren(frame);
    host.classList.add('loaded');
    launch.remove();
  });
  requestAnimationFrame(()=>{
    if(section)document.getElementById(section)?.scrollIntoView({behavior:'instant',block:'start'});
    else{window.scrollTo(0,0);$('#main').focus({preventScroll:true});}
  });
}

header();
footer();
bindHeader();
render();
window.addEventListener('hashchange',render);
