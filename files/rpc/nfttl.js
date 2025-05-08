module.exports.reboot = function () {
    require("luci.sys").reboot();
    return true;
};
