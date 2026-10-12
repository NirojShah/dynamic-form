import { useState } from "react";

/* ─────────────────────────────────────────────
   WISE DESIGN SYSTEM — NEPTUNE TOKENS
   Source: wise.design/foundations/colour
         wise.design/foundations/typography
────────────────────────────────────────────── */
const W = {
  // Core brand
  brightGreen:   "#9FE870",
  forestGreen:   "#163300",
  white:         "#FFFFFF",

  // Secondary palette
  brightOrange:  "#FFC091",
  brightYellow:  "#FFEB69",
  brightBlue:    "#A0E1E1",
  brightPink:    "#FFD7EF",
  darkPurple:    "#260A2F",
  darkGold:      "#3A341C",
  darkCharcoal:  "#21231D",

  // Content (semantic)
  contentPrimary:   "#0E0F0C",
  contentSecondary: "#454745",
  contentTertiary:  "#6A6C6A",
  contentLink:      "#163300",

  // Interactive
  interactivePrimary:   "#163300",
  interactiveAccent:    "#9FE870",
  interactiveSecondary: "#868685",
  interactiveControl:   "#163300",
  interactiveContrast:  "#9FE870",

  // Background
  bgScreen:   "#FFFFFF",
  bgElevated: "#FFFFFF",
  bgNeutral:  "rgba(22,51,0,0.08)",
  bgOverlay:  "rgba(22,51,0,0.08)",

  // Border
  borderNeutral:  "rgba(14,15,12,0.12)",
  borderOverlay:  "rgba(14,15,12,0.12)",

  // Sentiment
  sentimentNeg:  "#A8200D",
  sentimentPos:  "#2F5711",
  sentimentWarn: "#EDC843",

  // Base
  baseContrast: "#FFFFFF",
  baseLight:    "#FFFFFF",
  baseDark:     "#121511",
};

/* ── Spacing scale (4px base) ── */


/* ── Border radius ── */
const r = { sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "999px" };

/* ─── Global CSS ─────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bright-green: #9FE870;
  --forest-green: #163300;
  --bg: #FFFFFF;
  --bg-neutral: rgba(22,51,0,0.08);
  --content-primary: #0E0F0C;
  --content-secondary: #454745;
  --content-tertiary: #6A6C6A;
  --border: rgba(14,15,12,0.12);
  --border-strong: rgba(14,15,12,0.24);
  --negative: #A8200D;
  --positive: #2F5711;
  --warning: #EDC843;
  --font: 'Inter', -apple-system, sans-serif;
  --transition: 150ms cubic-bezier(0.4,0,0.2,1);
}

html, body, #root { height: 100%; font-family: var(--font); background: var(--bg); color: var(--content-primary); }

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }

/* ── App shell ── */
.app { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* ── Top navigation bar ── */
.topnav {
  height: 56px;
  background: var(--forest-green);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  flex-shrink: 0;
  z-index: 100;
}
.topnav-logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 700; font-size: 17px; color: var(--bright-green);
  cursor: pointer; letter-spacing: -0.3px;
}
.logo-flag {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--bright-green);
  display: flex; align-items: center; justify-content: center;
}
.logo-flag svg { width: 16px; height: 16px; }
.topnav-sep { width: 1px; height: 24px; background: rgba(159,232,112,0.2); }
.topnav-breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 14px; color: rgba(255,255,255,0.55);
}
.topnav-breadcrumb .bc-cur { color: rgba(255,255,255,0.9); font-weight: 500; }
.topnav-center { flex: 1; display: flex; justify-content: center; }

/* Tab group in dark bar */
.tab-group {
  display: flex;
  background: rgba(255,255,255,0.08);
  border-radius: ${r.full};
  padding: 3px;
  gap: 2px;
}
.tab-pill {
  padding: 5px 16px;
  border-radius: ${r.full};
  font-size: 13px; font-weight: 500;
  border: none; background: transparent;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
  white-space: nowrap;
}
.tab-pill.active {
  background: var(--bright-green);
  color: var(--forest-green);
}
.tab-pill:not(.active):hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.1); }

.topnav-right { display: flex; align-items: center; gap: 8px; }

/* ── Wise Buttons ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: none; border-radius: ${r.full};
  font-family: var(--font); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: var(--transition);
  white-space: nowrap;
}
/* Primary: BrightGreen bg, ForestGreen text */
.btn-primary {
  background: var(--bright-green); color: var(--forest-green);
  padding: 9px 20px;
}
.btn-primary:hover { background: #b3f082; transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }

/* Secondary: White bg with border */
.btn-secondary {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.9);
  padding: 8px 18px;
  border: 1.5px solid rgba(255,255,255,0.2);
}
.btn-secondary:hover { background: rgba(255,255,255,0.18); }

/* Tertiary (ghost on white bg) */
.btn-tertiary {
  background: transparent;
  color: var(--forest-green);
  padding: 8px 16px;
  border: 1.5px solid var(--border-strong);
}
.btn-tertiary:hover { background: var(--bg-neutral); }

/* Danger */
.btn-danger {
  background: rgba(168,32,13,0.08); color: var(--negative);
  padding: 7px 14px;
  border: 1.5px solid rgba(168,32,13,0.2);
}
.btn-danger:hover { background: rgba(168,32,13,0.14); }

.btn-sm { font-size: 12px; padding: 5px 14px; }
.btn-icon {
  width: 32px; height: 32px; border-radius: ${r.full};
  background: transparent; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,0.6);
  transition: var(--transition); font-size: 15px;
}
.btn-icon:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); }

/* Avatar */
.avatar {
  width: 32px; height: 32px; border-radius: ${r.full};
  background: var(--bright-green); color: var(--forest-green);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

/* ── Auto-save badge ── */
.saved-badge {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: rgba(159,232,112,0.8);
}
.saved-badge::before {
  content: '';
  width: 6px; height: 6px; border-radius: ${r.full};
  background: var(--bright-green);
}

/* ── Dashboard ── */
.dashboard { display: flex; flex: 1; overflow: hidden; }
.dash-sidebar {
  width: 224px; background: var(--bg); flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  padding: 12px 0;
  overflow-y: auto;
}
.dash-nav-section {
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--content-tertiary);
  padding: 16px 20px 6px;
}
.dash-nav-section:first-child { padding-top: 8px; }
.dash-nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 20px; font-size: 14px; font-weight: 500;
  color: var(--content-secondary);
  cursor: pointer; transition: var(--transition);
  border-radius: 0;
}
.dash-nav-item:hover { color: var(--content-primary); background: var(--bg-neutral); }
.dash-nav-item.active {
  color: var(--forest-green); background: rgba(22,51,0,0.06);
  font-weight: 600;
  border-right: 2px solid var(--forest-green);
}
.dash-nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }

.dash-main { flex: 1; overflow-y: auto; padding: 32px; background: #FAFAFA; }
.dash-page-header { margin-bottom: 28px; }
.dash-page-title {
  font-size: 24px; font-weight: 700; color: var(--content-primary);
  letter-spacing: -0.4px; margin-bottom: 4px;
}
.dash-page-sub { font-size: 14px; color: var(--content-secondary); }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 28px; }
.stat-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: ${r.md}; padding: 20px;
}
.stat-label { font-size: 12px; color: var(--content-secondary); margin-bottom: 6px; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: var(--content-primary); letter-spacing: -0.8px; line-height: 1; }
.stat-delta { font-size: 12px; color: var(--positive); margin-top: 5px; font-weight: 500; }

/* Search + filter */
.search-row { display: flex; gap: 8px; margin-bottom: 20px; }
.w-search {
  flex: 1; background: var(--bg); border: 1.5px solid var(--border);
  border-radius: ${r.full}; padding: 9px 16px;
  font-size: 14px; font-family: var(--font); color: var(--content-primary);
  outline: none; transition: var(--transition);
}
.w-search:focus { border-color: var(--forest-green); }
.w-search::placeholder { color: var(--content-tertiary); }
.filter-chip {
  background: var(--bg); border: 1.5px solid var(--border);
  border-radius: ${r.full}; padding: 9px 16px;
  font-size: 13px; font-weight: 500; color: var(--content-secondary);
  cursor: pointer; font-family: var(--font); transition: var(--transition);
}
.filter-chip:hover { border-color: var(--border-strong); color: var(--content-primary); }

