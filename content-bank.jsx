import { useState, useRef, useEffect } from "react";

const gid = () => Math.random().toString(36).substr(2, 9);
const FORMATS = ["Carousel (3 slides)","Carousel (4 slides)","Carousel (5 slides)","Reel (voiceover + illustration visuals)","Reel (voiceover + photos)","Reel (talking head)","Reel (talking head + b-roll)","Static Image Post","TBD"];
const WEEKS = ["TBD","Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8","Week 9","Week 10"];
const STATUSES = ["WIP","Ready for Review","Posted"];
const SC = {"WIP":{bg:"#FEF3C7",text:"#92400E",border:"#F59E0B"},"Ready for Review":{bg:"#DBEAFE",text:"#1E40AF",border:"#3B82F6"},"Posted":{bg:"#D1FAE5",text:"#065F46",border:"#10B981"}};
const SK = {posts:"rtmd-p-v3",pipeline:"rtmd-pi-v3"};

function EF({initial, multi, onSave, onCancel}) {
  const [v, setV] = useState(initial);
  const r = useRef(null);
  useEffect(() => { if(r.current){r.current.focus();const l=r.current.value.length;r.current.setSelectionRange(l,l);} }, []);
  const hk = e => { if(e.key==="Escape")onCancel(); if(!multi&&e.key==="Enter")onSave(v); };
  const sty = {width:"100%",padding:multi?10:8,fontFamily:"'DM Sans',sans-serif",fontSize:13,lineHeight:1.65,border:"2px solid #C4956A",borderRadius:6,background:"#FFFDF7",outline:"none",boxSizing:"border-box"};
  return (
    <div>
      {multi
        ? <textarea ref={r} value={v} onChange={e=>setV(e.target.value)} onKeyDown={hk} style={{...sty,minHeight:120,resize:"vertical"}} />
        : <input ref={r} value={v} onChange={e=>setV(e.target.value)} onKeyDown={hk} style={sty} />
      }
      <div style={{display:"flex",gap:6,marginTop:5}}>
        <button onClick={()=>onSave(v)} style={{padding:"4px 14px",background:"#C4956A",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:11,fontWeight:600}}>Save</button>
        <button onClick={onCancel} style={{padding:"4px 14px",background:"#E8E0D4",color:"#5C4A3A",border:"none",borderRadius:4,cursor:"pointer",fontSize:11}}>Cancel</button>
      </div>
    </div>
  );
}

