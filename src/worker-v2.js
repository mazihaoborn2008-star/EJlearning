import legacy from './worker.js';
import {v2} from './v2.js';
export default {
  scheduled: legacy.scheduled,
  fetch(request, env) {
    const path = new URL(request.url).pathname;
    return path === '/api/v2' || path.startsWith('/api/v2/') ? v2(request, env.DB) : legacy.fetch(request, env);
  }
};
