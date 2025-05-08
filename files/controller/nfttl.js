'use strict';
'require uci';
'require fs';
'require form';
'require rpc';
'require ui';

return L.controller('nfttl', function () {
    this.index = function () {
        return L.ui.render('nfttl');
    };
});
