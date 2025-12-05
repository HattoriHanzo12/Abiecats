cat > src/AbieCat_renderer.js << 'EOF'
function renderAbieCat() {
  // This renderer is called recursively by TAP/DMT — no traits object needed
  // We detect the block number from the inscription context or use URL param fallback
  const urlParams = new URLSearchParams(window.location.search);
  const blockHeight = urlParams.get('block') || '1';

  const root = document.createElement('div');
  root.style.position = 'relative';
  root.style.width = '320px';
  root.style.height = '425px';
  root.style.background = '#000';
  root.style.overflow = 'hidden';

  // Fetch blockhash and render
  fetch(`https://blockstream.info/api/block-height/${blockHeight}`)
    .then(r => r.text())
    .then(hash => {
      if (!hash.includes('ab')) {
        root.innerHTML = '<div style="color:#f00;padding:20px">No "ab" in blockhash</div>';
        return;
      }
      const digits = hash.match(/.{1,2}/g).slice(0,7).map(x=>parseInt(x,16)%10).reverse();
      root.innerHTML = generateCat(digits, blockHeight);
    })
    .catch(() => {
      root.innerHTML = '<div style="color:#f00">Failed to load block</div>';
    });

  document.body.appendChild(root);
  document.body.style.margin = '0';
  document.body.style.background = '#000';

  function generateCat(d, h) {
    let s = '';
    const c1=colorMap[d[0]], c2=colorMap2[d[1]], earL=colorMap2[d[2]], earR=colorMap2[d[3]];
    const nose=colorMap2[d[4]], stripe=colorMap[d[5]], tooth=colorMap3[d[6]];

    const colorMap   = {1:"#6D2BF8",2:"#AF89FE",3:"#FDF64D",4:"#2067F0",5:"#976F53",6:"#CBC7E3",7:"#15D96F",8:"#FF64C1",9:"#F95E3C",0:"#585663"};
    const colorMap2  = {1:"#5922CD",2:"#9C6EFE",3:"#FDE14D",4:"#1C54C0",5:"#725540",6:"#8F8DA5",7:"#17B35F",8:"#F343AC",9:"#EC5331",0:"#403F4A"};
    const colorMap3  = {1:"#A2FF00",2:"#49EFEF",3:"#FFB800",4:"#FFA1FB",5:"#FF7528",6:"#FF1E39",7:"#00B127",8:"#2A32FF",9:"#A9A8D6"};

    s+=`<div style="position:absolute;top:59px;left:105px"><svg width=80 height=80><path d="M0 0L80 80L0 80Z" fill="${earL}"/></svg></div>`;
    s+=`<div style="position:absolute;top:59px;left:240px"><svg width=80 height=80><path d="M0 80L80 0L80 80Z" fill="${earR}"/></svg></div>`;
    s+=`<div style="position:absolute;top:345px;left:105px"><svg width=78 height=80><rect width=78 height=80 fill="${c2}"/></svg></div>`;
    s+=`<div style="position:absolute;top:138px;left:105px"><svg width=215 height=209><path fill-rule=evenodd d="M215 0L0 0L0 209L215 209L215 94L143 94L143 58L215 58ZM22 58L94 58L94 94L22 94ZM197 155H94V180H197V155Z" fill="${c1}"/></svg></div>`;
    s+=`<div style="position:absolute;top:254px;left:220px"><svg width=28 height=28><path d="M28 28L0 0H28Z" fill="${nose}"/></svg></div>`;
    s+=`<div style="position:absolute;top:365px;left:105px"><svg width=36 height=54><rect width=36 height=18 fill="${stripe}"/><rect y=36 width=36 height=18 fill="${stripe}"/></svg></div>`;
    s+=`<div style="position:absolute;top:279px;left:0"><svg width=46 height=146><path d="M46 146H0L0 23C0 10.3 10.3 0 23 0C35.7 0 46 10.3 46 23Z" fill="${c2}"/></svg></div>`;
    s+=`<div style="position:absolute;top:288px;left:189px"><svg width=40 height=35><rect width=40 height=35 fill="${tooth}"/></svg></div>`;
    s+=`<div style="position:absolute;top:288px;left:249px"><svg width=40 height=35><rect width=40 height=35 fill="${tooth}"/></svg></div>`;

    // Eye direction
    const lastFour = parseInt(h.toString().slice(-4));
    if (lastFour < 4800) s+=`<div style="position:absolute;top:195px;left:163px"><svg width=158 height=38><rect x=37 y=38 width=37 height=38 transform="rotate(-180 37 38)" fill="#070609"/><rect x=157.5 y=38 width=36.5 height=38 transform="rotate(-180 157.5 38)" fill="#070609"/></svg></div>`;
    else if (lastFour >= 4800 && lastFour <= 5200) s+=`<div style="position:absolute;top:195px;left:126px"><svg width=195 height=38><rect x=194.5 y=38 width=36.5 height=38 transform="rotate(-180 194.5 38)" fill="#070609"/><rect x=37 y=38 width=37 height=38 transform="rotate(-180 37 38)" fill="#070609"/></svg></div>`;
    else s+=`<div style="position:absolute;top:195px;left:126px"><svg width=158 height=38><rect x=37 y=38 width=37 height=38 transform="rotate(-180 37 38)" fill="#070609"/><rect x=158 y=38 width=37 height=38 transform="rotate(-180 158 38)" fill="#070609"/></svg></div>`;

    // 69 Star
    if(h.includes('69')) s+=`<div style="position:absolute;top:293px;left:356px"><svg width=18 height=18><path d="M9 0L11.2 5.5L17 6.7L12.5 10.8L13.4 16.5L9 14.2L4.6 16.5L5.5 10.8L1 6.7L6.8 5.5Z" fill="#FFD700" style="filter:drop-shadow(0 0 6px #FFD700)"/></svg></div>`;

    return s;
  }
}

// Auto-render on load (for wallets and recursive inscriptions)
renderAbieCat();
EOF