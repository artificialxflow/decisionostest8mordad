export const MOCK_MONITORING = {
  uptime: 99.8,
  requestsPerMin: 124,
  errorRate: 0.3,
  activeUsers: 47,
  alerts: [
    { id: 'a1', level: 'warning', message: 'Rate limit نزدیک آستانه — IP 185.190.12.44', time: '10:32' },
    { id: 'a2', level: 'info', message: 'Health check OK', time: '10:30' },
    { id: 'a3', level: 'error', message: 'Upload timeout (mock) — case-101', time: '09:15' },
  ],
  sparkline: [40, 55, 48, 62, 58, 70, 65, 72, 68, 80, 75, 82],
};
