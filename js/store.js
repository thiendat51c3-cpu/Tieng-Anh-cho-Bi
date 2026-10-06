/* Lưu tiến trình học (localStorage): xu, sao, huy hiệu, chuỗi ngày học, cài đặt */
(function () {
  const K = (window.K = window.K || {});
  const KEY = 'kidEnglish.v1';
  const COINS_PER_LEVEL = 200;

  const defaults = () => ({
    name: '',
    avatar: '🦊',
    coins: 0,
    stats: { games: 0, perfect: 0 },
    best: {}, // "topic/game" -> số sao cao nhất (0-3)
    learned: {}, // topic -> true
    mastered: {}, // từ -> số lần trả lời đúng ngay lần đầu
    topicsPlayed: {},
    gamesPlayed: {},
    streak: { count: 0, last: '' },
    badges: {},
    welcomed: false,
    settings: { sound: true, speech: true, slow: true },
  });

  function merge(base, o) {
    for (const k in o) {
      if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k]) && base[k] && typeof base[k] === 'object') {
        merge(base[k], o[k]);
      } else base[k] = o[k];
    }
    return base;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return merge(defaults(), JSON.parse(raw));
    } catch (e) { /* bỏ qua: dùng mặc định */ }
    return defaults();
  }

  const state = load();
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const BADGES = [
    { id: 'first', icon: '🌱', name: 'Bước đầu tiên', desc: 'Hoàn thành trò chơi đầu tiên', test: (s) => s.stats.games >= 1 },
    { id: 'star10', icon: '⭐', name: 'Ngôi sao nhỏ', desc: 'Đạt 10 sao', test: () => K.store.totalStars() >= 10 },
    { id: 'star50', icon: '🌟', name: 'Siêu sao', desc: 'Đạt 50 sao', test: () => K.store.totalStars() >= 50 },
    { id: 'perfect', icon: '💯', name: 'Hoàn hảo', desc: 'Được 3 sao trong một trò chơi', test: (s) => s.stats.perfect >= 1 },
    { id: 'streak3', icon: '🔥', name: 'Chăm chỉ', desc: 'Học 3 ngày liên tiếp', test: (s) => s.streak.count >= 3 },
    { id: 'words30', icon: '🎓', name: 'Nhà thông thái', desc: 'Thuộc 30 từ', test: (s) => Object.keys(s.mastered).length >= 30 },
    { id: 'explorer', icon: '🧭', name: 'Nhà thám hiểm', desc: 'Chơi 5 chủ đề khác nhau', test: (s) => Object.keys(s.topicsPlayed).length >= 5 },
    { id: 'gamer', icon: '🎮', name: 'Game thủ', desc: 'Thử tất cả các trò chơi', test: (s) => Object.keys(s.gamesPlayed).length >= K.gameOrder.length },
    { id: 'rich', icon: '👑', name: 'Triệu phú nhí', desc: 'Có 1000 xu', test: (s) => s.coins >= 1000 },
  ];

  K.BADGES = BADGES;

  K.store = {
    state,
    COINS_PER_LEVEL,

    save() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* chế độ riêng tư */ }
    },

    reset() {
      Object.keys(state).forEach((k) => delete state[k]);
      Object.assign(state, defaults());
      this.save();
    },

    touchDay() {
      const now = new Date();
      const today = dayKey(now);
      if (state.streak.last === today) return;
      const y = dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
      state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
      state.streak.last = today;
      this.save();
    },

    addCoins(n) {
      state.coins += n;
      this.save();
    },

    level() { return Math.floor(state.coins / COINS_PER_LEVEL) + 1; },
    levelProgress() { return (state.coins % COINS_PER_LEVEL) / COINS_PER_LEVEL; },

    bestStars(topic, game) { return state.best[`${topic}/${game}`] || 0; },
    topicStars(topic) { return K.gameOrder.reduce((n, g) => n + this.bestStars(topic, g), 0); },
    totalStars() {
      return Object.values(state.best).reduce((n, v) => n + v, 0);
    },

    record(topic, game, stars) {
      const prev = this.bestStars(topic, game);
      if (stars > prev) state.best[`${topic}/${game}`] = stars;
      this.save();
      return { prev, improved: stars > prev };
    },

    markMastered(en) {
      state.mastered[en] = (state.mastered[en] || 0) + 1;
    },
    masteredCount() { return Object.keys(state.mastered).length; },

    checkBadges() {
      const fresh = [];
      BADGES.forEach((b) => {
        if (!state.badges[b.id] && b.test(state)) {
          state.badges[b.id] = true;
          fresh.push(b);
        }
      });
      if (fresh.length) this.save();
      return fresh;
    },
  };
})();
