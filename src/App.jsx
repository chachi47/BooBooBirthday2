import React from "react";
import { useState, useEffect } from "react";

const PACKAGES = [
  {
    id: "whimsical",
    name: "Whimsical Celebration",
    emoji: "🌈",
    color: "#7EC8E3",
    bgColor: "#E8F7FC",
    weekdayRate: 350,
    weekendRate: 350,
    minGuests: 10,
    weekendMin: 15,
    playTime: "1.5 Hour",
    roomTime: "30 Minutes",
    freeAdult: "All Adults",
    includes: [
      "Child's Meal & Drinks",
      "Socks",
      "Birthday Sticker",
      "Dance Time (with Humbleboo & Tumbleboo)",
      "E-Invite",
      "Decoration (Boo Boo Laand Theme)",
      "Themed Center Pieces (Boo Boo Laand Theme)",
      "Custom Balloon Arch (Boo Boo Laand Theme)",
      "Face Paint (Celebrant Only)",
      "Popcorn",
      "Custom Balloon Setup (Celebrant Only)",
    ],
  },
  {
    id: "legendary",
    name: "Legendary Celebration",
    emoji: "👑",
    color: "#F9A826",
    bgColor: "#FFF8E8",
    weekdayRate: 680,
    weekendRate: 680,
    minGuests: 15,
    weekendMin: 15,
    playTime: "1.5 Hour",
    roomTime: "1 Hour",
    freeAdult: "All Adults",
    includes: [
      "Child's Meal & Drinks",
      "Socks",
      "Birthday Sticker",
      "Dance Time (with Humbleboo & Tumbleboo)",
      "E-Invite",
      "Decoration (Custom Theme)",
      "Themed Center Pieces (Custom Theme)",
      "Custom Balloon Arch (Custom Theme)",
      "Face Paint",
      "Popcorn",
      "Makeover Station",
      "Photographer",
      "Welcome Sign at Reception",
      "Café Table Reservation",
      "Adults Food (1 Platter)",
      "Workshop",
    ],
  },
  {
    id: "build",
    name: "Build Your Own Celebration",
    emoji: "🎨",
    color: "#B57BFF",
    bgColor: "#F5EEFF",
    weekdayRate: 240,
    weekendRate: 280,
    minGuests: 10,
    weekendMin: 15,
    playTime: "1.5 Hour",
    roomTime: "30 Minutes",
    freeAdult: "1 Adult per Child",
    includes: [
      "Child's Meal & Drinks",
      "Socks",
      "Birthday Sticker",
      "Dance Time",
      "E-Invite",
      "Decoration (Boo Boo Laand Theme)",
      "Themed Center Pieces (Boo Boo Laand Theme)",
      "Custom Balloon Arch (Boo Boo Laand Theme)",
    ],
  },
  {
    id: "royal",
    name: "The Lil' Royal's Celebration",
    emoji: "✨",
    color: "#FF7BAC",
    bgColor: "#FFF0F6",
    weekdayRate: null,
    weekendRate: null,
    minGuests: null,
    weekendMin: null,
    playTime: "Exclusive",
    roomTime: "Entire Venue",
    freeAdult: "All Adults",
    priceOnRequest: true,
    includes: [
      "Full venue buyout",
      "Entire Boo Boo Laand reserved just for you",
      "All amenities included",
      "Custom everything",
      "Premium experience",
    ],
  },
];

