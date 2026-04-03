import NodeCache from 'node-cache';

// stdTTL: cache entry TTL in seconds (24 hours = 86400)
// checkperiod: how often to run the background clean up (every 2 mins)
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default cache;
