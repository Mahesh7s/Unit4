export function generateInsights(logs) {
  const sleep = logs.map(log => parseFloat(log.sleep));
  const focus = logs.map(log => parseFloat(log.focus));
  const stress = logs.map(log => parseFloat(log.stressLevel));

  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  let insights = [];
  if (avg(sleep) > 8 && avg(focus) > 3.5) {
    insights.push("You focus better after 8+ hours of sleep.");
  }
  if (avg(stress) < 3 && avg(sleep) > 7) {
    insights.push("Better sleep seems to lower your stress levels.");
  }
  return insights;
}