const ADDONS = [
  {
    category: "🏠 Room Upgrade",
    color: "#7EC8E3",
    items: [{ id: "themed_panels", name: "Themed Panels & Flooring", price: 4500 }],
  },
  {
    category: "📸 Photo & Video",
    color: "#F9A826",
    items: [
      { id: "photographer", name: "Photographer – 50 Edited Photos", price: 1200 },
      { id: "videographer", name: "Videographer – 4×3 min video", price: 1500 },
      { id: "photo_video", name: "Photo & Video Package", price: 2500 },
      { id: "extra_photos", name: "50 Additional Edited Photos", price: 500 },
    ],
  },
  {
    category: "🎭 Character Appearances",
    color: "#B57BFF",
    items: [
      { id: "char1", name: "Interactive Show – 1 Character (+30 min room)", price: 3000 },
      { id: "char2", name: "Interactive Show – 2 Characters (+30 min room)", price: 5000 },
      { id: "char3", name: "Interactive Show – 3 Characters (+30 min room)", price: 7000 },
      { id: "mascot", name: "Mascot Appearance", price: 1000 },
    ],
  },
  {
    category: "🎪 Shows",
    color: "#FF7BAC",
    items: [
      { id: "magic", name: "Boo Boo Laand Magic Show (+30 min room)", price: 1800 },
      { id: "icecream", name: "The Ice Cream Wonderland (+30 min room)", price: 3000 },
      { id: "extra_icecream", name: "Extra Ice Cream Cup (per child)", price: 70 },
      { id: "electric", name: "Electric Wonders Live (+30 min room)", price: 4000 },
      { id: "crazy_kitchen", name: "The Crazy Kitchen Show (+30 min room)", price: 4000 },
      { id: "wonderlab", name: "The Wonderlab Show (+30 min room)", price: 4000 },
    ],
  },
  {
    category: "🎂 Birthday Workshops",
    color: "#5CC8A8",
    items: [
      { id: "cookie", name: "Cookie Decorating Workshop", price: 120 },
      { id: "donut", name: "Donut Decorating Workshop", price: 120 },
      { id: "canvas", name: "Canvas Making", price: null },
      { id: "slime", name: "Slime Making Workshop", price: null },
    ],
  },
  {
    category: "🎈 Decorations",
    color: "#FF9F5B",
    items: [
      { id: "balloon_arch", name: "Balloon Arch (8 meters)", price: 960 },
      { id: "balloon_col", name: "Balloon Column (per column)", price: 150 },
      { id: "backdrop", name: "Backdrop (per piece)", price: 400 },
      { id: "center_pieces", name: "Themed Center Pieces", price: null },
      { id: "welcome_sign", name: "Large Welcome Signage", price: null },
    ],
  },
  {
    category: "💄 Makeover Experience",
    color: "#FF7BAC",
    items: [
      { id: "makeover_station", name: "Makeover Station (+30 min play)", price: 1600 },
      { id: "princess", name: "Full Princess Experience", price: 470 },
      { id: "hair_std", name: "Hair Braiding – Standard", price: 100 },
      { id: "hair_ext", name: "Hair Braiding with Extensions", price: 140 },
      { id: "hair_mini", name: "Mini Hair Braiding", price: 50 },
      { id: "face_paint", name: "Face Paint", price: 45 },
      { id: "face_gems", name: "Face Gems", price: 45 },
      { id: "press_nails", name: "Press-on Nails", price: 45 },
      { id: "tattoo", name: "Temporary Tattoo", price: 25 },
    ],
  },
];

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    const freq = { select: [523,659,784], click: [440,550,550], start: [330,440,550,660] };
    (freq[type] || freq.click).forEach((f, i) => osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1));
    osc.start(); osc.stop(ctx.currentTime + 0.38);
  } catch (e) {}
}

function Confetti({ active }) {
  const colors = ["#7EC8E3","#F9A826","#FF7BAC","#B57BFF","#5CC8A8","#FF9F5B"];
  if (!active) return null;
  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:9999, overflow:"hidden" }}>
      {Array.from({length:30},(_,i)=>(
        <div key={i} style={{
          position:"absolute", left:`${(i/30)*100}%`, top:"-20px",
          width:`${8+(i%4)*4}px`, height:`${8+(i%4)*4}px`,
          borderRadius: i%2===0?"50%":"3px",
          backgroundColor: colors[i%colors.length],
          animation:`confettiFall ${1.5+(i%5)*0.35}s ease-in forwards`,
          animationDelay:`${(i%8)*0.09}s`,
        }}/>
      ))}
    </div>
  );
}

function FloatingBubbles() {
  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {[...Array(6)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          border:"2px solid rgba(255,255,255,0.35)",
          width:`${38+i*16}px`, height:`${38+i*16}px`,
          left:`${8+i*15}%`, bottom:"-100px",
          animation:`floatUp ${9+i*2}s ease-in-out infinite`,
          animationDelay:`${i*1.4}s`, opacity:0.35,
        }}/>
      ))}
    </div>
  );
}