const DP = [
  {id:"lf-1",week:"Week 1",topic:"Lip Filler",postNumber:"1 of 3",format:"Carousel (4 slides)",thumbnailText:"5 Things No One Tells You Before Getting Lip Filler",hook:"Most people think lip filler is just about making your lips bigger. But if that's all that's being focused on, you might not love the result.",caption:"Most people think lip filler is just about making your lips bigger. But if that's all that's being focused on, you might not love the result.\n\nHere's what most people don't know before their first time:\n\n→ It's not just about size: the goal is balance, proportion, and harmony with the rest of your features\n→ Your upper and lower lip have an ideal ratio (around 1:1.6): go outside that and things look unnatural fast\n→ The vermilion border matters: a soft, defined border looks polished without looking \"done\"\n→ Filler can migrate if placed incorrectly: technique matters more than the product itself\n→ Less is almost always more the first time around: you can always add, but dissolving is a whole process\n\nThe best lip filler should look like you were born with great lips. That's the standard.\n\nSave this for later. Follow @roberttungmd for more aesthetic education.\n\n#lipfiller #lipaugmentation #aestheticplasticsurgery #naturalresults #roberttungmd",voiceover:"Most people think lip filler is all about volume. But great lip filler is actually about proportion and balance.\n\nYour upper and lower lips have a natural ratio, around 1 to 1.6. When that's respected, the result looks effortless.\n\nThe vermilion border also plays a huge role. A soft, well-defined border gives that polished look without the \"filler face.\"\n\nFiller can migrate if placed in the wrong layer. Technique matters more than the product.\n\nStarting conservative is almost always the move. Save this and follow along.",slidesDescription:"Slide 1: Title card watercolor\nSlide 2: Lips with 1:1.6 ratio markings\nSlide 3: Well placed vs migrated filler\nSlide 4: BEFORE/AFTER illustrations",status:"WIP",targetDate:"",trendingRef:"\"Things no one tells you\" trending format."},
  {id:"lf-2",week:"Week 1",topic:"Lip Filler",postNumber:"2 of 3",format:"Reel (voiceover + illustration visuals)",thumbnailText:"Who Should NOT Get Lip Filler",hook:"Not everyone is the right fit for lip filler. Here's who should think twice.",caption:"Not everyone is the right fit for lip filler. Here's who should think twice.\n\n→ Active cold sores: filler can trigger a flare. Should be screened beforehand\n→ Dramatic change in one session: overfilling stretches tissue. Best results come gradually\n→ Unsure about goals: best outcomes happen with clear understanding of desired result\n→ No thorough assessment beforehand: if anatomy isn't discussed first, red flag\n\nIdeal candidate wants subtle enhancement and a gradual approach.\n\nComment a topic you want next. Follow @roberttungmd.\n\n#lipfiller #cosmeticinjectables #fillereducation #naturalbeauty #roberttungmd",voiceover:"Not everyone is the right fit for lip filler.\n\nCold sore history? Filler can trigger a flare. Should be screened.\n\nHuge change in one sitting? Yellow flag. Best results come gradually.\n\nNo discussion of goals and anatomy before starting? Red flag.\n\nIdeal candidate wants subtle improvement and a gradual approach.",slidesDescription:"0-3s: Thumbnail watercolor\n3-8s: Cold sore illustration\n8-15s: Overfill vs gradual\n15-22s: Assessment illustration\n22-30s: End card",status:"WIP",targetDate:"",trendingRef:"\"Who should NOT\" drives saves."},
  {id:"lf-3",week:"Week 1",topic:"Lip Filler",postNumber:"3 of 3",format:"Carousel (3 slides)",thumbnailText:"3 Questions to Ask Before Lip Filler",hook:"Three questions worth asking before anything happens.",caption:"Thinking about lip filler? Three questions worth asking:\n\n1. What product is being used and why?\nChoice should match anatomy and goals.\n\n2. What's the plan if something goes wrong?\nClear emergency protocol should exist.\n\n3. What does a realistic result look like?\nBased on individual proportions, not someone else's.\n\nIf these don't get clear answers, that tells you everything.\n\nSave this. Follow @roberttungmd.\n\n#lipfiller #fillereducation #aestheticmedicine #roberttungmd",voiceover:"Three questions before lip filler.\n\nOne: what product and why? Should match anatomy.\n\nTwo: plan if something goes wrong? Clear safety protocol should exist.\n\nThree: realistic result? Based on individual proportions.\n\nIf these don't get clear answers, pay attention.",slidesDescription:"Slide 1: Title card\nSlide 2: Three question cards\nSlide 3: End card",status:"WIP",targetDate:"",trendingRef:"\"3 questions\" top hook."},
  {id:"tt-1",week:"Week 2",topic:"Abdominoplasty",postNumber:"1 of 3",format:"Carousel (4 slides)",thumbnailText:"Tummy Tuck 101: What Actually Happens",hook:"A tummy tuck isn't just about removing extra skin.",caption:"A tummy tuck isn't just about removing extra skin.\n\nAbdominoplasty addresses multiple layers:\n\n→ Skin: excess removed between belly button and lower abdomen\n→ Muscle: tightened. After pregnancy these can separate (diastasis recti)\n→ Fat: liposuction often alongside to sculpt waist\n→ Belly button: repositioned, not removed\n\nAll layers together = dramatic results.\n\nFollow @roberttungmd.\n\n#tummytuck #abdominoplasty #bodycontouring #roberttungmd",voiceover:"A tummy tuck addresses multiple layers. Skin removal. Muscle repair for diastasis recti. Liposuction for waist sculpting. Belly button repositioned.\n\nWhen all addressed together, truly transformative.",slidesDescription:"Slide 1: Title\nSlide 2: Layered anatomy\nSlide 3: Diastasis repair\nSlide 4: Final contour",status:"WIP",targetDate:"",trendingRef:"\"What actually happens\" curiosity hook."},
  {id:"tt-2",week:"Week 2",topic:"Abdominoplasty",postNumber:"2 of 3",format:"Reel (voiceover + illustration visuals)",thumbnailText:"Who is a Good Candidate for a Tummy Tuck?",hook:"Here's how to know if it might be the right fit.",caption:"A tummy tuck works best for people who:\n\n→ Have loose skin that won't improve with diet/exercise\n→ Have separated abdominal muscles (diastasis recti)\n→ Are at or near goal weight\n→ Are done having children\n→ Don't smoke\n\nShare with someone researching. Follow @roberttungmd.\n\n#tummytuck #mommymakeover #bodycontouring #roberttungmd",voiceover:"Best candidates have loose skin diet can't fix. Separated muscles. Near goal weight. Done with children. Don't smoke.\n\nShare with someone researching.",slidesDescription:"0-3s: Thumbnail\n3-26s: Candidate criteria illustrations\n26-30s: End card",status:"WIP",targetDate:"",trendingRef:"Candidate posts drive shares."},
  {id:"tt-3",week:"Week 2",topic:"Abdominoplasty",postNumber:"3 of 3",format:"Carousel (3 slides)",thumbnailText:"Tummy Tuck Recovery: Week by Week",hook:"What does recovery actually look like?",caption:"→ Week 1: Hardest part. Hunched, drains in. Rest essential\n→ Weeks 2-3: Straighter. Drains out. Light walking\n→ Weeks 4-6: Desk work. Early shape visible\n→ Months 3-6: Full activity. Scar maturing\n→ 12+ months: True final result\n\nSave this timeline. Follow @roberttungmd.\n\n#tummytuckrecovery #abdominoplasty #bodycontouring #roberttungmd",voiceover:"Week one hardest. Weeks two-three, drains out. Four through six, back at desk. Three to six months, full activity. Twelve months, true result.\n\nPatience is everything.",slidesDescription:"Slide 1: Title\nSlide 2: Timeline\nSlide 3: End card",status:"WIP",targetDate:"",trendingRef:"Recovery timelines highest-saved."},
  {id:"pts-1",week:"Week 3",topic:"Progressive Tension Sutures",postNumber:"1 of 1",format:"Reel (voiceover + illustration visuals)",thumbnailText:"The Technique Changing Tummy Tuck Recovery",hook:"What if a tummy tuck didn't require drains?",caption:"Progressive tension sutures:\n\n→ Traditional: fluid collects, drains placed\n→ PTS: internal stitches eliminate dead space\n→ Result: many cases skip drains\n\nLess discomfort. Faster recovery. Standing sooner.\n\nFollow @roberttungmd.\n\n#drainfreetummytuck #tummytuck #bodycontouring #roberttungmd",voiceover:"Progressive tension sutures. Internal stitches eliminate dead space where fluid collects. Many cases skip drains. Less discomfort, faster recovery.",slidesDescription:"0-3s: Title\n3-10s: Traditional with drain\n10-18s: PTS sutures\n18-24s: Comparison\n24-30s: End card",status:"WIP",targetDate:"",trendingRef:"Drain-free heavily searched."},
  {id:"ub-1",week:"Week 3",topic:"Upper Blepharoplasty",postNumber:"1 of 2",format:"Carousel (4 slides)",thumbnailText:"The Most Underrated Facial Procedure",hook:"One procedure can make someone look more rested, alert, and years younger.",caption:"Upper blepharoplasty (eyelid surgery):\n\n→ Addresses hooding: skin droops with age, can affect vision\n→ Invisible scar: hides in natural crease\n→ Quick recovery: 7-10 days\n→ Small change, big difference\n\nFor people of Asian descent: unique crease height considerations. Something I'm passionate about as a first generation Asian American surgeon.\n\nSave this. Follow @roberttungmd.\n\n#upperblepharoplasty #eyelidsurgery #asianblepharoplasty #roberttungmd",voiceover:"Most underrated facial procedure. Upper blepharoplasty.\n\nRemoves excess drooping skin. Scar hides in crease. Recovery seven to ten days.\n\nFor Asian descent, special attention to crease height and cultural preferences. Something I care deeply about.",slidesDescription:"Slide 1: Title\nSlide 2: Aging eyelid\nSlide 3: Incision in crease\nSlide 4: Asian bleph options",status:"WIP",targetDate:"",trendingRef:"\"Most underrated\" performs well."},
  {id:"ub-2",week:"Week 3",topic:"Upper Blepharoplasty",postNumber:"2 of 2",format:"Reel (voiceover + illustration visuals)",thumbnailText:"Am I Too Young for Eyelid Surgery?",hook:"I'm in my 30s. Is it too early?",caption:"Depends on anatomy, not age.\n\n→ Some develop hooding in 30s (genetics)\n→ No magic age\n→ Is excess skin a concern?\n→ Non-surgical options explored?\n→ Upper bleph addresses eyelid specifically\n\nComment \"EYES\" for more. Follow @roberttungmd.\n\n#blepharoplasty #eyelidsurgery #facialaesthetics #roberttungmd",voiceover:"Not about age, about anatomy. Some notice hooding in thirties. Worth exploring non-surgical options for mild cases.\n\nUpper bleph addresses eyelid specifically. Brow and under-eye are different.\n\nComment EYES for more.",slidesDescription:"Illustrated ages/anatomies. Watercolor. Text overlays.",status:"WIP",targetDate:"",trendingRef:"\"Am I too young\" resonates 25-40."},
  {id:"tr-1",week:"Week 4",topic:"Trending: GLP-1 Body Contouring",postNumber:"1 of 1",format:"Reel (voiceover + illustration visuals)",thumbnailText:"Ozempic Changed Your Body. Now What?",hook:"Lost the weight. Skin doesn't match. Here's what can be done.",caption:"After significant weight loss:\n\n→ Tummy tuck: abdominal skin\n→ Arm lift: upper arms\n→ Thigh lift: thighs\n→ Breast lift: volume/shape\n\nTiming: wait 3-6 months stable weight.\n\nIncredibly common. Options exist. Follow @roberttungmd.\n\n#ozempic #glp1 #bodycontouring #roberttungmd",voiceover:"Tummy tuck, arm lift, thigh lift, breast lift. Wait three to six months stable weight. Incredibly common. Options exist.",slidesDescription:"0-3s: Title\n3-20s: Procedure illustrations\n20-26s: Calendar\n26-30s: End card",status:"WIP",targetDate:"",trendingRef:"GLP-1 THE trending topic."},
  {id:"tr-2",week:"Week 4",topic:"Trending: Preserve Breast Implant",postNumber:"1 of 1",format:"Reel (voiceover + illustration visuals)",thumbnailText:"The Breast Implant Approach Everyone's Talking About",hook:"Implant above the muscle. Here's why it matters.",caption:"Preserve technique:\n\nTraditional: under muscle, animation deformity, longer recovery\n\nPreserve:\n→ Above muscle\n→ No muscle disruption\n→ No animation deformity\n→ Great for active people\n→ Best for smaller volume\n\nNot for everyone. Impressive for the right situation.\n\nFollow @roberttungmd.\n\n#preservebreastaugmentation #breastaugmentation #cosmeticsurgery #roberttungmd",voiceover:"Preserve technique. Above the muscle. Less discomfort, faster recovery, no animation deformity. Especially for active people wanting natural results.",slidesDescription:"0-3s: Title\n3-18s: Cross-sections\n18-24s: Comparison\n24-30s: End card",status:"WIP",targetDate:"",trendingRef:"Preserve most discussed innovation."},
  {id:"p-1",week:"Week 4",topic:"Personal: Day in the Life",postNumber:"1 of 1",format:"Reel (talking head + b-roll)",thumbnailText:"A Day in My Life as a Plastic Surgery Resident",hook:"What does a typical day look like in the final year?",caption:"→ 5:30 AM: Alarm. Coffee\n→ 6 AM: Pre-rounding\n→ 7 AM: Cases\n→ 12 PM: Lunch between cases\n→ 2 PM: Afternoon OR or clinic\n→ 5 PM: Documentation\n→ 7 PM: Home. Dinner. Tennis. Studying\n\nLong days. Wouldn't trade it. One more year then fellowship.\n\nFollow @roberttungmd.\n\n#plasticsurgeryresident #dayinthelife #residencylife #roberttungmd",voiceover:"Five thirty alarm. Coffee. Rounding. Operating. The variety is what I love. Lunch, back to OR. Home, dinner, maybe tennis, studying.\n\nOne more year then fellowship. Come along.",slidesDescription:"Talking head + b-roll. Hospital, OR, clinic, car, tennis. iPhone quality.",status:"WIP",targetDate:"",trendingRef:"Day in the life goes viral."}
];