/* Form cards grid */
.forms-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.form-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: ${r.md}; overflow: hidden;
  cursor: pointer; transition: all 160ms ease;
}
.form-card:hover { border-color: var(--border-strong); box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.form-card-thumb {
  height: 96px; display: flex; align-items: center; justify-content: center;
  border-bottom: 1px solid var(--border);
}
.form-card-body { padding: 14px 16px; }
.form-card-name {
  font-size: 14px; font-weight: 600; color: var(--content-primary);
  margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.form-card-meta { font-size: 12px; color: var(--content-secondary); display: flex; justify-content: space-between; margin-bottom: 10px; }
.progress-track { height: 3px; background: var(--border); border-radius: ${r.full}; margin-bottom: 10px; }
.progress-fill { height: 3px; border-radius: ${r.full}; }

/* Status badges — Wise uses subtle chip style */
.status-chip {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 600; padding: 3px 10px;
  border-radius: ${r.full};
}
.status-live { background: rgba(47,87,17,0.1); color: var(--positive); }
.status-draft { background: rgba(237,200,67,0.2); color: #7a6300; }
.status-closed { background: var(--bg-neutral); color: var(--content-secondary); }

/* Section header row */
.section-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.section-title { font-size: 16px; font-weight: 600; color: var(--content-primary); }
.link-btn { font-size: 13px; color: var(--forest-green); font-weight: 600; background: none; border: none; cursor: pointer; font-family: var(--font); }

/* Empty state */
.empty-state { text-align: center; padding: 64px 20px; }
.empty-icon { font-size: 40px; margin-bottom: 16px; }
.empty-title { font-size: 18px; font-weight: 700; color: var(--content-primary); margin-bottom: 6px; }
.empty-desc { font-size: 14px; color: var(--content-secondary); margin-bottom: 24px; line-height: 1.6; }

/* ── Editor ── */
.editor-body { display: flex; flex: 1; overflow: hidden; }

/* Left panel — field library */
.field-lib {
  width: 216px; background: var(--bg); flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.lib-search { padding: 12px; border-bottom: 1px solid var(--border); }
.lib-search input {
  width: 100%; background: var(--bg-neutral);
  border: none; border-radius: ${r.full};
  padding: 7px 14px; font-size: 13px;
  font-family: var(--font); color: var(--content-primary);
  outline: none;
}
.lib-search input::placeholder { color: var(--content-tertiary); }
.lib-group-title {
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--content-tertiary);
  padding: 14px 14px 5px;
}
.field-chip {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 14px; font-size: 13px; font-weight: 500;
  color: var(--content-secondary); cursor: pointer;
  transition: var(--transition); margin: 1px 6px;
  border-radius: ${r.sm};
}
.field-chip:hover { background: var(--bg-neutral); color: var(--content-primary); }
.field-chip:active { background: rgba(22,51,0,0.1); }
.chip-icon {
  width: 24px; height: 24px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; flex-shrink: 0;
}

/* Canvas */
.canvas-area {
  flex: 1; overflow-y: auto;
  background: #F5F5F2;
  display: flex; flex-direction: column; align-items: center;
  padding: 36px 24px 100px;
}
.form-wrapper { width: 100%; max-width: 580px; }

/* Wise-style form card */
.form-header-card {
  background: var(--bg); border-radius: ${r.lg} ${r.lg} 0 0;
  border: 1px solid var(--border); border-bottom: none;
  overflow: hidden;
}
.form-header-accent {
  height: 6px; background: var(--forest-green);
  position: relative; overflow: hidden;
}
.form-header-accent::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, var(--forest-green) 0%, var(--bright-green) 50%, var(--forest-green) 100%);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.form-header-inner { padding: 24px 28px 20px; }
.form-title-input {
  font-size: 22px; font-weight: 700; color: var(--content-primary);
  border: none; background: transparent; width: 100%;
  outline: none; letter-spacing: -0.3px; line-height: 1.2;
}
.form-title-input::placeholder { color: var(--content-tertiary); }
.form-desc-input {
  font-size: 14px; color: var(--content-secondary);
  border: none; background: transparent; width: 100%;
  outline: none; margin-top: 6px; line-height: 1.5;
}
.form-desc-input::placeholder { color: rgba(106,108,106,0.5); }

/* Field blocks */
.fields-wrap { border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
.field-block {
  background: var(--bg); padding: 18px 28px;
  border-bottom: 1px solid var(--border);
  position: relative; cursor: pointer;
  transition: background var(--transition);
}
.field-block:hover { background: #FAFAFA; }
.field-block.selected {
  background: rgba(22,51,0,0.03);
  box-shadow: inset 3px 0 0 var(--forest-green);
}
.field-block.drag-over { border-top: 2px solid var(--bright-green); }
.field-block.dragging { opacity: 0.4; }

.drag-handle {
  position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
  color: var(--content-tertiary); font-size: 13px;
  cursor: grab; opacity: 0; transition: opacity var(--transition);
  user-select: none;
}
.field-block:hover .drag-handle { opacity: 1; }

/* Wise-style label */
.field-label-row { display: flex; align-items: center; gap: 5px; margin-bottom: 6px; }
.field-label-text { font-size: 14px; font-weight: 600; color: var(--content-primary); }
.req-star { color: var(--negative); font-size: 13px; }

.help-text-note { font-size: 12px; color: var(--content-tertiary); margin-bottom: 7px; }

/* Wise input style — simple bottom border */
.wise-input {
  width: 100%;
  border: none;
  border-bottom: 1.5px solid var(--border-strong);
  border-radius: 0;
  padding: 8px 0;
  font-size: 14px; font-family: var(--font);
  color: var(--content-tertiary);
  background: transparent;
  pointer-events: none;
}
.wise-textarea { height: 72px; resize: none; }

/* Radio / checkbox options */
.options-list { display: flex; flex-direction: column; gap: 8px; }
.option-row { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--content-secondary); }
.option-circle {
  width: 18px; height: 18px; border-radius: 50%;
  border: 1.5px solid var(--border-strong); flex-shrink: 0;
}
.option-circle.sel { border-color: var(--forest-green); background: var(--forest-green); }
.option-square {
  width: 18px; height: 18px; border-radius: 4px;
  border: 1.5px solid var(--border-strong); flex-shrink: 0;
}
.option-square.sel { border-color: var(--forest-green); background: var(--forest-green); }

/* Rating stars */
.star-row { display: flex; gap: 5px; }
.star { font-size: 22px; color: var(--border-strong); }
.star.lit { color: #EDB843; }

/* Scale */
.scale-row { display: flex; gap: 5px; flex-wrap: wrap; }
.scale-dot {
  width: 32px; height: 32px; border-radius: ${r.full};
  border: 1.5px solid var(--border-strong);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 500; color: var(--content-secondary);
}
.scale-dot.sel {
  border-color: var(--forest-green);
  background: var(--bg-neutral); color: var(--forest-green); font-weight: 700;
}

/* Field actions */
.field-actions {
  position: absolute; right: 12px; top: 12px;
  display: flex; gap: 3px;
  opacity: 0; transition: opacity var(--transition);
}
.field-block:hover .field-actions, .field-block.selected .field-actions { opacity: 1; }
.act-btn {
  width: 28px; height: 28px; border-radius: ${r.sm};
  border: 1px solid var(--border); background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 12px; color: var(--content-secondary);
  transition: var(--transition);
}
.act-btn:hover { background: var(--bg-neutral); border-color: var(--border-strong); color: var(--content-primary); }
.act-btn.del:hover { background: rgba(168,32,13,0.08); border-color: rgba(168,32,13,0.2); color: var(--negative); }

.add-field-btn {
  border: 2px dashed var(--border);
  border-top: none;
  border-radius: 0 0 ${r.lg} ${r.lg};
  padding: 16px; font-size: 14px; font-weight: 500;
  color: var(--content-secondary); background: var(--bg);
  cursor: pointer; text-align: center;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  transition: var(--transition); width: 100%;
}
.add-field-btn:hover {
  background: var(--bg-neutral);
  border-color: var(--forest-green);
  color: var(--forest-green);
}

/* ── Right settings panel ── */
.right-panel {
  width: 248px; background: var(--bg); flex-shrink: 0;
  border-left: 1px solid var(--border); overflow-y: auto;
}
.rp-header {
  padding: 14px 18px; border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.rp-header-title { font-size: 14px; font-weight: 600; color: var(--content-primary); }
.rp-header-sub { font-size: 12px; color: var(--content-secondary); margin-top: 1px; }
.rp-body { padding: 16px 18px; }
.rp-sec {
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--content-tertiary);
  margin: 16px 0 8px;
}
.rp-sec:first-child { margin-top: 0; }
.rp-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.rp-lbl { font-size: 13px; font-weight: 500; color: var(--content-secondary); }

/* Wise-style text input in panel */
.rp-input {
  width: 100%;
  border: none; border-bottom: 1.5px solid var(--border-strong);
  padding: 7px 0; font-size: 13px; font-family: var(--font);
  color: var(--content-primary); background: transparent;
  outline: none; margin-bottom: 12px;
}
.rp-input:focus { border-color: var(--forest-green); }
.rp-input::placeholder { color: var(--content-tertiary); }
.rp-textarea { height: 56px; resize: none; }

/* Toggle */
.toggle-wrap { position: relative; width: 40px; height: 22px; cursor: pointer; flex-shrink: 0; }
.toggle-track {
  width: 40px; height: 22px; border-radius: ${r.full};
  transition: background 200ms;
}
.toggle-thumb {
  position: absolute; top: 3px; left: 3px;
  width: 16px; height: 16px; border-radius: ${r.full};
  background: var(--bg); box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 200ms;
}
.toggle-on .toggle-track { background: var(--forest-green); }
.toggle-off .toggle-track { background: var(--border-strong); }
.toggle-on .toggle-thumb { transform: translateX(18px); }

/* Options editor in panel */
.opt-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.opt-item { display: flex; align-items: center; gap: 6px; }
.opt-item input {
  flex: 1; border: none; border-bottom: 1px solid var(--border);
  padding: 5px 0; font-size: 13px; font-family: var(--font);
  color: var(--content-primary); background: transparent; outline: none;
}
.opt-item input:focus { border-color: var(--forest-green); }
.opt-del {
  width: 20px; height: 20px; border-radius: ${r.full};
  border: none; background: transparent; cursor: pointer;
  color: var(--content-tertiary); font-size: 14px;
  display: flex; align-items: center; justify-content: center;
}
.opt-del:hover { color: var(--negative); }
.add-opt-btn {
  font-size: 12px; font-weight: 600; color: var(--forest-green);
  background: none; border: none; cursor: pointer;
  font-family: var(--font); padding: 2px 0;
}

/* Logic chip */
.logic-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 10px;
  background: rgba(22,51,0,0.06);
  border: 1px solid rgba(22,51,0,0.15);
  border-radius: ${r.sm};
  font-size: 12px; color: var(--forest-green); font-weight: 500;
  margin-bottom: 5px;
}
.logic-dot { width: 6px; height: 6px; border-radius: ${r.full}; background: var(--bright-green); flex-shrink: 0; }
.logic-add-btn {
  border: 1.5px dashed var(--border);
  border-radius: ${r.sm}; padding: 7px; font-size: 12px;
  color: var(--content-tertiary); cursor: pointer; text-align: center; width: 100%;
  background: transparent; font-family: var(--font);
}
.logic-add-btn:hover { border-color: var(--forest-green); color: var(--forest-green); }

/* ── Publish modal ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(22,51,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; animation: fadeIn 150ms;
}
.modal {
  background: var(--bg); border-radius: ${r.xl};
  width: 460px; max-height: 88vh; overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
  animation: slideUp 200ms cubic-bezier(0.34,1.56,0.64,1);
}
.modal-success-head {
  text-align: center; padding: 32px 28px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--forest-green);
  border-radius: ${r.xl} ${r.xl} 0 0;
}
.modal-confetti { display: flex; justify-content: center; gap: 6px; margin-bottom: 14px; }
.cf-dot {
  width: 8px; height: 8px; border-radius: ${r.full};
  animation: dotBounce 0.6s ease-in-out infinite;
}
.modal-pub-title { font-size: 22px; font-weight: 700; color: var(--bright-green); letter-spacing: -0.3px; margin-bottom: 4px; }
.modal-pub-sub { font-size: 13px; color: rgba(159,232,112,0.7); }
.modal-body { padding: 22px 26px; }
.share-lbl {
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--content-tertiary); margin-bottom: 8px;
}
.url-row { display: flex; gap: 8px; margin-bottom: 18px; }
.url-box {
  flex: 1; background: var(--bg-neutral); border: none;
  border-radius: ${r.sm}; padding: 9px 12px;
  font-size: 13px; color: var(--content-secondary); font-family: 'Courier New', monospace;
}
.share-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
.share-pill {
  display: flex; align-items: center; gap: 5px;
  border: 1.5px solid var(--border); border-radius: ${r.full};
  padding: 6px 14px; font-size: 13px; font-weight: 500;
  color: var(--content-secondary); cursor: pointer; background: var(--bg);
  transition: var(--transition);
}
.share-pill:hover { border-color: var(--forest-green); color: var(--forest-green); background: rgba(22,51,0,0.04); }
.access-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.access-row2 { display: flex; align-items: center; justify-content: space-between; }
.access-lbl { font-size: 14px; color: var(--content-secondary); }
.wise-select {
  border: 1.5px solid var(--border); border-radius: ${r.sm};
  padding: 6px 10px; font-size: 13px; font-family: var(--font);
  color: var(--content-primary); background: var(--bg); outline: none;
}
.wise-select:focus { border-color: var(--forest-green); }
.modal-footer { display: flex; gap: 8px; padding: 18px 26px; border-top: 1px solid var(--border); }

/* ── Template Gallery ── */
.gallery-page { flex: 1; overflow-y: auto; padding: 32px; background: #FAFAFA; }
.gallery-title { font-size: 24px; font-weight: 700; color: var(--content-primary); letter-spacing: -0.4px; margin-bottom: 4px; }
.gallery-sub { font-size: 14px; color: var(--content-secondary); margin-bottom: 20px; }
.cat-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; }
.cat-pill {
  padding: 6px 16px; border-radius: ${r.full};
  border: 1.5px solid var(--border);
  font-size: 13px; font-weight: 500; color: var(--content-secondary);
  cursor: pointer; background: var(--bg); transition: var(--transition);
}
.cat-pill:hover { border-color: var(--border-strong); color: var(--content-primary); }
.cat-pill.active { background: var(--forest-green); color: var(--bright-green); border-color: var(--forest-green); }
.templates-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.tpl-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: ${r.md}; overflow: hidden; cursor: pointer;
  transition: all 160ms ease;
}
.tpl-card:hover { border-color: var(--border-strong); box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.tpl-head {
  height: 88px; display: flex; align-items: center;
  justify-content: center; font-size: 36px;
}
.tpl-body { padding: 14px 16px; }
.tpl-name { font-size: 14px; font-weight: 600; color: var(--content-primary); margin-bottom: 3px; }
.tpl-cat { font-size: 12px; color: var(--content-tertiary); margin-bottom: 8px; }
.tpl-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tpl-tag {
  font-size: 11px; font-weight: 500; padding: 2px 8px;
  border-radius: ${r.full};
  background: rgba(22,51,0,0.07); color: var(--forest-green);
}

/* ── Analytics ── */
.analytics-page { flex: 1; overflow-y: auto; padding: 32px; background: #FAFAFA; }
.analytics-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.analytics-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: ${r.md}; padding: 20px;
}
.ac-title { font-size: 14px; font-weight: 600; color: var(--content-primary); margin-bottom: 16px; }
.funnel-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.funnel-name { font-size: 12px; font-weight: 500; color: var(--content-secondary); width: 80px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.funnel-bar-bg { flex: 1; height: 18px; background: var(--bg-neutral); border-radius: 4px; overflow: hidden; }
.funnel-fill { height: 100%; border-radius: 4px; }
.funnel-pct { font-size: 12px; font-weight: 600; color: var(--content-secondary); width: 36px; text-align: right; }
.device-row { display: flex; gap: 10px; }
.device-card { flex: 1; background: var(--bg-neutral); border-radius: ${r.sm}; padding: 14px; text-align: center; }
.device-emoji { font-size: 22px; margin-bottom: 4px; }
.device-pct { font-size: 20px; font-weight: 700; color: var(--content-primary); }
.device-lbl { font-size: 11px; color: var(--content-secondary); }
.insight-card {
  background: rgba(237,200,67,0.15);
  border: 1px solid rgba(237,200,67,0.4);
  border-radius: ${r.sm}; padding: 10px 12px;
  font-size: 12px; color: #5c4b00; line-height: 1.5; margin-top: 10px;
}
.export-row { display: flex; gap: 6px; margin-top: 14px; }
.export-btn {
  flex: 1; border: 1.5px solid var(--border); border-radius: ${r.full};
  padding: 8px; font-size: 12px; font-weight: 600;
  color: var(--content-secondary); background: var(--bg);
  cursor: pointer; font-family: var(--font); transition: var(--transition);
}
.export-btn:hover { border-color: var(--forest-green); color: var(--forest-green); }

/* ── Logic view ── */
.logic-page { flex: 1; overflow-y: auto; padding: 24px; background: #F5F5F2; display: flex; flex-direction: column; gap: 12px; }
.logic-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: ${r.md}; padding: 18px 20px;
}
.lc-title { font-size: 13px; font-weight: 600; color: var(--content-primary); margin-bottom: 12px; }
.lc-rule {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-neutral); border-radius: ${r.sm};
  padding: 8px 10px; font-size: 12px; color: var(--content-secondary);
  margin-bottom: 6px;
}
.lc-rule .if-code {
  background: rgba(22,51,0,0.1); color: var(--forest-green);
  padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 600;
}
.lc-rule .then { color: var(--forest-green); font-weight: 600; }
.lc-empty { font-size: 13px; color: var(--content-tertiary); text-align: center; padding: 16px; }

/* ── Style panel ── */
.style-panel-inner { padding: 16px 18px; }
.theme-swatch-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-bottom: 12px; }
.theme-swatch {
  height: 44px; border-radius: ${r.sm}; cursor: pointer;
  border: 2px solid transparent; transition: var(--transition);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
}
.theme-swatch.selected { border-color: var(--content-primary); box-shadow: 0 0 0 1px var(--content-primary); }

/* ── Preview shell ── */
.preview-shell {
  flex: 1; overflow-y: auto; background: #F5F5F2;
  display: flex; flex-direction: column; align-items: center; padding: 28px 20px 80px;
}
.preview-toolbar { display: flex; gap: 6px; margin-bottom: 20px; }
.preview-form {
  width: 100%; max-width: 560px; background: var(--bg);
  border: 1px solid var(--border); border-radius: ${r.lg};
  overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
.preview-accent { height: 6px; background: var(--forest-green); }
.preview-head { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
.preview-title { font-size: 22px; font-weight: 700; color: var(--content-primary); letter-spacing: -0.3px; }
.preview-desc { font-size: 14px; color: var(--content-secondary); margin-top: 6px; line-height: 1.5; }
.preview-field { padding: 18px 32px; border-bottom: 1px solid var(--border); }
.preview-field:last-child { border-bottom: none; }
.preview-label { font-size: 14px; font-weight: 600; color: var(--content-primary); margin-bottom: 8px; }
.preview-help { font-size: 12px; color: var(--content-tertiary); margin-bottom: 6px; }
/* Wise-style underline input for preview */
.preview-input {
  width: 100%; border: none; border-bottom: 1.5px solid var(--border-strong);
  border-radius: 0; padding: 10px 0;
  font-size: 15px; font-family: var(--font); color: var(--content-primary);
  background: transparent; outline: none;
  transition: border-color var(--transition);
}
.preview-input:focus { border-color: var(--forest-green); }
.preview-input::placeholder { color: var(--content-tertiary); }
.preview-foot { padding: 20px 32px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
.submitted-state { text-align: center; padding: 48px 32px; }
.submitted-icon { font-size: 52px; margin-bottom: 16px; }
.submitted-title { font-size: 24px; font-weight: 700; color: var(--content-primary); letter-spacing: -0.4px; margin-bottom: 6px; }
.submitted-sub { font-size: 14px; color: var(--content-secondary); line-height: 1.6; }

/* ── Toast ── */
.toast-area { position: fixed; bottom: 24px; right: 24px; z-index: 300; display: flex; flex-direction: column; gap: 8px; }
.toast {
  background: var(--forest-green); color: var(--bright-green);
  padding: 12px 20px; border-radius: ${r.md};
  font-size: 13px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(22,51,0,0.3);
  display: flex; align-items: center; gap: 8px;
  animation: slideUp 200ms cubic-bezier(0.34,1.56,0.64,1);
}
.toast.error { background: var(--negative); color: #fff; }

/* ── Animations ── */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes dotBounce {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-5px); }
}
.pop-in { animation: slideUp 150ms cubic-bezier(0.34,1.56,0.64,1); }
`;

/* ── Data ─────────────────────────────────────────────── */

const FIELD_TYPES = [
  { type:"short_text",    label:"Short text",      icon:"T",  group:"Basic" },
  { type:"long_text",     label:"Long text",        icon:"¶",  group:"Basic" },
  { type:"email",         label:"Email",            icon:"@",  group:"Basic" },
  { type:"phone",         label:"Phone",            icon:"✆",  group:"Basic" },
  { type:"number",        label:"Number",           icon:"#",  group:"Basic" },
  { type:"multiple_choice",label:"Multiple choice", icon:"◉",  group:"Basic" },
  { type:"checkbox",      label:"Checkboxes",       icon:"☑",  group:"Basic" },
  { type:"dropdown",      label:"Dropdown",         icon:"▾",  group:"Basic" },
  { type:"rating",        label:"Rating",           icon:"★",  group:"Advanced" },
  { type:"scale",         label:"Scale",            icon:"⟷",  group:"Advanced" },
  { type:"date",          label:"Date",             icon:"⊡",  group:"Advanced" },
  { type:"file",          label:"File upload",      icon:"↑",  group:"Advanced" },
  { type:"signature",     label:"Signature",        icon:"✎",  group:"Advanced" },
  { type:"divider",       label:"Divider",          icon:"—",  group:"Layout" },
  { type:"heading",       label:"Heading",          icon:"H",  group:"Layout" },
];

const GROUP_COLORS = {
  Basic:    { bg:"rgba(22,51,0,0.08)",   color:W.forestGreen },
  Advanced: { bg:"rgba(160,225,225,0.3)", color:"#0a6060" },
  Layout:   { bg:"rgba(255,192,145,0.3)", color:"#7a3000" },
};

const SAMPLE_TEMPLATES = [
  { id:"t1", name:"Customer Feedback", category:"Business", emoji:"💬", fields:["short_text","email","rating","long_text"], color:W.forestGreen },
  { id:"t2", name:"Job Application",   category:"HR",       emoji:"💼", fields:["short_text","email","phone","long_text","file"], color:W.darkPurple },
  { id:"t3", name:"Event RSVP",        category:"Events",   emoji:"🎉", fields:["short_text","email","multiple_choice","number"], color:"#0a6060" },
  { id:"t4", name:"Course Evaluation", category:"Education",emoji:"📚", fields:["short_text","rating","scale","long_text"], color:"#7a3000" },
  { id:"t5", name:"Bug Report",        category:"Tech",     emoji:"🐛", fields:["short_text","dropdown","long_text","file"], color:W.darkCharcoal },
  { id:"t6", name:"Contact Form",      category:"Business", emoji:"✉️", fields:["short_text","email","phone","long_text"], color:"#4a0020" },
];

function genId() { return Math.random().toString(36).slice(2,9); }

function mkField(type) {
  const base = { id:genId(), type, label:FIELD_TYPES.find(f=>f.type===type)?.label||"Field", required:false, placeholder:"", helpText:"" };
  if (["multiple_choice","checkbox","dropdown"].includes(type)) base.options=["Option 1","Option 2","Option 3"];
  if (type==="rating")  { base.maxRating=5; }
  if (type==="scale")   { base.min=1; base.max=10; }
  return base;
}

const INITIAL_FORMS = [
  {
    id:"f1", title:"Job Application Form",
    description:"We'd love to learn more about you. This takes about 5 minutes.",
    status:"live", responses:142, completion:68, color:W.forestGreen,
    fields:[
      {...mkField("short_text"), id:"q1", label:"Full name", required:true},
      {...mkField("email"),      id:"q2", label:"Email address", required:true, placeholder:"you@example.com"},
      {...mkField("multiple_choice"), id:"q3", label:"Role applying for", required:true, options:["Frontend Engineer","Backend Engineer","Product Designer","Product Manager"]},
      {...mkField("long_text"),  id:"q4", label:"Tell us about yourself", placeholder:"Share your experience and what excites you…"},
      {...mkField("file"),       id:"q5", label:"Upload your CV"},
    ],
  },
  {
    id:"f2", title:"Customer Feedback",
    description:"Help us make Wise even better.",
    status:"live", responses:891, completion:82, color:"#0a6060",
    fields:[
      {...mkField("short_text"), id:"r1", label:"Your name"},
      {...mkField("rating"),     id:"r2", label:"Overall satisfaction", required:true},
      {...mkField("long_text"),  id:"r3", label:"Any other feedback?"},
    ],
  },
  {
    id:"f3", title:"Event RSVP — Spring",
    description:"Join us for our annual team gathering.",
    status:"draft", responses:0, completion:0, color:"#7a3000",
    fields:[
      {...mkField("short_text"),     id:"e1", label:"Your name", required:true},
      {...mkField("email"),          id:"e2", label:"Email",     required:true},
      {...mkField("multiple_choice"),id:"e3", label:"Will you attend?", options:["Yes, I'll be there","No, can't make it","Maybe"]},
      {...mkField("number"),         id:"e4", label:"Number of guests"},
    ],
  },
];

/* ── Components ───────────────────────────────────────── */

function Toggle({ on, onChange }) {
  return (
    <div className={`toggle-wrap ${on?"toggle-on":"toggle-off"}`} onClick={()=>onChange(!on)}>
      <div className="toggle-track"/>
      <div className="toggle-thumb"/>
    </div>
  );
}

function FieldPreview({ field }) {
  const { type, label, required, helpText, placeholder, options, maxRating=5, min=1, max=10 } = field;
  const isLayout = ["divider","heading"].includes(type);
  return (
    <>
      {!isLayout && (
        <div className="field-label-row">
          <span className="field-label-text">{label||"Untitled"}</span>
          {required && <span className="req-star">*</span>}
        </div>
      )}
      {helpText && <div className="help-text-note">{helpText}</div>}
      {["short_text","email","phone","number"].includes(type) && (
        <div className="wise-input" style={{color:W.contentTertiary}}>{placeholder||"—"}</div>
      )}
      {type==="long_text" && <textarea className="wise-input wise-textarea" readOnly placeholder={placeholder||"Long answer"} style={{paddingTop:8}}/>}
      {type==="date" && <div className="wise-input">MM / DD / YYYY</div>}
      {["multiple_choice","checkbox"].includes(type) && (
        <div className="options-list">
          {(options||[]).map((o,i)=>(
            <div key={i} className="option-row">
              {type==="multiple_choice"
                ? <div className={`option-circle ${i===0?"sel":""}`}/>
                : <div className={`option-square ${i===0?"sel":""}`}/>
              }
              {o}
            </div>
          ))}
        </div>
      )}
      {type==="dropdown" && (
        <div className="wise-input" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>{(options||[])[0]||"Select…"}</span><span>▾</span>
        </div>
      )}
      {type==="rating" && (
        <div className="star-row">
          {Array.from({length:maxRating},(_,i)=>(
            <span key={i} className={`star ${i<3?"lit":""}`}>★</span>
          ))}
        </div>
      )}
      {type==="scale" && (
        <div className="scale-row">
          {Array.from({length:Math.min(max-min+1,10)},(_,i)=>(
            <div key={i} className={`scale-dot ${i===0?"sel":""}`}>{min+i}</div>
          ))}
        </div>
      )}
      {type==="file" && (
        <div className="wise-input" style={{color:W.contentTertiary,display:"flex",alignItems:"center",gap:8}}>
          ↑ Click to upload
        </div>
      )}
      {type==="signature" && (
        <div className="wise-input" style={{height:56,display:"flex",alignItems:"flex-end",color:"rgba(14,15,12,0.2)",fontStyle:"italic",fontSize:20}}>
          Sign here
        </div>
      )}
      {type==="divider" && <div style={{height:1,background:W.borderNeutral,margin:"4px 0"}}/>}
      {type==="heading" && <div style={{fontSize:18,fontWeight:700,color:W.contentPrimary}}>{label||"Section"}</div>}
    </>
  );
}

function FieldSettings({ field, onUpdate, onDelete }) {
  if (!field) return (
    <div className="right-panel" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",padding:24,color:W.contentTertiary}}>
        <div style={{fontSize:28,marginBottom:10}}>⬅</div>
        <div style={{fontSize:13}}>Select a field to edit its settings</div>
      </div>
    </div>
  );
  const isLayout = ["divider","heading"].includes(field.type);
  const hasOptions = ["multiple_choice","checkbox","dropdown"].includes(field.type);
  return (
    <div className="right-panel">
      <div className="rp-header">
        <div className="rp-header-title">Field settings</div>
        <div className="rp-header-sub">{FIELD_TYPES.find(f=>f.type===field.type)?.label}</div>
      </div>
      <div className="rp-body">
        {!isLayout && (
          <>
            <div className="rp-row"><span className="rp-lbl">Required</span><Toggle on={field.required} onChange={v=>onUpdate({required:v})}/></div>
            <div className="rp-row"><span className="rp-lbl">Hidden</span><Toggle on={!!field.hidden} onChange={v=>onUpdate({hidden:v})}/></div>
          </>
        )}
        <div className="rp-sec">Label</div>
        <input className="rp-input" value={field.label} onChange={e=>onUpdate({label:e.target.value})} placeholder="Field label…"/>
        {!isLayout && <>
          <div className="rp-sec">Placeholder</div>
          <input className="rp-input" value={field.placeholder||""} onChange={e=>onUpdate({placeholder:e.target.value})} placeholder="Placeholder text…"/>
          <div className="rp-sec">Help text</div>
          <input className="rp-input" value={field.helpText||""} onChange={e=>onUpdate({helpText:e.target.value})} placeholder="Add help text…"/>
        </>}
        {hasOptions && <>
          <div className="rp-sec">Options</div>
          <div className="opt-list">
            {(field.options||[]).map((o,i)=>(
              <div key={i} className="opt-item">
                <input value={o} onChange={e=>{const op=[...(field.options||[])];op[i]=e.target.value;onUpdate({options:op});}}/>
                <button className="opt-del" onClick={()=>onUpdate({options:(field.options||[]).filter((_,j)=>j!==i)})}>✕</button>
              </div>
            ))}
          </div>
          <button className="add-opt-btn" onClick={()=>onUpdate({options:[...(field.options||[]),`Option ${(field.options||[]).length+1}`]})}>+ Add option</button>
        </>}
        {field.type==="rating" && <>
          <div className="rp-sec">Max stars</div>
          <select className="wise-select" value={field.maxRating||5} onChange={e=>onUpdate({maxRating:+e.target.value})} style={{width:"100%",marginBottom:12}}>
            {[3,4,5,7,10].map(n=><option key={n} value={n}>{n} stars</option>)}
          </select>
        </>}
        {field.type==="scale" && <>
          <div className="rp-sec">Range</div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}><div style={{fontSize:11,color:W.contentTertiary,marginBottom:3}}>Min</div><input className="rp-input" type="number" value={field.min??1} onChange={e=>onUpdate({min:+e.target.value})} style={{marginBottom:0}}/></div>
            <div style={{flex:1}}><div style={{fontSize:11,color:W.contentTertiary,marginBottom:3}}>Max</div><input className="rp-input" type="number" value={field.max??10} onChange={e=>onUpdate({max:+e.target.value})} style={{marginBottom:0}}/></div>
          </div>
        </>}
        <div className="rp-sec">Logic</div>
        <div className="logic-chip"><div className="logic-dot"/>Show always</div>
        <button className="logic-add-btn">+ Add conditional rule</button>
        <div style={{marginTop:20}}>
          <button className="btn btn-danger btn-sm" style={{width:"100%"}} onClick={onDelete}>Remove field</button>
        </div>
      </div>
    </div>
  );
}

function LogicView({ fields }) {
  const choiceFields = fields.filter(f=>["multiple_choice","checkbox","dropdown"].includes(f.type));
  return (
    <div className="logic-page">
      <div style={{fontSize:13,color:W.contentSecondary,marginBottom:4}}>
        Visual conditional logic — rules run in order and can show, hide, or branch fields.
      </div>
      {choiceFields.length===0 && (
        <div className="logic-card"><div className="lc-empty">Add multiple choice, checkbox, or dropdown fields to create conditional logic rules.</div></div>
      )}
      {choiceFields.map(f=>(
        <div key={f.id} className="logic-card pop-in">
          <div className="lc-title">When "{f.label}" is answered…</div>
          <div className="lc-rule">
            <span className="if-code">{(f.options||[])[0]||"Option"}</span>
            <span>→</span>
            <span className="then">Show next field</span>
          </div>
          <div className="lc-empty">+ Add rule for this field</div>
        </div>
      ))}
    </div>
  );
}

function StylePanel() {
  return (
    <div className="right-panel">
      <div className="rp-header"><div className="rp-header-title">Style</div><div className="rp-header-sub">Wise Design System</div></div>
      <div className="style-panel-inner">
        <div className="rp-sec" style={{marginTop:0}}>Brand colours</div>
        <div className="theme-swatch-grid">
          <div>
            <div className="theme-swatch selected" style={{background:W.forestGreen,color:W.brightGreen}}>Forest</div>
          </div>
          <div>
            <div className="theme-swatch" style={{background:W.darkPurple,color:W.brightPink}}>Dark Purple</div>
          </div>
          <div>
            <div className="theme-swatch" style={{background:"#0a6060",color:W.brightBlue}}>Teal</div>
          </div>
          <div>
            <div className="theme-swatch" style={{background:W.darkCharcoal,color:W.brightYellow}}>Charcoal</div>
          </div>
        </div>
        <div className="rp-sec">Typeface</div>
        <div style={{padding:"9px 0",borderBottom:`1px solid ${W.borderNeutral}`,fontSize:14,color:W.contentPrimary,fontWeight:500}}>Inter (default)</div>
        <div className="rp-sec">Corner radius</div>
        {["8px — sm","12px — md","16px — lg"].map(s=>(
          <div key={s} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${W.borderNeutral}`,fontSize:13,color:W.contentSecondary}}>
            {s}<input type="radio" name="radius" defaultChecked={s.startsWith("16")} style={{accentColor:W.forestGreen}}/>
          </div>
        ))}
        <div className="rp-sec">Custom CSS</div>
        <textarea className="rp-input rp-textarea" placeholder="/* Add custom styles… */" style={{fontFamily:"'Courier New',monospace",fontSize:11,height:80}}/>
      </div>
    </div>
  );
}

