/* =========================================================
   Lightweight i18n for the site (EN default, KR translation)
   - Every element with [data-i18n="key"] gets its Korean
     innerHTML from the dictionary below when lang = "ko".
   - The English version is the original HTML already in the
     page, cached on first load (so we only maintain Korean here).
   - Selected language is stored in localStorage and shared
     across all pages.
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
    "bio.affil1": "서던캘리포니아대학교 이론 그룹 (<a href=\"https://viterbi-web.usc.edu/~cstheory/\">USC CS Theory Group</a>)",
    "bio.affil2": "인하대학교 대규모 머신러닝 시스템 연구실 (<a href=\"https://sites.google.com/view/lmls-lab\">LMLS</a>)",

    /* ---- Home: section headings ---- */
    "edu.h": "학력",
    "news.h": "최근 소식",
    "svc.h": "학술 활동",
    "awards.h": "수상 내역",

    /* ---- Home: education ---- */
    "edu.t1": "[박사] 2027년 가을학기 박사과정 입학 지원 중",
    "edu.d1": "컴퓨터과학 · 전기공학 · 컴퓨터공학<br>관심 연구 분야: 딥러닝(AI) 기초, LLM 압축, 최적화 및 추론",
    "edu.t0": "[방문 연구원] 서울대학교, 서울, 대한민국 (2026.05 – 2026.08)",
    "edu.d0": "컴퓨팅·메모리 아키텍처 연구실(CMAL)<br>지도교수: 유성주 교수님 (박사과정 임우상 연구원과 협업)<br>연구 분야: 효율적인 LLM 시스템 — 긴 컨텍스트 추론을 위한 KV-cache 압축·양자화·프루닝",
    "edu.t2": "[석사] 서던캘리포니아대학교, 로스앤젤레스, CA (2025.08 – 2027.05)",
    "edu.d2": "인공지능 이학석사(컴퓨터과학)<br>지도교수: <a href=\"https://spkreddy.org/\">Sai Praneeth Karimireddy 교수님</a>, <a href=\"https://www.vatsalsharan.com/\">Vatsal Sharan 교수님</a>",
    "edu.t3": "[학사] 스토니브룩대학교, 스토니브룩, NY (2018.01 – 2025.05)",
    "edu.d3": "컴퓨터과학 이학사(AI 세부전공, 제1전공)<br>응용수학·통계학 이학사(제2전공)<br>지도교수: <a href=\"https://chaochen.github.io/index.html\">Chao Chen 교수님</a><br>대한민국 병역 이행으로 인한 2년 휴학",

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

    /* ---- EAI Project page ---- */
    "eai.h": "E-AI 프로젝트",
    "eai.intro": "<strong>E-AI</strong>에서 진행한 프로젝트 모음입니다. 상세 내용과 링크는 추후 추가될 예정입니다.",
    "eai.ptitle": "프로젝트 제목",
    "eai.pdesc": "프로젝트의 목표와 맡은 역할을 한두 문장으로 설명합니다."
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
      langBtn.textContent = lang === "ko" ? "영어" : "한국어";
    }

    document.dispatchEvent(new CustomEvent("i18nchange", { detail: { lang: lang } }));
  }

  function getLang() {
    return document.documentElement.getAttribute("lang") === "ko" ? "ko" : "en";
  }

  function init() {
    cacheOriginals();
    const saved = localStorage.getItem(STORAGE_KEY) || "en";
    apply(saved);

    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const lang = getLang() === "ko" ? "en" : "ko";
        localStorage.setItem(STORAGE_KEY, lang);
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