const DPIPE = [
  {id:"pi-1",topic:"Rhinoplasty 101",priority:"High",rationale:"Most searched on TikTok.",hook:"The nose is the centerpiece. Here's what rhinoplasty can and can't do.",captionSummary:"What it addresses, who's a fit, recovery, why expertise matters."},
  {id:"pi-2",topic:"Breast Aug: Choose Your Size",priority:"High",rationale:"\"Perfect implant\" trending.",hook:"Stop thinking in cup sizes.",captionSummary:"Measurements, 3D imaging, saline vs silicone."},
  {id:"pi-3",topic:"What is a Mommy Makeover?",priority:"High",rationale:"Tummy tuck + breast overlap.",hook:"Body doesn't feel the same after kids?",captionSummary:"Customizable combo, timing, recovery."},
  {id:"pi-4",topic:"Celebrity Aesthetic Analysis",priority:"Medium",rationale:"Trending format.",hook:"What's trending in celebrity aesthetics.",captionSummary:"Natural results movement analysis."},
  {id:"pi-5",topic:"Botox vs Filler",priority:"High",rationale:"Common confusion.",hook:"They're not the same thing.",captionSummary:"Relaxes muscles vs adds volume."},
  {id:"pi-6",topic:"Facelift Myths",priority:"Medium",rationale:"Underserved content.",hook:"Think facelifts look done? 5 myths.",captionSummary:"Modern deep plane. Natural results."},
  {id:"pi-7",topic:"Ozempic Face",priority:"High",rationale:"Trending.",hook:"Here's what's actually happening.",captionSummary:"Volume loss. Filler, fat transfer, facelift."},
  {id:"pi-8",topic:"My Journey to Fellowship",priority:"Medium",rationale:"Personal milestone.",hook:"From Kansas City to Irvine.",captionSummary:"Tennis, med school, Cedars, UTHealth, fellowship."},
  {id:"pi-9",topic:"Injectables vs Surgery",priority:"Medium",rationale:"Decision framework.",hook:"When does each make sense?",captionSummary:"Filler for early aging, surgery for excess skin."},
  {id:"pi-10",topic:"How to Choose a Surgeon",priority:"High",rationale:"Trust-building.",hook:"5 red flags.",captionSummary:"Board cert, own work, risk discussion."},
  {id:"pi-11",topic:"BBL Safety",priority:"Medium",rationale:"Heavily discussed.",hook:"Highest complication rate.",captionSummary:"Risk factors, technique evolution."},
  {id:"pi-12",topic:"Skin Care Routine",priority:"Low",rationale:"Lifestyle bridge.",hook:"My actual routine.",captionSummary:"Cleanser, SPF, retinol, moisturizer."},
];

