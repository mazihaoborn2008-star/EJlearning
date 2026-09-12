export default {
  fetch() {
    return Response.json({
      status: "STAGING_BOOTSTRAPPED",
      worker: "ej-learning-35e1c",
      release: "phase-35e1c-v2",
      ready_for_secret: true,
      live_application: false
    }, {
      status: 503,
      headers: {"cache-control": "no-store"}
    });
  }
};