function PriceBar({ pkg, kidCount, addons, isWeekend, isMobile }) {
  const baseRate = pkg ? (isWeekend ? pkg.weekendRate : pkg.weekdayRate) : 0;
  const baseTotal = baseRate ? baseRate * kidCount : 0;
  const addonsTotal = addons.reduce((sum, id) => {
    for (const cat of ADDONS) {
      const item = cat.items.find(i => i.id === id);
      if (item?.price) return sum + item.price;
    }
    return sum;
  }, 0);
  const total = baseTotal + addonsTotal;

  /* ── Mobile: sticky bottom bar ── */
  if (isMobile) {
    return (
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:200,
        background:"white", borderTop:"3px solid #F9A826",
        padding:"10px 18px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 -4px 20px rgba(0,0,0,0.12)",
        fontFamily:"'Nunito',sans-serif",
      }}>
        <div>
          <div style={{ fontSize:"10px", fontWeight:700, color:"#aaa", textTransform:"uppercase" }}>Estimated Total</div>
          {pkg?.priceOnRequest
            ? <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:"15px", color:"#FF7BAC" }}>Price on Request ✨</div>
            : <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:"22px", color:"#F9A826" }}>{pkg ? `${total.toLocaleString()} AED` : "—"}</div>
          }
        </div>
        <div style={{ textAlign:"right", fontSize:"11px", color:"#bbb", fontWeight:600, maxWidth:"55%" }}>
          {pkg
            ? <><div>🎁 {pkg.name}</div>{!pkg.priceOnRequest && <div>👧 {kidCount} · {isWeekend?"Weekend":"Weekday"}</div>}</>
            : <div>Select a package 🎈</div>
          }
        </div>
      </div>
    );
  }

  /* ── Desktop / Tablet: fixed right sidebar ── */
  return (
    <div style={{
      position:"fixed", right:"20px", top:"50%", transform:"translateY(-50%)",
      background:"white", borderRadius:"22px",
      padding:"18px 16px",
      boxShadow:"0 8px 40px rgba(0,0,0,0.14)",
      width:"190px", zIndex:100,
      border:"3px solid #F9A826",
      fontFamily:"'Nunito',sans-serif",
    }}>
      <div style={{ textAlign:"center", marginBottom:"10px" }}>
        <span style={{ fontSize:"24px" }}>🧮</span>
        <div style={{ fontWeight:900, fontSize:"11px", color:"#444", marginTop:"3px" }}>TOTAL ESTIMATE</div>
      </div>
      {pkg ? (
        <>
          <div style={{ fontSize:"10px", color:"#aaa", marginBottom:"2px" }}>📦 Package</div>
          <div style={{ fontSize:"12px", fontWeight:700, color:"#333", marginBottom:"8px", lineHeight:1.3 }}>{pkg.name}</div>
          {!pkg.priceOnRequest && (
            <>
              <div style={{ fontSize:"11px", color:"#aaa" }}>👧 {kidCount} × {baseRate} AED</div>
              <div style={{ background:"#FFF8E8", borderRadius:"10px", padding:"7px 8px", marginTop:"6px", marginBottom:"6px" }}>
                <div style={{ fontSize:"10px", color:"#ccc" }}>Base</div>
                <div style={{ fontWeight:800, fontSize:"17px", color:"#F9A826" }}>{baseTotal.toLocaleString()} AED</div>
              </div>
            </>
          )}
          {addonsTotal > 0 && (
            <div style={{ background:"#F5EEFF", borderRadius:"10px", padding:"7px 8px", marginBottom:"6px" }}>
              <div style={{ fontSize:"10px", color:"#ccc" }}>Add-ons</div>
              <div style={{ fontWeight:800, fontSize:"17px", color:"#B57BFF" }}>+{addonsTotal.toLocaleString()} AED</div>
            </div>
          )}
          {!pkg.priceOnRequest
            ? (
              <div style={{ background:"linear-gradient(135deg,#F9A826,#FF7BAC)", borderRadius:"12px", padding:"10px", textAlign:"center" }}>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.8)", fontWeight:700 }}>TOTAL</div>
                <div style={{ fontWeight:900, fontSize:"20px", color:"white" }}>{total.toLocaleString()} AED</div>
              </div>
            ) : (
              <div style={{ background:"linear-gradient(135deg,#FF7BAC,#B57BFF)", borderRadius:"12px", padding:"10px", textAlign:"center" }}>
                <div style={{ fontWeight:900, fontSize:"11px", color:"white" }}>Price on Request ✨</div>
              </div>
            )
          }
        </>
      ) : (
        <div style={{ textAlign:"center", color:"#ccc", fontSize:"12px", padding:"6px 0" }}>
          Select a package<br/>to see pricing 🎈
        </div>
      )}
      <div style={{ marginTop:"8px", textAlign:"center", fontSize:"10px", color:"#ccc" }}>
        {isWeekend ? "Weekend rate" : "Weekday rate"}
      </div>
    </div>
  );
}

