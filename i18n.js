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
    "nav.gallery": "갤러리",
    "nav.contact": "연락처",
    "nav.game": "게임",
    "nav.projects": "프로젝트",

    /* ---- Home: profile ---- */
    "home.role": "연구자 | 효율적 머신러닝",
    "home.subtitle": "서던캘리포니아대학교(USC) 컴퓨터과학 석사과정 재학",
    "home.address": "미국 캘리포니아주 로스앤젤레스",

    /* ---- Contact ---- */
    "contact.kicker": "연락 안내",
    "contact.title": "연락처",
    "contact.intro": "문의는 아래 이메일로 연락해 주세요.",
    "contact.email_label": "이메일",
    "contact.email_note": "가장 빠르고 정확하게 연락하실 수 있는 방법입니다.",
    "contact.call_title": "이메일 연락을 선호합니다",
    "contact.call_body": "이메일은 제가 가장 선호하는 연락 방법입니다. 미팅 중이거나 예정된 일정을 진행할 때는 전화를 받기 어려울 수 있어, 이메일로 내용을 보내주시면 충분히 확인한 뒤 필요한 경우 편한 통화 시간을 정할 수 있습니다. 너른 양해에 감사드립니다.",
    "contact.coffee_title": "Coffee Chat",
    "contact.coffee_body": "USC 또는 Stony Brook 입학 예정 학생분들의 Coffee Chat 요청을 환영합니다. 다른 학교 학생분들과의 만남도 언제든 환영합니다. 서로 편한 시간을 정할 수 있도록 사전에 이메일로 연락해 주세요.",

    /* ---- Gallery ---- */
    "gallery.issue": "연구 여정 · 첫 번째 기록",
    "gallery.kicker": "사진으로 남긴 연구 여정",
    "gallery.title": "연구와 함께,<br><em>세계를 걷다.</em>",
    "gallery.intro": "논문을 발표하고, 동료 연구자들과 이야기하고, 새로운 도시를 걸었던 순간들을 한데 모았습니다.",
    "gallery.cover_note": "2024년 요코하마와 시애틀에서 시작한 여정은 2026년 바르셀로나와 서울로 이어졌습니다. 장소는 달라도 목표는 같았습니다. 더 가볍고 빠르며 신뢰할 수 있는 AI를 만드는 일입니다.",
    "gallery.contents_kicker": "목차",
    "gallery.contents_title": "여정 한눈에 보기",
    "gallery.contents_note": "최근 일정부터 시간순으로 정리했습니다.",
    "gallery.date_icml26": "서울 · 2026년 7월",
    "gallery.date_icassp26": "바르셀로나 · 2026년 5월",
    "gallery.date_fort26": "로스앤젤레스 · 2026년 봄",
    "gallery.date_neurips25": "샌디에이고 · 2025년 12월",
    "gallery.date_aaai25": "필라델피아 · 2025년 3월",
    "gallery.date_bigdata24": "워싱턴 D.C. · 2024년 12월",
    "gallery.date_esa24": "영국 · 2024년 9월",
    "gallery.date_ijcnn24": "요코하마 · 2024년 여름",
    "gallery.date_cvpr24": "시애틀 · 2024년 6월",
    "gallery.label_icml": "ICML 2026 · 코엑스",
    "gallery.label_icassp": "ICASSP 2026 · 본 학회",
    "gallery.label_neurips": "NeurIPS 2025 · OPT 워크숍",
    "gallery.label_aaai": "AAAI 2025 · 워크숍",
    "gallery.label_bigdata": "IEEE BigData 2024 · BPOD 워크숍",
    "gallery.label_ijcnn": "IJCNN 2024 · 구두 발표",
    "gallery.label_cvpr": "CVPR 2024 · CVMI 워크숍",
    "gallery.year26": "로스앤젤레스에서 연구하고, 바르셀로나에서 발표하고, 서울에서 협업했습니다. 효율적인 추론과 강건한 에이전트를 중심으로 연구의 폭을 넓힌 한 해였습니다.",
    "gallery.icml_title": "서울에서 보낸 연구의 여름",
    "gallery.icml_body": "2026년 여름에는 서울대학교 컴퓨팅·메모리 아키텍처 연구실에서 방문연구원으로 지내고 삼성전자에서 강의했습니다. 그 여정은 서울에서 열린 ICML로 이어졌습니다. 프루닝, 최적화, 강건한 멀티에이전트 시스템을 다룬 여러 연구를 한 자리에서 소개하며 E-AI 프로젝트의 방향을 함께 나눴습니다.",
    "gallery.cap_icml_poster": "여러 갈래의 연구를 한 자리에서 소개한 ICML 포스터 세션.",
    "gallery.cap_icml_group": "ICML 2026 · 서울",
    "gallery.cap_icml_floor": "코엑스에 마련된 ICML 현장.",
    "gallery.icassp_title": "바르셀로나에서 발표한 최적화 연구",
    "gallery.icassp_body": "ICASSP 2026에서는 ‘Sharpness-Aware Minimization with Z-Score Gradient Filtering’을 발표했습니다. USC GSG 출장 지원을 받아 참여했으며, 포스터 세션에서 최적화 연구를 신호처리 분야의 연구자들과 직접 나눌 수 있었습니다. 발표를 마친 뒤에는 바르셀로나 곳곳을 걸으며 여정을 기록했습니다.",
    "gallery.cap_icassp_poster": "연구 결과를 설명하고 질문을 주고받았던 포스터 세션.",
    "gallery.cap_between_sessions": "세션 사이, 바르셀로나를 걸으며.",
    "gallery.cap_cover": "ICASSP 2026 · 스페인 바르셀로나",
    "gallery.cap_sagrada": "사그라다 파밀리아 · 바르셀로나",
    "gallery.fort_title": "연구실 밖에서 쌓은 팀워크",
    "gallery.fort_body": "좋은 연구는 논문만으로 완성되지 않습니다. 함께 고민하고 솔직하게 의견을 나눌 수 있는 동료들이 있어야 합니다. FoRT-ML 구성원들과 함께한 봄 소풍과 볼링 모임은 연구실 밖에서 팀워크를 쌓은 시간이었습니다.",
    "gallery.cap_fort_picnic": "FoRT-ML 봄 소풍 · 2026",
    "gallery.cap_fort": "연구실 밖에서 함께한 FoRT-ML.",
    "gallery.interlude_label": "짧은 기록",
    "gallery.interlude": "“학회는 연구를 발표하는 자리이면서, 하나의 아이디어가 더 넓은 세상과 만나는 곳이기도 하다.”",
    "gallery.year25": "샌디에이고의 NeurIPS 워크숍과 필라델피아의 AAAI를 오가며 최적화 연구를 더 넓은 무대에서 소개했습니다.",
    "gallery.neurips_title": "포스터 앞에서 이어진 최적화 이야기",
    "gallery.neurips_body": "NeurIPS 2025 OPT 워크숍에서는 저정밀도 학습, Z-score 그래디언트 필터링, 자동 스케일 정규화에 관한 연구를 소개했습니다. 포스터 앞에서 오간 질문들은 방법의 가정과 한계를 다시 살펴보게 했고, 다음 연구 방향을 구체화하는 데 큰 도움이 됐습니다.",
    "gallery.cap_neurips_talk": "포스터 앞에서 질문과 의견을 나누던 순간.",
    "gallery.cap_neurips": "NeurIPS 2025 · 샌디에이고",
    "gallery.cap_inside_venue": "사람들로 가득한 NeurIPS 현장.",
    "gallery.aaai_title": "필라델피아에서 처음 만난 AAAI",
    "gallery.aaai_body": "AAAI 2025 워크숍에서는 skip-connected network의 학습을 빠르게 하는 그래디언트 정규화 방법인 ZNorm을 소개했습니다. 처음 참가한 AAAI에서 더 넓은 AI 연구자들과 의견을 나누고, 일정 사이에는 필라델피아의 역사적인 장소들도 둘러봤습니다.",
    "gallery.cap_aaai": "AAAI 2025 · 필라델피아",
    "gallery.cap_philadelphia": "학회 일정 사이에 둘러본 필라델피아.",
    "gallery.cap_old_new": "오랜 역사를 간직한 도시에서 새로운 질문을 떠올리다.",
    "gallery.year24": "최적화, 우주 AI, 신경망 프루닝, 의료영상까지 서로 다른 연구 주제로 네 번의 발표 무대에 올랐습니다.",
    "gallery.bigdata_title": "워싱턴에서 발표한 그래디언트 연구",
    "gallery.bigdata_body": "IEEE BigData 2024의 BPOD 워크숍에서는 깊은 잔차 신경망에서 발생하는 그래디언트 중첩과 이를 완화하는 정규화 방법을 발표했습니다. 기술적인 토론으로 하루를 채운 뒤, 겨울의 워싱턴 D.C.도 함께 기록했습니다.",
    "gallery.cap_bigdata_talk": "BPOD 워크숍에서 연구 내용을 발표하는 모습.",
    "gallery.cap_bigdata": "IEEE BigData 2024",
    "gallery.cap_washington": "미국 워싱턴 D.C.",
    "gallery.esa_title": "AI로 태양을 바라보다",
    "gallery.esa_body": "ESA SPAICE 2024에서는 컴퓨터 비전과 ARIMA-LSTM을 활용해 태양 코로나 홀을 분석하고 예측한 연구를 발표했습니다. 평소 다루던 모델 효율화에서 한 걸음 더 나아가, AI가 우주과학 문제에 어떻게 활용될 수 있는지 직접 이야기한 자리였습니다.",
    "gallery.cap_esa_talk": "태양 데이터를 활용한 AI 연구를 발표하는 모습.",
    "gallery.cap_london": "학회를 마친 뒤 둘러본 런던.",
    "gallery.ijcnn_title": "첫 국제 구두 발표",
    "gallery.ijcnn_body": "IJCNN 2024에서는 ‘Robust Neural Pruning with Gradient Sampling Optimization for Residual Neural Networks’를 구두 발표했습니다. 모델 압축 연구를 국제 학회 무대에서 처음 발표한 자리였고, 이후 연구 주제를 더 깊게 이어가겠다는 방향을 세운 계기가 됐습니다.",
    "gallery.cap_ijcnn": "IJCNN 2024 · 요코하마",
    "gallery.cap_ijcnn_talk": "IJCNN 2024 구두 발표 현장.",
    "gallery.cap_yokohama": "불빛이 켜진 밤의 요코하마.",
    "gallery.cvpr_title": "모델의 불확실성을 들여다보다",
    "gallery.cvpr_body": "CVPR 2024 CVMI 워크숍에서는 라벨이 없는 데이터를 활용한 종양 예측과 불확실성 추정 연구를 발표했습니다. 모델이 정답을 잘 맞히는 것뿐 아니라, 언제 자신의 예측을 확신하지 못하는지 파악하는 일도 신뢰할 수 있는 AI에 중요하다는 점을 다뤘습니다.",
    "gallery.cap_cvpr_poster": "CVMI 포스터 세션에서 의료영상 연구를 소개하는 모습.",
    "gallery.cap_cvpr": "CVPR 2024 · 시애틀",
    "gallery.cap_seattle": "학회 일정 사이에 걸어본 시애틀.",
    "gallery.endnote": "논문 한 편과 대화 한 번, 그리고 새로운 도시 하나씩. 연구의 기록은 계속됩니다.",

    /* ---- Home: bio ---- */
    "bio.p1": "안녕하세요, 다니엘입니다. 저는 서던캘리포니아대학교(USC) 컴퓨터과학 석사과정 2년차로, <strong>효율적 머신러닝</strong>과 <strong>효율적 멀티에이전트 시스템</strong>을 연구하고 있습니다. 감사하게도 <a href=\"https://spkreddy.org/\">Sai Praneeth Karimireddy 교수님</a>과 <a href=\"https://viterbi.usc.edu/directory/faculty/Annavaram/Murali\">Murali Annavaram 교수님</a>의 지도를 받고 있습니다.",
    "bio.more_button": "더 보기...",
    "bio.less_button": "접기...",
    "bio.more": "2026년 여름에는 <a href=\"https://scholar.google.com/citations?user=__waCuYAAAAJ&amp;hl=en\">유승주 교수님</a>의 지도 아래 <a href=\"https://cmalab.snu.ac.kr/\">서울대학교</a> 방문 연구원으로 연구했으며, 삼성전자에서 강사로 활동했습니다. 인하대학교의 <a href=\"https://sites.google.com/view/sunwoolee/home\">이선우 교수님</a>과 긴밀히 협력하고 있습니다.",
    "bio.p2": "대규모 언어 모델(LLM)을 비롯한 최근 AI의 발전은 대부분 모델의 규모를 키우는 스케일링에 기대어 왔지만, 그만큼 막대한 연산량과 메모리 비용을 동반합니다. 이러한 문제의식은 제 연구의 핵심을 이루는 보다 근본적인 질문으로 이어집니다.",
    "bio.rq": "신경망을 구조적으로, 그리고 계산적으로 최적화하려면 어떻게 해야 할까?",
    "bio.p3": "그래서 제 연구는 최적화, 일반화, 모델 압축 기법을 개선해 학습과 추론 전 과정에서 신경망을 더 가볍고 빠르며 효율적으로 만드는 데 초점을 두고 있습니다.",
    "bio.interests_label": "주요 연구 관심사",
    "bio.int0": "최적화 (학습 동역학)",
    "bio.int1": "효율적 머신러닝 및 멀티에이전트 시스템",
    "bio.affil_label": "현재 소속",
    "bio.affil1": "서던캘리포니아대학교 <a href=\"https://spkreddy.org/group/\">FoRT-ML Lab</a> 및 <a href=\"https://scip-lab.usc.edu/\">SCIP Lab</a>",
    "bio.affil2": "인하대학교 대규모 머신러닝 시스템 연구실 (<a href=\"https://lmls-lab.github.io/\">LMLS</a>)",

    /* ---- Home: section headings ---- */
    "edu.h": "학력",
    "news.h": "최근 소식",
    "news.date.aug26": "2026년 8월",
    "news.date.jul26": "2026년 7월",
    "news.date.jun26": "2026년 6월",
    "news.date.may26": "2026년 5월",
    "news.date.apr26": "2026년 4월",
    "news.date.mar26": "2026년 3월",
    "news.date.jan26": "2026년 1월",
    "news.date.nov25": "2025년 11월",
    "news.date.sep25": "2025년 9월",
    "news.date.jul25": "2025년 7월",
    "news.date.nov24": "2024년 11월",
    "news.date.sep24": "2024년 9월",
    "news.date.mar24": "2024년 3월",
    "news.item.output_aware": "<span class=\"news-label\">새 논문</span> Output-Aware Rotation for INT2 KV-Cache Quantization <a class=\"news-action\" href=\"https://arxiv.org/abs/2608.02691\" target=\"_blank\" rel=\"noopener noreferrer\">논문</a> <a class=\"news-github\" href=\"https://github.com/daniel-eai/Output-Aware-INT2-KV-Cache-Quantization\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"GitHub 저장소 열기\" title=\"GitHub 저장소\"><i class=\"fa-brands fa-github\" aria-hidden=\"true\"></i></a>",
    "news.item.samsung": "<span class=\"news-label\">삼성전자</span> 본사에서 강사로 멀티에이전트 시스템과 루프 엔지니어링 여름 강의를 진행합니다.",
    "news.item.snu": "<span class=\"news-label\">서울대학교</span> <a href=\"https://scholar.google.com/citations?user=__waCuYAAAAJ&amp;hl=en\">유승주 교수님</a>의 지도 아래 컴퓨팅·메모리 아키텍처 연구실에 방문연구원으로 합류했습니다.",
    "news.item.lg_chicago": "<span class=\"news-label\">LG · 공식 초청</span> Efficient AI 논의를 위한 공식 초청 대상자로 선발되어 시카고를 방문하며, 모든 출장 경비를 지원받습니다. CTO와의 만찬을 통해 LG의 AI 비전과 장기적인 목표를 직접 듣고 의견을 나눌 예정입니다.",
    "news.item.emnlp26": "<span class=\"news-label\">EMNLP 2026 Main</span> 제1저자로 참여한 논문 2편이 메인 컨퍼런스에 채택되었습니다:<ul class=\"news-sublist\"><li><a class=\"news-paper\" href=\"https://scholar.google.com/citations?view_op=view_citation&amp;hl=ko&amp;user=mlfYKfgAAAAJ&amp;sortby=pubdate&amp;citation_for_view=mlfYKfgAAAAJ:NhqRSupF_l8C\" target=\"_blank\" rel=\"noopener noreferrer\">Locality-Aware Redundancy Pruning for LLM Depth Compression</a></li><li><a class=\"news-paper\" href=\"https://scholar.google.com/citations?view_op=view_citation&amp;hl=ko&amp;user=mlfYKfgAAAAJ&amp;citation_for_view=mlfYKfgAAAAJ:pyW8ca7W8N0C\" target=\"_blank\" rel=\"noopener noreferrer\">Robust Multi-Agent LLMs under Byzantine Faults</a></li></ul>",
    "news.item.icml26": "<span class=\"news-label\">ICML 2026 워크숍</span> 여러 논문이 ICML 2026 워크숍에 채택되었습니다:<ul class=\"news-sublist\"><li><span class=\"news-paper\">Rethinking Layer Redundancy in Large Language Models: Calibration Objectives and Search for Depth Pruning</span> <span class=\"news-wks\">AdaptFM</span> <span class=\"news-tag\">프루닝</span></li><li><span class=\"news-paper\">Weight Concentration Regularization for Improving Pruning Robustness Under High Sparsity</span> <span class=\"news-wks\">AdaptFM</span> <span class=\"news-tag\">프루닝</span></li><li><span class=\"news-paper\">Ghosted Layers: Unconstrained Activation Alignment for Recovering Layer-Pruned LLMs</span> <span class=\"news-wks\">AdaptFM</span> <span class=\"news-tag\">프루닝</span></li><li><span class=\"news-paper\">Robust Multi-Agent LLMs under Byzantine Faults</span> <span class=\"news-wks\">Agents in the Wild</span> <span class=\"news-tag\">에이전트</span></li><li><span class=\"news-paper\">On How Muon Reshapes Skill Learning Dynamics</span> <span class=\"news-wks\">HiLD</span> <span class=\"news-tag\">최적화</span></li></ul>",
    "news.item.neurips26": "NeurIPS 2026에 여러 논문을 제출했습니다.",
    "news.item.michigan": "<a href=\"https://joonlee16.github.io/\">Haejoon Lee 박사과정 연구원</a> 및 <a href=\"https://scholar.google.com/citations?user=ny1yTusAAAAJ&amp;hl=en\">Dimitra Panagou 교수님</a>과 함께 미시간대학교 앤아버 캠퍼스와 강건한 멀티에이전트 AI 시스템 연구 협력을 시작했습니다.",
    "news.item.icassp_grant": "<span class=\"news-label\">ICASSP 2026 출장 지원금</span> ICASSP 2026 참가를 위한 USC GSG 출장 지원금 수혜자로 선정되었습니다.",
    "news.item.icassp26": "<span class=\"news-label\">ICASSP 2026 본 학회</span> 논문 “Sharpness-Aware Minimization with Z-Score Gradient Filtering”이 2026 IEEE International Conference on Acoustics, Speech, and Signal Processing에 채택되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/abs/2505.02369\">논문</a> <a class=\"news-action\" href=\"https://2026.ieeeicassp.org/\">학회</a>",
    "news.item.grant25": "<span class=\"news-label\">연구비 / $6,000</span> 4편의 논문에 대해 한국의 Brian Impact Foundation과 MODULABS로부터 총 $6,000의 연구비를 지원받았습니다.",
    "news.item.iconip_award": "<span class=\"news-label\">ICONIP 2025 / 최우수 논문상</span> 논문 “Revisiting 16-bit Neural Network Training: A Practical Approach for Resource-Limited Learning”이 ICONIP 2025 최우수 논문 후보로 선정되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/abs/2305.10947\">논문</a>",
    "news.item.opt25_sgd": "<span class=\"news-label\">NeurIPS 2025 OPT</span> 논문 “Why Does Stochastic Gradient Descent Slow Down in Low-Precision Training?”이 NeurIPS 2025 OPT 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/pdf/2508.07142?\">논문</a> <a class=\"news-action\" href=\"https://opt-ml.org/\">워크숍</a>",
    "news.item.opt25_sam": "<span class=\"news-label\">NeurIPS 2025 OPT</span> 논문 “Sharpness-Aware Minimization with Z-Score Gradient Filtering”이 NeurIPS 2025 OPT 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/abs/2505.02369\">논문</a> <a class=\"news-action\" href=\"https://opt-ml.org/\">워크숍</a>",
    "news.item.opt25_auto": "<span class=\"news-label\">NeurIPS 2025 OPT</span> 논문 “Hyperparameter-Free Auto-Scaled Gradient Normalization via Global Standard Deviation Dynamics”가 NeurIPS 2025 OPT 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://openreview.net/pdf?id=d4e2FnDNl3\">논문</a> <a class=\"news-action\" href=\"https://opt-ml.org/\">워크숍</a>",
    "news.item.cikm25": "<span class=\"news-label\">CIKM 2025 HCAI</span> 논문 “Fast Fourier Transform-Based Spectral and Temporal Gradient Filtering for Differential Privacy”가 CIKM 2025 Human-Centric AI 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/abs/2505.04468\">논문</a> <a class=\"news-action\" href=\"https://xai.kaist.ac.kr/Workshop/hcai2025/#call\">워크숍</a>",
    "news.item.iconip25": "<span class=\"news-label\">ICONIP 2025</span> 논문 “Revisiting 16-bit Neural Network Training: A Practical Approach for Resource-Limited Learning”이 ICONIP 2025 구두 발표 논문으로 채택되었습니다(채택률 상위 8%). <a class=\"news-action\" href=\"https://arxiv.org/abs/2305.10947\">논문</a>",
    "news.item.aaaiw25": "<span class=\"news-label\">AAAIW 2025</span> 논문 “ZNorm: Z-Score Gradient Normalization Accelerating Skip-Connected Network Training Without Architectural Modification”가 AAAI 2025 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://link.springer.com/chapter/10.1007/978-981-96-8912-5_12\">논문</a> <a class=\"news-action\" href=\"https://seasworkshop.github.io/aaai25/\">워크숍</a>",
    "news.item.bigdataw24": "<span class=\"news-label\">IEEE BigDataW 2024</span> 논문 “Mitigating Gradient Overlap in Deep Residual Networks with Gradient Normalization for Improved Non-Convex Optimization”이 IEEE BigData 최적화 워크숍 BPOD에 채택되었습니다. <a class=\"news-action\" href=\"https://ieeexplore.ieee.org/abstract/document/10825094\">논문</a> <a class=\"news-action\" href=\"https://bdal.umbc.edu/bpod-2024/\">워크숍</a>",
    "news.item.spaice24": "<span class=\"news-label\">ESA SPAICE 2024</span> 논문 “Analysis and Predictive Modeling of Solar Coronal Holes Using Computer Vision and ARIMA-LSTM Networks”가 SPAICE 2024에 채택되었습니다. <a class=\"news-action\" href=\"https://arxiv.org/pdf/2405.09802\">논문</a> <a class=\"news-action\" href=\"https://spaice.esa.int/2024/\">학회</a>",
    "news.item.ijcnn24": "<span class=\"news-label\">IJCNN 2024</span> 논문 “Robust Neural Pruning with Gradient Sampling Optimization for Residual Neural Networks”가 IJCNN 2024 구두 발표 논문으로 채택되었습니다. <a class=\"news-action\" href=\"https://ieeexplore.ieee.org/abstract/document/10650301\">논문</a>",
    "news.item.cvprw24": "<span class=\"news-label\">CVPRW 2024</span> 논문 “Uncertainty Estimation for Tumor Prediction with Unlabeled Data”가 IEEE/CVF CVPR 워크숍에 채택되었습니다. <a class=\"news-action\" href=\"https://openaccess.thecvf.com/content/CVPR2024W/CVMI/papers/Yun_Uncertainty_Estimation_for_Tumor_Prediction_with_Unlabeled_Data_CVPRW_2024_paper.pdf\">논문</a>",

    /* ---- Home: selected publications ---- */
    "selected.h": "주요 논문",
    "selected.equal": "* 공동 기여를 나타냅니다.",
    "svc.h": "학술 활동",
    "awards.h": "수상 및 주요 성과",
    "awards.lg": "LG 공식 선발 및 초청으로 전액 지원 Efficient AI 시카고 방문",
    "awards.grant": "Brian Impact Foundation으로부터 최적화 연구를 위한 $6,000 연구비 수혜",

    /* ---- Home: education ---- */
    "edu.t1": "박사 과정: 2027년 가을학기 입학 지원 중",
    "edu.d1": "컴퓨터과학 · 전기·컴퓨터공학 · 데이터 사이언스<br>효율적 ML, LLM 압축, 최적화, 딥러닝(AI) 기초",
    "edu.t0": "서울대학교",
    "edu.d0": "방문 연구원 · <a href=\"https://cmalab.snu.ac.kr/\">컴퓨팅·메모리 아키텍처 연구실(CMAL)</a> · 효율적 LLM을 위한 KV-cache 압축<br>지도교수: <a href=\"https://scholar.google.com/citations?user=__waCuYAAAAJ&hl=en\">유승주 교수님</a>",
    "edu.t2": "서던캘리포니아대학교(USC)",
    "edu.d2": "컴퓨터과학 이학석사<br>지도교수: <a href=\"https://spkreddy.org/\">Sai Praneeth Karimireddy 교수님</a>, <a href=\"https://viterbi.usc.edu/directory/faculty/Annavaram/Murali\">Murali Annavaram 교수님</a>",
    "edu.t3": "뉴욕주립대학교 스토니브룩 캠퍼스",
    "edu.d3": "<ul class=\"edu-degree-list\"><li>컴퓨터과학 이학사(AI 전공)</li><li>응용수학 이학사</li><li>병역으로 2년 휴학</li></ul>지도교수: <a href=\"https://chaochen.github.io/index.html\">Chao Chen 교수님</a>",

    /* ---- Buttons ---- */
    "btn.showmore": "더 보기",
    "btn.showless": "접기",

    /* ---- Game page ---- */
    "game.kicker": "윈터 스카이 미션",
    "game.title": "프로스트 윙",
    "game.creator_note": "Daniel이 심심해서 만든 게임",
    "game.score": "점수",
    "game.level": "레벨",
    "game.health": "체력",
    "game.weapon": "무기",
    "game.bombs": "폭탄",
    "game.controls": "조작 방법",
    "game.move": "이동",
    "game.solo_arrows": "방향키로도 이동 가능",
    "game.common_control": "공통 조작",
    "game.terminal": "명령 터미널",
    "game.terminal_help": "boss1부터 boss20까지 입력하면 해당 보스 스테이지로 이동합니다.",
    "game.fire": "공격",
    "game.bomb": "폭탄",
    "game.pause": "일시정지",
    "game.items": "보급 아이템",
    "game.heal": "체력 회복",
    "game.bomb_item": "폭탄 충전",
    "game.shield_item": "2회 방어 보호막",
    "game.wingman_item": "보조 비행기",
    "game.magnet_item": "모든 보급품 자동 회수",
    "game.overdrive_item": "10초간 공격 오버드라이브",
    "game.core_item": "추가 경험치 데이터 코어",
    "game.class_laser": "레이저 거너",
    "game.class_laser_desc": "공격키를 누르는 동안 연속 레이저 빔을 유지합니다",
    "game.class_aegis": "이지스 파일럿",
    "game.class_aegis_desc": "10초마다 2초 동안 무적 보호막을 생성합니다",
    "game.class_overcharge": "오버차지 코어",
    "game.class_overcharge_desc": "공격력·공격 속도·치명타 확률이 증가합니다",
    "game.class_vanguard": "뱅가드 프레임",
    "game.class_vanguard_desc": "방어력·이동 속도·체력과 보호막을 획득합니다",
    "game.class_nova": "노바 엔진",
    "game.class_nova_desc": "8초마다 자동으로 전방위 노바 공격을 방출합니다",
    "game.class_chrono": "크로노 드라이브",
    "game.class_chrono_desc": "적의 공격을 느리게 하고 공격 속도를 크게 높입니다",
    "game.upgrade_damage": "공격력",
    "game.upgrade_damage_desc": "총알 피해량 50% 증가",
    "game.upgrade_speed": "공격 속도",
    "game.upgrade_speed_desc": "공격 속도 15% 증가",
    "game.upgrade_health": "최대 체력",
    "game.upgrade_health_desc": "최대 체력 25 증가 및 체력 25 회복",
    "game.upgrade_mobility": "기동력",
    "game.upgrade_mobility_desc": "이동 속도가 증가합니다",
    "game.upgrade_armor": "장갑",
    "game.upgrade_armor_desc": "받는 피해가 감소합니다 (최대 42%)",
    "game.upgrade_salvage": "보급 행운",
    "game.upgrade_salvage_desc": "아이템 획득 확률이 증가합니다",
    "game.fleet_speed": "함대 공격 속도",
    "game.fleet_speed_desc": "보조 비행기의 공격 속도가 15% 증가합니다",
    "game.fleet_multishot": "함대 다중 사격",
    "game.fleet_multishot_desc": "보조 비행기의 공격 갈래가 1개 증가합니다 (최대 3갈래)",
    "game.fleet_capacity": "함대 수용량",
    "game.fleet_capacity_desc": "최대 보조 비행기 수가 1대 증가합니다 (최대 3대)",
    "game.one_player": "1인 플레이",
    "game.one_player_desc": "혼자 비행하기",
    "game.two_players": "2인 플레이",
    "game.two_players_desc": "로컬 협동 플레이",
    "game.leaderboard": "순위표",
    "game.rank": "순위",
    "game.player": "플레이어",
    "game.affiliation": "소속",
    "game.submit_score": "순위표에 이름을 올리고 싶다면 점수 스크린샷을 찍어 <a href=\"mailto:yunjuyou@usc.edu\">yunjuyou@usc.edu</a>로 보내주세요.",
    "game.tip": "적을 제거하고 오래 생존할수록 점수가 계속 올라갑니다.",

    /* ---- Publications page ---- */
    "pub.h": "논문",
    "pub.note": "* 공동 제1저자",
    "pub.more_prefix": "더 많은 논문과 최신 연구는",
    "pub.more_suffix": "에서 확인해 주세요.",
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
    "eai.vision_p2": "현장에서 믿고 쓸 수 있는 AI를 가로막는 두 가지 장벽이 있습니다. 하나하나의 모델은 정작 필요한 곳에서 구동하기엔 너무 크고 느리며, 여러 모델이나 에이전트가 함께 일할 때는 단 하나의 결함 있거나 적대적인 구성원이 시스템 전체를 조용히 무너뜨릴 수 있습니다. <strong>E-AI</strong>는 이 두 가지를 동시에 공략합니다. 모든 모델을 가볍고 빠르게 만들고, 일부가 실패하더라도 에이전트 집단이 신뢰성을 유지하도록 합니다.",
    "eai.vision_p3": "저는 이를 위해 <strong>E-AI(Efficient-AI)</strong> 프로젝트를 시작했습니다. 재해 상황에서 사람을 보조하고 위험한 사고에 신속하고 정확하게 대처할 수 있는, 가볍지만 강력한 인공지능을 만드는 것이 목표입니다.",
    "eai.vision_quote": "E-AI는 제 모든 연구를 관통하는 가장 큰 테마이며, 제가 진행하는 모든 연구는 이를 실현하기 위한 한 걸음입니다.",
    "eai.research_h": "E-AI를 향한 연구",
    "eai.research_sub": "이 연구는 두 갈래로 나뉩니다. 하나는 개별 에이전트가 실패하더라도 LLM 에이전트 집단이 견고함을 유지하도록 만들고, 다른 하나는 모델의 강력함을 잃지 않으면서 모델 자체를 더 작고 빠르게 만듭니다.",
    "eai.track1": "견고한 멀티에이전트 시스템",
    "eai.track2": "효율적 모델과 압축",
    "eai.readpaper": "논문 보기 →",
    "eai.cite_h": "인용 · BibTeX",
    "eai.copy": "복사",
    "eai.c0_t": "Robust Multi-Agent LLMs under Byzantine Faults",
    "eai.c0_d": "여러 LLM 에이전트가 네트워크로 협력할 때, 신뢰할 수 없거나 적대적인 소수의 '비잔틴(Byzantine)' 에이전트가 나머지를 잘못된 결론으로 유도해 집단의 답을 오염시킬 수 있습니다. Self-Anchored Consensus(SAC)는 완전히 분산된 필터-정제 프로토콜로, 에이전트들이 서로의 메시지를 반복적으로 교환·평가·필터링합니다. 적대적 공격 속에서도 정직한 에이전트들이 신뢰할 수 있는 정보를 계속 전파하도록 보장하는 그래프 조건을 함께 제시합니다.",
    "eai.c1_t": "Ghosted Layers: 레이어가 제거된 LLM 복원",
    "eai.c1_d": "레이어 프루닝은 트랜스포머 블록을 통째로 제거해 LLM을 줄이지만, 프루닝 경계에서 활성값 불일치가 생겨 성능이 떨어집니다. Ghosted Layers는 학습이 필요 없는 모듈로, 닫힌 형태(closed-form)의 활성값 정렬 문제를 풀어 손실된 정보를 복원합니다. 프루닝의 속도 이점은 유지하면서 정확도를 되살립니다.",
    "eai.c2_t": "Locality-Aware Redundancy Pruning (LoRP)",
    "eai.c2_d": "LLM 내부에서 중복이 어디에 존재하는지는 아키텍처마다 다릅니다. 국소적으로 모이기도 하고 전역적으로 퍼지기도 합니다(예: Llama vs. Qwen). LoRP는 레이어 간 유사도를 측정해 Representation Locality Score를 계산하고, 획일적인 규칙 대신 모델 고유의 중복 구조에 맞춰 프루닝합니다.",
    "eai.c3_t": "Weight Concentration Regularization (WCR)",
    "eai.c3_d": "높은 희소성에서는 중요한 가중치가 넓게 퍼져 있어 단순 프루닝이 정확도를 무너뜨립니다. WCR은 학습 단계의 정규화로 모델의 에너지를 소수의 중요한 파라미터에 집중시켜, 크기 기반 프루닝이 나머지를 안전하게 제거하도록 합니다. 이를 통해 고희소성 압축에 훨씬 강건해집니다.",
    "eai.c4_t": "Rethinking Layer Redundancy: 탐색보다 보정(calibration)",
    "eai.c4_d": "대부분의 깊이 프루닝 기법은 제거할 레이어를 찾기 위해 정교한 탐색 알고리즘에 집중합니다. 하지만 우리는 그 반대를 보입니다. 동일한 보정 집합에서는 복잡한 탐색이 단순한 one-shot 프루닝과 거의 차이가 없으며, 어떤 레이어가 중복인지를 실제로 좌우하는 것은 보정 구성입니다. 탐색보다 데이터를 우선하라는 제언입니다.",
    "eai.c5_t": "Output-Aware Rotation for INT2 KV-Cache Quantization",
    "eai.c5_d": "INT2 KV-cache 양자화는 메모리를 크게 절감하지만, 기존 회전 기반 기법은 완전한 어텐션 출력이 만들어지기 전 단계의 대리 오차를 최적화합니다. OptR은 출력 투영 이후의 어텐션 오차를 최소화하도록 헤드별 직교 보정 회전을 학습하고, 어텐션 결과를 바꾸지 않는 키 재매개변수화로 채널별 이상치를 줄입니다. Paged KV-cache 호환성과 거의 무시할 수준의 서빙 오버헤드를 유지하면서 추론·코딩·장문 검색 성능을 개선합니다."
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

