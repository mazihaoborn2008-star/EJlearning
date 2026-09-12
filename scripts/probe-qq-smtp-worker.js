import {probeQqSmtp} from '../src/mail-qq-smtp.js';

export default {
  async fetch() {
    try {
      return Response.json(await probeQqSmtp(), {headers: {'Cache-Control': 'no-store'}});
    } catch (error) {
      return Response.json({ok: false, error: error?.code || 'SMTP_PROBE_FAILED'}, {status: 502, headers: {'Cache-Control': 'no-store'}});
    }
  }
};
