import { Bi } from "./lang";

/* ============================================================
   THE TEN SYSTEMS
   ============================================================ */
export type Section = { num: string; id: string; title: Bi; sub: Bi; body: Bi };

export const SECTIONS: Section[] = [
  {
    num: "01", id: "origin",
    title: { en: "The Origin of Collective Decision", zh: "集体决策的起源" },
    sub: { en: "From the council of elders to the networked assembly", zh: "从长老议事，到联网的集会" },
    body: {
      en: "Long before there were ballots, there was the circle around the fire. A band of a few dozen could decide together by talking until the group leaned one way — consensus held by faces, memory, and the cost of being shunned. That does not scale. A village can argue things out; a city of strangers cannot all fit in one room, and a nation cannot all speak at once. So humanity slowly externalized the act of deciding together: from the council of elders to the Athenian assembly that voted by show of hands, from the Roman magistracy to medieval estates summoned to consent to taxes, from the written constitution to the universal franchise, and now to networks where millions register an opinion in an afternoon. Each step kept the same ancient promise — that those who must live under a decision should have some hand in making it — while stretching it across ever more people who will never meet.",
      zh: "在有选票之前很久，先有了围着火堆的那个圆圈。几十口人的群落，可以一起把话说到群体倾向某一边为止——共识，由面孔、记忆，与被排斥的代价维系着。这无法放大规模。一个村庄能把事情吵清楚；一座由陌生人组成的城市，无法全部塞进同一间屋子，而一个民族，更无法同时开口。于是人类缓慢地把「共同决定」这一行为外化了出去：从长老议事，到以举手表决的雅典公民大会；从罗马的行政官，到为同意征税而被召集的中世纪等级会议；从成文宪法，到普遍选举权；直到如今——数以百万计的人，在一个下午之内登记下自己的意见。每一步，都守着同一个古老的承诺：那些必须在一项决定之下生活的人，理应在它的作成中有一份手笔——同时，把这承诺，伸展到越来越多素未谋面的人之间。",
    },
  },
  {
    num: "02", id: "legitimacy",
    title: { en: "Power, Legitimacy & Consent", zh: "权力、合法性与同意" },
    sub: { en: "Why authority that is believed in costs less to keep", zh: "为何一个被相信的权威，维持起来更省力" },
    body: {
      en: "Every society must answer one question before any other: by what right does anyone command anyone else? Raw force is always available, but force alone is ruinously expensive — a power obeyed only when it is watching must watch everyone, forever. Legitimacy is the discount. A people who believe their rulers have a right to rule mostly obey without being coerced, and that quiet consent is the cheapest and strongest foundation any order can stand on. Civilizations have grounded that belief in many things: the will of heaven, sacred descent, tradition, conquest, competence, and — most radically — the consent of the governed themselves. Democracy's wager is that the most durable legitimacy comes from the bottom: that power chosen by the people, limited by rules, and peacefully replaceable will be obeyed more freely and resisted less violently than power that answers to no one. It is a wager, not a proof.",
      zh: "每一个社会，在回答其余一切之前，都必须先回答一个问题：凭什么权利，一个人可以命令另一个人？蛮力总是唾手可得，但单凭蛮力，代价高昂到足以拖垮一切——一个只在盯着时才被服从的权力，就必须永远地，盯住每一个人。合法性，是那笔折扣。一个相信统治者拥有统治之权的民族，大体无需被胁迫便会服从；而那份安静的同意，是任何秩序所能立足的、最廉价也最坚固的地基。各文明把这份信念扎根于许多东西之上：天命、神圣的血统、传统、征服、能力——以及最为激进的一种：被治理者本身的同意。民主的赌注在于：最持久的合法性来自底部——由人民选出、受规则限制、且可被和平更替的权力，会比一个对谁都无须负责的权力，被更自由地服从，被更少暴力地抵抗。这是一个赌注，而非一道证明。",
    },
  },
  {
    num: "03", id: "voting",
    title: { en: "Voting, Representation & Collective Intelligence", zh: "投票、代表制与集体智能" },
    sub: { en: "How millions of judgments become one decision", zh: "千百万个判断，如何汇成一个决定" },
    body: {
      en: "A vote is a machine for compressing many minds into one outcome — and the machine's design changes the answer. The same electorate, run through plurality, runoff, ranked-choice, proportional, or approval voting, can elect different winners; there is no neutral way to add up preferences that satisfies every fairness criterion at once. That is not a flaw to be patched but a mathematical fact, proven by Arrow: any rule for turning individual rankings into a group ranking must give something up. And yet voting can be more than a fair coin. Under the right conditions a crowd can be genuinely wiser than its smartest member — independent errors cancel, dispersed knowledge aggregates, the many see more than the few. Markets, juries, and forecasts all live on this. The danger is the mirror image: when voters herd, copy, or are fed the same distortion, the crowd's wisdom curdles into a mob's certainty. Democracy is the bet that, with the right rules and real information, the many decide better than the one.",
      zh: "一张选票，是一台把众多心智压缩成单一结果的机器——而这台机器的设计，会改变那个答案。同一群选民，经由相对多数、两轮决选、排序复选、比例代表，或赞成投票来计算，可能选出不同的胜者；不存在一种中立的方式，能在同时满足每一条公平判准的前提下，把偏好加总起来。这并非一个待修补的瑕疵，而是一桩数学事实，由阿罗所证明：任何把个人排序转化为群体排序的规则，都必须舍弃某样东西。然而，投票又可以远不止是一枚公平的硬币。在恰当的条件下，一个群体可以真正比它最聪明的成员更有智慧——彼此独立的误差相互抵消，分散的知识被聚合，众人，看见了少数所看不见的。市场、陪审团、预测，皆赖此而活。危险，是它镜像的另一面：当选民随大流、相互抄袭，或被喂以同一种扭曲，群体的智慧便凝结成了暴民的笃定。民主的赌注是：在恰当的规则与真实的信息之下，多数，比一人决定得更好。",
    },
  },
  {
    num: "04", id: "information",
    title: { en: "Information, Media & Public Opinion", zh: "信息、媒体与公共舆论" },
    sub: { en: "Self-rule is only as good as what the people can know", zh: "自治的好坏，不过等于人民所能知晓的好坏" },
    body: {
      en: "A democracy is a vast act of collective reasoning, and reasoning runs on information. Citizens cannot judge what they cannot know, and they mostly know the world through a layer of media they do not control — once the printing press and the newspaper, now the feed ranked by an algorithm tuned for attention. That layer decides which facts arrive, which voices are amplified, and whether a society shares a common picture of reality at all. When it works, journalism, debate, and education give the public the raw material for good judgment. When it fails, the same channels carry propaganda, manufactured outrage, and lies that travel faster than corrections. The modern danger is subtler than censorship: not a single forbidden truth but a flood of competing realities, sorted into echo chambers where each group is fed what confirms it and enraged by caricatures of the rest. A people that cannot agree on what is true cannot govern itself — and so the integrity of the information layer may be the quietest, most decisive question democracy now faces.",
      zh: "一个民主政体，是一场庞大的集体推理，而推理，靠信息运转。公民无法判断他们无从知晓之事，而他们对世界的认知，大多透过一层他们并不掌控的媒介——曾经是印刷机与报纸，如今是被一套为攫取注意力而调校的算法所排序的信息流。那一层，决定了哪些事实抵达、哪些声音被放大，以及一个社会究竟是否还共享着同一幅现实的图景。当它运转良好，新闻、辩论与教育，给了公众做出良好判断的原材料。当它失灵，同样的渠道便载着宣传、被制造的愤怒，与那些跑得比更正更快的谎言。现代的危险，比审查更为微妙：不是某一条被禁的真相，而是一场相互竞争的现实的洪水，被分拣进一个个回音室——每个群体都被喂以印证自己的东西，并被对其余者的漫画式扭曲所激怒。一个无法就「何为真实」达成一致的民族，无法自我治理——于是，信息层的完整性，或许正是民主如今所面对的、最沉默却最具决定性的问题。",
    },
  },
  {
    num: "05", id: "constitution",
    title: { en: "Constitutions, Courts & Institutions", zh: "宪法、法院与制度" },
    sub: { en: "Why democracy is architecture, not just an election", zh: "为何民主是一种建筑，而不仅仅是一次选举" },
    body: {
      en: "An election is a single day; a democracy is everything that makes the day matter and binds what follows it. Counting votes is the easy part. The hard part is the architecture that keeps a temporary majority from becoming a permanent master: a constitution that even the winners must obey, courts independent enough to tell a government 'no', a legislature that can check an executive, a civil service that serves the office rather than the ruler, a free press outside the state's grip, and rights placed beyond the reach of any vote. Without that scaffold, 'one person, one vote' can deliver a single election that is never repeated — majority rule curdling into the tyranny of whoever wins once. The deepest insight of constitutional design is that democracy must protect itself from its own majorities, dividing power so that no faction holds all of it, and making the rules harder to change than the rulers. Self-government is less a moment of choosing than a structure built to keep the choice open.",
      zh: "一次选举，只是单独的一天；而一个民主政体，是一切让那一天具有分量、并约束随之而来之事的东西。点票，是容易的部分。困难的部分，是那副让一个暂时的多数无法变成永久的主人的建筑：一部连胜者也必须遵守的宪法，独立到足以对政府说「不」的法院，能制衡行政的立法机关，服务于职位而非统治者的文官系统，置身于国家掌控之外的自由媒体，以及被安放到任何投票都够不着之处的权利。没有那副脚手架，「一人一票」，可能只交付一场再也不会重复的选举——多数之治，凝结成「谁赢了一次便永久为王」的暴政。宪政设计最深的洞见在于：民主，必须保护自己，免于它自身的多数；它分割权力，好让没有任何一个派系能握住它的全部，并让规则比统治者更难被更改。自治，与其说是一个选择的瞬间，不如说是一座为「让选择永远敞开」而建造的结构。",
    },
  },
  {
    num: "06", id: "inequality",
    title: { en: "Democracy, Capitalism & Inequality", zh: "民主、资本主义与不平等" },
    sub: { en: "When one-person-one-vote meets one-dollar-one-voice", zh: "当「一人一票」遇上「一元一声」" },
    body: {
      en: "Democracy promises political equality: every adult, one vote, regardless of wealth. Markets promise something different and often incompatible: rewards proportional to capital, talent, and luck, which concentrate over time. The two systems share the same society, and the friction between them is one of the central dramas of the modern world. Money does not vote, but it speaks — through campaign finance, lobbying, ownership of media, the funding of ideas, and the quiet capture of the agencies meant to regulate it. Where wealth is moderately spread, formal equality and effective influence stay roughly aligned. Where it concentrates to extremes, the gap widens until a society can hold scrupulously fair elections and still be governed largely in the interests of the few. History suggests the relationship runs both ways: broad prosperity has helped democracies stabilize, while severe and rigid inequality has repeatedly fed the resentment that strongmen harvest. Whether democracy can survive extreme inequality — or only tame it — is not a settled question but a live one.",
      zh: "民主承诺政治上的平等：每一个成年人，一票，不论贫富。市场，则承诺某种不同、且往往不相容的东西：与资本、才能和运气成比例的回报——而这些，会随时间而集中。这两套系统共享同一个社会，二者之间的摩擦，是现代世界的核心戏剧之一。金钱不投票，但它说话——透过竞选融资、游说、对媒体的所有权、对思想的资助，以及对那些本应监管它的机构的、悄然的俘获。哪里的财富适度地分散，形式上的平等，与实际的影响力便大致对齐。哪里的财富集中到极端，那道裂缝便不断扩大，直到一个社会可以举办一丝不苟、公正无瑕的选举，却仍主要为少数人的利益所治理。历史表明，这关系是双向的：普遍的繁荣，曾帮助民主稳定下来；而严酷且僵化的不平等，则一再喂养着强人借以收割的怨恨。民主究竟能否在极端的不平等中幸存——抑或只能驯服它——并非一个已有定论的问题，而是一个活生生的问题。",
    },
  },
  {
    num: "07", id: "civilizations",
    title: { en: "The Civilization Comparison Engine", zh: "文明比较引擎" },
    sub: { en: "Many traditions of asking the many", zh: "众多征询众人的传统" },
    body: {
      en: "The instinct to consult before deciding is older and wider than any single culture, and reading democracy as a European invention misses most of the story. Athens put governance in the hands of the assembled citizens and chose many officials by lot, trusting amateurs over experts — a radical, narrow, slave-holding experiment that still defines the word. Rome built a mixed republic of senate, magistrates, and popular assemblies, obsessed with balancing classes and limiting any single office. Imperial China developed a different answer: legitimacy through a merit-selected bureaucracy and the moral duty of rulers to the ruled, consultation without elections. Islamic political thought elevated shura, consultation, and the principle that no ruler stands above the law. Medieval Europe's parliaments grew from the hard bargain that those taxed must consent. Modern liberal democracy braids these threads — assembly, representation, rights, bureaucracy, the rule of law — into one system, and then exports it into soils that shape it anew. Comparing them structurally, rather than ranking them, shows democracy as a family of answers to one question: how should the many be heard?",
      zh: "「在决定之前先行征询」的本能，比任何单一文化都更古老、也更广泛；把民主读作一项欧洲的发明，会错过这故事的大半。雅典把治理交到聚集起来的公民手中，并以抽签选出许多官员，宁可信任外行胜过专家——一场激进、狭隘、且蓄奴的实验，却至今定义着这个词。罗马建起一个由元老院、行政官与平民大会组成的混合共和，痴迷于平衡阶层、限制任何单一的官职。帝制中国发展出另一种答案：经由择优选拔的官僚制，与统治者对被治者的道德义务，而获得合法性——有征询，却无选举。伊斯兰政治思想抬高了「舒拉」（协商），以及「没有统治者凌驾于法律之上」的原则。中世纪欧洲的议会，则从一桩艰难的交易中生长出来：被征税者，必须同意。现代自由民主，把这些线索——集会、代表、权利、官僚制、法治——编织进同一个系统，再把它输出到那些将重新塑造它的土壤之中。从结构上比较它们，而非给它们排名，便会看见：民主，是对同一个问题的一族答案——众人，应当如何被听见？",
    },
  },
  {
    num: "08", id: "digital",
    title: { en: "Digital Democracy & AI Governance", zh: "数字民主与人工智能治理" },
    sub: { en: "When participation becomes continuous and computable", zh: "当参与变得连续，且可被计算" },
    body: {
      en: "For most of history the cost of consulting people was the binding constraint: you could not ask millions what they thought more than rarely, so you elected a few to decide for years at a time. Technology is collapsing that cost, and with it the old shape of democracy. Online platforms let thousands deliberate and find consensus across deep disagreement; liquid democracy lets you vote directly on what you know and delegate the rest to someone you trust, revocably; blockchains promise tamper-evident voting and rules no official can quietly rewrite; DAOs run real treasuries by token ballot. Above all, AI begins to change what a citizen and a state can each do — modeling the consequences of a policy before it passes, translating between languages and reading levels, summarizing a million comments, and, more uneasily, scoring, nudging, and surveilling. The same tools that could make governance more continuous, transparent, and informed could also automate manipulation and concentrate power in whoever owns the models. The question is not whether democracy becomes digital, but who writes the code, who can audit it, and whether participation deepens or is merely simulated.",
      zh: "在历史的大部分时间里，「征询人民」的成本，是那个约束一切的瓶颈：你无法频繁地去问千百万人怎么想，于是你选出寥寥数人，让他们一次替你决定数年。技术正在压垮那份成本，连同民主的旧有形状。在线平台让成千上万人跨越深刻的分歧去协商、去寻得共识；流动民主，让你在你所懂之事上直接投票，并把其余的、可撤回地委托给一个你信任的人；区块链承诺一种可察觉篡改的投票，与一种没有官员能悄然改写的规则；DAO 以代币投票，运营着真实的金库。而最重要的是，人工智能开始改变一个公民与一个国家各自能做之事——在一项政策通过前就模拟其后果，在语言与阅读水平之间翻译，把一百万条评论加以摘要；以及，更令人不安地，评分、助推与监控。那些本可让治理更连续、更透明、更知情的工具，同样可以把操纵自动化，并把权力集中到那个拥有模型的人手中。问题不在于民主是否会变得数字化，而在于：谁来写那段代码，谁能审计它，以及——参与，是变得更深了，还是仅仅被模拟了出来。",
    },
  },
  {
    num: "09", id: "future",
    title: { en: "Future Civilization Governance", zh: "未来的文明治理" },
    sub: { en: "Coordinating a planet, and the minds we have not met", zh: "协调一颗行星，与我们尚未谋面的心智" },
    body: {
      en: "The unit of self-government has grown relentlessly — band, city, nation — and it is not finished. Some of humanity's largest problems are now planet-sized: climate, pandemics, financial contagion, the governance of artificial intelligence itself. None respects a border, and we have almost no legitimate way to decide them above the nation, where there is no shared 'people' to consent and no institution most of the world accepts as theirs. From below, new forms are being prototyped: decentralized autonomous societies that encode their charter in software, real-time citizen platforms, AI-assisted assemblies that could model a policy's effects before a vote and surface what no human could read. The deep questions return in new clothes. How do you make a planetary decision legitimate without a planetary people? How do you keep human judgment, and mercy, at the center when machines decide faster than any assembly can meet? The history of governance is the history of stretching legitimate coordination to a larger scale than seemed possible — and the next stretch may be the hardest, and the most necessary, of all.",
      zh: "自治的单位一直在无情地增长——群落、城市、民族——而它尚未走到尽头。人类最大的一些问题，如今已是行星尺度的：气候、疫情、金融传染，以及对人工智能本身的治理。没有一个问题尊重边界，而我们几乎没有任何合法的方式，能在民族之上去决定它们——在那里，没有一个共享的「人民」去同意，也没有一个被世界大多数所接受为「属于自己」的制度。从底层，新的形态正被试制出来：把章程编码进软件的去中心化自治社会、实时的公民平台、能在投票前就模拟一项政策的效果、并揭示出任何人都读不完之事的「AI 辅助集会」。那些深层的问题，换上新衣重新归来。没有一个行星级的「人民」，你如何让一项行星级的决定具有合法性？当机器决定的速度，快过任何集会所能召开的速度，你如何把人的判断与怜悯，留在中心？治理的历史，就是一部把合法的协调，伸展到比看似可能更大的尺度之上的历史——而下一次伸展，或许是其中最艰难、也最必要的一次。",
    },
  },
  {
    num: "10", id: "unified",
    title: { en: "The Unified Democracy Model", zh: "统一的民主模型" },
    sub: { en: "Democracy as the coordination of distributed minds", zh: "民主，作为对分散心智的协调" },
    body: {
      en: "Step back far enough and the thousand forms of self-rule resolve into a single function. A society is a vast distributed system: knowledge, interests, and judgment are scattered across millions of minds, and no central processor — no king, no party, no committee — can hold all of it at once. Democracy is one civilization-scale answer to the resulting problem: how to take that dispersed intelligence and turn it into decisions that are legitimate enough to be obeyed, informed enough to be wise, and revisable enough to be corrected when wrong. Seen this way, voting, free press, courts, rights, and representation are not separate ideals but components of one machine for converting many into one without crushing the many. Its failure modes are equally legible: too little participation and it loses its information; too little legitimacy and it needs force; too little institutional trust and it cannot keep promises; too much concentration and it tips into tyranny; too much fragmentation and it tips into chaos. Democracy, on this reading, is civilization's running attempt to scale collective intelligence as fast as it scales complexity.",
      zh: "退后足够远，那千百种自治的形态，便消解为单一的一个功能。一个社会，是一套庞大的分布式系统：知识、利益与判断，散落在千百万个心智之中，而没有任何一个中央处理器——没有国王、没有政党、没有委员会——能同时握住它的全部。民主，是对由此而生的问题的、一个文明尺度的答案：如何取来那分散的智能，并把它转化为这样的决定——合法到足以被服从，知情到足以有智慧，且可修订到足以在出错时被纠正。如此看来，投票、自由媒体、法院、权利与代表制，并非一个个分立的理想，而是同一台机器的部件——一台把「众」转化为「一」、却又不碾碎那「众」的机器。它的失败模式同样清晰可读：参与太少，它便失去信息；合法性太少，它便需要暴力；制度信任太少，它便守不住承诺；集中太多，它便倾向暴政；碎裂太多，它便倾向混乱。在这一读法下，民主，是文明持续不断的尝试——以不慢于它放大复杂性的速度，去放大集体的智能。",
    },
  },
];