/* =========================================================
   Ambient snowfall
   ========================================================= */
(function () {
  "use strict";

  function initSnowfall() {
    if (document.querySelector(".snowfall")) return;
    if (document.querySelector(".ambient-network")) return;
    if (document.querySelector(".game-page")) return;
    if (document.querySelector(".gallery-magazine")) return;
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const snowfall = document.createElement("div");
    snowfall.className = "snowfall";
    snowfall.setAttribute("aria-hidden", "true");

    const flakes = document.createDocumentFragment();
    const flakeCount = window.innerWidth < 640 ? 30 : 48;

    for (let i = 0; i < flakeCount; i += 1) {
      const flake = document.createElement("span");
      flake.className = "snowflake";

      const size = 2.5 + Math.random() * 5.5;
      const drift = -45 + Math.random() * 90;
      flake.style.setProperty("--snow-left", (Math.random() * 100).toFixed(2) + "vw");
      flake.style.setProperty("--snow-size", size.toFixed(2) + "px");
      flake.style.setProperty("--snow-glow", (size * 1.6).toFixed(2) + "px");
      flake.style.setProperty("--snow-opacity", (0.28 + Math.random() * 0.58).toFixed(2));
      flake.style.setProperty("--snow-blur", (Math.random() * 1.2).toFixed(2) + "px");
      flake.style.setProperty("--snow-drift", drift.toFixed(2) + "px");
      flake.style.setProperty("--snow-return", (drift * -0.45).toFixed(2) + "px");
      flake.style.setProperty("--snow-duration", (10 + Math.random() * 14).toFixed(2) + "s");
      flake.style.setProperty("--snow-delay", (-Math.random() * 24).toFixed(2) + "s");
      flakes.appendChild(flake);
    }

    snowfall.appendChild(flakes);
    document.body.appendChild(snowfall);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnowfall);
  } else {
    initSnowfall();
  }
})();
