// Reality Director — screens
// All 6 core screens as function components, plus Tweaks panel.

const { useState, useEffect, useRef } = React;

// ==========================================================
// Status bar (reused)
// ==========================================================
function StatusBar() {
  return (
    <div className="statusbar">
      <span>22:14</span>
      <span className="icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><rect x="0" y="6" width="2" height="4" rx="0.5" fill="currentColor"/><rect x="4" y="4" width="2" height="6" rx="0.5" fill="currentColor"/><rect x="8" y="2" width="2" height="8" rx="0.5" fill="currentColor"/><rect x="12" y="0" width="2" height="10" rx="0.5" fill="currentColor"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0" y="1" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="2" y="3" width="12" height="4" fill="currentColor"/><rect x="19" y="3" width="2" height="4" rx="0.5" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

function HomeIndicator() { return <div className="home-indicator" />; }

function MemChip({ membership }) {
  if (membership === 'free') return null;
  const label = membership === 'monthly' ? '月卡' : '年卡';
  return <div className="mem-chip">● {label}会员</div>;
}

// ==========================================================
// HomePage
// ==========================================================
function HomePage({ go, setPreselect, hlShelf, membership, openPicker }) {
  const shelves = [
    { key: '1p', num: '货架 01', name: '独行局',  meta: '一个人走走',         dur: '30 – 40 MIN' },
    { key: '2p', num: '货架 02', name: '双人局',  meta: '带一个人开局',       dur: '45 MIN · HERO' },
    { key: '3p', num: '货架 03', name: '组局',    meta: '三到四人组局',       dur: '45 – 60 MIN' },
  ];

  return (
    <div className="screen" data-screen-label="01 HomePage">
      <StatusBar />
      <MemChip membership={membership} />

      <div className="app-header">
        <div className="brand-mark">
          <div className="dot" />
          <div className="name">Reality Director</div>
        </div>
        <div className="chip">城市秘密行动</div>
      </div>

      <div className="hero-tag">
        重新理解一座城市，<br/>不一定是<span style={{color:'var(--ink-mute)', textDecoration:'line-through'}}>逛</span>，<br/>也可以是<em>一局</em>。
      </div>
      <div className="hero-sub">
        由 AI 导演编排的线下局。今晚出门，不是散步，是开局。
      </div>

      <div className="section-title">
        <h4>今晚怎么开 · 三张货架</h4>
        <div className="st-link" onClick={() => openPicker()}>查看全部 →</div>
      </div>

      <div className="shelf-grid">
        {shelves.map(s => (
          <div
            key={s.key}
            className={`shelf-card ${hlShelf === s.key ? 'hl' : ''}`}
            onClick={() => { setPreselect(s.key); go('setup'); }}
          >
            <div>
              <div className="num">{s.num}</div>
              <h3>{s.name}</h3>
              <div className="meta">{s.meta}</div>
            </div>
            <div className="duration">{s.dur}</div>
          </div>
        ))}
      </div>

      <div className="section-title">
        <h4>今日推荐</h4>
      </div>
      <div style={{padding: '0 24px'}}>
        <div className="recommend">
          <div className="r-top">
            <div className="r-eyebrow">Today · 2026.04.18</div>
            <div className="r-pill">Hero 推荐</div>
          </div>
          <div className="r-title">先从一局双人局开始</div>
          <div className="r-reason">
            它最容易打出关系张力，也最适合你第一次完整付费体验。45 分钟，一块旧牌，一次各怀秘密。
          </div>
          <div className="r-cta" onClick={() => { setPreselect('2p'); go('setup'); }}>
            查看这一局 &nbsp;→
          </div>
        </div>
      </div>

      <div className="section-title">
        <h4>玩完会得到什么</h4>
      </div>
      <div className="benefits">
        <div className="benefit"><div className="b-idx">01</div><div>一张能发出去的战报卡，截图就能转</div></div>
        <div className="benefit"><div className="b-idx">02</div><div>一个会被你改写的城市角落</div></div>
        <div className="benefit"><div className="b-idx">03</div><div>下一局更适合怎么换着玩的建议</div></div>
      </div>

      <div className="section-title">
        <h4>最近分享 · 玩家战报</h4>
        <div className="st-link">查看全部 →</div>
      </div>
      <div className="share-scroller">
        <div className="share-thumbs">
          {[
            { code: 'TH2-01', title: '旧照相馆封档风波', tag: '双人 · 45min' },
            { code: 'TH1-02', title: '被新说明压住的旧牌边角', tag: '独行 · 36min' },
            { code: 'TH3-01', title: '站队总是临时的', tag: '三人 · 52min' },
            { code: 'TH2-02', title: '交接处的半句话', tag: '双人 · 41min' },
          ].map((s,i) => (
            <div key={i} className="share-thumb">
              <div className="st-header">{s.code}</div>
              <div className="st-body">“你们以为这是一次封档，实际上是顺序被重写了”</div>
              <div className="st-footer">{s.tag}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{height: 80}} />

      <div className="bottom-cta">
        <button className="btn btn-primary" onClick={() => openPicker()}>
          立即开始 &nbsp;·&nbsp; 还没想好玩哪种
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ==========================================================
// EntryPickerSheet (overlay)
// ==========================================================
function EntryPickerSheet({ close, pick }) {
  const opts = [
    { key:'1p', name:'独行局', hint:'一个人重新理解一个角落', suit:'第一次体验 · 下班后 · 随时开始' },
    { key:'2p', name:'双人局', hint:'和一个人各怀一点秘密',   suit:'第一次完整体验 · 最稳定的张力结构' },
    { key:'3p', name:'组局',   hint:'把一群人的判断带偏',     suit:'朋友局 · 聚会前后 · 更强传播感' },
  ];
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="eyebrow">STEP 01 · PICK</div>
        <div className="sheet-title">你今天想怎么开局？</div>
        <div style={{height: 10}} />
        {opts.map(o => (
          <div key={o.key} className="sheet-opt" onClick={() => pick(o.key)}>
            <div>
              <div className="so-name">{o.name}</div>
              <div className="so-hint">{o.hint}</div>
              <div className="so-suit">适合 · {o.suit}</div>
            </div>
            <div className="so-arrow">→</div>
          </div>
        ))}
        <div style={{height: 12}} />
        <button className="btn btn-ghost" onClick={close}>取消</button>
      </div>
    </div>
  );
}

// ==========================================================
// SessionSetupPage
// ==========================================================
function SessionSetupPage({ go, preselect, membership }) {
  const modeMap = {
    '1p': { code:'TH1-02', name:'独行局 · 被新说明压住的旧牌',  minutes: 36, people:'1 人' },
    '2p': { code:'TH2-01', name:'双人局 · 旧照相馆封档风波',    minutes: 45, people:'2 人' },
    '3p': { code:'TH3-01', name:'组局 · 站队总是临时的',        minutes: 52, people:'3 人' },
  };
  const info = modeMap[preselect] || modeMap['2p'];

  const [dur, setDur] = useState(info.minutes);
  const [radius, setRadius] = useState(800);
  const [startStyle, setStartStyle] = useState('日常街区');

  const goNext = () => {
    if (preselect === '1p') go('play');
    else go('room');
  };

  return (
    <div className="screen" data-screen-label="03 SessionSetupPage">
      <StatusBar />
      <MemChip membership={membership} />

      <div className="hdr-back">
        <button onClick={() => go('home')}>← 返回</button>
        <div style={{flex:1}} />
        <div className="label-mono">Step 02 / Setup</div>
      </div>

      <div className="poster">
        <div className="theme-code">{info.code} · CHAPTER 开局</div>
        <h1>{info.name.split(' · ')[1]}</h1>
        <div className="feel">
          和一个人各自拿到不完全相同的入口。<br/>
          中段你们会做一次共享 / 隐瞒 / 模糊表达的选择。<br/>
          结局会回收：你们为什么一开始会理解错。
        </div>
        <div className="meta-row">
          <span>{info.people}</span>
          <span>{info.minutes} MIN</span>
          <span>街角 800M</span>
        </div>
      </div>

      <div className="setup-section">
        <h4>设置这一局</h4>
        <div className="setup-row">
          <div className="lbl">时长</div>
          <div className="pill-group">
            {[30, 45, 60].map(v => (
              <button key={v} className={`pill ${dur===v?'active':''}`} onClick={() => setDur(v)}>{v} 分钟</button>
            ))}
          </div>
        </div>
        <div className="setup-row">
          <div className="lbl">范围</div>
          <div className="pill-group">
            {[500, 800, 1200].map(v => (
              <button key={v} className={`pill ${radius===v?'active':''}`} onClick={() => setRadius(v)}>{v}m</button>
            ))}
          </div>
        </div>
        <div className="setup-row">
          <div className="lbl">起点风格</div>
          <div className="pill-group">
            {['日常街区', '水岸节点', '慢空间'].map(v => (
              <button key={v} className={`pill ${startStyle===v?'active':''}`} onClick={() => setStartStyle(v)}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="willget">
        <h4 style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.18em',color:'var(--ink-mute)',textTransform:'uppercase',marginBottom:10}}>玩完你会得到</h4>
        <ul>
          <li>一次完整的真相回收</li>
          <li>一张可直接转发的双人分享卡</li>
          <li>下一局建议：换人 / 加到 3 人 / 换主题</li>
        </ul>
      </div>

      <div style={{height: 14}} />

      <div className="price-strip">
        <div className="pl">
          <div className="yen"><small>¥</small>9.9</div>
          <div className="pl-hint">单次发起 · 仅发起人付费</div>
        </div>
        <div className="alt">
          已开通？<br/><b>月卡</b> ¥39.9 / 月
        </div>
      </div>

      <div style={{height: 20}} />

      <div className="bottom-cta">
        <button className="btn btn-primary" onClick={goNext}>
          {preselect === '1p' ? '开始这一局 →' : '创建房间 · 邀请对方 →'}
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ==========================================================
// RoomPage
// ==========================================================
function RoomPage({ go, preselect, roomReady, toggleRoomReady, membership }) {
  return (
    <div className="screen" data-screen-label="04 RoomPage">
      <StatusBar />
      <MemChip membership={membership} />

      <div className="hdr-back">
        <button onClick={() => go('setup')}>← 返回</button>
        <div style={{flex:1}} />
        <div className="label-mono">Room · 双人局</div>
      </div>

      <div className="room-hero">
        <div className="eyebrow">房间码</div>
        <div className="code">K · 7 · 3 · 9</div>
        <div className="status">
          {roomReady
            ? <>还差 <em>0 人</em>，可以开始了。</>
            : <>还差 <em>1 人</em> 就能开始。</>
          }
        </div>
      </div>

      <div style={{padding: '20px 24px 4px'}}>
        <h4 style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.2em',color:'var(--ink-mute)',textTransform:'uppercase',marginBottom:4}}>玩家状态</h4>
        <div className="player-row">
          <div className="pr-avatar">A</div>
          <div className="pr-body">
            <div className="pr-name">你</div>
            <div className="pr-sub">发起人 · A 位 · context_holder</div>
          </div>
          <div className="pr-status ready">已准备</div>
        </div>
        <div className="player-row">
          <div className="pr-avatar" style={{color:'var(--ink-mute)'}}>B</div>
          <div className="pr-body">
            <div className="pr-name">队友</div>
            <div className="pr-sub">被邀请 · B 位 · relation_holder</div>
          </div>
          <div className={`pr-status ${roomReady ? 'ready' : 'waiting'}`}>
            {roomReady ? '已准备' : '等待中'}
          </div>
        </div>
      </div>

      <div className="invite-quote">
        这局不是找答案，<br/>是看你们怎么先理解错。
      </div>

      <div style={{padding: '0 24px', display:'flex', gap: 10}}>
        <button className="btn btn-sm" style={{flex: 1}}>复制邀请</button>
        <button className="btn btn-sm" style={{flex: 1}} onClick={toggleRoomReady}>
          {roomReady ? '收回准备' : '再次提醒'}
        </button>
      </div>

      <div style={{padding: '24px 24px 0'}}>
        <h4 style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.2em',color:'var(--ink-mute)',textTransform:'uppercase',marginBottom:12}}>这一局会发生什么</h4>
        <div className="tl-row current">
          <div className="tl-t">ACT 01</div>
          <div className="tl-body"><span className="tl-dot"/>各自拿到不同入口 · 观察与取证</div>
        </div>
        <div className="tl-row future">
          <div className="tl-t">ACT 02</div>
          <div className="tl-body"><span className="tl-dot"/>中段碰头 · 一次关键表达选择</div>
        </div>
        <div className="tl-row future">
          <div className="tl-t">REVEAL</div>
          <div className="tl-body"><span className="tl-dot"/>真相回收 + 双人分享卡</div>
        </div>
      </div>

      <div style={{height: 40}} />

      <div className="bottom-cta">
        <button
          className="btn btn-primary"
          disabled={!roomReady}
          style={!roomReady ? {opacity:0.4, cursor:'not-allowed'} : {}}
          onClick={() => roomReady && go('play')}
        >
          {roomReady ? '我们都准备好了 · 开始 →' : '等待队友进入…'}
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ==========================================================
// PlayShellPage
// ==========================================================
function PlayShellPage({ go, act, setAct, membership }) {
  const [whisperOpen, setWhisperOpen] = useState(false);

  const actMap = {
    1: {
      label: '第 1 幕 / 2 幕',
      progress: 45,
      taskEyebrow: 'TH2-01-A1 · 观察',
      task: '去看那块被新说明压住的旧牌边角',
      hint: '注意：这条线索现在不一定适合马上说出去。先拍下，保留半步判断。',
      poi: 'POI-201 · 照相馆门口年份牌 · 120m',
      clues: [
        { tag: 'A 私有', text: '官方说法像是后补的；通知张贴时间对不上' },
        { tag: 'A 观察', text: '亚克力板下方露出旧展讯的边角' },
      ],
      timeline: [
        { t:'ACT 1', body:'各自拿到入口 · 你选了年份牌作为起点', state:'past' },
        { t:'NOW',   body:'观察旧牌边角，保留判断',               state:'current' },
        { t:'NEXT',  body:'碰头选择：共享 / 隐瞒 / 模糊表达',      state:'future' },
        { t:'ACT 2', body:'后巷湿度检查签 · 维护先于封档',         state:'future' },
        { t:'END',   body:'真相回收 · 双人分享卡',                state:'future' },
      ],
      whisper: '别急着把整条时间线说成结论。交出观察，留下半步判断。对方这时更需要你的"是什么"，不是你的"为什么"。',
    },
    2: {
      label: '第 2 幕 / 2 幕',
      progress: 78,
      taskEyebrow: 'TH2-01-ACT2 · 对照',
      task: '带对方回到巷口，比对湿度签上的时间',
      hint: '对方刚刚在碰头点交出了半句话。你需要判断：这半句是在保护你，还是在保护那条叙事。',
      poi: 'POI-205 · 后巷湿度检查签 · 60m',
      clues: [
        { tag: 'A 私有', text: '官方说法像是后补的' },
        { tag: 'B 公开', text: '档案柜锁更换早于封档' },
        { tag: 'B 公开', text: '缩写更像交接顺位标记，不单是名字' },
        { tag: 'AHA',    text: '维护动作 → 顺位调整 → 对外统一说法' },
      ],
      timeline: [
        { t:'ACT 1', body:'入口观察完成', state:'past' },
        { t:'CARR',  body:'碰头 · 对方只说了半句', state:'past' },
        { t:'NOW',   body:'对照湿度签时间 · 收束顺序', state:'current' },
        { t:'NEXT',  body:'终局判断：谁先动了顺序', state:'future' },
        { t:'END',   body:'真相回收 · 双人分享卡',   state:'future' },
      ],
      whisper: '对方的半句话不是怯懦。他在让你先说。现在轮到你决定：是把拼图摆完，还是让这一版本继续停在"阿梁"身上。',
    },
  };

  const data = actMap[act] || actMap[1];

  return (
    <div className="screen" data-screen-label={`05 PlayShell · Act${act}`} style={{background:'var(--bg)'}}>
      <StatusBar />

      <div className="play-top">
        <div className="act-chip">
          <span className="act-bar" style={{width: 38}}>
            <span style={{
              position:'absolute', left: 0, top: 0, height: '100%',
              width: `${data.progress}%`, background:'var(--copper)'
            }} />
          </span>
          {data.label}
        </div>
        <div className="timer"><span className="dot" />31:04</div>
      </div>

      <div className="map-wrap">
        <div className="map-head">
          <div className="mh-left">Map · 街角 800m</div>
          <div className="mh-right">AI 编排中 · 实时</div>
        </div>
        <div className="map-crosshair">◎</div>
        <svg className="map" viewBox="0 0 390 280" preserveAspectRatio="xMidYMid slice">
          {/* background grid */}
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(201,169,110,0.06)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="vig" cx="50%" cy="50%" r="65%">
              <stop offset="60%" stopColor="transparent"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
            </radialGradient>
          </defs>
          <rect width="390" height="280" fill="url(#grid)"/>

          {/* streets */}
          <path d="M 0 170 L 390 150" stroke="rgba(201,169,110,0.22)" strokeWidth="18" fill="none" strokeLinecap="square"/>
          <path d="M 150 0 L 170 280" stroke="rgba(201,169,110,0.18)" strokeWidth="13" fill="none" strokeLinecap="square"/>
          <path d="M 260 0 L 280 280" stroke="rgba(201,169,110,0.12)" strokeWidth="7" fill="none" strokeLinecap="square"/>
          <path d="M 0 80 L 390 95" stroke="rgba(201,169,110,0.08)" strokeWidth="6" fill="none"/>

          {/* route dashed line: current → target */}
          {act === 1 ? (
            <path d="M 60 210 Q 110 160 160 170" stroke="var(--copper)" strokeWidth="1.4" strokeDasharray="3 4" fill="none"/>
          ) : (
            <path d="M 160 170 Q 220 180 280 145" stroke="var(--copper)" strokeWidth="1.4" strokeDasharray="3 4" fill="none"/>
          )}

          {/* POIs */}
          {/* POI-201 年份牌 */}
          <g transform="translate(160,170)">
            <circle r="12" fill="none" stroke="var(--copper)" strokeWidth="0.7" opacity={act===1?1:0.35}/>
            <circle r="5" fill="var(--copper)" opacity={act===1?1:0.45}/>
            <text x="16" y="4" fontFamily="var(--mono)" fontSize="9" fill="var(--copper)" letterSpacing="0.1em">POI-201 · 年份牌</text>
          </g>
          {/* POI-203 缩写铜条 */}
          <g transform="translate(215,110)" opacity="0.6">
            <circle r="3.5" fill="var(--ink-mute)"/>
            <text x="9" y="3" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-mute)" letterSpacing="0.08em">POI-203</text>
          </g>
          {/* POI-205 湿度签 (act2 highlight) */}
          <g transform="translate(280,145)">
            <circle r="12" fill="none" stroke="var(--copper)" strokeWidth="0.7" opacity={act===2?1:0.25}/>
            <circle r="5" fill={act===2?'var(--copper)':'var(--ink-mute)'}/>
            <text x="12" y="-8" fontFamily="var(--mono)" fontSize="9" fill={act===2?'var(--copper)':'var(--ink-mute)'} letterSpacing="0.1em">POI-205 · 湿度签</text>
          </g>
          {/* POI-206 石凳会合 */}
          <g transform="translate(205,215)" opacity={act===1?0.55:0.9}>
            <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="var(--ink-dim)" strokeWidth="0.7" transform="rotate(45)"/>
            <text x="12" y="4" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-mute)" letterSpacing="0.08em">碰头 · 石凳</text>
          </g>

          {/* B player position */}
          <g transform={act===1 ? "translate(330,90)" : "translate(240,200)"}>
            <circle r="6" fill="none" stroke="var(--ink-dim)" strokeWidth="1"/>
            <circle r="2.6" fill="var(--ink-dim)"/>
            <text x="11" y="4" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-dim)">B</text>
          </g>

          {/* Me (A) */}
          <g transform="translate(60,210)" className="me-pulse">
            <circle r="16" fill="var(--copper)" opacity="0.15"/>
            <circle className="inner" r="6" fill="var(--copper)"/>
            <circle r="2.4" fill="var(--deep)"/>
            <text x="14" y="5" fontFamily="var(--mono)" fontSize="9" fill="var(--copper)" letterSpacing="0.1em">你</text>
          </g>

          <rect width="390" height="280" fill="url(#vig)" pointerEvents="none"/>
        </svg>
        <div className="map-footer">
          <span>距目标 <b>{act===1?'120m':'60m'}</b></span>
          <span>B 位距你 {act===1?'约 240m':'约 80m'}</span>
        </div>
      </div>

      <div className="task-block">
        <div className="tk-eyebrow">当前任务 · {data.taskEyebrow}</div>
        <div className="tk-title">{data.task}</div>
        <div className="tk-hint">{data.hint}</div>
        <div className="tk-poi">{data.poi}</div>
        <div style={{marginTop: 14}}>
          <button className="btn btn-primary" onClick={() => setAct(act === 1 ? 2 : 1) }>
            {act === 1 ? '去做这件事 · 进入第 2 幕 →' : '回到第 1 幕（预览）'}
          </button>
        </div>
      </div>

      <div className="clues">
        <h5>我已经知道的</h5>
        {data.clues.map((c,i) => (
          <div key={i} className="clue-item">
            <div className="tag">{c.tag}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>

      <div className="timeline">
        <h5>这一局正在发生</h5>
        {data.timeline.map((r,i) => (
          <div key={i} className={`tl-row ${r.state}`}>
            <div className="tl-t">{r.t}</div>
            <div className="tl-body"><span className="tl-dot" />{r.body}</div>
          </div>
        ))}
      </div>

      <div style={{height: 180}} />

      {whisperOpen && (
        <div className="whisper-bubble" onClick={() => setWhisperOpen(false)}>
          {data.whisper}
        </div>
      )}

      <button className="whisper-fab" onClick={() => setWhisperOpen(v => !v)}>
        <div className="w-icon">♪</div>
        <div>耳语</div>
      </button>

      <div className="bottom-cta" style={{display:'flex', gap:10}}>
        <button className="btn btn-sm" style={{flex:1}} onClick={() => go('home')}>退出</button>
        <button className="btn btn-primary btn-sm" style={{flex:2}} onClick={() => go('reveal')}>
          走到终局 · 预览 →
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ==========================================================
// RevealAndRecapPage
// ==========================================================
function RevealAndRecapPage({ go, setPreselect, membership }) {
  return (
    <div className="screen" data-screen-label="06 RevealAndRecap">
      <StatusBar />
      <MemChip membership={membership} />

      <div className="hdr-back">
        <button onClick={() => go('play')}>← 返回</button>
        <div style={{flex:1}} />
        <div className="label-mono">THE REVEAL · TH2-01</div>
      </div>

      <div className="reveal-hero">
        <div className="r-label">这一局的真正变化</div>
        <div className="r-title">被藏起来的，<br/>不是谁碰了什么，<br/>是谁把顺序讲顺了。</div>
      </div>

      <div className="flip-card">
        <div className="flip-row before">
          <div className="f-label">你们一开始以为</div>
          <div className="f-body">这是一次"学徒失误 → 馆方被迫封档"的临时事件。</div>
        </div>
        <div className="flip-row after">
          <div className="f-label">实际上</div>
          <div className="f-body">档案柜锁、湿度检查顺序，在公开封档前都改过。有人先整理了顺序，才好对外讲。</div>
        </div>
      </div>

      <div style={{padding: '24px 24px 0'}}>
        <h4 style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.2em',color:'var(--ink-mute)',textTransform:'uppercase',marginBottom:14}}>你们的关键选择</h4>
        <div className="tl-row current">
          <div className="tl-t">ACT 1</div>
          <div className="tl-body"><span className="tl-dot"/>你选择先保留"时间线像后补"这条判断</div>
        </div>
        <div className="tl-row current">
          <div className="tl-t">碰头</div>
          <div className="tl-body"><span className="tl-dot"/>对方只说了半句话 · 让你先说</div>
        </div>
        <div className="tl-row current">
          <div className="tl-t">ACT 2</div>
          <div className="tl-body"><span className="tl-dot"/>这让你们比预期晚 6 分钟看清问题</div>
        </div>
      </div>

      <div className="share-card">
        <div className="sc-corner">REALITY DIRECTOR · 战报</div>
        <div className="sc-num">TH2-01 · 2026.04.18</div>
        <div className="sc-title">旧照相馆封档风波</div>
        <div className="sc-sub">DUO · 45 MIN · 一次重新理解</div>
        <div className="sc-stats">
          <div className="sc-stat">
            <div className="sc-k">线索</div>
            <div className="sc-v">7 / 8</div>
          </div>
          <div className="sc-stat">
            <div className="sc-k">Aha 时刻</div>
            <div className="sc-v">22:41</div>
          </div>
          <div className="sc-stat">
            <div className="sc-k">关系张力</div>
            <div className="sc-v">高</div>
          </div>
        </div>
        <div className="sc-quote">
          "我们以为是一次封档。<br/>其实是一次把顺序讲顺的动作。"
        </div>
        <div className="sc-footer">
          <span>街角 · 800M</span>
          <span>#城市秘密行动</span>
        </div>
      </div>

      <div style={{padding: '10px 24px 0', display:'flex', gap: 10}}>
        <button className="btn btn-sm" style={{flex:1}}>保存图片</button>
        <button className="btn btn-primary btn-sm" style={{flex:1}}>分享卡片</button>
      </div>

      <div className="nextround">
        <h5>下一局最值得怎么换</h5>
        <div className="nr-opt primary" onClick={() => { setPreselect('2p'); go('setup'); }}>
          <div className="nr-body">
            <h6>换一个人，再玩一次双人局</h6>
            <p>HERO · ¥9.9 · 单次发起</p>
          </div>
          <div className="nr-arrow">→</div>
        </div>
        <div className="nr-opt" onClick={() => { setPreselect('3p'); go('setup'); }}>
          <div className="nr-body">
            <h6>加到 3 人，看看站队怎么变</h6>
            <p>组局 · 三人摇摆联盟</p>
          </div>
          <div className="nr-arrow">→</div>
        </div>
        <div className="nr-opt" onClick={() => { setPreselect('1p'); go('home'); }}>
          <div className="nr-body">
            <h6>回到首页，换一个独行主题</h6>
            <p>独行局 · 下班后也能开</p>
          </div>
          <div className="nr-arrow">→</div>
        </div>
      </div>

      <div style={{padding: '14px 24px 18px'}}>
        <div className="recommend" style={{padding:'14px 16px'}}>
          <div className="r-eyebrow">只差一步 · 升级月卡</div>
          <div className="r-title" style={{fontSize: 17, marginTop: 6}}>把它变成随时都能开的城市行动</div>
          <div className="r-reason" style={{fontSize: 12, marginTop: 4}}>¥39.9 / 月 · 月卡无限次 · 同行者仍然免费</div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

// Expose
Object.assign(window, {
  HomePage, EntryPickerSheet, SessionSetupPage, RoomPage, PlayShellPage, RevealAndRecapPage
});
