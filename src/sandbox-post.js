        return izi;
    }

    if (typeof define === "function" && typeof define.amd === "object" && define.amd.vendor !== "dojotoolkit.org") {
        define(["vue", "izi-js"], umdFactory);
    } else if (typeof exports === 'object') {
        module.exports = umdFactory(require("vue"), require("izi-js"));
    } else {
        global.izi = umdFactory(global.Vue, global.izi);
    }
})(this);