/* ============================================================
   SECTION 1 — EVOLUTION OF COLLECTIVE DECISION (DemocracyLadder)
   how the act of deciding-together externalized and scaled
   ============================================================ */
export type DemoEpoch = { key: string; era: Bi; name: Bi; gain: Bi; accent: string };
export const DEMO_EPOCHS: DemoEpoch[] = [
  { key: "band", era: { en: "Prehistory", zh: "史前" }, name: { en: "Consensus of the band", zh: "群落的共识" }, gain: { en: "A few dozen kin talk until the group leans one way — agreement held by faces, memory, and shame.", zh: "几十口血亲把话说到群体倾向某一边为止——共识，由面孔、记忆与羞耻维系。" }, accent: "#7986a6" },
  { key: "council", era: { en: "Early tribes", zh: "早期部落" }, name: { en: "Council of elders", zh: "长老议事会" }, gain: { en: "Decisions delegated to those with standing; the first separation of 'who decides' from 'everyone'.", zh: "决定被托付给有威望者；「由谁决定」与「所有人」的第一次分离。" }, accent: "#95a2c2" },
  { key: "assembly", era: { en: "~508 BCE", zh: "约公元前508年" }, name: { en: "Athenian assembly", zh: "雅典公民大会" }, gain: { en: "Citizens vote directly by show of hands and fill offices by lot — rule by amateurs, not experts.", zh: "公民以举手直接表决，并以抽签充任官职——由外行而非专家来统治。" }, accent: "#4f9fff" },
  { key: "republic", era: { en: "~509 BCE →", zh: "约公元前509年 →" }, name: { en: "The mixed republic", zh: "混合共和" }, gain: { en: "Rome balances senate, magistrates, and assemblies; power split among classes and offices.", zh: "罗马平衡元老院、行政官与各大会；权力分摊于阶层与官职之间。" }, accent: "#3fd9c0" },
  { key: "estates", era: { en: "1200s →", zh: "13世纪 →" }, name: { en: "Estates & parliaments", zh: "等级会议与议会" }, gain: { en: "Rulers summon the taxed to consent — the hard bargain that 'no taxation without representation'.", zh: "统治者召集被征税者前来同意——「无代表，不纳税」那桩艰难的交易。" }, accent: "#6fe6d2" },
  { key: "const", era: { en: "1787 →", zh: "1787年 →" }, name: { en: "Representative democracy", zh: "代议制民主" }, gain: { en: "A written constitution divides power and binds rulers; the people choose representatives, not laws directly.", zh: "成文宪法分割权力、约束统治者；人民选择代表，而非直接制定法律。" }, accent: "#7bb8ff" },
  { key: "mass", era: { en: "1900s →", zh: "20世纪 →" }, name: { en: "Universal suffrage", zh: "普遍选举权" }, gain: { en: "The vote extends past property, race, and sex — at last, formally, one adult, one vote.", zh: "投票权越出财产、种族与性别——终于，在形式上，一个成年人，一票。" }, accent: "#e6b65c" },
  { key: "network", era: { en: "Now →", zh: "当下 →" }, name: { en: "Networked participation", zh: "联网的参与" }, gain: { en: "Millions register opinion in an afternoon; deliberation, delegation, and code begin to reshape the vote.", zh: "数百万人在一个下午之内登记意见；协商、委托与代码，开始重塑投票本身。" }, accent: "#a9d2ff" },
];