export default function App() {
  const width = useWindowWidth();
  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const [step, setStep]               = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [kidCount, setKidCount]       = useState(10);
  const [isWeekend, setIsWeekend]     = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [confetti, setConfetti]       = useState(false);
  const [animating, setAnimating]     = useState(false);

  const pkg = PACKAGES.find(p => p.id === selectedPkg);

  const triggerConfetti = () => { setConfetti(true); setTimeout(()=>setConfetti(false), 3000); };

  const goToStep = s => {
    setAnimating(true);
    setTimeout(()=>{ setStep(s); setAnimating(false); window.scrollTo({top:0,behavior:"smooth"}); }, 250);
  };

  const handleSelectPkg = id => {
    const p = PACKAGES.find(x => x.id === id);
    setSelectedPkg(id);
    if (p?.minGuests) setKidCount(isWeekend ? p.weekendMin : p.minGuests);
    playSound("select"); triggerConfetti();
  };

  const toggleAddon = id => { playSound("click"); setSelectedAddons(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]); };

  // Right-padding so content doesn't sit under the sidebar
  const sidebarPad = isMobile ? 16 : 210;

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Nunito',sans-serif; -webkit-tap-highlight-color:transparent; }

    @keyframes confettiFall {
      0%   { transform:translateY(-20px) rotate(0deg); opacity:1; }
      100% { transform:translateY(110vh) rotate(720deg); opacity:0; }
    }
    @keyframes floatUp {
      0%   { transform:translateY(0) scale(1); opacity:.35; }
      50%  { opacity:.55; }
      100% { transform:translateY(-110vh) scale(1.4); opacity:0; }
    }
    @keyframes bounce {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-14px); }
    }
    @keyframes wiggle {
      0%,100% { transform:rotate(-3deg); }
      50%      { transform:rotate(3deg); }
    }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(26px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes popIn {
      0%  { transform:scale(.8); opacity:0; }
      70% { transform:scale(1.06); }
      100%{ transform:scale(1); opacity:1; }
    }
    @keyframes pulse {
      0%,100% { transform:scale(1); }
      50%      { transform:scale(1.04); }
    }

    .start-btn {
      background:linear-gradient(135deg,#F9A826,#FF7BAC);
      color:white; border:none;
      padding:clamp(14px,3vw,20px) clamp(36px,8vw,56px);
      border-radius:50px;
      font-size:clamp(16px,4vw,24px);
      font-weight:900; font-family:'Fredoka One',cursive;
      cursor:pointer;
      box-shadow:0 8px 28px rgba(249,168,38,.45);
      letter-spacing:1px;
      transition:transform .15s,box-shadow .15s;
      animation:pulse 2s ease-in-out infinite;
      touch-action:manipulation;
    }
    .start-btn:hover  { transform:scale(1.06); box-shadow:0 12px 38px rgba(249,168,38,.65); }
    .start-btn:active { transform:scale(.97); }

    .pkg-card {
      border-radius:22px;
      padding:clamp(16px,3vw,26px);
      cursor:pointer;
      transition:transform .2s,box-shadow .2s;
      position:relative; overflow:hidden;
      border:3px solid transparent;
      touch-action:manipulation;
    }
    .pkg-card:hover  { transform:translateY(-5px) scale(1.01); }
    .pkg-card:active { transform:scale(.98); }
    .pkg-card.selected { border-width:4px; }

    .addon-item {
      border-radius:14px; padding:11px 14px;
      cursor:pointer;
      transition:transform .15s,box-shadow .15s;
      border:2.5px solid transparent;
      background:white; margin-bottom:8px;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      touch-action:manipulation;
    }
    .addon-item:hover  { transform:scale(1.015); }
    .addon-item:active { transform:scale(.98); }
    .addon-item.selected { box-shadow:0 4px 16px rgba(0,0,0,.10); }

    .counter-btn {
      width:36px; height:36px; border-radius:50%; border:none;
      font-size:20px; font-weight:900; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:transform .1s; touch-action:manipulation; flex-shrink:0;
    }
    .counter-btn:hover  { transform:scale(1.15); }
    .counter-btn:active { transform:scale(.9); }

    .nav-btn {
      border:none; border-radius:50px;
      padding:clamp(11px,2vw,14px) clamp(22px,4vw,34px);
      font-size:clamp(13px,2.5vw,16px);
      font-weight:800; font-family:'Nunito',sans-serif;
      cursor:pointer;
      transition:transform .15s,box-shadow .15s;
      touch-action:manipulation;
    }
    .nav-btn:hover  { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,.18); }
    .nav-btn:active { transform:scale(.97); }
  `;

  return (
    <div style={{
      minHeight:"100vh",
      background: step===0
        ? "linear-gradient(160deg,#A8E6F0 0%,#C5F0D0 40%,#FFE5B0 80%,#FFD0E8 100%)"
        : step===1
        ? "linear-gradient(160deg,#E8F7FC 0%,#FFF5E8 50%,#F5EEFF 100%)"
        : "linear-gradient(160deg,#FFF0F6 0%,#F5EEFF 50%,#E8F7FC 100%)",
      fontFamily:"'Nunito',sans-serif", position:"relative",
    }}>
      <style>{CSS}</style>
      <Confetti active={confetti}/>
      <FloatingBubbles/>

      {step >= 1 && <PriceBar pkg={pkg} kidCount={kidCount} addons={selectedAddons} isWeekend={isWeekend} isMobile={isMobile}/>}

      <div style={{ opacity:animating?0:1, transition:"opacity .25s ease", minHeight:"100vh" }}>

        {/* ══════════════════════════════
            STEP 0 – WELCOME
        ══════════════════════════════ */}
        {step === 0 && (
          <div style={{
            display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", minHeight:"100vh",
            padding:"40px clamp(16px,5vw,40px)", textAlign:"center",
          }}>
            <div style={{ animation:"bounce 2.5s ease-in-out infinite", fontSize:"clamp(52px,14vw,88px)", marginBottom:"14px" }}>🎂</div>
            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(12px,3vw,22px)", color:"#6B4EFF", letterSpacing:"4px", marginBottom:"6px", opacity:.8 }}>
              BOO BOO LAAND
            </div>
            <h1 style={{
              fontFamily:"'Fredoka One',cursive",
              fontSize:"clamp(34px,10vw,80px)", lineHeight:1.1, marginBottom:"14px",
              background:"linear-gradient(135deg,#7EC8E3,#B57BFF,#FF7BAC)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>Birthday<br/>Celebrations! 🎉</h1>
            <p style={{ fontSize:"clamp(14px,2.5vw,20px)", color:"#666", maxWidth:"420px", lineHeight:1.65, marginBottom:"28px", fontWeight:600 }}>
              Let's plan the most magical birthday party your little one will never forget! ✨🌈
            </p>
            <div style={{ display:"flex", gap:"10px", marginBottom:"28px", flexWrap:"wrap", justifyContent:"center" }}>
              {[{label:"☀️ Weekday",val:false},{label:"🎊 Weekend",val:true}].map(({label,val})=>(
                <label key={label} style={{
                  display:"flex", alignItems:"center", gap:"7px",
                  background:"white", borderRadius:"20px", padding:"10px 20px",
                  cursor:"pointer", fontWeight:700, color:"#555",
                  fontSize:"clamp(13px,2.5vw,15px)",
                  boxShadow: isWeekend===val ? "0 0 0 3px #F9A826,0 4px 14px rgba(0,0,0,.08)" : "0 4px 14px rgba(0,0,0,.08)",
                  transition:"box-shadow .2s",
                }}>
                  <input type="radio" name="day" checked={isWeekend===val} onChange={()=>setIsWeekend(val)} style={{accentColor:"#F9A826"}}/>
                  {label}
                </label>
              ))}
            </div>
            <button className="start-btn" onClick={()=>{ playSound("start"); goToStep(1); }}>Let's Party! 🚀</button>
            <div style={{ marginTop:"40px", display:"flex", gap:"clamp(10px,3vw,22px)", fontSize:"clamp(22px,6vw,36px)", animation:"wiggle 3s ease-in-out infinite" }}>
              🦄 🎈 🌟 🎠 🍭
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            STEP 1 – PACKAGES
        ══════════════════════════════ */}
        {step === 1 && (
          <div style={{
            maxWidth:"1100px", margin:"0 auto",
            padding:`40px 16px ${isMobile?"100px":"56px"}`,
            paddingRight: isMobile ? "16px" : `${sidebarPad}px`,
          }}>
            <div style={{ textAlign:"center", marginBottom:"28px", animation:"fadeSlideUp .5s ease" }}>
              <div style={{ fontSize:"clamp(34px,8vw,50px)", marginBottom:"8px" }}>🎁</div>
              <h2 style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(22px,5vw,42px)", color:"#333", marginBottom:"6px" }}>
                Choose Your Package
              </h2>
              <p style={{ color:"#888", fontWeight:600, fontSize:"clamp(12px,2vw,15px)" }}>
                Pick the perfect celebration for your little star! ⭐
              </p>
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
              gap:"16px",
            }}>
              {PACKAGES.map((p,idx)=>(
                <div key={p.id}
                  className={`pkg-card ${selectedPkg===p.id?"selected":""}`}
                  style={{
                    background: selectedPkg===p.id ? `linear-gradient(135deg,${p.bgColor},white)` : "white",
                    borderColor: selectedPkg===p.id ? p.color : "transparent",
                    boxShadow: selectedPkg===p.id ? `0 12px 34px ${p.color}44` : "0 4px 16px rgba(0,0,0,.08)",
                    animation:`fadeSlideUp .5s ease ${idx*.08}s both`,
                  }}
                  onClick={()=>handleSelectPkg(p.id)}
                >
                  {selectedPkg===p.id && (
                    <div style={{
                      position:"absolute", top:"13px", right:"13px",
                      background:p.color, color:"white", borderRadius:"20px",
                      padding:"3px 11px", fontSize:"11px", fontWeight:800,
                    }}>✓ SELECTED</div>
                  )}

                  <div style={{ fontSize:"clamp(30px,6vw,42px)", marginBottom:"10px" }}>{p.emoji}</div>
                  <h3 style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(16px,3vw,21px)", color:"#333", marginBottom:"8px" }}>{p.name}</h3>

                  {p.priceOnRequest ? (
                    <div style={{ fontSize:"clamp(14px,2.5vw,17px)", fontWeight:900, color:p.color, marginBottom:"10px" }}>Price on Request ✨</div>
                  ) : (
                    <div style={{ display:"flex", gap:"7px", marginBottom:"10px", flexWrap:"wrap" }}>
                      <span style={{ background:p.bgColor, color:p.color, borderRadius:"11px", padding:"4px 10px", fontWeight:800, fontSize:"clamp(11px,2vw,14px)" }}>
                        ☀️ Weekday: {p.weekdayRate} AED
                      </span>
                      <span style={{ background:"#FFF8E8", color:"#F9A826", borderRadius:"11px", padding:"4px 10px", fontWeight:800, fontSize:"clamp(11px,2vw,14px)" }}>
                        🎊 Weekend: {p.weekendRate} AED
                      </span>
                    </div>
                  )}

                  <div style={{ display:"flex", gap:"6px", marginBottom:"12px", flexWrap:"wrap" }}>
                    {[`🕐 Play: ${p.playTime}`,`🎪 Room: ${p.roomTime}`,`👨‍👩‍👧 ${p.freeAdult}`].map(t=>(
                      <span key={t} style={{ background:"#f5f5f5", borderRadius:"9px", padding:"3px 8px", fontSize:"clamp(10px,1.8vw,12px)", fontWeight:700, color:"#666" }}>{t}</span>
                    ))}
                  </div>

                  {!p.priceOnRequest && (
                    <div style={{ marginBottom:"12px" }}>
                      <div style={{ fontSize:"12px", fontWeight:700, color:"#888", marginBottom:"6px" }}>
                        Min: {isWeekend ? p.weekendMin : p.minGuests} children
                      </div>
                      {selectedPkg===p.id && (
                        <div style={{ display:"flex", alignItems:"center", gap:"10px", animation:"popIn .3s ease" }}>
                          <span style={{ fontSize:"13px", fontWeight:700, color:"#666" }}>Kids:</span>
                          <button className="counter-btn" style={{ background:p.bgColor, color:p.color }}
                            onClick={e=>{ e.stopPropagation(); playSound("click"); setKidCount(c=>Math.max(isWeekend?p.weekendMin:p.minGuests,c-1)); }}>−</button>
                          <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(20px,4vw,26px)", color:p.color, minWidth:"32px", textAlign:"center" }}>{kidCount}</span>
                          <button className="counter-btn" style={{ background:p.color, color:"white" }}
                            onClick={e=>{ e.stopPropagation(); playSound("click"); setKidCount(c=>c+1); }}>+</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* What's Included – full list */}
                  <div style={{ marginTop:"4px" }}>
                    <div style={{
                      fontSize:"11px", fontWeight:800, color:p.color,
                      marginBottom:"9px", textTransform:"uppercase", letterSpacing:"1px",
                      display:"flex", alignItems:"center", gap:"6px",
                    }}>
                      <span style={{ display:"inline-block", width:"16px", height:"2px", background:p.color, borderRadius:"2px" }}/>
                      What's Included
                      <span style={{ display:"inline-block", width:"16px", height:"2px", background:p.color, borderRadius:"2px" }}/>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                      {p.includes.map(item=>(
                        <div key={item} style={{
                          display:"flex", alignItems:"flex-start", gap:"8px",
                          background:p.bgColor, borderRadius:"11px", padding:"7px 11px",
                        }}>
                          <span style={{ fontSize:"13px", flexShrink:0, marginTop:"1px" }}>✅</span>
                          <span style={{ fontSize:"clamp(11px,1.8vw,13px)", fontWeight:700, color:"#444", lineHeight:1.4 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"28px", gap:"10px", flexWrap:"wrap" }}>
              <button className="nav-btn" style={{ background:"white", color:"#888", boxShadow:"0 4px 14px rgba(0,0,0,.08)" }} onClick={()=>goToStep(0)}>← Back</button>
              <button className="nav-btn"
                style={{
                  background: selectedPkg ? "linear-gradient(135deg,#F9A826,#FF7BAC)" : "#ddd",
                  color: selectedPkg ? "white" : "#bbb",
                  cursor: selectedPkg ? "pointer" : "not-allowed",
                  boxShadow: selectedPkg ? "0 8px 20px rgba(249,168,38,.4)" : "none",
                }}
                onClick={()=>{ if(selectedPkg){ playSound("start"); goToStep(2); } }}>
                Add-ons & Extras 🎀 →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            STEP 2 – ADD-ONS
        ══════════════════════════════ */}
        {step === 2 && (
          <div style={{
            maxWidth:"900px", margin:"0 auto",
            padding:`40px 16px ${isMobile?"110px":"60px"}`,
            paddingRight: isMobile ? "16px" : `${sidebarPad}px`,
          }}>
            <div style={{ textAlign:"center", marginBottom:"28px", animation:"fadeSlideUp .5s ease" }}>
              <div style={{ fontSize:"clamp(34px,8vw,50px)", marginBottom:"8px" }}>✨</div>
              <h2 style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(22px,5vw,42px)", color:"#333", marginBottom:"6px" }}>Sprinkle Some Magic!</h2>
              <p style={{ color:"#888", fontWeight:600, fontSize:"clamp(12px,2vw,15px)" }}>
                Add extra sparkle to <strong>{pkg?.name}</strong> 🌟
              </p>
            </div>

            {ADDONS.map((cat,ci)=>(
              <div key={cat.category} style={{ marginBottom:"24px", animation:`fadeSlideUp .5s ease ${ci*.07}s both` }}>
                <div style={{
                  fontFamily:"'Fredoka One',cursive", fontSize:"clamp(14px,2.5vw,18px)",
                  color:cat.color, marginBottom:"10px",
                  paddingLeft:"10px", borderLeft:`4px solid ${cat.color}`,
                }}>{cat.category}</div>

                {cat.items.map(item=>(
                  <div key={item.id}
                    className={`addon-item ${selectedAddons.includes(item.id)?"selected":""}`}
                    style={{
                      borderColor: selectedAddons.includes(item.id) ? cat.color : "#eee",
                      background: selectedAddons.includes(item.id) ? `linear-gradient(135deg,white,${cat.color}18)` : "white",
                      boxShadow: selectedAddons.includes(item.id) ? `0 4px 16px ${cat.color}33` : "0 2px 7px rgba(0,0,0,.05)",
                    }}
                    onClick={()=>item.price && toggleAddon(item.id)}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", flex:1, minWidth:0 }}>
                      <div style={{
                        width:"22px", height:"22px", borderRadius:"7px", flexShrink:0,
                        border:`2.5px solid ${selectedAddons.includes(item.id)?cat.color:"#ddd"}`,
                        background: selectedAddons.includes(item.id) ? cat.color : "transparent",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"12px", color:"white", fontWeight:900, transition:"all .15s",
                      }}>
                        {selectedAddons.includes(item.id)?"✓":""}
                      </div>
                      <span style={{ fontWeight:600, color:"#444", fontSize:"clamp(12px,2vw,14px)", lineHeight:1.3 }}>{item.name}</span>
                    </div>
                    {item.price
                      ? <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(13px,2.5vw,15px)", color:selectedAddons.includes(item.id)?cat.color:"#bbb", whiteSpace:"nowrap", flexShrink:0 }}>{item.price.toLocaleString()} AED</span>
                      : <span style={{ fontSize:"11px", color:"#ccc", fontStyle:"italic", flexShrink:0 }}>On request</span>
                    }
                  </div>
                ))}
              </div>
            ))}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"28px", gap:"10px", flexWrap:"wrap" }}>
              <button className="nav-btn" style={{ background:"white", color:"#888", boxShadow:"0 4px 14px rgba(0,0,0,.08)" }} onClick={()=>goToStep(1)}>← Back</button>
              <button className="nav-btn"
                style={{ background:"linear-gradient(135deg,#5CC8A8,#7EC8E3)", color:"white", boxShadow:"0 8px 20px rgba(92,200,168,.4)" }}
                onClick={()=>{ playSound("start"); triggerConfetti(); setTimeout(triggerConfetti,600); }}>
                🎉 All Done!
              </button>
            </div>

            {/* Summary card */}
            <div style={{
              marginTop:"32px", background:"white", borderRadius:"22px",
              padding:"clamp(18px,4vw,26px)",
              boxShadow:"0 8px 34px rgba(0,0,0,.10)", border:"3px solid #F9A826",
            }}>
              <h3 style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(17px,3vw,22px)", color:"#333", marginBottom:"12px" }}>
                🎊 Your Party Summary
              </h3>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
                {[
                  { bg:"#FFF8E8", color:"#F9A826", label:`📦 ${pkg?.name}` },
                  { bg:"#E8F7FC", color:"#7EC8E3", label:`👧 ${kidCount} children` },
                  { bg:"#f5f5f5", color:"#888",    label: isWeekend?"🎊 Weekend":"☀️ Weekday" },
                ].map(({bg,color,label})=>(
                  <span key={label} style={{ background:bg, color, borderRadius:"11px", padding:"5px 12px", fontWeight:800, fontSize:"clamp(11px,2vw,13px)" }}>{label}</span>
                ))}
              </div>

              {selectedAddons.length > 0 && (
                <div style={{ marginBottom:"12px" }}>
                  <div style={{ fontSize:"12px", fontWeight:700, color:"#888", marginBottom:"6px" }}>Selected Add-ons:</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                    {selectedAddons.map(id=>{
                      for (const cat of ADDONS){
                        const item=cat.items.find(i=>i.id===id);
                        if(item) return <span key={id} style={{ background:"#F5EEFF", color:"#B57BFF", borderRadius:"9px", padding:"4px 9px", fontSize:"11px", fontWeight:700 }}>✨ {item.name}</span>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              <div style={{ padding:"14px", background:"linear-gradient(135deg,#F9A826,#FF7BAC)", borderRadius:"14px", textAlign:"center" }}>
                {pkg?.priceOnRequest ? (
                  <div style={{ color:"white", fontWeight:900, fontSize:"clamp(13px,2.5vw,17px)" }}>Contact us for pricing ✨</div>
                ) : (
                  <>
                    <div style={{ color:"rgba(255,255,255,.8)", fontSize:"11px", fontWeight:700 }}>ESTIMATED TOTAL</div>
                    <div style={{ color:"white", fontFamily:"'Fredoka One',cursive", fontSize:"clamp(26px,6vw,38px)" }}>
                      {(
                        (pkg?.weekdayRate ? (isWeekend?pkg.weekendRate:pkg.weekdayRate)*kidCount : 0) +
                        selectedAddons.reduce((sum,id)=>{
                          for(const cat of ADDONS){ const item=cat.items.find(i=>i.id===id); if(item?.price) return sum+item.price; }
                          return sum;
                        }, 0)
                      ).toLocaleString()} AED
                    </div>
                    <div style={{ color:"rgba(255,255,255,.7)", fontSize:"11px", marginTop:"2px" }}>Contact us to confirm your booking! 🎈</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
