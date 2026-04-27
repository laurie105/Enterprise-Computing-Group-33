export function encodeEvent(event) {
  return [
    event.category === "tech" ? 1 : 0,
    event.category === "music" ? 1 : 0,
    event.category === "art" ? 1 : 0,
    event.price / 100
  ];
}

export function encodeUser(user) {
  return [
    user.interests.includes("tech") ? 1 : 0,
    user.interests.includes("music") ? 1 : 0,
    user.interests.includes("art") ? 1 : 0,
    user.budget / 100
  ];
}

export function similarity(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

export function recommendEvents(user, events) {
  const userVec = encodeUser(user);

  return events
    .map(event => {
      const score = similarity(userVec, encodeEvent(event));
      return { ...event, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