/* ============================================================
   SECTION 2 — LEGITIMACY SIMULATOR (LegitimacySim)
   three inputs (0-1): participation, legitimacy source, power constraints
   regime presets set the three; meters report stability / coercion / tyranny risk
   ============================================================ */
export type LegitRegime = { key: string; name: Bi; desc: Bi; participation: number; legitimacy: number; constraint: number; accent: string };
export const LEGIT_REGIMES: LegitRegime[] = [
  { key: "monarchy", name: { en: "Sacred monarchy", zh: "神圣君主制" }, desc: { en: "One ruler legitimized by heaven or blood; the people consent through tradition, not choice.", zh: "一位由天命或血统所赋予合法性的统治者；人民经由传统、而非选择来同意。" }, participation: 0.1, legitimacy: 0.6, constraint: 0.2, accent: "#cf9b3f" },
  { key: "empire", name: { en: "Bureaucratic empire", zh: "官僚帝国" }, desc: { en: "Rule by a competent administration; legitimacy rests on order and performance, not the ballot.", zh: "由一套能干的行政机器统治；合法性，倚于秩序与绩效，而非选票。" }, participation: 0.15, legitimacy: 0.55, constraint: 0.4, accent: "#95a2c2" },
  { key: "republic", name: { en: "Mixed republic", zh: "混合共和" }, desc: { en: "Power split among classes and offices that check each other; some consent, often unstable.", zh: "权力分摊于彼此制衡的阶层与官职之间；有一定的同意，却常常不稳。" }, participation: 0.5, legitimacy: 0.6, constraint: 0.65, accent: "#3fd9c0" },
  { key: "democracy", name: { en: "Constitutional democracy", zh: "宪政民主" }, desc: { en: "Power chosen by the people, limited by rules, and peacefully replaceable — legitimacy from below.", zh: "由人民选出、受规则限制、且可被和平更替的权力——合法性来自底部。" }, participation: 0.85, legitimacy: 0.85, constraint: 0.85, accent: "#4f9fff" },
  { key: "technocracy", name: { en: "Technocracy", zh: "技术官僚制" }, desc: { en: "Decisions handed to experts; legitimacy bought with results, fragile when results falter.", zh: "决定被交给专家；以成果换取合法性，而当成果动摇时，它便脆弱。" }, participation: 0.3, legitimacy: 0.55, constraint: 0.5, accent: "#7bb8ff" },
  { key: "authoritarian", name: { en: "Modern authoritarian", zh: "现代威权" }, desc: { en: "Elections and forms exist on paper, but one party or person holds the real power unchecked.", zh: "选举与各种形式在纸面上存在，但真正的权力，被一党或一人不受制约地握住。" }, participation: 0.35, legitimacy: 0.4, constraint: 0.15, accent: "#69748f" },
];

