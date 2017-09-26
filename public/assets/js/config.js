var config = function () {

    var cf = {};
    var protocol = location.protocol + "//";
    console.log(protocol);
    cf.webapi = protocol + "lyra.vgpro.gg/";
    cf.link = protocol + "vgpro.gg/"
    cf.baseurlp = protocol + "vgpro.gg/players/";
    cf.web = protocol + "vgpro.gg/frontpage";
    cf.telemetry = protocol + "lyra.vgpro.gg/telemetry/";
        return cf;
}();