export default function App() {
  const [posts, setP] = useState(DP);
  const [pipe, setPi] = useState(DPIPE);
  const [loaded, setLd] = useState(false);
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("content");
  const [fS, setFS] = useState("All");
  const [fW, setFW] = useState("All");
  const [ef, setEf] = useState(null);
  const [ep, setEp] = useState(null);
  const [note, setNo] = useState(null);
  const [exM, setExM] = useState(null); // null | "sheet" | "doc"
  const [exS, setExS] = useState(new Set());
  const [exPreview, setExPreview] = useState(null); // rendered export content
  const exportRef = useRef(null);

  const noti = m => { setNo(m); setTimeout(()=>setNo(null),2800); };

  useEffect(()=>{(async()=>{
    try{const r=await window.storage.get(SK.posts);if(r&&r.value)setP(JSON.parse(r.value));}catch(e){}
    try{const r=await window.storage.get(SK.pipeline);if(r&&r.value)setPi(JSON.parse(r.value));}catch(e){}
    setLd(true);
  })();},[]);
  useEffect(()=>{if(!loaded)return;(async()=>{try{await window.storage.set(SK.posts,JSON.stringify(posts));}catch(e){}})();},[posts,loaded]);
  useEffect(()=>{if(!loaded)return;(async()=>{try{await window.storage.set(SK.pipeline,JSON.stringify(pipe));}catch(e){}})();},[pipe,loaded]);

  const active = posts.filter(p=>p.status!=="Posted");
  const posted = posts.filter(p=>p.status==="Posted");
  const filtered = active.filter(p=>(fS==="All"||p.status===fS)&&(fW==="All"||p.week===fW));

  const uf = (pid,f,v) => { setP(pr=>pr.map(p=>p.id===pid?{...p,[f]:v}:p)); setSel(pr=>pr&&pr.id===pid?{...pr,[f]:v}:pr); };
  const tog = id => setExS(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});

  const m2p = item => {
    setP(pr=>[...pr,{id:gid(),week:"TBD",topic:item.topic,postNumber:"1 of 1",format:"TBD",thumbnailText:item.topic,hook:item.hook,caption:(item.captionSummary||"")+"\n\nFollow @roberttungmd for more.\n\n#roberttungmd",voiceover:"",slidesDescription:"",status:"WIP",targetDate:"",trendingRef:item.rationale||""}]);
    setPi(pr=>pr.filter(p=>p.id!==item.id));
    noti(`"${item.topic}" added as WIP`);
  };

  // Build export preview content
  const buildExport = (type) => {
    const all = [...posts,...pipe.map(p=>({id:p.id,week:"Pipeline",topic:p.topic,postNumber:"",format:"TBD",thumbnailText:p.topic,hook:p.hook||"",caption:p.captionSummary||"",voiceover:"",slidesDescription:"",status:"Pipeline",targetDate:"",trendingRef:p.rationale||""}))];
    const items = all.filter(i=>exS.has(i.id));
    if(!items.length){noti("Select items first");return;}

    if(type==="sheet"){
      const h = ["Week","Topic","Post #","Format","Thumbnail","Hook","Caption","Voiceover","Visuals","Status","Target Date","Trending"];
      const rows = items.map(p=>[p.week,p.topic,p.postNumber,p.format,p.thumbnailText,p.hook,(p.caption||"").replace(/\n/g," | "),(p.voiceover||"").replace(/\n/g," | "),(p.slidesDescription||"").replace(/\n/g," | "),p.status,p.targetDate,p.trendingRef]);
      const tsv = [h.join("\t"),...rows.map(r=>r.join("\t"))].join("\n");
      setExPreview({type:"sheet",content:tsv,count:items.length,headers:h,rows});
    } else {
      let txt = "";
      items.forEach((p,i)=>{
        if(i>0) txt += "\n" + "━".repeat(50) + "\n\n";
        txt += (p.thumbnailText||p.topic).toUpperCase() + "\n";
        txt += (p.week||"") + " · " + p.status + " · " + (p.format||"TBD") + (p.targetDate?" · "+p.targetDate:"") + "\n\n";
        if(p.hook) txt += "HOOK:\n" + p.hook + "\n\n";
        if(p.caption) txt += "CAPTION:\n" + p.caption + "\n\n";
        if(p.voiceover) txt += "VOICEOVER:\n" + p.voiceover + "\n\n";
        if(p.slidesDescription) txt += "VISUAL DIRECTIONS:\n" + p.slidesDescription + "\n\n";
        if(p.trendingRef) txt += "TRENDING:\n" + p.trendingRef + "\n";
      });
      setExPreview({type:"doc",content:txt,count:items.length});
    }
  };

  const copyExport = () => {
    if(!exPreview) return;
    const text = exPreview.content;
    if(navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(()=>noti("Copied to clipboard! Paste into Google " + (exPreview.type==="sheet"?"Sheets":"Docs"))).catch(()=>{
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:0;top:0;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand("copy"); noti("Copied! Paste into Google " + (exPreview.type==="sheet"?"Sheets":"Docs")); }
    catch(e) { noti("Please select all text above and copy manually (Cmd+A, Cmd+C)"); }
    document.body.removeChild(ta);
  };

  const selectAllText = () => {
    if(exportRef.current){
      const range = document.createRange();
      range.selectNodeContents(exportRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const sc = st => SC[st]||SC["WIP"];
  const lp = id => posts.find(p=>p.id===id);
  const lok = st => st==="Ready for Review"||st==="Posted";

  const Card = ({post,sm}) => {
    const c=sc(post.status),lk=lok(post.status),ck=exS.has(post.id);
    return (
      <div style={{background:lk?"#F8FBFF":"#fff",borderRadius:10,padding:"16px 18px",border:`1px solid ${ck?"#C4956A":lk?"#B8D4F0":"#E8DDD0"}`,cursor:"pointer",transition:"all 0.2s",boxShadow:ck?"0 0 0 2px #C4956A":"0 1px 3px rgba(58,46,36,0.04)",position:"relative"}}
        onClick={()=>sm?tog(post.id):setSel({...post})}
        onMouseEnter={e=>{if(!sm){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 5px 14px rgba(58,46,36,0.08)";}}}
        onMouseLeave={e=>{if(!sm){e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=ck?"0 0 0 2px #C4956A":"0 1px 3px rgba(58,46,36,0.04)";}}}>
        {sm&&<div style={{position:"absolute",top:10,right:10,width:18,height:18,borderRadius:3,border:`2px solid ${ck?"#C4956A":"#ccc"}`,background:ck?"#C4956A":"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700}}>{ck?"✓":""}</div>}
        {lk&&!sm&&<div style={{position:"absolute",top:8,right:8,fontSize:11,opacity:0.4}}>🔒</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,paddingRight:sm?24:0}}>
          <span style={{fontSize:10,fontWeight:600,color:"#9B8B7A",textTransform:"uppercase"}}>{post.week} · {post.postNumber}</span>
          <span style={{fontSize:10,fontWeight:700,color:c.text,background:c.bg,padding:"2px 7px",borderRadius:10,border:`1px solid ${c.border}`}}>{post.status}</span>
        </div>
        <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 3px",lineHeight:1.3}}>{post.thumbnailText}</h3>
        <p style={{fontSize:11,color:"#7A6B5C",margin:"0 0 6px"}}>{post.topic} · {post.format}</p>
        <p style={{fontSize:12,color:"#5C4A3A",lineHeight:1.5,margin:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{post.hook}</p>
        {post.targetDate&&<p style={{fontSize:10,color:"#9B8B7A",marginTop:6,marginBottom:0}}>Target: {post.targetDate}</p>}
      </div>
    );
  };

  // Detail modal - works for both content bank and posted tab
  const Modal = () => {
    if(!sel||exM) return null;
    const live = lp(sel.id)||sel;
    const lk = lok(live.status);
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(44,34,24,0.5)",display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"28px 14px",zIndex:1000,overflowY:"auto",backdropFilter:"blur(3px)"}} onClick={()=>{setSel(null);setEf(null);}}>
        <div style={{background:lk?"#F8FBFF":"#FAF5EE",borderRadius:12,maxWidth:680,width:"100%",boxShadow:"0 16px 48px rgba(44,34,24,0.2)",maxHeight:"88vh",overflowY:"auto",border:`1px solid ${lk?"#B8D4F0":"#E0D5C8"}`}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:"18px 22px 12px",borderBottom:`1px solid ${lk?"#D0E3F5":"#E8DDD0"}`,position:"sticky",top:0,background:lk?"#F8FBFF":"#FAF5EE",zIndex:10,borderRadius:"12px 12px 0 0"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{flex:1}}>
                <span style={{fontSize:10,fontWeight:600,color:"#9B8B7A",textTransform:"uppercase"}}>{live.topic} · {live.postNumber}</span>
                <h2 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:18,fontWeight:700,margin:"3px 0 0"}}>{live.thumbnailText}</h2>
              </div>
              <button onClick={()=>{setSel(null);setEf(null);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9B8B7A"}}>×</button>
            </div>
            {lk && (
              <div style={{marginTop:10,padding:"8px 12px",background:live.status==="Posted"?"#D1FAE5":"#E8F4FD",borderRadius:6,border:`1px solid ${live.status==="Posted"?"#86EFAC":"#B8D4F0"}`,display:"flex",alignItems:"center",gap:8}}>
                <span>{live.status==="Posted"?"✅":"🔒"}</span>
                <span style={{fontSize:11,color:live.status==="Posted"?"#065F46":"#1E40AF",fontWeight:500}}>
                  {live.status==="Posted"
                    ?"Posted and archived. Change status above to move back to Content Bank."
                    :"Content locked (Ready for Review). Change status to WIP to edit."}
                </span>
              </div>
            )}
            <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
              {[{l:"Week",f:"week",o:WEEKS},{l:"Status",f:"status",o:STATUSES},{l:"Format",f:"format",o:FORMATS}].map(({l,f,o})=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:3}}>
                  <span style={{fontSize:10,color:"#7A6B5C",fontWeight:600}}>{l}:</span>
                  <select value={live[f]} onChange={e=>{
                    uf(sel.id,f,e.target.value);
                    if(f==="status"&&e.target.value==="WIP") noti("Moved back to WIP — content is editable");
                    if(f==="status"&&e.target.value==="Ready for Review") noti("Content locked (Ready for Review)");
                    if(f==="status"&&e.target.value==="Posted") noti("Moved to Posted archive");
                  }} style={{padding:"3px 6px",borderRadius:4,border:f==="status"?`1.5px solid ${sc(live.status).border}`:"1px solid #D4C5B5",fontSize:11,fontWeight:f==="status"?600:400,background:f==="status"?sc(live.status).bg:"#fff",color:f==="status"?sc(live.status).text:"#3A2E24",cursor:"pointer",maxWidth:f==="format"?200:"none"}}>
                    {o.map(x=><option key={x}>{x}</option>)}
                  </select>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:10,color:"#7A6B5C",fontWeight:600}}>Target:</span>
                <input type="date" value={live.targetDate} onChange={e=>uf(sel.id,"targetDate",e.target.value)} style={{padding:"3px 6px",borderRadius:4,border:"1px solid #D4C5B5",fontSize:11,background:"#fff"}} />
              </div>
            </div>
          </div>
          <div style={{padding:"14px 22px 22px"}}>
            {[{l:"Hook",f:"hook",m:false},{l:"Thumbnail / Title Text",f:"thumbnailText",m:false},{l:"Caption",f:"caption",m:true},{l:"Voiceover Script",f:"voiceover",m:true},{l:"Visual / Slide Directions",f:"slidesDescription",m:true},{l:"Trending Reference",f:"trendingRef",m:false}].map(({l,f,m})=>(
              <div key={f} style={{marginBottom:14}}>
                <label style={{fontSize:10,fontWeight:700,color:"#9B8B7A",textTransform:"uppercase",display:"block",marginBottom:2}}>{l} <span style={{fontSize:9,color:lk?"#93B5D6":"#C4B8A8"}}>· {lk?"locked":"click to edit"}</span></label>
                {!lk&&ef===f
                  ? <EF key={f+"-e"} initial={live[f]} multi={m} onSave={v=>{uf(sel.id,f,v);setEf(null);}} onCancel={()=>setEf(null)} />
                  : <div onClick={()=>{if(!lk)setEf(f);}} style={{cursor:lk?"default":"pointer",padding:"7px 9px",borderRadius:5,border:lk?"1px solid #D0E3F5":"1px dashed #E0D5C8",whiteSpace:m?"pre-wrap":"normal",lineHeight:1.6,fontSize:13,color:lk?"#5A7A9A":"#3A2E24",background:lk?"#EFF6FC":"transparent",minHeight:m?36:"auto",transition:"all 0.15s"}}
                      onMouseEnter={e=>{if(!lk){e.currentTarget.style.background="#FAF5EE";e.currentTarget.style.borderColor="#C4956A";}}}
                      onMouseLeave={e=>{if(!lk){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#E0D5C8";}}}>
                      {live[f]||<span style={{color:"#B8A89A",fontStyle:"italic"}}>{lk?"":"Click to add..."}</span>}
                    </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if(!loaded) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"'DM Sans'",color:"#9B8B7A"}}>Loading...</div>;

  // Export preview overlay
  if(exPreview) return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#FAF5EE",minHeight:"100vh",color:"#3A2E24"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{position:"sticky",top:0,zIndex:10,background:"linear-gradient(135deg,#2C2218,#4A3A2C)",padding:"16px 24px",borderBottom:"3px solid #C4956A",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div>
          <span style={{color:"#FAF5EE",fontSize:14,fontWeight:700}}>{exPreview.count} items ready</span>
          <span style={{color:"#C4956A",fontSize:12,marginLeft:10}}>
            {exPreview.type==="sheet"?"Paste into Google Sheets (Cmd+V)":"Paste into Google Docs (Cmd+V)"}
          </span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={selectAllText} style={{padding:"6px 16px",background:"transparent",color:"#C4956A",border:"1.5px solid #C4956A",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:600}}>Select All</button>
          <button onClick={copyExport} style={{padding:"6px 16px",background:"#C4956A",color:"#fff",border:"none",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:700}}>Copy to Clipboard</button>
          <button onClick={()=>{setExPreview(null);setExM(null);setExS(new Set());}} style={{padding:"6px 14px",background:"transparent",color:"#9B8B7A",border:"1px solid #9B8B7A",borderRadius:5,cursor:"pointer",fontSize:12}}>Done</button>
        </div>
      </div>
      {note&&<div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:"#fff",padding:"9px 22px",borderRadius:8,fontSize:12,fontWeight:600,zIndex:9999,boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>{note}</div>}
      <div ref={exportRef} style={{padding:24,maxWidth:900,margin:"0 auto",whiteSpace:"pre-wrap",fontFamily:"monospace",fontSize:12,lineHeight:1.6,background:"#fff",minHeight:"60vh",border:"1px solid #E8DDD0",borderRadius:8,margin:"20px auto",userSelect:"text",cursor:"text"}}>
        {exPreview.content}
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"linear-gradient(180deg,#FAF5EE,#F0E8DD)",minHeight:"100vh",color:"#3A2E24"}}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {note&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:"#fff",padding:"9px 22px",borderRadius:8,fontSize:12,fontWeight:600,zIndex:9999,boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>{note}</div>}

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#2C2218,#4A3A2C)",padding:"20px 24px",borderBottom:"3px solid #C4956A"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <h1 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:22,fontWeight:700,color:"#FAF5EE",margin:0}}>@roberttungmd</h1>
            <p style={{fontSize:11,color:"#C4956A",margin:"2px 0 0",letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>Content Studio</p>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:"#9B8B7A"}}>{active.length} active · {posted.length} posted · {pipe.length} pipeline</span>
            {!exM ? (<>
              <button onClick={()=>{setExM("sheet");setExS(new Set());}} style={{padding:"5px 12px",background:"transparent",color:"#C4956A",border:"1.5px solid #C4956A",borderRadius:5,cursor:"pointer",fontSize:11,fontWeight:600}}
                onMouseEnter={e=>{e.target.style.background="#C4956A";e.target.style.color="#fff";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#C4956A";}}>Export for Google Sheets</button>
              <button onClick={()=>{setExM("doc");setExS(new Set());}} style={{padding:"5px 12px",background:"transparent",color:"#C4956A",border:"1.5px solid #C4956A",borderRadius:5,cursor:"pointer",fontSize:11,fontWeight:600}}
                onMouseEnter={e=>{e.target.style.background="#C4956A";e.target.style.color="#fff";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#C4956A";}}>Export for Google Docs</button>
            </>) : (
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:11,color:"#FAF5EE"}}>{exS.size} selected</span>
                <button onClick={()=>{const all=[...posts,...pipe];setExS(new Set(all.map(i=>i.id)));}} style={{padding:"3px 8px",background:"rgba(255,255,255,0.1)",color:"#C4956A",border:"1px solid #C4956A",borderRadius:4,cursor:"pointer",fontSize:10,fontWeight:600}}>All</button>
                <button onClick={()=>setExS(new Set())} style={{padding:"3px 8px",background:"rgba(255,255,255,0.1)",color:"#9B8B7A",border:"1px solid #9B8B7A",borderRadius:4,cursor:"pointer",fontSize:10}}>None</button>
                <button onClick={()=>buildExport(exM==="sheet"?"sheet":"doc")} style={{padding:"5px 14px",background:"#C4956A",color:"#fff",border:"none",borderRadius:5,cursor:"pointer",fontSize:11,fontWeight:700}}>Copy & Export</button>
                <button onClick={()=>{setExM(null);setExS(new Set());}} style={{padding:"5px 8px",background:"transparent",color:"#9B8B7A",border:"1px solid #9B8B7A",borderRadius:5,cursor:"pointer",fontSize:11}}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 18px"}}>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid #E0D5C8",marginTop:14}}>
          {[{k:"content",l:"Content Bank",n:active.length},{k:"posted",l:"Posted",n:posted.length},{k:"pipeline",l:"Topic Pipeline",n:pipe.length},{k:"strategy",l:"Strategy",n:0}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"10px 16px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,color:tab===t.k?"#3A2E24":"#9B8B7A",background:"transparent",borderBottom:tab===t.k?"2.5px solid #C4956A":"2.5px solid transparent"}}>
              {t.l}{t.n>0&&<span style={{marginLeft:5,background:tab===t.k?"#C4956A":"#E8DDD0",color:tab===t.k?"#fff":"#7A6B5C",padding:"1px 6px",borderRadius:10,fontSize:10}}>{t.n}</span>}
            </button>
          ))}
        </div>

        {tab==="content"&&(
          <div style={{marginTop:14,paddingBottom:40}}>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
              <select value={fW} onChange={e=>setFW(e.target.value)} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #D4C5B5",fontSize:12,background:"#fff",cursor:"pointer"}}>{["All",...WEEKS].map(w=><option key={w}>{w}</option>)}</select>
              <select value={fS} onChange={e=>setFS(e.target.value)} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #D4C5B5",fontSize:12,background:"#fff",cursor:"pointer"}}>{["All","WIP","Ready for Review"].map(x=><option key={x}>{x}</option>)}</select>
              <span style={{fontSize:11,color:"#9B8B7A",marginLeft:"auto"}}>{filtered.length} post{filtered.length!==1?"s":""}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>{filtered.map(p=><Card key={p.id} post={p} sm={!!exM}/>)}</div>
            <Modal />
          </div>
        )}

        {tab==="posted"&&(
          <div style={{marginTop:14,paddingBottom:40}}>
            <p style={{fontSize:12,color:"#7A6B5C",marginBottom:14}}>Posts archived here when status is "Posted." Click any post to view or change status back.</p>
            {posted.length===0
              ? <p style={{textAlign:"center",color:"#9B8B7A",padding:40,fontStyle:"italic"}}>No posted content yet.</p>
              : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>{posted.map(p=><Card key={p.id} post={p} sm={!!exM}/>)}</div>
            }
            <Modal />
          </div>
        )}

        {tab==="pipeline"&&(
          <div style={{marginTop:18,paddingBottom:40}}>
            <h2 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:18,fontWeight:700,marginBottom:3}}>Topic Pipeline</h2>
            <p style={{fontSize:12,color:"#7A6B5C",marginBottom:16}}>Click to preview. Move to content bank (defaults to WIP).</p>
            {pipe.length===0&&<p style={{textAlign:"center",color:"#9B8B7A",padding:40,fontStyle:"italic"}}>All moved to Content Bank.</p>}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {pipe.map(item=>{const isX=ep===item.id,ck=exS.has(item.id);return(
                <div key={item.id} style={{background:"#fff",borderRadius:8,border:`1px solid ${ck&&exM?"#C4956A":"#E8DDD0"}`,overflow:"hidden",boxShadow:ck&&exM?"0 0 0 2px #C4956A":"none"}}>
                  <div onClick={()=>exM?tog(item.id):setEp(isX?null:item.id)} style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",gap:10}}
                    onMouseEnter={e=>{e.currentTarget.style.background="#FDFAF5";}} onMouseLeave={e=>{e.currentTarget.style.background="#fff";}}>
                    {exM&&<div style={{width:18,height:18,borderRadius:3,border:`2px solid ${ck?"#C4956A":"#ccc"}`,background:ck?"#C4956A":"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700,flexShrink:0}}>{ck?"✓":""}</div>}
                    <div style={{flex:1}}><h3 style={{fontSize:14,fontWeight:700,margin:"0 0 2px"}}>{item.topic}</h3><p style={{fontSize:11,color:"#7A6B5C",margin:0}}>{item.rationale}</p></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10,background:item.priority==="High"?"#FEE2E2":item.priority==="Medium"?"#FEF3C7":"#E0E7FF",color:item.priority==="High"?"#991B1B":item.priority==="Medium"?"#92400E":"#3730A3"}}>{item.priority}</span>
                      {!exM&&<span style={{fontSize:14,color:"#9B8B7A",transform:isX?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>▾</span>}
                    </div>
                  </div>
                  {isX&&!exM&&(
                    <div style={{padding:"0 16px 14px",borderTop:"1px solid #F0EAE0"}}>
                      <div style={{marginTop:10}}><label style={{fontSize:10,fontWeight:700,color:"#C4956A",textTransform:"uppercase"}}>Hook</label><p style={{fontSize:13,margin:"3px 0 10px",fontStyle:"italic"}}>"{item.hook}"</p></div>
                      <div><label style={{fontSize:10,fontWeight:700,color:"#C4956A",textTransform:"uppercase"}}>Caption</label><p style={{fontSize:12,color:"#5C4A3A",margin:"3px 0 12px",lineHeight:1.55}}>{item.captionSummary}</p></div>
                      <button onClick={e=>{e.stopPropagation();m2p(item);}} style={{padding:"7px 18px",background:"#C4956A",color:"#fff",border:"none",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:700}}>Move to Content Bank →</button>
                    </div>
                  )}
                </div>
              );})}
            </div>
          </div>
        )}

        {tab==="strategy"&&(
          <div style={{marginTop:18,paddingBottom:40}}>
            <h2 style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>Strategy & Brand Guidelines</h2>
            {[
              {t:"Brand Voice",c:"Polished but warm. Educational, never directive. No humor for now."},
              {t:"Visual Identity",c:"Watercolor/sketch illustrations. Warm palette. Talking-head for personal. @roberttungmd watermark."},
              {t:"3 Posts Per Week",c:"2 educational + 1 personal/lifestyle. Personal drives 2-3x engagement."},
              {t:"Hashtags 2026",c:"Instagram caps at 5. Categorize only. 3-5 niche. Keyword-rich captions matter more."},
              {t:"What Drives Reach",c:"Watch time (first 3s). Saves/shares. Keywords. On-screen text. Early engagement. 3x/week."},
              {t:"Guardrails",c:"No medical advice. No patient/consultation/appointment refs. Educational only. No training stage in CTAs."},
              {t:"Status Workflow",c:"WIP → edit freely. Ready for Review → content locked. Posted → archived (can move back anytime). Pipeline → defaults to WIP."},
              {t:"Exporting",c:"Google Sheets: select items, Copy & Export, paste tab-separated data into Sheets. Google Docs: same flow, paste formatted text into Docs."},
            ].map((x,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:8,padding:"14px 18px",border:"1px solid #E8DDD0",marginBottom:8}}>
                <h3 style={{fontSize:11,fontWeight:700,color:"#C4956A",textTransform:"uppercase",margin:"0 0 5px"}}>{x.t}</h3>
                <p style={{fontSize:13,color:"#5C4A3A",lineHeight:1.65,margin:0}}>{x.c}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