export type LegitMeter = { key: "stability" | "coercion" | "tyranny"; label: Bi; note: Bi };
export const LEGIT_METERS: LegitMeter[] = [
  { key: "stability", label: { en: "Cooperative stability", zh: "合作稳定度" }, note: { en: "How much the society can coordinate peacefully and keep its promises over time.", zh: "社会能在多大程度上和平协调、并随时间守住承诺。" } },
  { key: "coercion", label: { en: "Coercion required", zh: "所需胁迫" }, note: { en: "How much force is needed to hold order when legitimacy is thin.", zh: "当合法性稀薄时，维持秩序所需的暴力。" } },
  { key: "tyranny", label: { en: "Tyranny risk", zh: "暴政风险" }, note: { en: "Power concentrated without participation or constraints tips toward arbitrary rule.", zh: "在缺乏参与与约束的情况下集中的权力，倾向于滑入专断之治。" } },
];

/* ============================================================
   SECTION 3 — VOTING SIMULATOR (VotingSimulator) — FLAGSHIP
   a 1-D spatial electorate: candidates and voter blocs sit on a 0-100
   axis; each system aggregates the same preferences differently.
   ============================================================ */
export type Candidate = { key: string; name: Bi; tag: Bi; pos: number; accent: string };
export const CANDIDATES: Candidate[] = [
  { key: "reform", name: { en: "Reform", zh: "革新" }, tag: { en: "Change & redistribution", zh: "变革与再分配" }, pos: 16, accent: "#4f9fff" },
  { key: "commons", name: { en: "Commons", zh: "公共" }, tag: { en: "Labor & social provision", zh: "劳工与社会供给" }, pos: 40, accent: "#3fd9c0" },
  { key: "center", name: { en: "Bridge", zh: "中道" }, tag: { en: "Pragmatic compromise", zh: "务实的折中" }, pos: 56, accent: "#b8c2dc" },
  { key: "heritage", name: { en: "Heritage", zh: "传统" }, tag: { en: "Order & continuity", zh: "秩序与延续" }, pos: 82, accent: "#e6b65c" },
];

// blocs of voters on the same 0-100 axis; share sums to ~1. The component
// derives each bloc's full ranking by distance to each candidate's pos.
export type VoterBloc = { key: string; name: Bi; center: number; share: number; accent: string };
export const VOTER_BLOCS: VoterBloc[] = [
  { key: "progressive", name: { en: "Progressive", zh: "进步派" }, center: 14, share: 0.27, accent: "#4f9fff" },
  { key: "labor", name: { en: "Labor", zh: "劳工派" }, center: 38, share: 0.22, accent: "#3fd9c0" },
  { key: "moderate", name: { en: "Moderate", zh: "温和派" }, center: 60, share: 0.28, accent: "#b8c2dc" },
  { key: "traditional", name: { en: "Traditional", zh: "传统派" }, center: 84, share: 0.23, accent: "#e6b65c" },
];

export type VotingSystem = { key: string; name: Bi; gloss: Bi; how: Bi; accent: string };
export const VOTING_SYSTEMS: VotingSystem[] = [
  { key: "plurality", name: { en: "Plurality", zh: "相对多数" }, gloss: { en: "First past the post", zh: "领先者当选" }, how: { en: "Each voter picks one; whoever gets the most votes wins, even without a majority.", zh: "每位选民只选一人；得票最多者当选，即便未过半。" }, accent: "#7bb8ff" },
  { key: "runoff", name: { en: "Two-round runoff", zh: "两轮决选" }, gloss: { en: "Top two, then decide", zh: "前二名，再决胜" }, how: { en: "If no one wins a majority, the top two face a second round head-to-head.", zh: "若无人过半，得票前二者进入第二轮，正面对决。" }, accent: "#4f9fff" },
  { key: "ranked", name: { en: "Ranked choice", zh: "排序复选" }, gloss: { en: "Instant runoff (IRV)", zh: "即时决选" }, how: { en: "Voters rank candidates; the last place is eliminated and its votes transfer, until one has a majority.", zh: "选民对候选人排序；末位被淘汰、其票转移，直到有人过半。" }, accent: "#3fd9c0" },
  { key: "borda", name: { en: "Borda count", zh: "波达计数" }, gloss: { en: "Points by rank", zh: "按排位计分" }, how: { en: "Each rank awards points; the candidate with the highest total wins — rewards broad acceptability.", zh: "每个排位授予分数；总分最高者当选——奖励广泛的可接受度。" }, accent: "#6fe6d2" },
  { key: "approval", name: { en: "Approval", zh: "赞成投票" }, gloss: { en: "Vote for all you like", zh: "认可几位投几位" }, how: { en: "Voters approve as many candidates as they like; the most-approved wins.", zh: "选民可认可任意数量的候选人；获认可最多者当选。" }, accent: "#a9d2ff" },
  { key: "proportional", name: { en: "Proportional", zh: "比例代表" }, gloss: { en: "Seats, not a single winner", zh: "分配席位，而非单一胜者" }, how: { en: "Seats are shared in proportion to votes — no single winner, but a parliament that mirrors the electorate.", zh: "席位按得票比例分配——没有单一胜者，而是一个映照选民的议会。" }, accent: "#e6b65c" },
];

// the collective-intelligence ideas behind voting
export type SocialChoice = { key: string; name: Bi; claim: Bi; caveat: Bi; accent: string };
export const SOCIAL_CHOICE: SocialChoice[] = [
  { key: "condorcet", name: { en: "Condorcet jury theorem", zh: "孔多塞陪审团定理" }, claim: { en: "If each voter is more right than wrong and votes independently, the majority is almost certainly right.", zh: "若每位选民对的几率大于错、且独立投票，多数几乎必然是对的。" }, caveat: { en: "Fails the moment voters copy one another or share the same bias.", zh: "一旦选民相互抄袭、或共享同一偏见，它便失效。" }, accent: "#3fd9c0" },
  { key: "crowds", name: { en: "Wisdom of crowds", zh: "群体智慧" }, claim: { en: "Aggregating many independent guesses cancels error and beats most individuals.", zh: "聚合众多独立的猜测，可抵消误差，并胜过大多数个体。" }, caveat: { en: "Requires diversity and independence; herding destroys it.", zh: "需要多样性与独立性；随大流会摧毁它。" }, accent: "#4f9fff" },
  { key: "arrow", name: { en: "Arrow's impossibility", zh: "阿罗不可能定理" }, claim: { en: "No voting rule can satisfy every reasonable fairness criterion at once.", zh: "没有一种投票规则，能同时满足每一条合理的公平判准。" }, caveat: { en: "Every system trades one fairness for another — there is no perfect ballot.", zh: "每个系统都以一种公平去换另一种——不存在完美的选票。" }, accent: "#e6b65c" },
  { key: "median", name: { en: "Median voter theorem", zh: "中位选民定理" }, claim: { en: "Under simple majority rule on one issue, the outcome tends toward the median voter's position.", zh: "在单一议题的简单多数决下，结果倾向于中位选民的立场。" }, caveat: { en: "Breaks down with many dimensions, turnout effects, and strategic voting.", zh: "在多维度、投票率效应与策略性投票下崩解。" }, accent: "#b8c2dc" },
];

