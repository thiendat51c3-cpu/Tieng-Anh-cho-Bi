/* Phát âm từ tiếng Anh (Web Speech API) và âm thanh hiệu ứng (Web Audio, không cần file) */
(function () {
  const K = (window.K = window.K || {});
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let voice = null;

  function pickVoice() {
    if (!synth) return;
    const list = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    if (!list.length) return;
    const prefs = [/Google US English/i, /Samantha/i, /Aria|Jenny/i, /Google UK English Female/i, /Karen|Moira|Tessa/i];
    voice = null;
    for (const p of prefs) {
      const v = list.find((x) => p.test(x.name));
      if (v) { voice = v; break; }
    }
    if (!voice) voice = list.find((x) => /en[-_]US/i.test(x.lang)) || list[0];
  }
  if (synth) {
    pickVoice();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', pickVoice);
  }

  let ac = null;
  function ctx() {
    if (!ac) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C) ac = new C();
    }
    if (ac && ac.state === 'suspended') ac.resume();
    return ac;
  }

  function tone(freq, start, dur, type, vol, slideTo) {
    const a = ctx();
    if (!a) return;
    const t0 = a.currentTime + start;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(a.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  const SFX = {
    correct() { [523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.22, 'triangle', 0.18)); },
    wrong() { tone(220, 0, 0.18, 'sawtooth', 0.09, 150); tone(170, 0.16, 0.22, 'sawtooth', 0.09, 110); },
    click() { tone(660, 0, 0.07, 'square', 0.05); },
    flip() { tone(420, 0, 0.09, 'triangle', 0.1, 640); },
    pop() { tone(900, 0, 0.12, 'sine', 0.2, 200); },
    tick() { tone(1000, 0, 0.04, 'square', 0.04); },
    win() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle', 0.18)); },
  };

  K.audio = {
    speak(text, opts) {
      const s = K.store.state.settings;
      const done = opts && opts.onend;
      // Không có giọng đọc: vẫn gọi onend sau một nhịp để chuỗi bài hát không bị đứng
      if (!synth || !s.speech) { if (done) setTimeout(done, 700); return; }
      try {
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        if (voice) u.voice = voice;
        u.rate = (opts && opts.rate) || (s.slow ? 0.8 : 1);
        u.pitch = 1.1;
        if (done) u.onend = () => done();
        synth.speak(u);
      } catch (e) { if (done) setTimeout(done, 700); }
    },
    stop() {
      try { if (synth) synth.cancel(); } catch (e) { /* bỏ qua */ }
    },
    sfx(name) {
      if (!K.store.state.settings.sound) return;
      try { if (SFX[name]) SFX[name](); } catch (e) { /* bỏ qua */ }
    },
    unlock() { ctx(); },
    hasSpeech: !!synth,
  };

  // Trình duyệt chỉ cho phát âm thanh sau khi người dùng chạm vào trang
  ['pointerdown', 'keydown'].forEach((ev) =>
    window.addEventListener(ev, () => K.audio.unlock(), { once: true, passive: true })
  );
})();
