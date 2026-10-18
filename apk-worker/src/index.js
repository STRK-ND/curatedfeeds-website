/**
 * APK file delivery from the R2 bucket `curated-feeds-apk`.
 *
 * Routes:
 *   /curated-feeds-v1.2.0.apk  -> object of the same name
 *   /v1.2.0                    -> curated-feeds-v1.2.0.apk (version shorthand)
 *   /CuratedFeeds-v1.0.0.apk   -> legacy object name, still readable
 *
 * The APK is immutable per version (version is in the filename), so responses
 * are cached hard. Range requests are forwarded to R2 so Android's package
 * installer and download managers both work.
 */

const APK_MIME = 'application/vnd.android.package-archive';

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);
    let key = decodeURIComponent(url.pathname.replace(/^\/+/, ''));

    if (!key) {
      return new Response('Use /curated-feeds-v<version>.apk or /<version>', { status: 400 });
    }

    // /1.2.0 and /v1.2.0 both -> curated-feeds-v1.2.0.apk
    const shortVersion = key.match(/^v?(\d+\.\d+\.\d+)$/);
    if (shortVersion) {
      key = `curated-feeds-v${shortVersion[1]}.apk`;
    }

    const options = {};
    if (request.headers.has('range')) {
      options.range = request;
    }

    const object = await env.BUCKET.get(key, options);

    if (!object) {
      return new Response(`Not found: ${key}`, { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('content-type', APK_MIME);
    headers.set('content-disposition', `attachment; filename="${key}"`);
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    headers.set('x-content-type-options', 'nosniff');

    // writeHttpMetadata already carries etag/last-modified/range headers.
    return new Response(request.method === 'HEAD' ? null : object.body, { headers });
  },
};
