/* Fluindo — biblioteca de ícones em SVG (traço, 24x24) */
(function () {
  const P = {
    drop: '<path d="M12 2.7C9 6.5 6 9.8 6 13.5a6 6 0 0 0 12 0c0-3.7-3-7-6-10.8z"/>',
    drops: '<path d="M8 3.5C6 6 4 8.2 4 10.7a4 4 0 0 0 8 0C12 8.2 10 6 8 3.5z"/><path d="M16.5 10c-1.6 2-3.2 3.7-3.2 5.7a3.2 3.2 0 0 0 6.4 0c0-2-1.6-3.7-3.2-5.7z"/>',
    heart: '<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.2 0 3.8 1.3 5.4 3.1 1.6-1.8 3.2-3.1 5.4-3.1 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/>',
    heartPulse: '<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.2 0 3.8 1.3 5.4 3.1 1.6-1.8 3.2-3.1 5.4-3.1 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/><path d="M5 12h3l1.5-2.5 2 5 1.5-2.5h6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    zzz: '<path d="M4 10h5l-5 6h5"/><path d="M12 4h4l-4 5h4"/><path d="M17 12h3l-3 4h3"/>',
    thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',
    brain: '<path d="M9.5 4A3 3 0 0 0 6.6 6.3 3 3 0 0 0 4.4 11a3 3 0 0 0 1 4.9 3 3 0 0 0 4.1 3.6 1.9 1.9 0 0 0 1.5-1.9V5.9A1.9 1.9 0 0 0 9.5 4z"/><path d="M14.5 4a3 3 0 0 1 2.9 2.3 3 3 0 0 1 2.2 4.7 3 3 0 0 1-1 4.9 3 3 0 0 1-4.1 3.6 1.9 1.9 0 0 1-1.5-1.9V5.9A1.9 1.9 0 0 1 14.5 4z"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    frown: '<circle cx="12" cy="12" r="9"/><path d="M8 16.5s1.5-2 4-2 4 2 4 2"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    face: '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c1.5 1 4.5 1 6 0"/><path d="M18.5 3.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    calendarHeart: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M12 18s-3-1.8-3-3.6a1.5 1.5 0 0 1 3-.5 1.5 1.5 0 0 1 3 .5c0 1.8-3 3.6-3 3.6z"/>',
    dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5a3 3 0 1 1 0-6 3 3 0 1 1 0 6zM12 14.5a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM9.5 12a3 3 0 1 1-6 0 3 3 0 1 1 6 0zM14.5 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0z"/>',
    egg: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2M20.5 12h-2M12 20.5v-2M3.5 12h2"/>',
    eggs: '<circle cx="8.5" cy="12" r="5.5"/><circle cx="8.5" cy="12" r="1.8"/><circle cx="17" cy="12" r="4.5"/><circle cx="17" cy="12" r="1.5"/>',
    microscope: '<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    pipette: '<path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4z"/>',
    battery: '<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M10 2h4"/><path d="M13 8.5l-3 4.5h4l-3 4.5"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    arrowUp: '<path d="M12 20V5M6 11l6-6 6 6"/>',
    arrowDown: '<path d="M12 4v15M6 13l6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    wavesDown: '<path d="M6 3c-1.5 2 1.5 3 0 5s1.5 3 0 5 1.5 3 0 5"/><path d="M12 3c-1.5 2 1.5 3 0 5s1.5 3 0 5 1.5 3 0 5"/><path d="M18 3c-1.5 2 1.5 3 0 5s1.5 3 0 5 1.5 3 0 5"/><path d="M3.5 18.5 6 21l2.5-2.5M9.5 18.5 12 21l2.5-2.5M15.5 18.5 18 21l2.5-2.5"/>',
    molecule: '<circle cx="6" cy="16" r="2.3"/><circle cx="12" cy="7" r="2.3"/><circle cx="18" cy="16" r="2.3"/><circle cx="12" cy="14" r="1.6"/><path d="M7.8 14.6 10.6 14.6M13.6 14.4l2.6 1M12 9.3v3.1"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/>',
    apple: '<path d="M12 7c-1.5-1-5-1.5-6.5 1.5S5 17 8 20c1.5 1.5 2.5 1 4 .5 1.5.5 2.5 1 4-.5 3-3 4-8.5 2.5-11.5S13.5 6 12 7z"/><path d="M12 7c0-2 1-4 3-4"/>',
    bed: '<path d="M2 20V8M2 16h20v4M22 16v-4a3 3 0 0 0-3-3h-8v7"/><circle cx="6.5" cy="12.5" r="1.8"/>',
    lotus: '<circle cx="12" cy="5" r="2"/><path d="M12 8v5M7 11l5 2 5-2M4 19c3-1 5-3 8-6 3 3 5 5 8 6M8 19h8"/>',
    rocket: '<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="M7 21l3-6 3 2v5M10 15l1-6 4 3 3 1M11 9l-4 1-1 3"/>',
    hotbag: '<rect x="5" y="7" width="14" height="14" rx="4"/><path d="M10 7V4h4v3M8.5 12c1-1 2-1 3 0s2 1 3 0M8.5 16c1-1 2-1 3 0s2 1 3 0"/>',
    feather: '<path d="M20.2 12.2a6 6 0 0 0-8.5-8.5L5 10.5V19h8.5z"/><path d="M16 8 2 22M17.5 15H9"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    cookie: '<circle cx="12" cy="12" r="9"/><path d="M8.5 8.5h.01M15 10h.01M10 15h.01M14.5 15.5h.01M11.5 11.5h.01"/>',
    waves: '<path d="M2 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>',
    utensils: '<path d="M4 3v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3M6 12v9M18 3c-2 0-3 2-3 5s1 4 3 4v9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15c2-6 4-6 6 0s3 2 5-6"/>',
    scan: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M7 14a5 5 0 0 1 10 0"/><circle cx="12" cy="14" r="1.5"/>',
    body: '<circle cx="12" cy="4.5" r="2"/><path d="M8 8.5h8l-1.5 5.5 1 7M9.5 21l1-7L8 8.5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m15 6-6 6 6 6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.7-4.3L3 9M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.7 4.3L21 15M21 20v-5h-5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    uterus: '<path d="M8 8c0-2 8-2 8 0 0 3-1.5 5-2.5 6v4h-3v-4C9.5 13 8 11 8 8z"/><path d="M8 8.5C6.5 7 4.5 6.5 3 7.5M16 8.5c1.5-1.5 3.5-2 5-1"/><circle cx="3.5" cy="10" r="1.5"/><circle cx="20.5" cy="10" r="1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    swelling: '<path d="M7 3v4c0 2-2 3-2 6 0 4 3 8 7 8s7-4 7-8c0-3-2-4-2-6V3"/><path d="M9 13c1 1 5 1 6 0"/>',
    cycle: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  };

  function icon(name, cls = '') {
    const inner = P[name] || P.info;
    return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
  }

  function hydrate(root = document) {
    root.querySelectorAll('[data-icon]').forEach((el) => {
      if (el.dataset.iconDone) return;
      el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon, el.dataset.iconClass || ''));
      el.dataset.iconDone = '1';
    });
  }

  window.FluindoIcons = { icon, hydrate, names: Object.keys(P) };
})();
