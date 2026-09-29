const img = (name) => `${new URL("../", import.meta.url).pathname}images/${name}.webp`;

export const studio = {
  name: 'PRESCORN',
  email: '',
  inquiryEndpoint: globalThis.PRESCORN_CONFIG?.inquiryEndpoint || '',
  navigation: [
    {label:'Work',href:'#/work'},
    {label:'Studio',href:'#/studio'},
    {label:'Pricing',href:'#/pricing'}
  ],
  pricing: [
    {name:'Essential',price:'€800',prefix:'Starting from',description:'For focused landing pages and smaller websites.',features:['Custom design','Responsive development','Basic SEO setup','Launch support'],budget:'Under €1,000'},
    {name:'Signature',price:'€1,500',prefix:'Starting from',description:'For complete custom studio websites with more depth.',features:['Multi-page design','Custom interactions','CMS-ready structure','Performance & launch'],budget:'€1,000–€2,500'},
    {name:'Experience',price:'Custom quote',prefix:'Tailored scope',description:'For cinematic, interactive and technically ambitious experiences.',features:['Advanced motion','3D / custom features','Technical prototyping','Tailored production'],budget:'Not sure yet'}
  ],
  services:['Website','E-commerce','Portfolio','Landing Page','Interactive Experience','Other'],
  budgets:['Under €1,000','€1,000–€2,500','€2,500–€5,000','€5,000+','Not sure yet']
};

export const projects = [
  {slug:'sillage',name:'SILLAGE / 09',category:'Fragrance / Digital Experience',short:'A scent beyond time.',description:'A fragrance concept translated into an atmospheric digital world. Editorial composition, tactile imagery and carefully paced interaction turn scent into a visual experience.',liveUrl:'https://budaqovabdullah2005-ship-it.github.io/sillage/',featured:true,color:'#1c241f',concept:true,previewType:'iframe',year:'2026'},
  {slug:'aurel',name:'AUREL',category:'Jewellery / Digital Experience',short:'Objects of fascination.',description:'A cinematic jewellery concept built around material, light and movement. The experience gives individual pieces room to feel tactile, colourful and considered.',liveUrl:'https://budaqovabdullah2005-ship-it.github.io/AUREL/',featured:true,color:'#6f4a3d',concept:true,previewType:'iframe',year:'2026'},
  {slug:'varel',name:'VAREL',category:'Watches / Interactive 3D',short:'Time, deconstructed.',description:'A luxury watch concept explored through an interactive mechanical object. Scroll-led motion reveals the architecture of the watch and the precision behind it.',liveUrl:'https://qabil05.github.io/varel/',featured:true,color:'#111313',concept:true,assetAvailable:false,previewType:'iframe',year:'2026'},
  {slug:'sheh',name:'SHEH',category:'Skincare / Brand Website',short:'The first touch of nature.',description:'A bright skincare concept shaped by botanical ingredients, light and daily rituals. An editorial storefront connects product discovery with a calmer visual language.',liveUrl:'https://qabil05.github.io/sheh-skincare-project/',color:'#e4e7d8',concept:true,previewType:'iframe',year:'2026'},
  {slug:'orven',name:'ORVEN',category:'Architecture / Portfolio',short:'Formed by place.',description:'An architectural portfolio concept with a disciplined grid and generous imagery. Projects, materials and spatial details are presented with quiet precision.',liveUrl:'https://qabil05.github.io/orven-architecture/',color:'#d9d7ce',concept:true,previewType:'iframe',year:'2026'},
  {slug:'mirbir',name:'MIRBIR',category:'Hospitality / Brand Website',short:'A private escape.',description:'A boutique hotel concept shaped by sea, stone and silence. Warm destination imagery and an intuitive browsing journey establish a sense of place before arrival.',liveUrl:'https://qabil05.github.io/mirbir-hotel-project/',color:'#6f7068',concept:true,previewType:'iframe',year:'2026'},
  {slug:'prsmyn',name:'PRSMYN',category:'Technology / Brand Website',short:'A clearer perspective.',description:'A digital presence for an AI-powered behavioral assessment platform, bringing its purpose, research and story into a direct, approachable website.',liveUrl:'https://prsmyn.com/',color:'#7278bd',concept:false,previewType:'external',year:'2026'},
  {slug:'renovoltis',name:'RENOVOLTIS',category:'Sustainability / Brand Website',short:'Waste into energy.',description:'A sustainability-focused product story for agricultural waste-to-energy technology, presented around practical impact and a clearer path to clean energy.',liveUrl:'https://renovoltis.com/',color:'#7a9470',concept:false,assetAvailable:false,previewType:'external',year:'2026'}
].map((p,i)=>({
  ...p,
  number:String(i+1).padStart(2,'0'),
  role:'Design & development',
  coverImage:img(p.slug),
  desktopImage:img(p.slug),
  mobileImage:null,
  previewType:'external',
  assetAvailable:true,
  ...p
}));