/* ============================================================
   SECTION 4 — OPINION NETWORK (OpinionNetwork)
   media regimes set three params (0-1): exposure diversity, homophily,
   algorithmic amplification — the sim shows consensus / polarization / fragmentation
   ============================================================ */
export type MediaRegime = { key: string; name: Bi; desc: Bi; diversity: number; homophily: number; amplification: number; accent: string };
export const MEDIA_REGIMES: MediaRegime[] = [
  { key: "square", name: { en: "The town square", zh: "城镇广场" }, desc: { en: "Everyone hears everyone; few channels, shared facts, opinion drifts toward the center.", zh: "人人都听见人人；渠道稀少，事实共享，舆论向中心漂移。" }, diversity: 0.85, homophily: 0.2, amplification: 0.15, accent: "#3fd9c0" },
  { key: "broadcast", name: { en: "Broadcast era", zh: "广播时代" }, desc: { en: "A handful of outlets give a nation one common picture of reality — narrow, but shared.", zh: "屈指可数的媒体，给一个民族同一幅现实的图景——狭窄，却是共享的。" }, diversity: 0.6, homophily: 0.3, amplification: 0.25, accent: "#7bb8ff" },
  { key: "cable", name: { en: "Partisan media", zh: "党派媒体" }, desc: { en: "Audiences sort by tribe; each channel flatters its own, and the common picture begins to crack.", zh: "受众按部族分拣；每个频道都讨好自己人，那共同的图景，开始皲裂。" }, diversity: 0.4, homophily: 0.6, amplification: 0.45, accent: "#b8c2dc" },
  { key: "feed", name: { en: "Algorithmic feed", zh: "算法信息流" }, desc: { en: "A ranking tuned for attention shows each person what enrages and confirms them; clusters harden.", zh: "一套为攫取注意力而调校的排序，向每个人展示激怒并印证他的东西；群簇变得坚硬。" }, diversity: 0.25, homophily: 0.8, amplification: 0.8, accent: "#e6b65c" },
  { key: "fragmented", name: { en: "Post-truth fragmentation", zh: "后真相碎裂" }, desc: { en: "No shared facts at all; a flood of competing realities, each group fed its own.", zh: "再无任何共享的事实；一场相互竞争的现实的洪水，每个群体都被喂以自己的那一份。" }, diversity: 0.15, homophily: 0.9, amplification: 0.7, accent: "#69748f" },
];

export type MediaForce = { key: string; name: Bi; effect: Bi; good: boolean };
export const MEDIA_FORCES: MediaForce[] = [
  { key: "journalism", name: { en: "Independent journalism", zh: "独立新闻业" }, effect: { en: "Supplies verified facts and holds power to account — the raw material of judgment.", zh: "供给经核实的事实，并追究权力的责任——判断的原材料。" }, good: true },
  { key: "education", name: { en: "Civic education", zh: "公民教育" }, effect: { en: "Builds the literacy to tell argument from manipulation.", zh: "培养辨别「论证」与「操纵」的素养。" }, good: true },
  { key: "deliberation", name: { en: "Public deliberation", zh: "公共协商" }, effect: { en: "Forces exposure to other views; tends to moderate and inform.", zh: "迫使人接触异见；倾向于使人温和、知情。" }, good: true },
  { key: "propaganda", name: { en: "Propaganda", zh: "宣传" }, effect: { en: "Floods the channel with one engineered reality, drowning the rest.", zh: "用一种被工程化的现实淹没渠道，淹没其余。" }, good: false },
  { key: "misinformation", name: { en: "Misinformation", zh: "虚假信息" }, effect: { en: "Lies travel faster than corrections and stick once shared.", zh: "谎言跑得比更正快，且一经传播便黏住。" }, good: false },
  { key: "echo", name: { en: "Echo chambers", zh: "回音室" }, effect: { en: "Sort people into self-confirming groups that never hear the other side.", zh: "把人分拣进自我印证、且从不听见对面的群体。" }, good: false },
];

/* ============================================================
   SECTION 5 — SEPARATION OF POWERS (SeparationOfPowers)
   ============================================================ */
export type Branch = { key: string; name: Bi; role: Bi; accent: string };
export const BRANCHES: Branch[] = [
  { key: "leg", name: { en: "Legislature", zh: "立法机关" }, role: { en: "Represents the people and makes the laws", zh: "代表人民并制定法律" }, accent: "#4f9fff" },
  { key: "exe", name: { en: "Executive", zh: "行政机关" }, role: { en: "Governs and enforces the laws", zh: "施政并执行法律" }, accent: "#e6b65c" },
  { key: "jud", name: { en: "Judiciary", zh: "司法机关" }, role: { en: "Interprets the laws and guards the constitution", zh: "解释法律并守护宪法" }, accent: "#3fd9c0" },
];

// the supporting pillars beyond the three branches
export type CivPillar = { key: string; name: Bi; role: Bi };
export const CONST_PILLARS: CivPillar[] = [
  { key: "constitution", name: { en: "The constitution", zh: "宪法" }, role: { en: "The rule even winners must obey; harder to change than the rulers.", zh: "连胜者也必须遵守的规则；比统治者更难被更改。" } },
  { key: "press", name: { en: "Free press", zh: "自由媒体" }, role: { en: "The watchdog outside the state's grip.", zh: "置身于国家掌控之外的看门狗。" } },
  { key: "civil", name: { en: "Civil service", zh: "文官系统" }, role: { en: "A permanent administration that serves the office, not the ruler.", zh: "一套服务于职位、而非统治者的常设行政机器。" } },
  { key: "rights", name: { en: "Entrenched rights", zh: "受保障的权利" }, role: { en: "A sphere of the individual no majority may vote away.", zh: "一片任何多数都无权投票剥夺的、属于个体的领地。" } },
];

// concentration: how much of total power sits in one hand (0 dispersed → 100 absolute)
export type PowerRegime = { key: string; name: Bi; concentration: number; checks: Bi; desc: Bi; accent: string };
export const POWER_REGIMES: PowerRegime[] = [
  { key: "direct", name: { en: "Direct democracy", zh: "直接民主" }, concentration: 22, checks: { en: "The assembly itself; few limits on the majority", zh: "公民大会本身；对多数的限制甚少" }, desc: { en: "Citizens decide directly — maximally participatory, but a majority can turn on a minority with little to stop it.", zh: "公民直接决定——参与度达到极致，但多数可以转而对付少数，而几乎无物能阻止。" }, accent: "#3fd9c0" },
  { key: "parliamentary", name: { en: "Parliamentary democracy", zh: "议会制民主" }, concentration: 38, checks: { en: "Coalition, votes of no confidence, courts, press", zh: "联合政府、不信任投票、法院、媒体" }, desc: { en: "Executive drawn from and answerable to the legislature; power fused but removable at any time.", zh: "行政首脑出自并对立法机关负责；权力虽融合，却随时可被撤换。" }, accent: "#4f9fff" },
  { key: "presidential", name: { en: "Presidential democracy", zh: "总统制民主" }, concentration: 46, checks: { en: "Separated branches, fixed terms, judicial review", zh: "分立的部门、固定任期、司法审查" }, desc: { en: "Branches separately elected and able to block one another; stable, but prone to deadlock.", zh: "各部门分别选出、并可相互阻挠；稳定，却易陷僵局。" }, accent: "#7bb8ff" },
  { key: "dominant", name: { en: "Dominant-party state", zh: "一党独大" }, concentration: 74, checks: { en: "Nominal courts and elections, controlled in practice", zh: "名义上的法院与选举，实则受控" }, desc: { en: "The forms of separation exist on paper, but one party controls all of them.", zh: "分权的形式在纸面上存在，但一党控制着它们的全部。" }, accent: "#b8c2dc" },
  { key: "personalist", name: { en: "Personalist autocracy", zh: "个人专制" }, concentration: 93, checks: { en: "Loyalty, fear, the absence of any binding rule", zh: "忠诚、恐惧，与任何约束性规则的缺席" }, desc: { en: "One person holds all three powers; the only checks are informal and after the fact.", zh: "一人握有全部三种权力；唯一的制衡是非正式的、且事后才出现的。" }, accent: "#69748f" },
];

/* ============================================================
   SECTION 6 — INEQUALITY & INFLUENCE (InfluenceLab)
   channels through which money becomes political voice + economy models
   ============================================================ */
