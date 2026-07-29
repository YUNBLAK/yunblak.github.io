/**
 * Frost Wing — boss data
 * Scientist AI identities, colors, formulas, patterns, and evolution profiles.
 * This source is assembled into ../game.js by build-game.mjs.
 */
const APEX_BOSSES = [
    { name: "TESLA ARC MIND", scientist: "NIKOLA TESLA", sigil: "T", formula: "V = IR", color: "#66e0cb", pattern: "RESONANT LIGHTNING", movement: "dash", kit: [1, 5, 0], special: "chain_lightning", evolutions: ["WARDENCLYFFE ONLINE", "WORLD WIRELESS STORM"] },
    { name: "EINSTEIN CHRONOFRAME", scientist: "ALBERT EINSTEIN", sigil: "E", formula: "E = mc²", color: "#e5ce72", pattern: "RELATIVITY FRACTURE", movement: "clock", kit: [2, 1, 0], special: "time_stop", evolutions: ["TIME DILATION", "LIGHT-CONE COLLAPSE"] },
    { name: "CURIE RADIANT CORE", scientist: "MARIE CURIE", sigil: "C", formula: "Ra → Rn", color: "#ff9b62", pattern: "RADIUM CORONA", movement: "sun", kit: [0, 2, 3], special: "corona_wave", evolutions: ["ISOTOPE AWAKENING", "CRITICAL RADIANCE"] },
    { name: "FARADAY CAGE ENGINE", scientist: "MICHAEL FARADAY", sigil: "F", formula: "∇×E", color: "#71d7ee", pattern: "INDUCTION PRISM", movement: "orbit", kit: [0, 1, 2], special: "prism_cage", evolutions: ["INDUCED CURRENT", "PERFECT FIELD CAGE"] },
    { name: "TURING ORACLE", scientist: "ALAN TURING", sigil: "λ", formula: "0 ⇄ 1", color: "#bd83e8", pattern: "PREDICTION GRID", movement: "oracle", kit: [4, 3, 1], special: "future_grid", evolutions: ["HALTING PARADOX", "UNDECIDABLE VERDICT"] },
    { name: "HAWKING HORIZON CORE", scientist: "STEPHEN HAWKING", sigil: "H", formula: "Tᴴ ∝ 1/M", color: "#9c82df", pattern: "EVENT HORIZON", movement: "orbit", kit: [3, 4, 0], special: "black_hole", evolutions: ["HAWKING RADIATION", "INFORMATION PARADOX"] },
    { name: "MAXWELL DEMON REACTOR", scientist: "JAMES C. MAXWELL", sigil: "M", formula: "∇·E", color: "#7ec8ff", pattern: "ENTROPY REVERSAL", movement: "serpent", kit: [2, 3, 4], special: "frost_domain", evolutions: ["THERMAL SELECTION", "ABSOLUTE ENTROPY"] },
    { name: "DARWIN EVOLUTION SWARM", scientist: "CHARLES DARWIN", sigil: "D", formula: "Δf / Δt", color: "#79d5a7", pattern: "ADAPTIVE HUNTER SWARM", movement: "hydra", kit: [4, 1, 2], special: "hydra_heads", evolutions: ["NATURAL SELECTION", "APEX ADAPTATION"] },
    { name: "SCHRODINGER POSSIBILITY CORE", scientist: "ERWIN SCHRÖDINGER", sigil: "Ψ", formula: "iℏ∂Ψ", color: "#65c9ff", pattern: "SUPERPOSITION STORM", movement: "teleport", kit: [4, 2, 5], special: "quantum_decoys", evolutions: ["SUPERPOSITION", "WAVEFUNCTION COLLAPSE"] },
    { name: "FEYNMAN PATH INTEGRATOR", scientist: "RICHARD FEYNMAN", sigil: "∫", formula: "∫eⁱˢ", color: "#ad92ff", pattern: "SUM OVER PATHS", movement: "teleport", kit: [5, 4, 0], special: "void_gates", evolutions: ["VIRTUAL PARTICLES", "ALL PATHS AT ONCE"] },
    { name: "GALILEO HELIOSCOPE", scientist: "GALILEO GALILEI", sigil: "G", formula: "s ∝ t²", color: "#f0b46b", pattern: "HELIOCENTRIC LANCES", movement: "dive", kit: [1, 3, 5], special: "solar_sweep", evolutions: ["FALLING BODY LAW", "HELIOCENTRIC JUDGMENT"] },
    { name: "KEPLER ORBITAL ENGINE", scientist: "JOHANNES KEPLER", sigil: "K", formula: "T² ∝ a³", color: "#8f9cff", pattern: "ELLIPTIC SINGULARITY", movement: "orbit", kit: [3, 0, 4], special: "singularity", evolutions: ["SECOND LAW SWEEP", "PERFECT ORBIT"] },
    { name: "HEISENBERG UNCERTAINTY UNIT", scientist: "WERNER HEISENBERG", sigil: "Δ", formula: "ΔxΔp ≥ ℏ/2", color: "#91b8ec", pattern: "UNCERTAINTY BARRAGE", movement: "phase", kit: [5, 4, 3], special: "phase_cloak", evolutions: ["POSITION UNKNOWN", "MEASUREMENT BREAKDOWN"] },
    { name: "ARCHIMEDES LEVER ENGINE", scientist: "ARCHIMEDES", sigil: "A", formula: "F₁d₁ = F₂d₂", color: "#72e2bb", pattern: "FULCRUM CROSS", movement: "dash", kit: [5, 1, 2], special: "scythe_cross", evolutions: ["BUOYANCY REVERSAL", "WORLD LEVER"] },
    { name: "OPPENHEIMER TRINITY FORGE", scientist: "J. R. OPPENHEIMER", sigil: "Ω", formula: "Δm → E", color: "#ef7b68", pattern: "CHAIN-REACTION RAIN", movement: "forge", kit: [3, 0, 5], special: "molten_floor", evolutions: ["CRITICAL MASS", "TRINITY PROTOCOL"] },
    { name: "LOVELACE ANALYTICAL GHOST", scientist: "ADA LOVELACE", sigil: "L", formula: "loop(n)", color: "#ef83b6", pattern: "RECURSIVE MIRROR", movement: "mirror", kit: [1, 5, 2], special: "echo_replay", evolutions: ["SECOND ALGORITHM", "INFINITE RECURSION"] },
    { name: "RAMANUJAN INFINITE ENGINE", scientist: "S. RAMANUJAN", sigil: "∞", formula: "1/π", color: "#e26b8c", pattern: "INFINITE CONVERGENCE", movement: "pursuit", kit: [0, 1, 3], special: "shrinking_world", evolutions: ["PARTITION CASCADE", "FINAL CONVERGENCE"] },
    { name: "BOHR ABSOLUTE ATOM", scientist: "NIELS BOHR", sigil: "B", formula: "Eₙ ∝ −1/n²", color: "#d8f6ff", pattern: "ATOMIC ZERO", movement: "chaos", kit: [0, 1, 2, 3, 4, 5], special: "absolute_zero", evolutions: ["QUANTUM SHELL", "GROUND-STATE EXTINCTION"] }
  ];
