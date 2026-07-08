/* =========================================================
   Lightweight i18n for the site (EN default, KR translation)
   - Every element with [data-i18n="key"] gets its Korean
     innerHTML from the dictionary below when lang = "ko".
   - The English version is the original HTML already in the
     page, cached on first load (so we only maintain Korean here).
   - Selected language is kept in sessionStorage: it defaults to English
     on every fresh visit, and a switch to Korean (via the toggle or the
     /kr entry page) lasts only for the current browsing session.
   ========================================================= */
(function () {
  "use strict";

  const STORAGE_KEY = "lang";

  const KO = {
    /* ---- Navbar ---- */
    "nav.home": "홈",
    "nav.publications": "논문",
    "nav.eai": "E-AI 프로젝트",
    "nav.projects": "프로젝트",

    /* ---- Home: profile ---- */
    "home.subtitle": "서던캘리포니아대학교(USC) 인공지능(AI) 석사과정 재학",
    "home.address": "미국 캘리포니아주 로스앤젤레스",

    /* ---- Home: bio ---- */
    "bio.p1": "안녕하세요, 다니엘입니다. 저는 서던캘리포니아대학교(USC)에서 <strong>딥러닝 기초 이론과 LLM 최적화</strong>를 연구하고 있는 인공지능(AI) 석사과정 1년차 학생입니다. 감사하게도 USC의 <a href=\"https://spkreddy.org/\">Sai Praneeth Karimireddy 교수님</a>과 <a href=\"https://vatsalsharan.github.io/\">Vatsal Sharan 교수님</a>의 지도를 받고 있으며, 인하대학교(대한민국)의 <a href=\"https://sites.google.com/view/sunwoolee/home\">이선우 교수님</a>과도 긴밀히 협력하고 있습니다.",
    "bio.p2": "대규모 언어 모델(LLM)을 비롯한 최근 AI의 발전은 대부분 모델의 규모를 키우는 스케일링에 기대어 왔지만, 그만큼 막대한 연산량과 메모리 비용을 동반합니다. 이러한 문제의식은 제 연구의 핵심을 이루는 보다 근본적인 질문으로 이어집니다.",
    "bio.rq": "현대의 신경망이 본질적으로 과도하게 매개변수화되어 있고 연산적으로도 중복이 많다는 점을 고려할 때, 우리는 이를 어떻게 구조적·연산적으로 최적인 시스템으로 변모시킬 수 있을까?",
    "bio.p3": "그래서 제 연구는 신경망이 데이터를 더 가볍고 빠르게, 그리고 더 효율적으로 학습할 수 있도록 최적화·일반화·모델 압축 기법을 개선하는 데 초점을 두고 있습니다.",
    "bio.interests_label": "주요 연구 관심사",
    "bio.int0": "효율적이고 견고한 멀티 에이전트",
    "bio.int1": "효율적인 LLM 최적화 및 추론(reasoning)",
    "bio.int2": "신경망의 효율적·효과적인 최적화 및 학습 동역학",
    "bio.int3": "모델 프루닝, 양자화, 압축 기법",
    "bio.int4": "딥러닝 기초 이론",
    "bio.affil_label": "현재 소속",
    "bio.affil1": "서던캘리포니아대학교 FoRT-ML 그룹 (<a href=\"https://spkreddy.org/group/\">USC FoRT-ML Group</a>)",
    "bio.affil_cmal": "서울대학교 컴퓨팅·메모리 아키텍처 연구실, 방문 (<a href=\"https://cmalab.snu.ac.kr/\">CMAL</a>)",
    "bio.affil2": "인하대학교 대규모 머신러닝 시스템 연구실 (<a href=\"https://sites.google.com/view/lmls-lab\">LMLS</a>)",

    /* ---- Home: section headings ---- */
    "edu.h": "학력",
    "news.h": "최근 소식",
    "svc.h": "학술 활동",
    "awards.h": "수상 내역",

    /* ---- Home: education ---- */
    "edu.t1": "박사 과정 — 2027년 가을학기 입학 지원 중",
    "edu.d1": "컴퓨터과학 · 전기·컴퓨터공학 · 데이터 사이언스<br>효율적 ML, LLM 압축, 최적화, 딥러닝(AI) 기초",
    "edu.t0": "서울대학교",
    "edu.d0": "방문 연구원 · <a href=\"https://cmalab.snu.ac.kr/\">컴퓨팅·메모리 아키텍처 연구실(CMAL)</a> · 효율적 LLM을 위한 KV-cache 압축<br>지도교수: <a href=\"https://scholar.google.com/citations?user=__waCuYAAAAJ&hl=en\">유승주 교수님</a>",
    "edu.t2": "서던캘리포니아대학교(USC)",
    "edu.d2": "인공지능 이학석사(컴퓨터과학)<br>지도교수: <a href=\"https://spkreddy.org/\">Sai Praneeth Karimireddy 교수님</a>, <a href=\"https://vatsalsharan.github.io/\">Vatsal Sharan 교수님</a>",
    "edu.t3": "뉴욕주립대학교 스토니브룩 캠퍼스",
    "edu.d3": "컴퓨터과학(AI 전공) · 응용수학 복수전공 이학사 · 병역으로 2년 휴학<br>지도교수: <a href=\"https://chaochen.github.io/index.html\">Chao Chen 교수님</a>",

    /* ---- Buttons ---- */
    "btn.showmore": "더 보기",
    "btn.showless": "접기",

    /* ---- Publications page ---- */
    "pub.h": "논문",
    "pub.note": "* 공동 제1저자",
    "theme.selected": "대표 논문",
    "theme.mc": "모델 압축",
    "theme.agent": "에이전트",
    "theme.opt": "최적화",
    "theme.others": "기타",

    /* ---- E-AI Project page ---- */
    "eai.hero_badge": "E-AI · 효율적 인공지능",
    "eai.hero_title": "효율적이고 견고한 AI 시스템 프로젝트",
    "eai.hero_tag": "1초가 중요한 순간, 사람 곁에 설 수 있는 가볍고 빠르며 믿을 수 있는 AI를 만듭니다.",
    "eai.vision_h": "왜 E-AI인가?",
    "eai.vision_p1": "현대 인공지능은 강력하지만 너무 무겁습니다. 최첨단 모델은 거대하고 추론이 느려서 아직 인간의 직관을 따라가지 못하며, 촌각을 다투는 위급한 상황에서 믿고 쓰기에는 여전히 너무 느리고 부정확합니다.",
    "eai.vision_p2": "현장에서 믿고 쓸 수 있는 AI를 가로막는 두 가지 장벽이 있습니다. 하나하나의 모델은 정작 필요한 곳에서 구동하기엔 너무 크고 느리며, 여러 모델이나 에이전트가 함께 일할 때는 단 하나의 결함 있거나 적대적인 구성원이 시스템 전체를 조용히 무너뜨릴 수 있습니다. <strong>E-AI</strong>는 이 두 가지를 동시에 공략합니다 — 모든 모델을 가볍고 빠르게 만들고, 일부가 실패하더라도 에이전트 집단이 신뢰성을 유지하도록 합니다.",
    "eai.vision_p3": "저는 이를 위해 <strong>E-AI(Efficient-AI)</strong> 프로젝트를 시작했습니다. 재해 상황에서 사람을 보조하고, 위험한 사고에 신속하고 정확하게 대처할 수 있는 — 가볍지만 강력한 인공지능을 만드는 것이 목표입니다.",
    "eai.vision_quote": "E-AI는 제 모든 연구를 관통하는 가장 큰 테마이며, 제가 진행하는 모든 연구는 이를 실현하기 위한 한 걸음입니다.",
    "eai.research_h": "E-AI를 향한 연구",
    "eai.research_sub": "이 연구는 두 갈래로 나뉩니다. 하나는 개별 에이전트가 실패하더라도 LLM 에이전트 집단이 견고함을 유지하도록 만들고, 다른 하나는 모델 자체를 — 그 강력함을 잃지 않으면서 — 더 작고 빠르게 만듭니다.",
    "eai.track1": "견고한 멀티에이전트 시스템",
    "eai.track2": "효율적 모델과 압축",
    "eai.readpaper": "논문 보기 →",
    "eai.cite_h": "인용 · BibTeX",
    "eai.copy": "복사",
    "eai.c0_t": "Robust Multi-Agent LLMs under Byzantine Faults",
    "eai.c0_d": "여러 LLM 에이전트가 네트워크로 협력할 때, 신뢰할 수 없거나 적대적인 소수의 '비잔틴(Byzantine)' 에이전트가 나머지를 잘못된 결론으로 유도해 집단의 답을 오염시킬 수 있습니다. Self-Anchored Consensus(SAC)는 완전히 분산된 필터-정제 프로토콜로, 에이전트들이 서로의 메시지를 반복적으로 교환·평가·필터링합니다 — 적대적 공격 속에서도 정직한 에이전트들이 신뢰할 수 있는 정보를 계속 전파하도록 보장하는 그래프 조건을 함께 제시합니다.",
    "eai.c1_t": "Ghosted Layers: 레이어가 제거된 LLM 복원",
    "eai.c1_d": "레이어 프루닝은 트랜스포머 블록을 통째로 제거해 LLM을 줄이지만, 프루닝 경계에서 활성값 불일치가 생겨 성능이 떨어집니다. Ghosted Layers는 학습이 필요 없는 모듈로, 닫힌 형태(closed-form)의 활성값 정렬 문제를 풀어 손실된 정보를 복원합니다 — 프루닝의 속도 이점은 유지하면서 정확도를 되살립니다.",
    "eai.c2_t": "Locality-Aware Redundancy Pruning (LoRP)",
    "eai.c2_d": "LLM 내부에서 중복이 어디에 존재하는지는 아키텍처마다 다릅니다 — 국소적으로 모이기도 하고 전역적으로 퍼지기도 합니다(예: Llama vs. Qwen). LoRP는 레이어 간 유사도를 측정해 Representation Locality Score를 계산하고, 획일적인 규칙 대신 모델 고유의 중복 구조에 맞춰 프루닝합니다.",
    "eai.c3_t": "Weight Concentration Regularization (WCR)",
    "eai.c3_d": "높은 희소성에서는 중요한 가중치가 넓게 퍼져 있어 단순 프루닝이 정확도를 무너뜨립니다. WCR은 학습 단계의 정규화로 모델의 에너지를 소수의 중요한 파라미터에 집중시켜, 크기 기반 프루닝이 나머지를 안전하게 제거하도록 합니다 — 고희소성 압축에 훨씬 강건해집니다.",
    "eai.c4_t": "Rethinking Layer Redundancy: 탐색보다 보정(calibration)",
    "eai.c4_d": "대부분의 깊이 프루닝 기법은 제거할 레이어를 찾기 위해 정교한 탐색 알고리즘에 집중합니다. 하지만 우리는 그 반대를 보입니다 — 동일한 보정 집합에서는 복잡한 탐색이 단순한 one-shot 프루닝과 거의 차이가 없으며, 어떤 레이어가 중복인지를 실제로 좌우하는 것은 보정 구성입니다. 탐색보다 데이터를 우선하라는 제언입니다."
  };

  const original = new WeakMap();

  function cacheOriginals() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!original.has(el)) original.set(el, el.innerHTML);
    });
  }

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (lang === "ko" && KO[key] != null) {
        el.innerHTML = KO[key];
      } else if (original.has(el)) {
        el.innerHTML = original.get(el);
      }
    });

    // The button shows the language you can switch TO, in that language.
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = lang === "ko" ? "English" : "한국어";
    }

    document.dispatchEvent(new CustomEvent("i18nchange", { detail: { lang: lang } }));
  }

  function getLang() {
    return document.documentElement.getAttribute("lang") === "ko" ? "ko" : "en";
  }

  function init() {
    cacheOriginals();
    // Language is kept per session only, so a fresh visit always defaults to
    // English. Korean (via the toggle or the /kr entry) lasts for the current
    // browsing session and resets to English on the next visit.
    var saved = "en";
    try { saved = sessionStorage.getItem(STORAGE_KEY) || "en"; } catch (e) {}
    apply(saved);

    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const lang = getLang() === "ko" ? "en" : "ko";
        try { sessionStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        apply(lang);
      });
    }
  }

  // Expose current language helper for other inline scripts (e.g. news toggle).
  window.siteLang = getLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* =========================================================
   Mobile navigation: hamburger -> slide-in drawer
   ========================================================= */
(function () {
  "use strict";

  function initNav() {
    const ham = document.getElementById("nav-hamburger");
    const links = document.getElementById("nav-links");
    if (!ham || !links) return;

    let overlay = document.querySelector(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
    }

    function close() {
      links.classList.remove("open");
      overlay.classList.remove("show");
      document.body.classList.remove("nav-open");
      ham.setAttribute("aria-expanded", "false");
    }

    function toggle() {
      const open = links.classList.toggle("open");
      overlay.classList.toggle("show", open);
      document.body.classList.toggle("nav-open", open);
      ham.setAttribute("aria-expanded", open ? "true" : "false");
    }

    ham.addEventListener("click", toggle);
    overlay.addEventListener("click", close);

    // Close after tapping a nav link (but not the language toggle).
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    // Reset the drawer if the viewport grows back to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();
