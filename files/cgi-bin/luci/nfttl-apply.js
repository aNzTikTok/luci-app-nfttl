'use strict';
'require fs';
'require rpc';
'require uci';

const json = require('luci.jsonc');

rpc.declare({
    object: 'luci.nfttl',
    method: 'apply',
    params: ['mode', 'ttl'],
    expect: { result: true }
});

module.exports.apply = function (mode, ttl) {
    let off = (mode === 'off');

    let line = off ? "" : ` ip ttl set ${ttl}`;
    let hopline = off ? "" : ` ip6 hoplimit set ${ttl}`;

    const content = `
chain mangle_prerouting_ttl64 {
  type filter hook prerouting priority 300; policy accept;
  counter${line}
}

chain mangle_postrouting_ttl64 {
  type filter hook postrouting priority 300; policy accept;
  counter${line}
}

chain mangle_prerouting_hoplimit64 {
  type filter hook prerouting priority 300; policy accept;
  counter${hopline}
}

chain mangle_postrouting_hoplimit64 {
  type filter hook postrouting priority 300; policy accept;
  counter${hopline}
}
    `;

    fs.writefile("/etc/nftables.d/10-custom-filter-chains.nft", content);
    return { result: true };
};