export type InfluenceChannel = { key: string; name: Bi; mechanism: Bi; accent: string };
export const INFLUENCE_CHANNELS: InfluenceChannel[] = [
  { key: "finance", name: { en: "Campaign finance", zh: "竞选融资" }, mechanism: { en: "Money buys the attention, ads, and ground game that decide close races.", zh: "金钱买下决定胶着选情的注意力、广告与基层动员。" }, accent: "#4f9fff" },
  { key: "lobbying", name: { en: "Lobbying", zh: "游说" }, mechanism: { en: "Paid access shapes the fine print of laws long after the votes are counted.", zh: "付费的接触，在票数点清之后很久，仍塑造着法律的细则。" }, accent: "#3fd9c0" },
  { key: "media", name: { en: "Media ownership", zh: "媒体所有权" }, mechanism: { en: "Owning the channel shapes which facts and frames reach the public.", zh: "拥有渠道，便塑造了哪些事实与框架抵达公众。" }, accent: "#7bb8ff" },
  { key: "ideas", name: { en: "Funding of ideas", zh: "对思想的资助" }, mechanism: { en: "Think tanks and chairs decide which policies look respectable.", zh: "智库与讲席教授职位，决定了哪些政策看起来体面。" }, accent: "#6fe6d2" },
  { key: "capture", name: { en: "Regulatory capture", zh: "监管俘获" }, mechanism: { en: "The watched quietly come to staff and steer the agencies meant to watch them.", zh: "被监管者，悄然来充任并操控那些本应监管他们的机构。" }, accent: "#e6b65c" },
];

export type EconomyModel = { key: string; name: Bi; desc: Bi; gini: number; influenceSkew: number; accent: string };
export const ECONOMY_MODELS: EconomyModel[] = [
  { key: "social", name: { en: "Social democracy", zh: "社会民主" }, desc: { en: "Markets plus heavy redistribution; wealth spread, influence stays close to one-person-one-vote.", zh: "市场加上大力度的再分配；财富分散，影响力贴近「一人一票」。" }, gini: 28, influenceSkew: 25, accent: "#3fd9c0" },
  { key: "liberal", name: { en: "Liberal market democracy", zh: "自由市场民主" }, desc: { en: "Lighter redistribution and freer markets; influence tilts toward those who can pay to be heard.", zh: "较轻的再分配与更自由的市场；影响力，向那些付得起钱被听见的人倾斜。" }, gini: 42, influenceSkew: 55, accent: "#4f9fff" },
  { key: "oligarchic", name: { en: "Oligarchic democracy", zh: "寡头民主" }, desc: { en: "Fair elections on the surface, but a narrow elite funds, lobbies, and largely sets the agenda.", zh: "表面上公正的选举，底下却是一个狭窄的精英集团在出资、游说，并大体设定着议程。" }, gini: 58, influenceSkew: 82, accent: "#e6b65c" },
  { key: "state", name: { en: "State-led capitalism", zh: "国家主导资本主义" }, desc: { en: "The state allocates capital and curbs rivals; influence flows through proximity to the state, not the vote.", zh: "国家配置资本、抑制对手；影响力，经由「与国家的距离」、而非选票来流动。" }, gini: 47, influenceSkew: 70, accent: "#b8c2dc" },
];

/* ============================================================
   SECTION 7 — CIVILIZATION COMPARISON (CivilizationCompass radar)
   each tradition scored 0-100 on six axes of self-rule
   ============================================================ */
export const CIV_AXES: Bi[] = [
  { en: "Breadth of participation", zh: "参与的广度" },
  { en: "Representation", zh: "代表性" },
  { en: "Deliberation & consultation", zh: "协商与征询" },
  { en: "Constraints on power", zh: "对权力的约束" },
  { en: "Institutional continuity", zh: "制度的延续" },
  { en: "Peaceful transfer of power", zh: "权力的和平移交" },
];

export type Civilization = { key: string; name: Bi; basis: Bi; axes: number[]; accent: string };
export const CIVILIZATIONS: Civilization[] = [
  { key: "athens", name: { en: "Athenian democracy", zh: "雅典民主" }, basis: { en: "Direct rule by the assembled (free, male) citizens; many offices filled by lot.", zh: "由聚集起来的（自由、男性）公民直接统治；许多官职以抽签充任。" }, axes: [55, 20, 80, 45, 35, 70], accent: "#4f9fff" },
  { key: "rome", name: { en: "Roman republic", zh: "罗马共和" }, basis: { en: "A mixed constitution balancing senate, magistrates, and popular assemblies.", zh: "一部平衡元老院、行政官与平民大会的混合宪制。" }, axes: [40, 55, 60, 70, 65, 55], accent: "#3fd9c0" },
  { key: "china", name: { en: "Imperial China", zh: "帝制中国" }, basis: { en: "Legitimacy through merit-selected bureaucracy and rulers' moral duty — consultation without elections.", zh: "经由择优选拔的官僚制与统治者的道德义务而获合法性——有征询，却无选举。" }, axes: [20, 35, 55, 50, 90, 30], accent: "#e6b65c" },
  { key: "islamic", name: { en: "Islamic shura", zh: "伊斯兰协商" }, basis: { en: "Shura (consultation) and the principle that no ruler stands above the sacred law.", zh: "「舒拉」（协商），与「没有统治者凌驾于圣法之上」的原则。" }, axes: [30, 40, 70, 60, 70, 40], accent: "#6fe6d2" },
  { key: "parliament", name: { en: "European parliaments", zh: "欧洲议会" }, basis: { en: "Estates and parliaments born of the bargain that the taxed must consent.", zh: "源于「被征税者必须同意」之交易的等级会议与议会。" }, axes: [50, 75, 65, 80, 80, 75], accent: "#7bb8ff" },
  { key: "modern", name: { en: "Modern liberal democracy", zh: "现代自由民主" }, basis: { en: "Universal suffrage, representation, entrenched rights, and the rule of law braided together.", zh: "普遍选举权、代表制、受保障的权利与法治，编织于一体。" }, axes: [90, 88, 75, 90, 85, 92], accent: "#a9d2ff" },
];

/* ============================================================
   SECTION 8 — DIGITAL DEMOCRACY & AI (DigitalGovernance)
   ============================================================ */
export type DigitalConcept = { key: string; name: Bi; gloss: Bi; tension: Bi; accent: string };
export const DIGITAL_CONCEPTS: DigitalConcept[] = [
  { key: "evote", name: { en: "Blockchain voting", zh: "区块链投票" }, gloss: { en: "Tamper-evident ballots on a public ledger no official can quietly rewrite.", zh: "记于公开账本上、无官员能悄然改写的、可察觉篡改的选票。" }, tension: { en: "Verifiability vs. the secret ballot & coercion", zh: "可验证性 vs. 秘密投票与胁迫" }, accent: "#4f9fff" },
  { key: "liquid", name: { en: "Liquid democracy", zh: "流动民主" }, gloss: { en: "Vote directly on what you know; delegate the rest to someone you trust, revocably.", zh: "在你所懂之事上直接投票；把其余的、可撤回地委托给你信任的人。" }, tension: { en: "Flexibility vs. delegation cascades & power hubs", zh: "灵活性 vs. 委托的级联与权力枢纽" }, accent: "#3fd9c0" },
  { key: "dao", name: { en: "DAO governance", zh: "DAO 治理" }, gloss: { en: "Communities run real treasuries by token ballot, charters encoded in software.", zh: "社群以代币投票运营真实的金库，章程被编码进软件。" }, tension: { en: "Autonomy vs. plutocracy by token holding", zh: "自治 vs. 由持币量决定的财阀统治" }, accent: "#6fe6d2" },
  { key: "deliberation", name: { en: "Online deliberation", zh: "在线协商" }, gloss: { en: "Platforms surface consensus across deep disagreement among thousands.", zh: "平台在成千上万人的深刻分歧中，浮现出共识。" }, tension: { en: "Scale of voice vs. brigading & manipulation", zh: "声音的规模 vs. 刷屏操控" }, accent: "#7bb8ff" },
  { key: "ai", name: { en: "AI policy analysis", zh: "AI 政策分析" }, gloss: { en: "Models simulate a law's effects, translate, and summarize a million comments before a vote.", zh: "模型在投票前模拟一部法律的效果、翻译，并把一百万条评论加以摘要。" }, tension: { en: "Informed choice vs. automated manipulation", zh: "知情的选择 vs. 自动化的操纵" }, accent: "#a9d2ff" },
  { key: "id", name: { en: "Digital citizenship", zh: "数字公民身份" }, gloss: { en: "Verified digital identity makes continuous participation and services possible.", zh: "经验证的数字身份，让连续的参与与公共服务成为可能。" }, tension: { en: "Inclusion vs. surveillance & exclusion", zh: "普惠 vs. 监控与排斥" }, accent: "#e6b65c" },
];

