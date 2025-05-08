'use strict';
'require form';
'require uci';
'require rpc';
'require ui';

return L.view.extend({
    render: function () {
        var m, s, o;

        // Create a map for the "TTL Control" page
        m = new form.Map('nfttl', _('TTL Control'), _('Set or disable TTL packet rewriting.'));

        s = m.section(form.NamedSection, 'main', 'nfttl', _('TTL Settings'));

        // Mode selection
        o = s.option(form.ListValue, 'mode', _('TTL Mode'));
        o.value('off', _('Off'));
        o.value('64', _('Set TTL = 64'));
        o.value('custom', _('Custom TTL'));

        // Custom TTL input when "custom" mode is selected
        o = s.option(form.Value, 'custom_value', _('Custom TTL'));
        o.datatype = 'uinteger';
        o.default = '65';
        o.depends('mode', 'custom');

        // Button for reboot
        s.option(form.Button, '_reboot', _('Reboot Router'), _('Click to reboot the router to apply changes.'))
            .inputstyle = 'apply'
            .write = function () {
                return rpc.declare({
                    object: 'luci.nfttl',
                    method: 'reboot',
                    params: [],
                    expect: { result: true }
                })().then(function () {
                    ui.addNotification(null, E('p', _('Reboot has been triggered. The router will restart shortly.')));
                });
            };

        // Save the TTL settings and apply them
        m.on('save', function () {
            let mode = uci.get('nfttl', 'main', 'mode');
            let val = uci.get('nfttl', 'main', 'custom_value') || '64';
            let ttl = (mode === 'custom') ? val : mode;

            let body = JSON.stringify({ mode, ttl });

            return fetch('/cgi-bin/luci/nfttl-apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            }).then(() => {
                ui.addNotification(null, E('p', _('TTL updated. Please reboot your router to apply changes.')));
            });
        });

        return m.render();
    }
});
