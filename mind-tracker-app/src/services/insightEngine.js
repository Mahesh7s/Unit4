export function generateInsights(logs) {
  if (!logs || logs.length < 7) {
    return ["Log for at least 7 days to receive insights."];
  }

  const sleepFocus = [];
  const breakStress = [];
  const sleepStress = [];

  logs.forEach((log) => {
    const sleep = parseFloat(log.sleepHours);
    const focus = parseFloat(log.focusLevel);
    const stress = parseFloat(log.stressLevel);
    const breakTime = parseFloat(log.breakTime);

    if (!isNaN(sleep) && !isNaN(focus)) sleepFocus.push([sleep, focus]);
    if (!isNaN(breakTime) && !isNaN(stress)) breakStress.push([breakTime, stress]);
    if (!isNaN(sleep) && !isNaN(stress)) sleepStress.push([sleep, stress]);
  });

  const insights = [];

  // Avg Focus with >= 8 hrs sleep
  const longSleepFocus = sleepFocus.filter(([s]) => s >= 8).map(([, f]) => f);
  const shortSleepFocus = sleepFocus.filter(([s]) => s < 8).map(([, f]) => f);

  const avg = (arr) =>
    arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

  if (avg(longSleepFocus) > avg(shortSleepFocus)) {
    insights.push("✅ You focus better after 8+ hours of sleep.");
  }

  // Break time vs stress
  const longBreakStress = breakStress.filter(([b]) => b >= 1).map(([, s]) => s);
  const shortBreakStress = breakStress.filter(([b]) => b < 1).map(([, s]) => s);

  if (avg(longBreakStress) < avg(shortBreakStress)) {
    insights.push("🧘 Longer breaks seem to reduce your stress levels.");
  }

  // Low sleep = high stress
  const lowSleepStress = sleepStress.filter(([s]) => s < 6).map(([, stress]) => stress);
  const highSleepStress = sleepStress.filter(([s]) => s >= 6).map(([, stress]) => stress);

  if (avg(lowSleepStress) > avg(highSleepStress)) {
    insights.push("😴 Less sleep is linked with higher stress.");
  }

  if (insights.length === 0) {
    insights.push("💡 Keep logging — more patterns will emerge soon!");
  }

  return insights;
}