// the console toggles between four ways the future could organize self-rule
export type GovMode = { key: string; name: Bi; logic: Bi; cost: Bi; accent: string };
export const GOV_MODES: GovMode[] = [
  { key: "continuous", name: { en: "Continuous direct", zh: "连续直接制" }, logic: { en: "Everyone votes on everything, in real time, through their devices.", zh: "每个人，透过自己的设备，实时地，对一切投票。" }, cost: { en: "Maximally participatory — but exhausting, volatile, and easy to flood with manipulation.", zh: "参与度达到极致——却令人疲惫、易变，且容易被操纵的洪水淹没。" }, accent: "#3fd9c0" },
  { key: "liquid", name: { en: "Liquid delegation", zh: "流动委托制" }, logic: { en: "You vote where you have knowledge and delegate the rest, changing your mind anytime.", zh: "你在你有知识之处投票，并委托其余，随时可以改变主意。" }, cost: { en: "Combines expertise with control — if delegation does not quietly concentrate in a few hubs.", zh: "把专业与掌控结合——只要委托不悄然集中到少数枢纽之中。" }, accent: "#4f9fff" },
  { key: "assisted", name: { en: "AI-assisted representative", zh: "AI 辅助代议制" }, logic: { en: "Humans still decide, but models forecast consequences and surface what no one could read.", zh: "仍由人类决定，但模型预测后果，并揭示无人读得完之事。" }, cost: { en: "Better-informed judgment — if the models are auditable and not quietly steering the answer.", zh: "更知情的判断——只要模型可被审计，且未在悄然引导那个答案。" }, accent: "#7bb8ff" },
  { key: "automated", name: { en: "Algorithmic governance", zh: "算法治理" }, logic: { en: "Rules encoded as code execute and adjust policy automatically against set targets.", zh: "编码为代码的规则，对照既定目标，自动执行并调整政策。" }, cost: { en: "Fast and consistent — but who sets the targets, and where is the room for appeal?", zh: "迅速而一致——但谁来设定那些目标，而上诉的余地，又在何处？" }, accent: "#e6b65c" },
];

/* ============================================================
   SECTION 9 — FUTURE GOVERNANCE: SCALES + FUTURES (FutureGov)
   ============================================================ */
export type GovScale = { key: string; name: Bi; reach: Bi; mechanism: Bi; accent: string };
export const GOVERNANCE_SCALES: GovScale[] = [
  { key: "band", name: { en: "Band", zh: "群落" }, reach: { en: "~10²", zh: "约10²人" }, mechanism: { en: "Face-to-face consensus among kin.", zh: "血亲之间面对面的共识。" }, accent: "#7986a6" },
  { key: "city", name: { en: "City-state", zh: "城邦" }, reach: { en: "~10⁴–10⁵", zh: "约10⁴–10⁵人" }, mechanism: { en: "Assembly, lot, and direct voting.", zh: "公民大会、抽签与直接投票。" }, accent: "#95a2c2" },
  { key: "nation", name: { en: "Nation-state", zh: "民族国家" }, reach: { en: "~10⁶–10⁹", zh: "约10⁶–10⁹人" }, mechanism: { en: "Representation, constitutions, mass parties.", zh: "代表制、宪法、大众政党。" }, accent: "#4f9fff" },
  { key: "network", name: { en: "Digital network", zh: "数字网络" }, reach: { en: "~10⁹", zh: "约10⁹人" }, mechanism: { en: "Platforms, deliberation tools, liquid delegation.", zh: "平台、协商工具、流动委托。" }, accent: "#3fd9c0" },
  { key: "planet", name: { en: "Planetary", zh: "行星级" }, reach: { en: "~10¹⁰", zh: "约10¹⁰人" }, mechanism: { en: "Treaties and AI-assisted coordination — mostly unbuilt.", zh: "条约与 AI 辅助的协调——大多尚未建成。" }, accent: "#e6b65c" },
];

export type Future = { name: Bi; horizon: Bi; desc: Bi; accent: string };
export const FUTURES: Future[] = [
  { name: { en: "AI-assisted policymaking", zh: "AI 辅助决策" }, horizon: { en: "near", zh: "近期" }, desc: { en: "Models that simulate a policy's effects, surface trade-offs, and summarize public input before a vote.", zh: "在投票前，就模拟一项政策的效果、揭示其权衡、并把公众意见加以摘要的模型。" }, accent: "#4f9fff" },
  { name: { en: "Decentralized autonomous societies", zh: "去中心化自治社会" }, horizon: { en: "emerging", zh: "新兴" }, desc: { en: "Communities that encode their charter and treasury in software and govern by transparent vote.", zh: "把章程与金库编码进软件、并以透明投票治理的社群。" }, accent: "#3fd9c0" },
  { name: { en: "Real-time citizen coordination", zh: "实时公民协调" }, horizon: { en: "emerging", zh: "新兴" }, desc: { en: "Continuous deliberation and feedback between the governed and those who govern.", zh: "被治理者与治理者之间，连续不断的协商与反馈。" }, accent: "#6fe6d2" },
  { name: { en: "Global digital constitutions", zh: "全球数字宪法" }, horizon: { en: "speculative", zh: "推想" }, desc: { en: "Shared, machine-readable rights frameworks for platforms and problems that span every border.", zh: "为跨越一切边界的平台与问题而设的、共享且机器可读的权利框架。" }, accent: "#7bb8ff" },
  { name: { en: "Planetary consensus systems", zh: "行星级共识系统" }, horizon: { en: "needed", zh: "亟需" }, desc: { en: "Legitimate, binding decision-making for climate, pandemics, and AI — above the nation.", zh: "针对气候、疫情与人工智能的、合法且有约束力的决策——在民族之上。" }, accent: "#e6b65c" },
  { name: { en: "Governance of artificial agents", zh: "人工智能体的治理" }, horizon: { en: "open", zh: "未决" }, desc: { en: "Keeping human consent and mercy central when machines act faster than any assembly can meet.", zh: "当机器的行动快过任何集会所能召开，如何把人的同意与怜悯留在中心。" }, accent: "#a9d2ff" },
];

/* ============================================================
   SECTION 10 — UNIFIED: COORDINATION SCALE + BIG QUESTIONS
   how many minds can be coordinated under each system (log scale)
   ============================================================ */
export type CoordEntity = { name: Bi; count: number; gloss: Bi; accent: string };
export const COORD_ENTITIES: CoordEntity[] = [
  { name: { en: "Band consensus", zh: "群落共识" }, count: 150, gloss: { en: "The Dunbar ceiling — agreement by face and memory alone.", zh: "邓巴上限——仅凭面孔与记忆的同意。" }, accent: "#7986a6" },
  { name: { en: "Tribal council", zh: "部落议事会" }, count: 5000, gloss: { en: "Elders and assemblies extend decision past the family.", zh: "长老与集会，把决定延伸到家庭之外。" }, accent: "#95a2c2" },
  { name: { en: "City assembly", zh: "城邦大会" }, count: 50000, gloss: { en: "Direct voting works while everyone can fit in one space.", zh: "只要所有人能挤进同一个空间，直接投票便奏效。" }, accent: "#3fd9c0" },
  { name: { en: "Republic with representation", zh: "有代表制的共和" }, count: 5000000, gloss: { en: "Electing the few to decide for the many breaks the size limit.", zh: "选出少数替多数决定，打破了规模的上限。" }, accent: "#6fe6d2" },
  { name: { en: "Constitutional nation", zh: "宪政民族" }, count: 300000000, gloss: { en: "Rights, courts, and institutions bind hundreds of millions under one self-rule.", zh: "权利、法院与制度，把数亿人约束在同一套自治之下。" }, accent: "#4f9fff" },
  { name: { en: "Networked & planetary", zh: "联网与行星级" }, count: 8000000000, gloss: { en: "Digital coordination could, in principle, reach the whole species — if it can be made legitimate.", zh: "数字协调，原则上可触及整个物种——只要它能被赋予合法性。" }, accent: "#a9d2ff" },
];