function PreviewView({ form }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const visible = form.fields.filter(f=>!["divider","heading"].includes(f.type));

  if (submitted) return (
    <div className="preview-shell">
      <div className="preview-form">
        <div className="preview-accent"/>
        <div className="submitted-state">
          <div className="submitted-icon">✅</div>
          <div className="submitted-title">Response submitted</div>
          <div className="submitted-sub">Thanks for filling out "{form.title}".<br/>Your response has been recorded.</div>
          <button className="btn btn-tertiary" style={{marginTop:20}} onClick={()=>{setSubmitted(false);setAnswers({});}}>Submit another</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="preview-shell">
      <div className="preview-toolbar">
        <button className="btn btn-tertiary btn-sm">💻 Desktop</button>
        <button className="btn btn-tertiary btn-sm">📱 Mobile</button>
      </div>
      <div className="preview-form">
        <div className="preview-accent" style={{background:form.color||W.forestGreen}}/>
        <div className="preview-head">
          <div className="preview-title">{form.title||"Untitled form"}</div>
          {form.description && <div className="preview-desc">{form.description}</div>}
        </div>
        {visible.map(field=>(
          <div key={field.id} className="preview-field">
            <div className="preview-label">{field.label}{field.required&&<span style={{color:W.sentimentNeg,marginLeft:3}}>*</span>}</div>
            {field.helpText && <div className="preview-help">{field.helpText}</div>}
            {["short_text","email","phone","number"].includes(field.type) && (
              <input className="preview-input" placeholder={field.placeholder||""} value={answers[field.id]||""} onChange={e=>setAnswers(a=>({...a,[field.id]:e.target.value}))}/>
            )}
            {field.type==="long_text" && (
              <textarea className="preview-input" style={{height:80,resize:"vertical"}} placeholder={field.placeholder||""} value={answers[field.id]||""} onChange={e=>setAnswers(a=>({...a,[field.id]:e.target.value}))}/>
            )}
            {["multiple_choice","checkbox"].includes(field.type) && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {(field.options||[]).map((o,i)=>(
                  <label key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:15,cursor:"pointer",color:W.contentPrimary}}>
                    <input type={field.type==="multiple_choice"?"radio":"checkbox"} name={field.id} style={{accentColor:W.forestGreen,width:18,height:18}}/>
                    {o}
                  </label>
                ))}
              </div>
            )}
            {field.type==="dropdown" && (
              <select className="preview-input" style={{cursor:"pointer"}}>
                <option value="">Select…</option>
                {(field.options||[]).map((o,i)=><option key={i}>{o}</option>)}
              </select>
            )}
            {field.type==="rating" && (
              <div style={{display:"flex",gap:6}}>
                {Array.from({length:field.maxRating||5},(_,i)=>(
                  <span key={i} style={{fontSize:28,cursor:"pointer",color:(answers[field.id]||0)>i?"#EDB843":"rgba(14,15,12,0.15)"}} onClick={()=>setAnswers(a=>({...a,[field.id]:i+1}))}>★</span>
                ))}
              </div>
            )}
            {field.type==="scale" && (
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {Array.from({length:(field.max||10)-(field.min||1)+1},(_,i)=>{
                  const v=(field.min||1)+i;
                  const sel=answers[field.id]===v;
                  return (
                    <div key={i} onClick={()=>setAnswers(a=>({...a,[field.id]:v}))}
                      style={{width:36,height:36,borderRadius:"50%",border:`1.5px solid ${sel?W.forestGreen:W.borderNeutral}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",background:sel?W.bgNeutral:"#fff",color:sel?W.forestGreen:W.contentSecondary,fontWeight:sel?700:400,transition:"all 150ms"}}>
                      {v}
                    </div>
                  );
                })}
              </div>
            )}
            {field.type==="date" && <input type="date" className="preview-input"/>}
            {field.type==="file" && (
              <label style={{display:"flex",alignItems:"center",gap:8,border:`2px dashed ${W.borderNeutral}`,borderRadius:r.sm,padding:"14px 16px",cursor:"pointer",fontSize:14,color:W.contentTertiary}}>
                ↑ Click to upload or drag & drop
                <input type="file" style={{display:"none"}}/>
              </label>
            )}
          </div>
        ))}
        <div className="preview-foot">
          <button className="btn btn-primary" style={{background:form.color||W.forestGreen,color:W.brightGreen}} onClick={()=>setSubmitted(true)}>Submit →</button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage({ form }) {
  const funnel = [
    {name:"Opened",    pct:100, color:W.forestGreen},
    {name:form.fields[0]?.label||"Q1", pct:89, color:W.forestGreen},
    {name:form.fields[1]?.label||"Q2", pct:76, color:W.forestGreen},
    {name:form.fields[2]?.label||"Q3", pct:52, color:W.sentimentWarn},
    {name:"Submitted", pct:47, color:W.sentimentPos},
  ];
  return (
    <div className="analytics-page">
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:28}}>
        <div>
          <div style={{fontSize:22,fontWeight:700,color:W.contentPrimary,letterSpacing:"-0.3px"}}>{form.title}</div>
          <div style={{fontSize:13,color:W.contentSecondary,marginTop:3}}>Analytics · Last 30 days</div>
        </div>
        <select className="wise-select"><option>Last 30 days</option><option>Last 7 days</option><option>All time</option></select>
      </div>
      <div className="stats-row" style={{marginBottom:20}}>
        {[{l:"Total views",v:"1,284",d:"+18%"},{l:"Submissions",v:String(form.responses||614),d:"+9%"},{l:"Completion",v:"47%",d:"+5pp"},{l:"Avg. time",v:"2m 38s",d:"−12s"}].map(s=>(
          <div key={s.l} className="stat-card">
            <div className="stat-label">{s.l}</div>
            <div className="stat-value">{s.v}</div>
            <div className="stat-delta">↑ {s.d} vs prev</div>
          </div>
        ))}
      </div>
      <div className="analytics-cards">
        <div className="analytics-card">
          <div className="ac-title">Completion funnel</div>
          {funnel.map((row,i)=>(
            <div key={i} className="funnel-row">
              <div className="funnel-name" title={row.name}>{row.name}</div>
              <div className="funnel-bar-bg"><div className="funnel-fill" style={{width:`${row.pct}%`,background:row.color}}/></div>
              <div className="funnel-pct">{row.pct}%</div>
            </div>
          ))}
          <div className="insight-card">⚠ High drop-off at "{form.fields[2]?.label||"Q3"}" — consider rephrasing or breaking into smaller steps.</div>
        </div>
        <div className="analytics-card">
          <div className="ac-title">Devices</div>
          <div className="device-row">
            <div className="device-card"><div className="device-emoji">💻</div><div className="device-pct">54%</div><div className="device-lbl">Desktop</div></div>
            <div className="device-card"><div className="device-emoji">📱</div><div className="device-pct">39%</div><div className="device-lbl">Mobile</div></div>
            <div className="device-card"><div className="device-emoji">📟</div><div className="device-pct">7%</div><div className="device-lbl">Tablet</div></div>
          </div>
          <div className="ac-title" style={{marginTop:20}}>Export responses</div>
          <div className="export-row">
            <button className="export-btn">CSV</button>
            <button className="export-btn">Google Sheets</button>
            <button className="export-btn">Webhook</button>
          </div>
          <div className="ac-title" style={{marginTop:20}}>Top drop-off fields</div>
          {form.fields.slice(0,3).map((f,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"6px 0",borderBottom:`1px solid ${W.borderNeutral}`,color:W.contentSecondary}}>
              <span>{f.label||"Field "+(i+1)}</span>
              <span style={{color:[W.contentTertiary,W.sentimentWarn,W.contentTertiary][i],fontWeight:600}}>{[12,23,5][i]}% left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublishModal({ form, onClose }) {
  const [copied, setCopied] = useState(false);
  const slug = (form.title||"my-form").toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
  const url = `wise-forms.io/s/${slug}`;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-success-head">
          <div className="modal-confetti">
            {[W.brightGreen,W.brightOrange,W.brightYellow,W.brightBlue,W.brightPink,W.brightGreen].map((c,i)=>(
              <div key={i} className="cf-dot" style={{background:c,animationDelay:`${i*0.1}s`}}/>
            ))}
          </div>
          <div className="modal-pub-title">Your form is live!</div>
          <div className="modal-pub-sub">{form.title} · Published just now</div>
        </div>
        <div className="modal-body">
          <div className="share-lbl">Share link</div>
          <div className="url-row">
            <div className="url-box">{url}</div>
            <button className="btn btn-primary btn-sm" onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}}>
              {copied?"Copied!":"Copy"}
            </button>
          </div>
          <div className="share-lbl">More ways to share</div>
          <div className="share-pills">
            <div className="share-pill">⊞ Embed code</div>
            <div className="share-pill">⬛ QR code</div>
            <div className="share-pill">✉ Email</div>
            <div className="share-pill">↗ Social card</div>
          </div>
          <div className="share-lbl">Access control</div>
          <div className="access-grid">
            <div className="access-row2"><span className="access-lbl">Visibility</span><select className="wise-select"><option>Public</option><option>Password protected</option><option>SSO only</option></select></div>
            <div className="access-row2"><span className="access-lbl">Max responses</span><select className="wise-select"><option>Unlimited</option><option>Custom limit</option></select></div>
            <div className="access-row2"><span className="access-lbl">Close date</span><select className="wise-select"><option>No end date</option><option>Set date</option></select></div>
            <div className="access-row2"><span className="access-lbl">CAPTCHA</span><Toggle on={true} onChange={()=>{}}/></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-tertiary" style={{flex:1}} onClick={onClose}>Back to editor</button>
          <button className="btn btn-primary" style={{flex:1,background:W.forestGreen,color:W.brightGreen}}>View live form →</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ forms, onNew, onOpen, onTemplates }) {
  const [q, setQ] = useState("");
  const filtered = forms.filter(f=>f.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="dashboard">
      <div className="dash-sidebar">
        <div className="dash-nav-section">Workspace</div>
        <div className="dash-nav-item active"><span className="dash-nav-icon">⊟</span>My forms</div>
        <div className="dash-nav-item"><span className="dash-nav-icon">⊞</span>Shared with me</div>
        <div className="dash-nav-item" onClick={onTemplates}><span className="dash-nav-icon">⊡</span>Templates</div>
        <div className="dash-nav-item"><span className="dash-nav-icon">◈</span>Analytics</div>
        <div className="dash-nav-section">Folders</div>
        <div className="dash-nav-item" style={{paddingLeft:28,fontSize:13}}>Client work</div>
        <div className="dash-nav-item" style={{paddingLeft:28,fontSize:13}}>Surveys</div>
        <div className="dash-nav-item" style={{paddingLeft:28,fontSize:13}}>Archive</div>
        <div className="dash-nav-section">Account</div>
        <div className="dash-nav-item"><span className="dash-nav-icon">⚙</span>Integrations</div>
        <div className="dash-nav-item"><span className="dash-nav-icon">☰</span>Settings</div>
      </div>
      <div className="dash-main">
        <div className="dash-page-header">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
            <div>
              <div className="dash-page-title">My forms</div>
              <div className="dash-page-sub">{forms.length} forms · updated just now</div>
            </div>
            <button className="btn btn-primary" style={{background:W.forestGreen,color:W.brightGreen}} onClick={onNew}>+ New form</button>
          </div>
          <div className="stats-row">
            {[{l:"Total responses",v:"2,847",d:"+12%"},{l:"Completion rate",v:"64%",d:"+5pp"},{l:"Active forms",v:String(forms.filter(f=>f.status==="live").length),d:"this week"},{l:"Avg. time",v:"2m 14s",d:"−8s"}].map(s=>(
              <div key={s.l} className="stat-card">
                <div className="stat-label">{s.l}</div>
                <div className="stat-value">{s.v}</div>
                <div className="stat-delta">↑ {s.d} vs last period</div>
              </div>
            ))}
          </div>
        </div>
        <div className="search-row">
          <input className="w-search" placeholder="Search forms…" value={q} onChange={e=>setQ(e.target.value)}/>
          <button className="filter-chip">Status ↓</button>
          <button className="filter-chip">Date ↓</button>
        </div>
        <div className="section-row">
          <div className="section-title">All forms</div>
          <button className="link-btn">View all →</button>
        </div>
        {filtered.length===0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">{q?"No results":"Create your first form"}</div>
            <div className="empty-desc">{q?"Try a different search term.":"Start from scratch or use a template — your first form takes less than 3 minutes."}</div>
            {!q && <button className="btn btn-primary" style={{background:W.forestGreen,color:W.brightGreen}} onClick={onNew}>+ New form</button>}
          </div>
        ) : (
          <div className="forms-grid">
            {filtered.map(form=>(
              <div key={form.id} className="form-card" onClick={()=>onOpen(form.id)}>
                <div className="form-card-thumb" style={{background:`${form.color}12`}}>
                  <svg width="64" height="48" viewBox="0 0 64 48">
                    <rect x="4" y="4" width="56" height="9" rx="3" fill={form.color} opacity=".35"/>
                    <rect x="4" y="18" width="42" height="5" rx="2" fill={form.color} opacity=".2"/>
                    <rect x="4" y="28" width="50" height="5" rx="2" fill={form.color} opacity=".2"/>
                    <rect x="4" y="38" width="30" height="4" rx="2" fill={form.color} opacity=".12"/>
                  </svg>
                </div>
                <div className="form-card-body">
                  <div className="form-card-name">{form.title}</div>
                  <div className="form-card-meta"><span>{form.responses} responses</span><span>{form.fields.length} fields</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{width:`${form.completion}%`,background:form.color}}/></div>
                  <span className={`status-chip ${form.status==="live"?"status-live":form.status==="draft"?"status-draft":"status-closed"}`}>
                    {form.status==="live"?"● Live":form.status==="draft"?"○ Draft":"× Closed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateGallery({ onUse }) {
  const [cat, setCat] = useState("All");
  const cats = ["All","Business","HR","Events","Education","Tech"];
  const filtered = cat==="All" ? SAMPLE_TEMPLATES : SAMPLE_TEMPLATES.filter(t=>t.category===cat);
  return (
    <div className="gallery-page">
      <div className="gallery-title">Template gallery</div>
      <div className="gallery-sub">Start with a professionally designed template and make it yours in minutes.</div>
      <div className="search-row"><input className="w-search" placeholder="Search templates…"/></div>
      <div className="cat-pills">
        {cats.map(c=><button key={c} className={`cat-pill ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      <div className="templates-grid">
        {filtered.map(t=>(
          <div key={t.id} className="tpl-card" onClick={()=>onUse(t)}>
            <div className="tpl-head" style={{background:`${t.color}15`}}><span>{t.emoji}</span></div>
            <div className="tpl-body">
              <div className="tpl-name">{t.name}</div>
              <div className="tpl-cat">{t.category}</div>
              <div className="tpl-tags">
                {t.fields.slice(0,3).map((f,i)=><span key={i} className="tpl-tag">{FIELD_TYPES.find(ft=>ft.type===f)?.label}</span>)}
                {t.fields.length>3 && <span className="tpl-tag">+{t.fields.length-3}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toasts({ toasts }) {
  return (
    <div className="toast-area">
      {toasts.map(t=>(
        <div key={t.id} className={`toast ${t.type||""}`}>
          <span>{t.type==="error"?"✕":"✓"}</span>{t.message}
        </div>
      ))}
    </div>
  );
}

/* ── Main App ──────────────────────────────────────── */
export default function Sample() {
  const [view, setView]               = useState("dashboard");
  const [forms, setForms]             = useState(INITIAL_FORMS);
  const [currentId, setCurrentId]     = useState(null);
  const [edTab, setEdTab]             = useState("edit");
  const [selFieldId, setSelFieldId]   = useState(null);
  const [showPublish, setShowPublish] = useState(false);
  const [toasts, setToasts]           = useState([]);
  const [libSearch, setLibSearch]     = useState("");
  const [dragId, setDragId]           = useState(null);
  const [dragOvId, setDragOvId]       = useState(null);

  const form = forms.find(f=>f.id===currentId);
  const selField = form?.fields.find(f=>f.id===selFieldId);

  function toast(message, type="") {
    const id=genId();
    setToasts(t=>[...t,{id,message,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000);
  }

  function updateForm(up) {
    setForms(fs=>fs.map(f=>f.id===currentId?{...f,...up}:f));
  }

  function addField(type) {
    const field=mkField(type);
    updateForm({fields:[...(form?.fields||[]),field]});
    setSelFieldId(field.id);
    toast(`Added ${FIELD_TYPES.find(f=>f.type===type)?.label}`);
  }

  function updateField(id,up) {
    updateForm({fields:form.fields.map(f=>f.id===id?{...f,...up}:f)});
  }

  function deleteField(id) {
    updateForm({fields:form.fields.filter(f=>f.id!==id)});
    if(selFieldId===id) setSelFieldId(null);
    toast("Field removed");
  }

  function duplicateField(id) {
    const f=form.fields.find(x=>x.id===id); if(!f) return;
    const copy={...f,id:genId()};
    const idx=form.fields.indexOf(f);
    const nf=[...form.fields]; nf.splice(idx+1,0,copy);
    updateForm({fields:nf}); setSelFieldId(copy.id); toast("Field duplicated");
  }

  function handleDrop(targetId) {
    if(!dragId||dragId===targetId){setDragId(null);setDragOvId(null);return;}
    const ff=[...form.fields];
    const from=ff.findIndex(f=>f.id===dragId);
    const to=ff.findIndex(f=>f.id===targetId);
    const [mv]=ff.splice(from,1); ff.splice(to,0,mv);
    updateForm({fields:ff}); setDragId(null); setDragOvId(null);
  }

  function createForm(tpl) {
    const id=genId();
    const newForm={
      id, title:tpl?tpl.name:"", description:"",
      status:"draft", responses:0, completion:0,
      color:tpl?.color||W.forestGreen,
      fields:tpl?tpl.fields.map(t=>mkField(t)):[mkField("short_text")],
    };
    setForms(fs=>[newForm,...fs]);
    setCurrentId(id); setEdTab("edit"); setView("editor");
    toast(tpl?`Template "${tpl.name}" applied`:"New form created");
  }

  function handlePublish() {
    updateForm({status:"live"});
    setShowPublish(true);
    toast("Form published!", "");
  }

  const filteredTypes = FIELD_TYPES.filter(f=>f.label.toLowerCase().includes(libSearch.toLowerCase()));
  const groups = [...new Set(filteredTypes.map(f=>f.group))];

  // ── DASHBOARD ──────────────────────────────────────
  if(view==="dashboard") return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <nav className="topnav">
          <div className="topnav-logo">
            <div className="logo-flag">
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#163300"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#163300"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#163300"/>
                <path d="M11 9v6M8 12h6" stroke="#163300" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            FormCraft
          </div>
          <div className="topnav-right">
            <button className="btn btn-secondary btn-sm" onClick={()=>setView("templates")}>Templates</button>
            <button className="btn btn-primary" style={{background:W.brightGreen,color:W.forestGreen}} onClick={()=>createForm()}>+ New form</button>
            <div className="avatar">MR</div>
          </div>
        </nav>
        <Dashboard forms={forms} onNew={()=>createForm()} onOpen={id=>{setCurrentId(id);setEdTab("edit");setView("editor");}} onTemplates={()=>setView("templates")}/>
      </div>
      <Toasts toasts={toasts}/>
    </>
  );

  // ── TEMPLATES ──────────────────────────────────────
  if(view==="templates") return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <nav className="topnav">
          <div className="topnav-logo" onClick={()=>setView("dashboard")}>
            <div className="logo-flag">
              <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#163300"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#163300"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#163300"/><path d="M11 9v6M8 12h6" stroke="#163300" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            FormCraft
          </div>
          <div className="topnav-sep"/>
          <div className="topnav-breadcrumb">
            <span style={{cursor:"pointer"}} onClick={()=>setView("dashboard")}>Dashboard</span>
            <span className="bc-sep"> / </span>
            <span className="bc-cur">Templates</span>
          </div>
          <div className="topnav-right">
            <button className="btn btn-secondary btn-sm" onClick={()=>setView("dashboard")}>← Back</button>
            <div className="avatar">MR</div>
          </div>
        </nav>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <TemplateGallery onUse={t=>createForm(t)}/>
        </div>
      </div>
      <Toasts toasts={toasts}/>
    </>
  );

  // ── EDITOR ──────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <nav className="topnav">
          <div className="topnav-logo" style={{cursor:"pointer"}} onClick={()=>setView("dashboard")}>
            <div className="logo-flag">
              <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#163300"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#163300"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#163300"/><path d="M11 9v6M8 12h6" stroke="#163300" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            FormCraft
          </div>
          <div className="topnav-sep"/>
          <div className="topnav-breadcrumb">
            <span style={{cursor:"pointer"}} onClick={()=>setView("dashboard")}>Forms</span>
            <span className="bc-sep"> / </span>
            <span className="bc-cur">{form?.title||"Untitled"}</span>
          </div>
          <div className="topnav-center">
            <div className="tab-group">
              {[["edit","Edit"],["logic","Logic"],["style","Style"],["preview","Preview"],["analytics","Analytics"]].map(([k,l])=>(
                <button key={k} className={`tab-pill ${edTab===k?"active":""}`} onClick={()=>setEdTab(k)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="topnav-right">
            <div className="saved-badge">Saved</div>
            <button className="btn btn-secondary btn-sm" onClick={()=>toast("Share link copied!")}>Share</button>
            <button className="btn btn-primary" style={{background:W.brightGreen,color:W.forestGreen}} onClick={handlePublish}>
              {form?.status==="live"?"Update →":"Publish →"}
            </button>
            <div className="avatar">MR</div>
          </div>
        </nav>

        <div className="editor-body">
          {/* ── LEFT: field library ── */}
          {edTab==="edit" && (
            <div className="field-lib">
              <div className="lib-search">
                <input placeholder="Search fields…" value={libSearch} onChange={e=>setLibSearch(e.target.value)}/>
              </div>
              {groups.map(g=>(
                <div key={g}>
                  <div className="lib-group-title">{g}</div>
                  {filteredTypes.filter(f=>f.group===g).map(f=>{
                    const c=GROUP_COLORS[g];
                    return (
                      <div key={f.type} className="field-chip" onClick={()=>addField(f.type)}>
                        <div className="chip-icon" style={{background:c.bg,color:c.color}}>{f.icon}</div>
                        {f.label}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {edTab==="style" && (
            <div className="field-lib" style={{padding:0}}>
              <div className="lib-search"><input placeholder="Search…"/></div>
              <div style={{padding:"12px 14px",fontSize:12,color:W.contentTertiary,lineHeight:1.6}}>
                Wise Design System tokens are pre-applied. Adjust accent colour and radius below.
              </div>
            </div>
          )}

          {/* ── CENTER ── */}
          {edTab==="edit" && form && (
            <div className="canvas-area">
              <div className="form-wrapper">
                <div className="form-header-card">
                  <div className="form-header-accent"/>
                  <div className="form-header-inner">
                    <input className="form-title-input" value={form.title} onChange={e=>updateForm({title:e.target.value})} placeholder="Form title…"/>
                    <input className="form-desc-input" value={form.description} onChange={e=>updateForm({description:e.target.value})} placeholder="Add a description (optional)…"/>
                  </div>
                </div>
                <div className="fields-wrap">
                  {form.fields.map(field=>(
                    <div
                      key={field.id}
                      className={`field-block pop-in ${selFieldId===field.id?"selected":""} ${dragId===field.id?"dragging":""} ${dragOvId===field.id?"drag-over":""}`}
                      onClick={()=>setSelFieldId(field.id)}
                      draggable
                      onDragStart={()=>setDragId(field.id)}
                      onDragOver={e=>{e.preventDefault();setDragOvId(field.id);}}
                      onDrop={()=>handleDrop(field.id)}
                      onDragEnd={()=>{setDragId(null);setDragOvId(null);}}
                    >
                      <div className="drag-handle">⠿</div>
                      <FieldPreview field={field}/>
                      <div className="field-actions">
                        <div className="act-btn" title="Duplicate" onClick={e=>{e.stopPropagation();duplicateField(field.id);}}>⧉</div>
                        <div className="act-btn del" title="Remove" onClick={e=>{e.stopPropagation();deleteField(field.id);}}>✕</div>
                      </div>
                    </div>
                  ))}
                  <button className="add-field-btn" onClick={()=>addField("short_text")}>+ Add a field</button>
                </div>
              </div>
            </div>
          )}

          {edTab==="logic"    && form && <LogicView fields={form.fields}/>}
          {edTab==="style"    && form && (
            <div className="canvas-area">
              <div className="form-wrapper">
                <div className="form-header-card">
                  <div className="form-header-accent"/>
                  <div className="form-header-inner">
                    <div style={{fontSize:22,fontWeight:700,color:W.contentPrimary}}>{form.title||"Form title"}</div>
                    <div style={{fontSize:14,color:W.contentSecondary,marginTop:6}}>{form.description||"Description"}</div>
                  </div>
                </div>
                <div className="fields-wrap">
                  {form.fields.slice(0,3).map(f=>(
                    <div key={f.id} className="field-block"><FieldPreview field={f}/></div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {edTab==="preview"   && form && <PreviewView form={form}/>}
          {edTab==="analytics" && form && <AnalyticsPage form={form}/>}

          {/* ── RIGHT ── */}
          {edTab==="edit" && (
            <FieldSettings
              field={selField}
              onUpdate={up=>selFieldId&&updateField(selFieldId,up)}
              onDelete={()=>selFieldId&&deleteField(selFieldId)}
            />
          )}
          {edTab==="style" && <StylePanel/>}
          {edTab==="logic" && (
            <div className="right-panel">
              <div className="rp-header"><div className="rp-header-title">Logic rules</div><div className="rp-header-sub">Conditional branching</div></div>
              <div className="rp-body" style={{fontSize:13,color:W.contentSecondary,lineHeight:1.6}}>
                Add rules to show or hide fields based on previous answers.
              </div>
            </div>
          )}
          {edTab==="analytics" && (
            <div className="right-panel">
              <div className="rp-header"><div className="rp-header-title">Quick actions</div></div>
              <div className="rp-body">
                {["Export CSV","Sync to Sheets","Set webhook","A/B test"].map(a=>(
                  <button key={a} className="btn btn-tertiary" style={{width:"100%",justifyContent:"flex-start",marginBottom:8,borderRadius:r.sm,fontSize:13}}>{a}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showPublish && form && <PublishModal form={form} onClose={()=>setShowPublish(false)}/>}
      <Toasts toasts={toasts}/>
    </>
  );
}