export type BigQ = { q: Bi; lens: Bi };
export const BIG_QUESTIONS: BigQ[] = [
  { q: { en: "Can a crowd be wiser than its smartest member?", zh: "一个群体，能比它最聪明的成员更有智慧吗？" }, lens: { en: "Collective intelligence vs. the madness of crowds.", zh: "集体智能 vs. 群体的疯狂。" } },
  { q: { en: "Is there any fair way to add up preferences?", zh: "存在任何公平地加总偏好的方式吗？" }, lens: { en: "Arrow's theorem and the limits of social choice.", zh: "阿罗定理，与社会选择的极限。" } },
  { q: { en: "Can democracy survive without shared facts?", zh: "没有共享的事实，民主能幸存吗？" }, lens: { en: "The information layer as democracy's hidden foundation.", zh: "信息层，作为民主隐藏的地基。" } },
  { q: { en: "Can political equality survive economic inequality?", zh: "政治的平等，能在经济的不平等中幸存吗？" }, lens: { en: "One person, one vote vs. one dollar, one voice.", zh: "一人一票 vs. 一元一声。" } },
  { q: { en: "Can there be planetary democracy without a planetary people?", zh: "没有行星级的人民，能有行星级的民主吗？" }, lens: { en: "Legitimacy above the nation-state — mostly unsolved.", zh: "民族国家之上的合法性——大体仍未解决。" } },
  { q: { en: "What does self-rule become when machines decide faster than we can meet?", zh: "当机器决定的速度快过我们集会的速度，自治会变成什么？" }, lens: { en: "Keeping human judgment central in an automated age.", zh: "在一个自动化的时代，把人的判断留在中心。" } },
];

/* ============================================================
   META-MODEL — THE SEVEN TERMS OF DEMOCRATIC STABILITY (DemocracyModel)
   each term scored across four governance profiles
   ============================================================ */
export type Pillar = { sym: string; name: Bi; gloss: Bi; tribal: number; mass: number; fragile: number; networked: number };
export const PILLARS: Pillar[] = [
  { sym: "P", name: { en: "Participation", zh: "参与" }, gloss: { en: "How widely those affected take part in the decisions that bind them.", zh: "被影响者，在多大范围内参与那些约束他们的决定。" }, tribal: 70, mass: 72, fragile: 45, networked: 88 },
  { sym: "L", name: { en: "Legitimacy", zh: "合法性" }, gloss: { en: "How far the governed accept the authority as rightful and obey freely.", zh: "被治理者在多大程度上接受权威为正当、并自由地服从。" }, tribal: 65, mass: 85, fragile: 35, networked: 70 },
  { sym: "I", name: { en: "Information quality", zh: "信息质量" }, gloss: { en: "Whether citizens share a reliable, common picture of reality.", zh: "公民是否共享一幅可靠的、共同的现实图景。" }, tribal: 55, mass: 75, fragile: 30, networked: 50 },
  { sym: "T", name: { en: "Institutional trust", zh: "制度信任" }, gloss: { en: "Offices, courts, and procedures that outlive and bind the people in them.", zh: "比身处其中的人活得更久、并约束他们的职位、法院与程序。" }, tribal: 30, mass: 82, fragile: 38, networked: 60 },
  { sym: "D", name: { en: "Power distribution", zh: "权力分布" }, gloss: { en: "How widely power is split so no single faction can hold all of it.", zh: "权力被分割得多广，好让没有单一派系能握住它的全部。" }, tribal: 60, mass: 80, fragile: 40, networked: 72 },
  { sym: "C", name: { en: "Conflict resolution", zh: "冲突解决" }, gloss: { en: "Peaceful, binding ways to settle disagreement and transfer power.", zh: "和平、有约束力地了结分歧、并移交权力的方式。" }, tribal: 50, mass: 84, fragile: 32, networked: 66 },
  { sym: "K", name: { en: "Coordination capacity", zh: "协调能力" }, gloss: { en: "How many minds the system can turn into one coherent decision.", zh: "系统能把多少心智，转化为一个连贯的决定。" }, tribal: 25, mass: 80, fragile: 42, networked: 90 },
];

export type Profile = { key: "tribal" | "mass" | "fragile" | "networked"; name: Bi; accent: string };
export const PROFILES: Profile[] = [
  { key: "tribal", name: { en: "Tribal council", zh: "部落议事" }, accent: "#7986a6" },
  { key: "mass", name: { en: "Mass democracy", zh: "大众民主" }, accent: "#4f9fff" },
  { key: "fragile", name: { en: "Fragile / failing state", zh: "脆弱／失败国家" }, accent: "#cf9b3f" },
  { key: "networked", name: { en: "Networked / future", zh: "联网／未来" }, accent: "#3fd9c0" },
];

/* ============================================================
   RECURSIVE DEMOCRACY ENGINE — one move, every scale
   (the capstone: many minds → a legitimate collective decision, repeated up the ladder)
   ============================================================ */
export type RecursionLayer = { k: string; name: Bi; scale: Bi; move: Bi; color: string };
export const RECURSION_LAYERS: RecursionLayer[] = [
  { k: "council", name: { en: "Tribal council", zh: "部落议事会" }, scale: { en: "~10² · kin", zh: "约10² · 血亲" }, move: { en: "A few dozen talk until the group leans one way; consensus held by faces and memory.", zh: "几十口人把话说到群体倾向某一边；共识由面孔与记忆维系。" }, color: "#7986a6" },
  { k: "assembly", name: { en: "City assembly", zh: "城邦大会" }, scale: { en: "~10⁴ · city", zh: "约10⁴ · 城市" }, move: { en: "Citizens vote directly and serve by lot — direct rule, while everyone still fits in one space.", zh: "公民直接投票、抽签任职——直接之治，趁所有人还挤得进同一个空间。" }, color: "#95a2c2" },
  { k: "republic", name: { en: "Representation", zh: "代表制" }, scale: { en: "~10⁶ · republic", zh: "约10⁶ · 共和" }, move: { en: "Electing the few to decide for the many breaks the size limit; the vote scales past the room.", zh: "选出少数替多数决定，打破规模的上限；投票，越出了那个房间。" }, color: "#3fd9c0" },
  { k: "const", name: { en: "Constitution", zh: "宪法" }, scale: { en: "~10⁸ · nation", zh: "约10⁸ · 民族" }, move: { en: "Power is split and bound on paper; a temporary majority is kept from becoming a permanent master.", zh: "权力在纸面上被分割、约束；一个暂时的多数，被阻止变成永久的主人。" }, color: "#4f9fff" },
  { k: "mass", name: { en: "Mass media society", zh: "大众媒体社会" }, scale: { en: "10⁸ · the public", zh: "10⁸ · 公众" }, move: { en: "A shared information layer lets millions reason about the same reality at once — for good and ill.", zh: "一个共享的信息层，让千百万人同时就同一个现实进行推理——福祸皆然。" }, color: "#7bb8ff" },
  { k: "digital", name: { en: "Digital participation", zh: "数字参与" }, scale: { en: "10⁹ · platforms", zh: "10⁹ · 平台" }, move: { en: "The cost of consulting collapses; deliberation, delegation, and code begin to reshape the vote.", zh: "征询的成本坍塌；协商、委托与代码，开始重塑投票。" }, color: "#6fe6d2" },
  { k: "ai", name: { en: "AI-assisted governance", zh: "AI 辅助治理" }, scale: { en: "agents · models", zh: "智能体 · 模型" }, move: { en: "Machines model consequences and read what no human could — judgment partly handed to code.", zh: "机器模拟后果、读取无人读得完之事——判断被部分地交给代码。" }, color: "#a9d2ff" },
  { k: "dao", name: { en: "Decentralized networks", zh: "去中心化网络" }, scale: { en: "trustless · ledgers", zh: "无需信任 · 账本" }, move: { en: "Charters in software, treasuries by token vote — self-rule without a head office, or a head of state.", zh: "章程在软件中、金库靠代币投票——没有总部、也没有元首的自治。" }, color: "#e6b65c" },
  { k: "planet", name: { en: "Planetary coordination", zh: "行星级协调" }, scale: { en: "10¹⁰ · the species", zh: "10¹⁰ · 整个物种" }, move: { en: "Legitimate, binding decisions above the nation for problems that respect no border — mostly unbuilt.", zh: "为不尊重边界的问题，作出民族之上的、合法且有约束力的决定——大多尚未建成。" }, color: "#b8c2dc" },
  { k: "civ", name: { en: "Civilizational coordination", zh: "文明级协调" }, scale: { en: "the coordination layer", zh: "协调层本身" }, move: { en: "The same move, all the way up: turn the dispersed intelligence of many minds into one legitimate, correctable decision.", zh: "同一个动作，一路向上：把众多心智那分散的智能，转化为一个合法、可纠正的决定。" }, color: "#f6dfae" },
];
