/*
 * heatmap.js v2.0.5 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license 
 *
 * :: 2016-09-05 01:16
 */
(function (a, b, c) { if (typeof module !== "undefined" && module.exports) { module.exports = c() } else if (typeof define === "function" && define.amd) { define(c) } else { b[a] = c() } })("h337", this, function () { var a = { defaultRadius: 40, defaultRenderer: "canvas2d", defaultGradient: { .25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", 1: "rgb(255,0,0)" }, defaultMaxOpacity: 1, defaultMinOpacity: 0, defaultBlur: .85, defaultXField: "x", defaultYField: "y", defaultValueField: "value", plugins: {} }; var b = function h() { var b = function d(a) { this._coordinator = {}; this._data = []; this._radi = []; this._min = 10; this._max = 1; this._xField = a["xField"] || a.defaultXField; this._yField = a["yField"] || a.defaultYField; this._valueField = a["valueField"] || a.defaultValueField; if (a["radius"]) { this._cfgRadius = a["radius"] } }; var c = a.defaultRadius; b.prototype = { _organiseData: function (a, b) { var d = a[this._xField]; var e = a[this._yField]; var f = this._radi; var g = this._data; var h = this._max; var i = this._min; var j = a[this._valueField] || 1; var k = a.radius || this._cfgRadius || c; if (!g[d]) { g[d] = []; f[d] = [] } if (!g[d][e]) { g[d][e] = j; f[d][e] = k } else { g[d][e] += j } var l = g[d][e]; if (l > h) { if (!b) { this._max = l } else { this.setDataMax(l) } return false } else if (l < i) { if (!b) { this._min = l } else { this.setDataMin(l) } return false } else { return { x: d, y: e, value: j, radius: k, min: i, max: h } } }, _unOrganizeData: function () { var a = []; var b = this._data; var c = this._radi; for (var d in b) { for (var e in b[d]) { a.push({ x: d, y: e, radius: c[d][e], value: b[d][e] }) } } return { min: this._min, max: this._max, data: a } }, _onExtremaChange: function () { this._coordinator.emit("extremachange", { min: this._min, max: this._max }) }, addData: function () { if (arguments[0].length > 0) { var a = arguments[0]; var b = a.length; while (b--) { this.addData.call(this, a[b]) } } else { var c = this._organiseData(arguments[0], true); if (c) { if (this._data.length === 0) { this._min = this._max = c.value } this._coordinator.emit("renderpartial", { min: this._min, max: this._max, data: [c] }) } } return this }, setData: function (a) { var b = a.data; var c = b.length; this._data = []; this._radi = []; for (var d = 0; d < c; d++) { this._organiseData(b[d], false) } this._max = a.max; this._min = a.min || 0; this._onExtremaChange(); this._coordinator.emit("renderall", this._getInternalData()); return this }, removeData: function () { }, setDataMax: function (a) { this._max = a; this._onExtremaChange(); this._coordinator.emit("renderall", this._getInternalData()); return this }, setDataMin: function (a) { this._min = a; this._onExtremaChange(); this._coordinator.emit("renderall", this._getInternalData()); return this }, setCoordinator: function (a) { this._coordinator = a }, _getInternalData: function () { return { max: this._max, min: this._min, data: this._data, radi: this._radi } }, getData: function () { return this._unOrganizeData() } }; return b }(); var c = function i() { var a = function (a) { var b = a.gradient || a.defaultGradient; var c = document.createElement("canvas"); var d = c.getContext("2d"); c.width = 256; c.height = 1; var e = d.createLinearGradient(0, 0, 256, 1); for (var f in b) { e.addColorStop(f, b[f]) } d.fillStyle = e; d.fillRect(0, 0, 256, 1); return d.getImageData(0, 0, 256, 1).data }; var b = function (a, b) { var c = document.createElement("canvas"); var d = c.getContext("2d"); var e = a; var f = a; c.width = c.height = a * 2; if (b == 1) { d.beginPath(); d.arc(e, f, a, 0, 2 * Math.PI, false); d.fillStyle = "rgba(0,0,0,1)"; d.fill() } else { var g = d.createRadialGradient(e, f, a * b, e, f, a); g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)"); d.fillStyle = g; d.fillRect(0, 0, 2 * a, 2 * a) } return c }; var c = function (a) { var b = []; var c = a.min; var d = a.max; var e = a.radi; var a = a.data; var f = Object.keys(a); var g = f.length; while (g--) { var h = f[g]; var i = Object.keys(a[h]); var j = i.length; while (j--) { var k = i[j]; var l = a[h][k]; var m = e[h][k]; b.push({ x: h, y: k, value: l, radius: m }) } } return { min: c, max: d, data: b } }; function d(b) { var c = b.container; var d = this.shadowCanvas = document.createElement("canvas"); var e = this.canvas = b.canvas || document.createElement("canvas"); var f = this._renderBoundaries = [1e4, 1e4, 0, 0]; var g = getComputedStyle(b.container) || {}; e.className = "heatmap-canvas"; this._width = e.width = d.width = b.width || +g.width.replace(/px/, ""); this._height = e.height = d.height = b.height || +g.height.replace(/px/, ""); this.shadowCtx = d.getContext("2d"); this.ctx = e.getContext("2d"); e.style.cssText = d.style.cssText = "position:absolute;left:0;top:0;"; c.style.position = "relative"; c.appendChild(e); this._palette = a(b); this._templates = {}; this._setStyles(b) } d.prototype = { renderPartial: function (a) { if (a.data.length > 0) { this._drawAlpha(a); this._colorize() } }, renderAll: function (a) { this._clear(); if (a.data.length > 0) { this._drawAlpha(c(a)); this._colorize() } }, _updateGradient: function (b) { this._palette = a(b) }, updateConfig: function (a) { if (a["gradient"]) { this._updateGradient(a) } this._setStyles(a) }, setDimensions: function (a, b) { this._width = a; this._height = b; this.canvas.width = this.shadowCanvas.width = a; this.canvas.height = this.shadowCanvas.height = b }, _clear: function () { this.shadowCtx.clearRect(0, 0, this._width, this._height); this.ctx.clearRect(0, 0, this._width, this._height) }, _setStyles: function (a) { this._blur = a.blur == 0 ? 0 : a.blur || a.defaultBlur; if (a.backgroundColor) { this.canvas.style.backgroundColor = a.backgroundColor } this._width = this.canvas.width = this.shadowCanvas.width = a.width || this._width; this._height = this.canvas.height = this.shadowCanvas.height = a.height || this._height; this._opacity = (a.opacity || 0) * 255; this._maxOpacity = (a.maxOpacity || a.defaultMaxOpacity) * 255; this._minOpacity = (a.minOpacity || a.defaultMinOpacity) * 255; this._useGradientOpacity = !!a.useGradientOpacity }, _drawAlpha: function (a) { var c = this._min = a.min; var d = this._max = a.max; var a = a.data || []; var e = a.length; var f = 1 - this._blur; while (e--) { var g = a[e]; var h = g.x; var i = g.y; var j = g.radius; var k = Math.min(g.value, d); var l = h - j; var m = i - j; var n = this.shadowCtx; var o; if (!this._templates[j]) { this._templates[j] = o = b(j, f) } else { o = this._templates[j] } var p = (k - c) / (d - c); n.globalAlpha = p < .01 ? .01 : p; n.drawImage(o, l, m); if (l < this._renderBoundaries[0]) { this._renderBoundaries[0] = l } if (m < this._renderBoundaries[1]) { this._renderBoundaries[1] = m } if (l + 2 * j > this._renderBoundaries[2]) { this._renderBoundaries[2] = l + 2 * j } if (m + 2 * j > this._renderBoundaries[3]) { this._renderBoundaries[3] = m + 2 * j } } }, _colorize: function () { var a = this._renderBoundaries[0]; var b = this._renderBoundaries[1]; var c = this._renderBoundaries[2] - a; var d = this._renderBoundaries[3] - b; var e = this._width; var f = this._height; var g = this._opacity; var h = this._maxOpacity; var i = this._minOpacity; var j = this._useGradientOpacity; if (a < 0) { a = 0 } if (b < 0) { b = 0 } if (a + c > e) { c = e - a } if (b + d > f) { d = f - b } var k = this.shadowCtx.getImageData(a, b, c, d); var l = k.data; var m = l.length; var n = this._palette; for (var o = 3; o < m; o += 4) { var p = l[o]; var q = p * 4; if (!q) { continue } var r; if (g > 0) { r = g } else { if (p < h) { if (p < i) { r = i } else { r = p } } else { r = h } } l[o - 3] = n[q]; l[o - 2] = n[q + 1]; l[o - 1] = n[q + 2]; l[o] = j ? n[q + 3] : r } k.data = l; this.ctx.putImageData(k, a, b); this._renderBoundaries = [1e3, 1e3, 0, 0] }, getValueAt: function (a) { var b; var c = this.shadowCtx; var d = c.getImageData(a.x, a.y, 1, 1); var e = d.data[3]; var f = this._max; var g = this._min; b = Math.abs(f - g) * (e / 255) >> 0; return b }, getDataURL: function () { return this.canvas.toDataURL() } }; return d }(); var d = function j() { var b = false; if (a["defaultRenderer"] === "canvas2d") { b = c } return b }(); var e = { merge: function () { var a = {}; var b = arguments.length; for (var c = 0; c < b; c++) { var d = arguments[c]; for (var e in d) { a[e] = d[e] } } return a } }; var f = function k() { var c = function h() { function a() { this.cStore = {} } a.prototype = { on: function (a, b, c) { var d = this.cStore; if (!d[a]) { d[a] = [] } d[a].push(function (a) { return b.call(c, a) }) }, emit: function (a, b) { var c = this.cStore; if (c[a]) { var d = c[a].length; for (var e = 0; e < d; e++) { var f = c[a][e]; f(b) } } } }; return a }(); var f = function (a) { var b = a._renderer; var c = a._coordinator; var d = a._store; c.on("renderpartial", b.renderPartial, b); c.on("renderall", b.renderAll, b); c.on("extremachange", function (b) { a._config.onExtremaChange && a._config.onExtremaChange({ min: b.min, max: b.max, gradient: a._config["gradient"] || a._config["defaultGradient"] }) }); d.setCoordinator(c) }; function g() { var g = this._config = e.merge(a, arguments[0] || {}); this._coordinator = new c; if (g["plugin"]) { var h = g["plugin"]; if (!a.plugins[h]) { throw new Error("Plugin '" + h + "' not found. Maybe it was not registered.") } else { var i = a.plugins[h]; this._renderer = new i.renderer(g); this._store = new i.store(g) } } else { this._renderer = new d(g); this._store = new b(g) } f(this) } g.prototype = { addData: function () { this._store.addData.apply(this._store, arguments); return this }, removeData: function () { this._store.removeData && this._store.removeData.apply(this._store, arguments); return this }, setData: function () { this._store.setData.apply(this._store, arguments); return this }, setDataMax: function () { this._store.setDataMax.apply(this._store, arguments); return this }, setDataMin: function () { this._store.setDataMin.apply(this._store, arguments); return this }, configure: function (a) { this._config = e.merge(this._config, a); this._renderer.updateConfig(this._config); this._coordinator.emit("renderall", this._store._getInternalData()); return this }, repaint: function () { this._coordinator.emit("renderall", this._store._getInternalData()); return this }, getData: function () { return this._store.getData() }, getDataURL: function () { return this._renderer.getDataURL() }, getValueAt: function (a) { if (this._store.getValueAt) { return this._store.getValueAt(a) } else if (this._renderer.getValueAt) { return this._renderer.getValueAt(a) } else { return null } } }; return g }(); var g = { create: function (a) { return new f(a) }, register: function (b, c) { a.plugins[b] = c } }; return g });

/*

`8.`888b           ,8'      ,o888888o.    8 888888888o   8 888888888o.       ,o888888o.          ,o888888o.         ,o888888o.    
`8.`888b         ,8'      8888     `88.  8 8888    `88. 8 8888    `88.   . 8888     `88.       8888     `88.      8888     `88.  
`8.`888b       ,8'    ,8 8888       `8. 8 8888     `88 8 8888     `88  ,8 8888       `8b   ,8 8888       `8.  ,8 8888       `8. 
`8.`888b     ,8'     88 8888           8 8888     ,88 8 8888     ,88  88 8888        `8b  88 8888            88 8888           
`8.`888b   ,8'      88 8888           8 8888.   ,88' 8 8888.   ,88'  88 8888         88  88 8888            88 8888           
`8.`888b ,8'       88 8888           8 888888888P'  8 888888888P'   88 8888         88  88 8888            88 8888           
`8.`888b8'        88 8888   8888888 8 8888         8 8888`8b       88 8888        ,8P  88 8888   8888888  88 8888   8888888 
`8.`888'         `8 8888       .8' 8 8888         8 8888 `8b.     `8 8888       ,8P   `8 8888       .8'  `8 8888       .8' 
`8.`8'             8888     ,88'  8 8888         8 8888   `8b.    ` 8888     ,88'       8888     ,88'      8888     ,88'  
`8.`               `8888888P'    8 8888         8 8888     `88.     `8888888P'          `8888888P'         `8888888P'    
VGPRO.GG 
@author pierreandreis.com
*/

/*jslint browser: true*/
/*global  $*/




var tools = function () {
    "use strict";

    var tool = {};

    tool.openRegion = function () {
        $('.region').toggle();
    }
    tool.getRegion = function () {
        var region = Cookies.get('region');
        if (region) {
            return region;
        }
        return 'na';

    }
    tool.changeRegion = function (region, title) {
        $(".region_input").data('region', region).html(title);
    };

    tool.grabRegion = function () {
        var url = config.webapi + "server";
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: tool.allRegions
        });
    };
    tool.openLang = function () {
        $(".language_select").toggle();
    }
    tool.changeLang = function (lang) {
        var flag = lang;
        if (flag == 'en') {
            flag = "us"
        };
        $(".language_selected .lang_seled").html("<span class='flag-icon flag-icon-" + flag + "'></span>" + lang + "</div>");
        Cookies.set('lang', lang);
        location.reload();
        /*$(".preload").fadeIn('fast', function() {
          location.reload();
        });*/

        tool.openLang();
    };

    tool.allRegions = function (response) {
        tool.response = {};
        tool.response = response;
        var html = "";
        $.each(response, function (index, el) {
            html += "<li data-region=" + el.Region + " data-title=" + el.Tag + " id=" + el.Status + ">" + el.Name + "</li>";
        });

        $(".searchwrap .region").html(html);
        return tool.response;
    };
    tool.openPage = function (page) {
        switch (page) {
            case "home":
                frontpage.init();
                news.last();
                break;
            case "profile":
                playerData.init();
                break;
            case "error":
                //$(".preload").fadeOut();
                break;
            case "teams":
                teamData.init();
                break;
            case "profile_dev":
                playerData.init();
                break;
            case "news":
                news.read();
                break;
            case "news_dev":
                news.read();
                break;
            case "leaderboard":
                leaderboard.init();
                break;
            case "home_dev":
                frontpage.init();
                news.last();
                break;
        }
    }
    tool.addClicks = function () {
        $(".menu-mobile").click(function (event) {
            $(".menu").animate({
                width: 'toggle'
            }, 350);
        });
        $(".region_input").click(function () {
            tool.openRegion();
        });
        $(".lang_sel").click(function (event) {
            tool.changeLang($(this).data('lang'));

        });
        $(".language_selected").click(function () {
            tool.openLang();
        });
        $(".searchwrap").submit(function (event) {
            event.preventDefault();
            $(".submit_search").fadeIn();
            var region = $(".region_input").data('region');
            var search = $(".search").val();
            tool.nameLookup(region, search);
            /*var url = config.baseurlp + region + "/" + search;
            window.location.href = url;*/


        });

    }
    tool.triggerError = function (error) {

        $(".error-search").html(error).addClass('visible');
        setTimeout(function () {
            $('.error-search').removeClass('visible')
        }, 2000);
    }
    tool.nameLookup = function (region, search) {
        var url = config.webapi + "lookup/" + region + "/" + encodeURIComponent(search);
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function (response) {
                if (response.exist != '0') {
                    var query = { region: response.shardId, name: response.name, times: 1 };
                    tool.Searches('add', query);

                    var url = config.baseurlp + response.shardId + "/" + response.name;
                    window.location.href = url;
                } else {
                    $.get(location.href).then(function(page) {
                      $(".adsbygooglediv").html($(page).find(".adsbygooglediv").html())
                    })
                    if (response.shardId == 'sg') {
                        response.shardId = 'sea'
                    };
                    tool.triggerError("Error! <b>" + response.name + "</b> in region <b>" + response.shardId + "</b> was not found.");
                }
                $(".submit_search").fadeOut()
            },
            error: function (response) {
                tool.triggerError('Oops! <b> Something happened. Try again later!');
            }
        });
    }
    $(".region").on('click', 'li[id!="0"]', function () {

        var region = $(this).data("region");
        var title = $(this).data("title");
        Cookies.set('region', region);
        Cookies.set('title', title);
        tool.changeRegion(region, title);
        tool.openRegion();
    });



    tool.Searches = function (method, query) {
        var value = 0;
        
        switch (method) {
            case 'add':


                //localStorage.clear('recentSearches');
                var old_storage = tool.handleStorage('get', 'recentSearches', 0);
                
                if (old_storage) {


                    var couldFind = false;

                    // looking if we already have it, then pushing +1 to times
                    console.log(old_storage);
                    for (var i = 0; i < old_storage.length; i++) {

                        var element = old_storage[i];

                        if (element.name == query.name && element.region == query.region) {

                            // we could find then?
                            couldFind = true;
                            // add +1 to times
                            old_storage[i].times = element.times + 1;
                        }
                    }
                    console.log(old_storage);
                    // user never searched?
                    if (couldFind == false) {

                        //pushing it
                        old_storage.push(query);
                    }

                    // Sort it by times
                    old_storage.sort(function (a, b) {
                        return b.times - a.times;
                    });

                  // handling it
                    tool.handleStorage('set', 'recentSearches', old_storage);


                } else {
                    // never searched?
                    // Create an array, then push query
                    // We need to create an array because we will add more objects later on
                    var array = [];
                    array.push(query);
                    tool.handleStorage('set', 'recentSearches', array);
                }
                value = true;
                break;


            case 'generate': 
            var storage = tool.handleStorage('get', 'recentSearches');
            var html = [];
            if(storage){
            for (var i = 0; i < storage.length; i++) {
                var element = storage[i];
                if(i === 4){ break;};
                var style = 'recent';
                var region = element.region;
                if(element.times >= 10){style = "favorite"};
                if(region == 'sg'){region = 'sea'};
                html.push('<a href="'+config.baseurlp + element.region + "/" + element.name+'" id="'+style+'">'+element.name+' <span class="region_tile">'+region+'</span></a> ');
                
                
            }
            $(".recent-searchs").html(html.join(''));
            }
            break;
            default:
                // should never get here
                console.log('default');
                break;
        }

        return value;
    }

    tool.checkIfStorage = function () {
    var mod = 'modernizr';
      if (typeof localStorage == 'object') {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
      }
      else return false; 
    
    }

    tool.handleStorage = function(method, item, args){
        // we are using stringify because localStorage doesn't support arrays, only strings.
        // and since its getting back a object in string, we need to parse string to object.
        if (!tool.checkIfStorage()) return false;

        var value = 0;
        switch(method){
            case 'get':
            value = JSON.parse(localStorage.getItem(item));
            break;

            case 'set':
            value = localStorage.setItem(item, JSON.stringify(args));
            break;

            case 'delete':
            value = localStorage.clear(item);

            default:
            value = console.log('Error!', 'Empty handleStorage()');
            break
        }
        return value;
    }


    tool.init = function (page) {
        tool.openPage(page);
        tool.grabRegion();
        tool.changeRegion();
        tool.addClicks();
        tool.Searches('generate');
        $(".region").hide();

    };

    tool.changeRegion = function () {
        var region = Cookies.get('region');
        var title = Cookies.get('title');
        if (region) {
            $(".region_input").data('region', region);
            $(".region_input").html(title);
        }

    };

    return tool;

}();

//Paginate 
(function ($) {

    $.fn.paginate = function (options) {
        var opts = $.extend({}, $.fn.paginate.defaults, options);
        var pag = {};
        var currentItem = 0;
        var obj = $(this);
        var itemsPerPage = opts.itemsPerPage;
        var numberOfItems = obj.children().length;

        pag.init = function () {
            obj.children().hide();
            $(opts.viewmore).show();
            obj.children().slice(0, opts.itemsPerPage).show();
            currentItem += itemsPerPage;
            if (currentItem >= numberOfItems) {
                $(opts.viewmore).hide();
            }
            return pag;
        }
        pag.showhero = function (hero) {
            obj.children().hide();
            currentItem = 5;
            var div = obj.children("[data-gohero='" + hero + "']");

            div.slice(0, itemsPerPage).slideDown();
            $(opts.viewmore_hero).data('name', null);
            $(opts.viewmore_hero).fadeIn().data('hero', hero);
            if (div.length <= currentItem) {
                $(opts.viewmore_hero).hide();
            };
            $(opts.viewmore).hide();
            $(opts.viewall).show();
        }
        pag.showsearch = function (name) {
            obj.children().hide();
            currentItem = 5;
            var div = obj.children("div:contains('" + name + "')");
            div.slice(0, itemsPerPage).slideDown();
            $(opts.viewmore_hero).data('hero', null);
            $(opts.viewmore_hero).fadeIn().data('name', name);
            if (div.length <= currentItem) {
                $(opts.viewmore_hero).hide();
            };
            $(opts.viewmore).hide();
            $(opts.viewall).show();
        }
        pag.show = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var more = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2';
            var div = obj.children();
            if (value && more == 2) {
                div = obj.children("[data-gohero='" + value + "']");

            }
            if (value && more == 1) {
                div = obj.children("div:contains('" + value + "')");

            }

            if (more == 3) {
                var div = obj.children();
            }
            numberOfItems = div.length;
            for (var i = currentItem; i < (currentItem + itemsPerPage); i++) {
                $(div.eq(i)).fadeIn();
            }

            currentItem += itemsPerPage;
            $(opts.viewall).show();
            if (currentItem >= numberOfItems) {
                $(opts.viewmore).hide();
                $(opts.viewmore_hero).hide();
            }
        }
        pag.reset = function () {
            currentItem = 0;
            obj.children().hide();
            $(opts.viewmore).show();
            pag.show();
            $(opts.viewall).hide();
            $(opts.viewmore_hero).hide();

        }
        return pag.init();
    };
    $.fn.paginate.defaults = {
        itemsPerPage: 5,
        viewmore: ".view_more",
        viewmore_hero: "#hero_history",
        viewall: "#view_all"
    };
})(jQuery);


/** Time Ago
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.5.4
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2017, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.timeago = function (timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else if (typeof timestamp === "string") {
            return inWords($.timeago.parse(timestamp));
        } else if (typeof timestamp === "number") {
            return inWords(new Date(timestamp));
        } else {
            return inWords($.timeago.datetime(timestamp));
        }
    };
    var $t = $.timeago;

    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowPast: true,
            allowFuture: false,
            localeTitle: false,
            cutoff: 0,
            autoDispose: true,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                inPast: 'any moment now',
                seconds: "just now",
                minute: "a minute",
                minutes: "%d minutes",
                hour: "an hour",
                hours: "%d hours",
                day: "a day",
                days: "%d days",
                month: "a month",
                months: "%d months",
                year: "a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        },

        inWords: function (distanceMillis) {
            if (!this.settings.allowPast && !this.settings.allowFuture) {
                throw 'timeago allowPast and allowFuture settings can not both be set to false.';
            }

            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }

            if (!this.settings.allowPast && distanceMillis >= 0) {
                return this.settings.strings.inPast;
            }

            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }

            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
                seconds < 90 && substitute($l.minute, 1) ||
                minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
                minutes < 90 && substitute($l.hour, 1) ||
                hours < 24 && substitute($l.hours, Math.round(hours)) ||
                hours < 42 && substitute($l.day, 1) ||
                days < 30 && substitute($l.days, Math.round(days)) ||
                days < 45 && substitute($l.month, 1) ||
                days < 365 && substitute($l.months, Math.round(days / 30)) ||
                years < 1.5 && substitute($l.year, 1) ||
                substitute($l.years, Math.round(years));

            var separator = $l.wordSeparator || "";
            if ($l.wordSeparator === undefined) {
                separator = " ";
            }
            return $.trim([prefix, words, suffix].join(separator));
        },

        parse: function (iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/, ""); // remove milliseconds
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            s = s.replace(/([\+\-]\d\d)$/, " $100"); // +09 -> +0900
            return new Date(s);
        },
        datetime: function (elem) {
            var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        },
        isTime: function (elem) {
            // jQuery's `is()` doesn't play well with HTML5 in IE
            // return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
        }
    });

    // functions that can be called via $(el).timeago('action')
    // init is default when no action is given
    // functions are called with context of a single element
    var functions = {
        init: function () {
            functions.dispose.call(this);
            var refresh_el = $.proxy(refresh, this);
            refresh_el();
            var $s = $t.settings;
            if ($s.refreshMillis > 0) {
                this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
            }
        },
        update: function (timestamp) {
            var date = (timestamp instanceof Date) ? timestamp : $t.parse(timestamp);
            $(this).data('timeago', {
                datetime: date
            });
            if ($t.settings.localeTitle) {
                $(this).attr("title", date.toLocaleString());
            }
            refresh.apply(this);
        },
        updateFromDOM: function () {
            $(this).data('timeago', {
                datetime: $t.parse($t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title"))
            });
            refresh.apply(this);
        },
        dispose: function () {
            if (this._timeagoInterval) {
                window.clearInterval(this._timeagoInterval);
                this._timeagoInterval = null;
            }
        }
    };

    $.fn.timeago = function (action, options) {
        var fn = action ? functions[action] : functions.init;
        if (!fn) {
            throw new Error("Unknown function name '" + action + "' for timeago");
        }
        // each over objects here and call the requested function
        this.each(function () {
            fn.call(this, options);
        });
        return this;
    };

    function refresh() {
        var $s = $t.settings;

        //check if it's still visible
        if ($s.autoDispose && !$.contains(document.documentElement, this)) {
            //stop if it has been removed
            $(this).timeago("dispose");
            return this;
        }

        var data = prepareData(this);

        if (!isNaN(data.datetime)) {
            if ($s.cutoff === 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
                $(this).text(inWords(data.datetime));
            } else {
                if ($(this).attr('title').length > 0) {
                    $(this).text($(this).attr('title'));
                }
            }
        }
        return this;
    }

    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", {
                datetime: $t.datetime(element)
            });
            var text = $.trim(element.text());
            if ($t.settings.localeTitle) {
                element.attr("title", element.data('timeago').datetime.toLocaleString());
            } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }

    function inWords(date) {
        return $t.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }

    // fix for IE6 suckage
    document.createElement("abbr");
    document.createElement("time");
}));

var playerData = function () {
    var fun = {};
    var params = window.location.pathname.split('/').slice(1);
    fun.webapi = config.webapi;
    fun.baseurlp = config.baseurlp;
    fun.region = params[1];
    fun.player = params[2];
    fun.timerStartClaus = Date.now();
    fun.type = 'all';
    fun.lastMatch = 0;


    fun.init = function () {

        document.title = fun.player + " - VGPRO.gg";
        $(".profile_name").html(fun.player);
        fun.gatherMatchData(fun.webapi, fun.player, fun.region, fun.type);
        fun.gatherNewData(fun.player, fun.region);
        if ($(".profile_stuff .profile_name").width() > 230) {
            $(".profile_stuff .profile_name").css({
                fontSize: '30px'
            });
        }
    };

    fun.gatherNewData = function(player, region) {
      
      // var url = "http://esl.vgpro.gg/matches/"+region+"/"+player;
      // $.getJSON( url, function() {
      //   console.log( "success" );
      // })
      // .done(function() {
      //   console.log( "second success" );
      // })
      // .fail(function() {
      //   console.log( "error" );
      // })
      // .always(function() {
      //   console.log( "complete" );
      // });
 

    }

    fun.changeType = function (type) {
        fun.timerStart = Date.now();
        fun.timerStartClaus = Date.now();
        $(".profile_title").html('');
        $(".old_open_load").addClass('open_load').removeClass('old_open_load');
        $(".loading_all").show();
        ////$(".preload").fadeIn();
        $(".sidebar .recent_played").html('');
        $(".sidebar .champions").html('');
        $(".match_history").html('');
        $(".profile .profile_desc .heroes_img_space").html('');
        $(".profile .profile_desc .recent_results").html('');
        fun.gatherMatchData(fun.webapi, fun.player, fun.region, type);
    };



    fun.generateTitles = function (titles) {
        if (titles) {
            $.each(titles[0], function (index, val) {
                $(".profile_title").append('<span>' + val.title + ' ' + val.extra + '</span>');
            });
            $(".profile_title").show();

        }
    }
    fun.gatherProData = function (webapi, PlayerName, Region) {
        var url = webapi + "/pro/" + Region + "/" + PlayerName;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: fun.gatherProDataYes,
            error: fun.Error
        });
    };


    fun.gatherProDataNo = function (name) {
        var skilltier = parseInt(fun.SkillTier) + 2;
        $(".profile .profile_hero").html("<div class='hero_img' style='background-image: url(assets/images/skilltier/" + skilltier + ".png);'></div>");
        fun.generateTitles(name.Titles);
    };
    fun.forceMatch = function () {
        $(".sidebar .recent_played").html('');
        $(".sidebar .champions").html('');
        $(".match_history").html('');
        $(".profile .profile_desc .heroes_img_space").html('');
        $(".profile .profile_desc .recent_results").html('');
        fun.gatherMatchData(fun.webapi, fun.player, fun.region, 'all', 'force');
    };

    fun.gatherMatchData = function (webapi, PlayerName, Region) {
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'all';
        var force = arguments.length > 4 && arguments[4] !== undefined ? '?force=true' : ' ';
        var url = webapi + "matches/" + Region + "/" + PlayerName + "/" + type + "/" + force;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: fun.gatherMatchDataYes,
            error: fun.Error
        });
    };
    fun.gatherPlayerData = function (webapi, PlayerName, Region) {
        var url = webapi + "player/" + Region + "/" + PlayerName;

        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: fun.gatherPlayerDataYes
        });
    };
    fun.gatherProDataYes = function (response) {
        var prodata = {};
        fun.loadtimePro = (Date.now() - fun.timerStartPro) / 1000;
        $(".loadtime").html(fun.loadTimeDom + "s / " + fun.loadtimeClaus + "s / " + fun.loadtimePro + "s");
        if ("Error" in response) {
            return fun.gatherProDataNo(response);
        }
        prodata.ign = response.Player.ign;
        prodata.role = response.Player.role;
        prodata.teamtag = response.Team.tag;
        prodata.country = response.Player.country;
        prodata.national = response.Player.national;
        prodata.ppic = response.Player.profile_pic;
        prodata.teamname = response.Team.name;
        $(".profile_hero").addClass('profile_img').removeClass('profile_hero');
        fun.generateProfileData(prodata);
        //$(".preload").fadeOut(); // yes!!
    };
    fun.gatherPlayerDataYes = function (response) {
        var playerdata = {};
        playerdata.id = response[0].id;
        playerdata.name = response[0].name;
        playerdata.level = response[0].level;
        playerdata.lifetimeGold = response[0].stats.lifetimeGold;
        playerdata.wins = response[0].stats.wins;
        playerdata.xp = response[0].stats.xp;
        playerdata.loss = response[0].extras.lost;
        playerdata.wl_total = response[0].extras.wl_total;
    };
    fun.Error = function (response) {
        var url = config.link + "error?505";
        if ("errors" in response) {
            var url = config.link + "error?404";
            window.location.href = url;
            return false;
        }
        var form = $('<form action="' + url + '" method="post">' +
            '<input type="text" name="error_url" value="' + window.location.href + '" />' +
            '<input type="text" name="response" value="' + response.responseText + '" />' +
            '<input type="text" name="status" value="' + response.statusText + '" />' +
            '</form>');
        $('body').append(form);
        form.submit();

    };

    fun.generateLastUpdate = function (update) {
        if (update > (Date.now - 500)) {

            return false;
        }
        $(".update").addClass('updated').html(" " + jQuery.timeago(new Date(update * 1000).toISOString()));
        $('.update').localize();
    }
    fun.gatherMatchDataYes = function (response) {
        if ("errors" in response) {
            return fun.Error(response);
        }
        fun.timerStart = Date.now();
        var playerstats = {};
        fun.topheroes_api = response.Stats.Heroes;
        var i = 0;
        $.each(fun.topheroes_api, function (key) {
            key = key.toLowerCase();
            fun.generateTopHeroesProfile(key);

            if (i >= 3) {
                return false;
            }
            i++;
        });
        fun.lastupdate = response.Data.LastUpdate;
        fun.generateLastUpdate(fun.lastupdate);
        fun.matchdata = response.Data.Matches;
        fun.recentplayed = response.Stats.PlayedWith;
        fun.generateMatchHistoryDiv(fun.matchdata);
        fun.redSide = response.Stats.Red;
        fun.SkillTier = response.Stats.SkillTier;
        fun.blueSide = response.Stats.Blue;
        if (response.Stats.Ranking) {
            fun.generateRanking(response.Stats.Rating, response.Stats.Ranking);
        } else {
            $(".body_box #alert_ranked").show();
        }
        fun.generateRecentResults(response.Stats.RecentResults);
        fun.generateKDAtotal(response.Stats.KDA, response.Stats.avgKill, response.Stats.avgAssist, response.Stats.avgDeaths);
        fun.generateChartWin(response.Stats.winrate, response.Stats.totalWin, response.Stats.totalLoss);
        fun.generateChartkp(response.Stats.KP, response.Stats.KillsAssisted, response.Stats.KillsNotAssisted);
        fun.generateChartRoles(response.Stats.Roles);
        fun.generateSideChart(fun.redSide, fun.blueSide);
        fun.generateGameMode(response.Stats.gameMode, response.Stats.totalMatches);
        fun.generateTopHeroes(fun.topheroes_api);
        fun.generateDropHeroes(fun.topheroes_api);
        fun.generateMatchFilter(response.Stats.totalMatches, response.Stats.Kills, response.Stats.Deaths, response.Stats.totalFarm, response.Stats.KrakenCap, response.Stats.totalAce);
        fun.generateRecentPlayed(fun.recentplayed);
        fun.generateAKA(response.Stats.AKA);
        fun.timerStartPro = Date.now();
        fun.gatherProData(fun.webapi, fun.player, fun.region, fun.type);
        fun.loadtimeClaus = (Date.now() - fun.timerStartClaus) / 1000;
        fun.loadTimeDom = (Date.now() - fun.timerStart) / 1000;

        $(".loading_all").hide();
        $(".open_load").removeClass('open_load').addClass('old_open_load');

    };
    fun.generateRanking = function (rating, ranking) {
        var html = [];
        var style = fun.giveRatingstyle(rating);
        var region_f = fun.region;
        if (region_f == "sg") {
            region_f = "SEA"
        };
        html.push('<div class="rating_number" id=' + style + '>' + rating + '</div>');
        html.push('<div class="rating_caption" data-tooltip="VGPRO RATING">VPR</div>');
        html.push('<div class="position"><span>#' + ranking.global + '</span> GLOBAL</div>');
        html.push('<div class="position"><span>#' + ranking.region + '</span> REGION ' + region_f + '</div>');
        $(".body_box .rating").html(html.join(''));

    }
    fun.generateRecentPlayed = function (recentplayed) {
        $.each(recentplayed, function (key, user) {
            var style = fun.giveWRstyle(user.Winrate);
            var html = '<a href="' + fun.baseurlp + fun.region + '/' + key + '" target="_self"><div class="recent_played_each">';
            html += '<div class="recent_played_name">' + key + '</div>';
            html += '<div class="recent_played_win">' + user.Win + 'W</div>';
            html += '<div class="recent_played_loss">' + user.Loss + 'L</div>';
            html += '<div class="recent_played_winrate" id="' + style + '">' + user.Winrate + '%</div>';
            html += '<div class="recent_played_games" data-i18n="[append]sidebar-played">' + user.Total + ' </div></div></a>';
            $(html).appendTo('.sidebar .recent_played').hide().fadeIn().localize();

        })
        fun.recentplayedPag = $(".sidebar .recent_played").paginate({
            viewmore: ".view_more#recent",
            viewall: ".view_more#recentreset"
        });


    };
    fun.generateMatchFilter = function (games, kills, deaths, farm, krakens, aces) {
        $('.match_filter .stats_each#cs .stats_qty').html((Math.round((farm / games) * 100) / 100).toFixed(0));
        $('.match_filter .stats_each#krakens .stats_qty').html((Math.round((krakens / games) * 100) / 100).toFixed(1));
        $('.match_filter .stats_each#aces .stats_qty').html((Math.round((aces / games) * 100) / 100).toFixed(1));
    }
    fun.generateGameMode = function (gamemodes, total) {
        if ($(".gamemode").length > 1) {
            return false
        };
        var html = '<div class="gamemode select" id="all" data-i18n="[prepend]all"> (' + total + ')</div>';
        $.each(gamemodes, function (index, qnty) {
            html += '<div class="gamemode" id="' + index + '" data-i18n="[prepend]' + index.replace("-", " ") + '"> <span>(' + qnty + ')</span></div>'
        });

        $(".gamemodes").html(html).localize();
    }
    fun.generateAKA = function (aka) {
        if (aka.length <= 0) {
            return false
        }
        $(".aka").fadeIn();
        var html = [];
        $.each(aka, function (index, value) {
            html.push("<a href='" + fun.baseurlp + fun.region + '/' + value + "' target='_self'>");
            html.push("<span>" + value + "</span>");
            html.push("</a>");
        });
        $(".aka_names").html(html.join(''));
    };
    fun.giveRatingstyle = function (rating) {
        var style = '';
        if (rating >= 2000) {
            style = "avg"
        };
        if (rating >= 2600) {
            style = "high";
        }
        if (rating >= 2950) {
            style = "superhigh";
        }
        if (rating <= 1900) {
            style = "low";
        }
        if (rating <= 1000) {
            style = "suplow";
        }
        return style;
    }
    fun.giveWRstyle = function (kda) {
        var style = '';
        if (kda >= 60) {
            style = "avg"
        };
        if (kda >= 70) {
            style = "high";
        }
        if (kda >= 85) {
            style = "superhigh";
        }
        if (kda <= 45) {
            style = "low";
        }
        if (kda <= 35) {
            style = "suplow";
        }
        return style;
    }
    fun.generateDropHeroes = function (heroes) {
        $("select.heroes_x").html('<option selected value="all" data-i18n="[html]all">All</option>');
        $.each(heroes, function (key, heroes) {
            var select = '<option style="background-image:url(assets/images/heroes/' + key.toLowerCase() + '.gif);" value="' + key.toLowerCase() + '">' + key + '</option>';
            $("select.heroes_x").append(select);
        })
    }

    fun.generateTopHeroes = function (heroes) {
        var select = "";
        var html = [];
        $.each(heroes, function (key, hero) {
            var style = fun.giveWRstyle(hero.Winrate);
            html.push('<div class="hero_each" data-hero="' + key.toLowerCase() + '">');
            html.push('<div class="hero_img" style="background-image: url(assets/images/heroes/' + key.toLowerCase() + '.gif)"></div>');
            html.push('<div class="hero_name">' + key + '</div>');
            html.push('<div class="hero_kda"><span data-tooltip="Avg. CS per game" data-i18n="[data-tooltip]avgcs">' + Math.round(hero.totalFarm / hero.totalMatches).toFixed(1) + ' CS</span><span class="kda" data-tooltip="(' + hero.totalKills + ' K + ' + hero.totalAssists + ' A) / ' + hero.totalDeaths + ' D" data-i18n="[append]kda"> ' + hero.kda + ' </span></div>');
            html.push('<div class="hero_winrate" id="' + style + '" data-tooltip="' + hero.totalVictory + 'W ' + hero.totalLoss + ' L" >' + hero.Winrate + '%</div>');
            html.push('<div class="hero_games" data-i18n="[append]sidebar-played">' + hero.totalMatches + ' </div></div>');

            //$(".view_more#hero").data('end', end);
        });
        $(".sidebar .champions").append(html.join("")).localize();

        fun.topHeroesPag = $(".sidebar .champions").paginate({
            viewmore: ".view_more#hero",
            viewall: ".view_more#resethero"
        });
    };

    fun.generateProfileData = function (prodata) {
        $(".profile .profile_img").html("<div class='player_img' style='background-image: url(assets/" + prodata.ppic + ");'></div>");
        $(".profile .profile_team .team_name").html(prodata.teamname);
        $(".profile .profile_team .from").html(prodata.national + " <span class='flag-icon flag-icon-" + prodata.country + "'></span>");
        $(".profile .profile_team .team_role").html("<span data-i18n='[html]role-" + prodata.role + "'></span>").localize();
        $(".profile .profile_team").fadeIn();
    };
    fun.generateChartWin = function (winratex, win, loss) {
        var winrateporcentage = winratex + "%";
        var total = win + loss;
        var percent_number_step = $.animateNumber.numberStepFactories.append('%');
        $('.profile_stats .winrate_ranked h3').animateNumber({
            number: winrateporcentage,
            numberStep: percent_number_step
        });
        $('.profile_stats .winrate_ranked .total_matches').animateNumber({
            number: total
        });
        fun.generateChartData(winrate_ranked, win, loss);
    };
    fun.generateSideChart = function (red, blue) {
        var bluewin = blue.WinRate + "%";
        var redwin = red.WinRate + "%";
        var percent_number_step = $.animateNumber.numberStepFactories.append('%');
        $('.match_filter .redside h2').animateNumber({
            number: red.WinRate,
            numberStep: percent_number_step
        });
        $('.match_filter .blueside h2').animateNumber({
            number: blue.WinRate,
            numberStep: percent_number_step
        });
        $('.match_filter .redside h3 span').animateNumber({
            number: red.Total
        });
        $('.match_filter .blueside h3 span').animateNumber({
            number: blue.Total
        });
        fun.generateChartData(blueside, blue.Wins, blue.Loss);
        fun.generateChartData(redside, red.Wins, red.Loss);
    }
    fun.generateChartRoles = function (role) {
        $(".role_desc#captain").html("<span>" + role.Captain.Kills + "</span> /<span class='d'> " + role.Captain.Deaths + " </span>/ <span>" + role.Captain.Assists + "</span>");
        $(".role_kda#captain").html(role.Captain.KDA + " ").localize();
        $(".role_desc#jungler").html("<span>" + role.Jungler.Kills + "</span> /<span class='d'> " + role.Jungler.Deaths + " </span>/ <span>" + role.Jungler.Assists + "</span>");
        $(".role_kda#jungler").html(role.Jungler.KDA + " ").localize();
        $(".role_desc#carry").html("<span>" + role.Carry.Kills + "</span> /<span class='d'> " + role.Carry.Deaths + " </span>/ <span>" + role.Carry.Assists + "</span>");
        $(".role_kda#carry").html(role.Carry.KDA + " ").localize();
        $(".role_games#captain").html(role.Captain.Games + " ").localize();
        $(".role_games#jungler").html(role.Jungler.Games + " ").localize();
        $(".role_games#carry").html(role.Carry.Games + " ").localize();
        var capstyle = fun.giveWRstyle(role.Captain.Winrate);
        var jstyle = fun.giveWRstyle(role.Jungler.Winrate);
        var cstyle = fun.giveWRstyle(role.Carry.Winrate);
        $('.role_winrate#captain').html("<span id='" + capstyle + "'>" + role.Captain.Winrate + "%</span>");
        $('.role_winrate#jungler').html("<span id='" + jstyle + "'>" + role.Jungler.Winrate + "%</span>");
        $('.role_winrate#carry').html("<span id='" + cstyle + "'>" + role.Carry.Winrate + "%</span>");
        fun.generateChartData(role_chart, role.Carry.Games, role.Captain.Games, role.Jungler.Games);
    };
    fun.generateRecentResults = function (playerstats) {

        $.each(playerstats, function (key, value) {
            if (value == 1) {
                value = "v";
            } else {
                value = "d";
            }
            var profile_place = $(".profile .profile_desc .recent_results");
            profile_place.append('<div class="match_result" id="' + value + '"></div>');
        });
    };

    fun.generateTopHeroesProfile = function (hero) {
        $(".profile .profile_desc .heroes_img_space").append('<div class="heroes_img" data-hero="' + hero + '" style="background-image: url(assets/images/heroes/' + hero + '.gif);"></div>');
    };
    fun.generateKDAtotal = function (kda, avgKill, avgAssist, avgDeaths) {
        var comma_separator_number_step = function comma_separator_number_step(now, tween) {
            now = now.toString();
            nowx = now.slice(0, 1) + "." + now.slice(1, 3);
            if (now.length >= 4) {
                nowx = now.slice(0, 2) + "." + now.slice(2, 4);
            }
            if (now.length <= 1) {
                nowx = now;
            }
            var target = $(tween.elem);
            target.text(nowx);
        };
        $('.profile_stats .kda h1 span').animateNumber({
            number: kda,
            numberStep: comma_separator_number_step
        });
        $('.profile_stats .kda h4 span#kills').animateNumber({
            number: avgKill,
            numberStep: comma_separator_number_step
        });
        $('.profile_stats .kda h4 span#assist').animateNumber({
            number: avgAssist,
            numberStep: comma_separator_number_step
        });
        $('.profile_stats .kda h4 span#mortes').animateNumber({
            number: avgDeaths,
            numberStep: comma_separator_number_step
        });
    };

    fun.generateChartkp = function (winratex, win, loss) {
        var winrateporcentage = winratex + "%";
        var percent_number_step = $.animateNumber.numberStepFactories.append('%');
        $('.profile_stats .kp h3').animateNumber({
            number: winrateporcentage,
            numberStep: percent_number_step
        });
        fun.generateChartData(killparticipation, win, loss);
    };
    fun.generateChartData = function (chart, value1, value2) {
        var value3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var value4 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
        chart.data.datasets[0].data[0] = value1;
        chart.data.datasets[0].data[1] = value2;
        chart.data.datasets[0].data[2] = value3;
        chart.data.datasets[0].data[3] = value4;
        chart.update();
    };

    $(".view_more#match_history").click(function () {
        fun.paginate.show();
    });

    $(".gamemodes").on('click', '.gamemode', function (event) {
        var type = $(this).attr('id');
        playerData.changeType(type);
        $(".gamemode").removeClass('select');
        $(this).addClass('select');
    });
    $(".view_more#hero_history").click(function () {
        var hero = $(this).data('hero');
        if (hero == null) {
            var hero = $(this).data('name');
            fun.paginate.show(hero, '1');
            return false;
        }
        fun.paginate.show(hero);
    });
    $('.search_team').change(function () {
        var name = $(".search_team").val();
        fun.paginate.showsearch(name);
    });
    $('.heroes_x').change(function () {
        var hero = this.value;

        if (hero == 'all') {
            fun.paginate.reset();
            return false;
        }
        fun.paginate.showhero(hero);
    });
    $(".view_more#view_all").click(function () {
        $(".search_team").val('');
        fun.paginate.reset();
    });
    $(".view_more#resethero").click(function () {
        fun.topHeroesPag.reset();
    });
    $(".view_more#recentreset").click(function () {
        fun.recentplayedPag.reset();
    });
    $("body").on('click', '[data-hero]', function (event) {
        var hero = $(this).data('hero');
        fun.paginate.showhero(hero);
    });
    $(".view_more#hero").click(function () {
        fun.topHeroesPag.show();
    });
    $(".view_more#recent").click(function () {
        fun.recentplayedPag.show();
    });
    $(".match_history").on('click', '.match_history_box', function (e) {
        if (!$(e.target).is("[class^='player']")) {
            var id = $(this).data('id');
            matchData.create(id);
        }
    });

    fun.generateMatchHistoryDiv = function (data) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
        var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '5';
        var i = 0;
        var size = data.length;
        var html = [];
        for (var i = 0; i < data.length; i++) {
            matchdata = data[i];
            var winner = "d";
            if (matchdata.Winner == 1) {
                winner = "v";
            }
            if (matchdata.deaths == 0) {
                matchdata.kda = '<font color="green" style="font-size: 12px;"><b data-i18n="[html]perfect-kda"></b></font>';
            }
            html.push('<div class="each_match" data-gohero="' + matchdata.actor + '"><div class="match_history_box" data-gohero="' + matchdata.actor + '" data-id="' + matchdata.MId + '"><div class="match_history_title" id="' + winner + '">');
            html.push('<b data-i18n="[html]' + matchdata.TypeMatch + '"></b> - ' + jQuery.timeago(matchdata.MatchDateTime) + ' - ' + matchdata.duration);
            html.push('<span class="viewmore" data-i18n="match-details"></span></div>');
            html.push('<div class="hero_img" data-tooltip="' + matchdata.actor + '" style="background-image: url(assets/images/heroes/' + matchdata.actor + '.gif)"></div>');
            html.push('<div class="kda" ><span class="kills">' + matchdata.kills + '</span> / <span class="deaths">' + matchdata.deaths + '</span> / <span class="assists">' + matchdata.assists + '</span>');
            html.push('<span class="totalkda" data-i18n="[append]kda" data-tooltip="(' + matchdata.kills + ' k + ' + matchdata.assists + ' a) / ' + matchdata.deaths + ' d"><span>' + matchdata.kda + '</span> </span></div>');
            html.push('<div class="stats"><div class="role" data-i18n="[html]role-' + matchdata.Role + '">' + matchdata.Role + '</div><div class="gold">' + matchdata.gold + ' (' + matchdata.gmin + ' g/min)</div><div class="cs" data-tooltip="' + matchdata.jungleKills + ' Jungle Kills">' + matchdata.farm + ' CS (' + matchdata.csmin + ' cs/min)</div></div>');
            html.push('<div class="items">');
            $.each(matchdata.Items, function (keytwo, items) {
                html.push('<div class="item_img" data-tooltip="' + items.replace(/-/g, ' ') + '" style="background-image: url(assets/images/items/' + items + '.png)"></div>');
            });

            html.push('</div>');
            html.push('<div class="player_list"><div class="aside">');
            $.each(matchdata.BlueTeam.Players, function (keytwo, valuetwo) {
                var style = "";
                if (matchdata.player == valuetwo.name) {
                    style = "name";
                }
                html.push('<a href="' + fun.baseurlp + fun.region + '/' + valuetwo.name + '" target="_self">');
                html.push('<div class="player_list_name" id="' + style + '"><div class="player_list_hero" style="background-image: url(assets/images/heroes/' + valuetwo.actor + '.gif)"></div><span class="player_name">' + valuetwo.name + '</span></div></a>');
            });

            html.push('</div>');

            html.push('<div class="bside">');

            $.each(matchdata.RedTeam.Players, function (keytwo, valuetwo) {
                var style = "";
                if (matchdata.player == valuetwo.name) {
                    style = "name";
                }
                html.push('<a href="' + fun.baseurlp + fun.region + '/' + valuetwo.name + '" target="_self">');
                html.push('<div class="player_list_name" id="' + style + '"><div class="player_list_hero" style="background-image: url(assets/images/heroes/' + valuetwo.actor + '.gif)"></div><span class="player_name">' + valuetwo.name + '</span></div></a>');
            });
            html.push('</div>');
            html.push('</div></div>');
            html.push('<div class="match_history_more" id="' + matchdata.MId + '"></div></div>');


        }
        $(".match_history").append(html.join("")).localize();

        fun.paginate = $(".match_history").paginate({
            viewmore: ".view_more#match_history",
            itemsPerPage: 8
        });
    };
    return fun;
}();

var frontpage = function () {
    "use strict";

    var feed = {}


    feed.loadHeroes = function () {
        var url = config.webapi + "/topheroes";
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: feed.loadStats
        });
    }
    feed.loadLeadboard = function () {
        var url = config.webapi + "/topfive";
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: feed.loaddivLeadboard
        });
    }
    feed.loaddivLeadboard = function (response) {
        var divs = [];
        $.each(response, function (region, dados) {
            divs.push('<div class="eachregion" id="' + region + '" style="display:none;">');
            $.each(dados, function (position, player) {
                var skilltier = parseInt(player.tier) + 2;
                divs.push('<a href="' + config.baseurlp + player.region + '/' + player.name + '" target="_self">');
                var region_f = player.region;
                if (region == "sg") {
                    region_f = "SEA"
                };
                divs.push('<div class="eachdata"><div class="number"><span>' + position + '</span></div><div class="skilltier"><div class="skilltier_img" style="background-image:url(/assets/images/skilltier/' + skilltier + '.png)"></div></div><div class="player_name"><span>' + region_f + '</span>' + player.name + '</div><div class="KDA">' + player.kda + '</div><div class="rating">' + player.rating + '</div></div>');
                divs.push('</a>');
            });
            divs.push('</div>');
        });

        $(".box_content_leadboard").html(divs.join(''));
        feed.showRegion('all');
    }
    feed.showRegion = function (region) {
        $(".box_content_leadboard .eachregion").hide();
        $(".box_content_leadboard .eachregion#" + region).show();
    }
    feed.loadStats = function (response) {
        var pickrate = [];
        var winratear = [];
        $.each(response, function (region, re) {
            var i = 0;
            var winrate = re.WinRate;
            var length = Object.keys(winrate).length - 1;
            var region_f = region;
            if (region == "sg") {
                region_f = "SEA"
            };
            winratear.push('<div class="eachdata"><div class="reg"><span>' + region_f + '</span></div>');
            winratear.push('<div class="hero_w"><div class="hero_img" style="background-image: url(assets/images/heroes/' + Object.keys(re.WinRate)[0].toLowerCase() + '.gif);"></div><div class="hero_name">' + Object.keys(re.WinRate)[0] + '</div><div class="hero_value">' + re.WinRate[Object.keys(re.WinRate)[0]] + '%</div></div>');
            winratear.push('<div class="hero_l"><div class="hero_img" style="background-image: url(assets/images/heroes/' + Object.keys(re.WinRate)[length].toLowerCase() + '.gif);"></div><div class="hero_name">' + Object.keys(re.WinRate)[length] + '</div><div class="hero_value">' + re.WinRate[Object.keys(re.WinRate)[length]] + '%</div></div>');
            winratear.push('</div>');
            pickrate.push('<div class="eachdata"><div class="reg"><span>' + region_f + '</span></div>');
            pickrate.push('<div class="hero_w"><div class="hero_img" style="background-image: url(assets/images/heroes/' + Object.keys(re.PickRate)[0].toLowerCase() + '.gif);"></div><div class="hero_name">' + Object.keys(re.PickRate)[0] + '</div><div class="hero_value">' + re.PickRate[Object.keys(re.PickRate)[0]] + '%</div></div>');
            pickrate.push('<div class="hero_l"><div class="hero_img" style="background-image: url(assets/images/heroes/' + Object.keys(re.PickRate)[length].toLowerCase() + '.gif);"></div><div class="hero_name">' + Object.keys(re.PickRate)[length] + '</div><div class="hero_value">' + re.PickRate[Object.keys(re.PickRate)[length]] + '%</div></div>');
            pickrate.push('</div>');

        });
        $(".box_content_winrate").html(winratear.join(''));
        $(".box_content_pickrate").html(pickrate.join(''));


    }
    feed.loadApi = function () {
        var region = arguments.length >= 0 && arguments[0] !== undefined ? arguments[0] : '';
        var url = config.webapi + "/promatches/" + region;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: feed.loadData
        });
    }

    feed.loadData = function (response) {
        feed.response = response;
        feed.generateData(feed.response);
    }

    feed.generateData = function (pros) {
        $(".pro-feed_history").html('');
        var html = [];
        $.each(pros, function (index, pro) {
            var win = "Loss";
            if (pro.winner == 1) {
                win = "Win"
            }
            var region_f = pro.region;
            if (region_f == "sg") {
                region_f = "SEA"
            };
            html.push('<a href="' + config.baseurlp + pro.region + '/' + pro.ign + '" target="_self" class="match">  ');
            html.push('<div class="time">' + jQuery.timeago(pro.when) + '</div>  ');
            html.push('<div class="reg"><span>' + region_f + '</span></div> ');
            html.push('<div class="photo">');
            html.push('<div class="pro_img" style="background-image: url(assets/' + pro.ProfilePic + ');"></div>    ');
            html.push('<div class="hero_img" style="background-image: url(assets/images/heroes/' + pro.actor + '.gif);"></div> ');
            html.push('</div><div class="player_name">' + pro.ign + '</div> ');
            html.push('<div class="victory" id="' + win + '" data-i18n="[html]' + win + '"></div> ');
            html.push('<div class="kda">' + pro.kills + '/' + pro.deaths + '/' + pro.assists + '</div>');
            html.push('<div class="role" data-i18n="[html]role-' + pro.role + '"></div>');
            html.push('<div class="item">');
            $.each(pro.Items, function (keytwo, items) {
                html.push('<div class="item_img" data-tooltip="' + items.replace(/-/g, ' ') + '" style="background-image: url(assets/images/items/' + items + '.png)"></div>');
            })
            html.push('</div></a>');

        });
        $(".pro-feed_history").append(html.join('')).localize();
        feed.profeedpag = $(".pro-feed_history").paginate({
            viewmore: ".view_more#more",
            viewall: ".view_more#reset",
            itemsPerPage: 10
        });
    }
    feed.init = function () {
        //$(".preload").fadeOut();
        feed.loadApi();
        feed.loadLeadboard();
        feed.loadHeroes();
        $(".region_leadboard").change(function (event) {
            feed.showRegion($(this).val());
        });
        $(".view_more#more").click(function (event) {
            feed.profeedpag.show();
        });
        $(".view_more#reset").click(function (event) {
            feed.profeedpag.reset();
        });

    }

    return feed;


}();

var matchData = function () {
    var match = {};
    var params = window.location.pathname.split('/').slice(1);
    match.region = params[1];
    match.timerStart = Date.now();
    //match.width = $(".map").width();
    match.width = '746';
    match.height = '290';
    match.canvas_width = 1234;
    match.canvas_height = 480;

    match.scaling = match.width / match.canvas_width;
    match.scaled_width = match.canvas_width * match.scaling
    match.scaled_height = match.canvas_height * match.scaling


    match.transformX = function (x) {
        return (((x - -93) * (match.scaled_width / 185)) / match.width) * 100;
    }

    match.transformY = function (y) {
        return (((y - -25) * (match.scaled_height / 75)) / match.height) * 100;
    }

    match.transformXraw = function (x) {
        return (x - -93) * (match.scaled_width / 185);
    }

    match.transformYraw = function (y) {
        return (y - -25) * (match.scaled_height / 75);
    }


    match.create = function (id) {
        var div = $(".match_history_more#" + id);
        if (div.is(":visible") == false) {
            div.html('<svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>')
            div.slideDown('fast', function () {
                match.getMatch(id)
            });
            //div.slideDown();

        } else {
            div.slideUp('slow', function () {
                div.html('');
            })
        }



    }
    match.getMatch = function (id) {
        var url = config.webapi + "/match/" + match.region + "/" + id + "/";
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: match.generateMatch,
            error: match.Error
        });

    }
    match.getTelemetry = function (id) {
        var url = config.telemetry + id;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: match.generateTelemetry,
            error: match.Error
        });
    }
    match.formatNum = function (num) {
        return num > 999 ? (num / 1000).toFixed(1) + 'k' : num
    }
    match.generateTelemetry = function (response) {
        var damage = {};
        var get_max = [];

        var damage = {};
        var get_max = [];


        if ("errors" in response) {

            $(".match_history_more#" + match.ID + " .damage span").html('NOT AVAILABLE');
            return false;
        }


        $.each(response.Vision, function (side, item) {
            var vision = [];
            var heatmap = h337.create({
                container: document.querySelector('.heat_map_' + side + '' + match.ID),
                maxOpacity: .5
            });
            $.each(item, function (id, items) {
                var itemx = [];
                itemx['x'] = Math.round(match.transformXraw(items.Location[0]));
                itemx['y'] = Math.round(match.transformYraw(items.Location[2]));
                itemx['value'] = items.Value;
                vision.push(itemx);

            })
            heatmap.setData({
                max: 7,
                data: vision
            });
            var heatmap = '';
        });
        $.each(response.Facts, function (index, side) {
            $.each(side, function (hero, stuff) {
                var hero_data = index + hero.toLowerCase();
                get_max.push(stuff.Delt);
                damage[hero_data] = stuff.Delt;
                i = 1;
                var ctx = $("canvas#" + hero_data);
                var dataxx = {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: []
                    }]
                };
                x = 0;
                $.each(stuff.GoldSource, function (name, amount) {
                    dataxx.datasets[0].backgroundColor[x] = match.gerarCor(name);
                    dataxx.labels[x] = name;
                    dataxx.datasets[0].data[x] = amount;
                    x++;
                });
                // var myPieChart = new Chart(ctx, {
                //   type: 'pie',
                //   data: dataxx,
                //   options: {
                //     pieceLabel: {
                //       mode: 'value',
                //       precision: 2
                //     }
                //   }
                // });
                $.each(stuff.SkillOverDrive, function (name, overdrive) {
                    $("#" + match.ID + " .content_builds .overdrive_content#" + hero_data).append('<div class="skill_img" style="background-image: url(assets/images/abilities/' + overdrive + '.png)"></div>');
                });
                $.each(stuff.Items, function (time, item) {
                    $("#" + match.ID + " .content_builds .build_wrap#" + hero_data).append('<div class="item"><div class="item_img" style="background-image: url(assets/images/items/' + item.Item.toLowerCase().replace(/ /g, '-') + '.png)"></div><div class="item_time">' + item.Time + '</div></div>');

                });
                $.each(stuff.Skill, function (name, skills) {

                    $("#" + match.ID + " .content_builds .skill_order#" + hero_data + " ." + skills + ".level_" + i).addClass('levelup');
                    i++;
                });


                $.each(stuff.Kills, function (name, kills) {
                    $("#" + match.ID + " .content_killmap .map").append("<div class='point " + index + "' data-tooltip='" + hero + " killed " + kills.Killed + "' data-type='kill' data-name='" + hero_data + "' style='background-color:" + match.gerarCor(hero_data) + ";top: " + match.transformY(kills.Position[2]) + "%;left: " + match.transformX(kills.Position[0]) + "%;'> </div>");

                })
                $.each(stuff.Deaths, function (name, death) {
                    $("#" + match.ID + " .content_killmap .map").append("<div class='point' data-type='death' data-tooltip='" + death.Actor + " killed " + hero + "' data-name='" + index + death.Killed.toLowerCase() + "' style='display:none;background-color:white;top: " + match.transformY(death.Position[2]) + "%;left: " + match.transformX(death.Position[0]) + "%;'> </div>");

                })


                $("#" + match.ID + " .build_heroes:contains('" + playerData.player + "')").click();
                $("#" + match.ID + " .stats_heroes:contains('" + playerData.player + "')").click();
                $("#" + match.ID + " .vision_team[data-side='Blue']").click();
                if ($("#" + match.ID + " .content_builds .skill_order#" + hero_data + " ." + hero.toLowerCase() + "_c.levelup").length >= '3') {
                    $("#" + match.ID + " .builds_content .overdrive_content#" + hero_data).append('<div class="skill_img" style="background-image: url(assets/images/abilities/' + hero.toLowerCase() + '_c.png)"></div>');
                }
            });

        });
        $("#" + match.ID + " .content_draft .circular").hide();
        $.each(response.Draft, function(index, draft) {
          var type = (draft.Type === "HeroBan") ? "draft-ban" : "draft-pick";
          var side  = (draft.Team === "1") ? "team-a-c" : "team-b-c";
          var sidex = (draft.Team === "1") ? "team-a" : "team-b";
          $("#" + match.ID + " .content_draft ."+side).append('<div class="'+sidex+' '+type+'"> \
                              <div class="hero_img" data-tooltip="' + draft.Hero +'" style="background-image: url(assets/images/heroes/' + draft.Hero.toLowerCase() +'.gif)"></div> \
                        </div> ');
          // $("#" + match.ID + " .content_draft").append("<div class='draft-hero draft-"+type+" draft-team-"+side+"'> \
          // <div class='hero_img' data-tooltip='" + draft.Hero + "' style='background-image: url(assets/images/heroes/" + draft.Hero.toLowerCase() + ".gif)'></div> \
          // <div class'hero-tile'>"+draft.Hero+" "+type+" </div> </div>");
        })

        var maxdmg = Math.max.apply(Math, get_max);

        $.each(damage, function (div, value) {
            $(".damage#" + response.id + "[data-dmg='" + div + "'] span").html(match.formatNum(value));


            var porc = Math.round((value / maxdmg) * 100);
            $(".damage#" + response.id + "[data-dmg='" + div + "'] .bar .fill").width(porc);
            $("#" + match.ID + " .damages_chart#" + div + " .damageDoneHeroes .damage-fill").width(porc);
        });



    }
    match.gerarCor = function (str) {
        for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
        color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        return '#' + Array(6 - color.length + 1).join('0') + color;
    }
    match.Error = function (response) { }

    $("body").on('click', '.tab', function (event) {
        var name = $(this).attr('id');
        var match_id = $(this).data('match');
        $("#" + match_id + " .more_overview").children().hide();
        $("#" + match_id + " .tab").removeClass('select');
        $(this).addClass('select');
        $("#" + match_id + " .content_" + name).fadeIn();
    });

    $("body").on('click', '.killmap_heroes', function (event) {
        if ($(this).hasClass('selected') == true) {
            $("#" + $(this).data('match') + " .content_killmap .map").children().hide();
            $("#" + $(this).data('match') + " .content_killmap .map").children("div[data-type='kill']").show();
            $(".killmap_heroes").removeClass('selected');
            return false;
        }
        $(".killmap_heroes").removeClass('selected');
        $(this).addClass('selected');
        match.filterMapHero($(this).data('match'), $(this).data('name'), $(this).data('side'));
    });
    $("body").on('click', '.build_heroes', function (event) {
        if ($(this).hasClass('selected') == true) {
            return false;
        }
        $(".build_heroes").removeClass('selected');
        $(this).addClass('selected');
        match.filterBuild($(this).data('match'), $(this).data('name'), $(this).data('side'));
    });
    $("body").on('click', '.stats_heroes', function (event) {
        if ($(this).hasClass('selected') == true) {
            return false;
        }
        $(".stats_heroes").removeClass('selected');
        $(this).addClass('selected');
        match.filterStats($(this).data('match'), $(this).data('name'), $(this).data('side'));
    });
    $("body").on('click', '.vision_team', function (event) {
        if ($(this).hasClass('selected') == true) {
            return false;
        }
        $(".vision_team").removeClass('selected');
        $(this).addClass('selected');
        match.filterVision($(this).data('match'), $(this).data('name'), $(this).data('side'));
    });

    match.filterStats = function (mid, name, side) {
        $(".stats_load").hide();
        $("#" + mid + " .hero_stats_each").hide();
        $("#" + mid + " .hero_stats_each." + side + name + "_each_stats").fadeIn();
    }
    match.filterVision = function (mid, name, side) {
        $(".stats_load").hide();
        $("#" + mid + " .heatmap").hide();
        $("#" + mid + " .heat_map_" + side + mid).fadeIn();
    }
    match.filterBuild = function (mid, name, side) {
        $(".build_load").hide();
        $("#" + mid + " .heroes_build").hide();
        $("#" + mid + " .heroes_build." + side + name + "_build").fadeIn();
    }
    match.filterMapHero = function (mid, name, side) {
        $("#" + mid + " .content_killmap .map").children().hide();
        $("#" + mid + " .content_killmap .map").children('.point[data-name=' + side + name + ']').show();
    }


    match.draft = function (matchdata) {
      var matchmore = [];
      
        matchmore.push('<div class="content_draft" style="display:none" id="' + matchdata.MatchId + '">');
        matchmore.push('<svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>');
        matchmore.push('<div class="draft_content" id="' + matchdata.MatchId + '">');
        matchmore.push('<div class="team-a-c"></div>');
        matchmore.push('<div class="team-b-c"></div>');
        matchmore.push('</div>');

        matchmore.push('</div>');
        return matchmore.join('');
    }
    match.generateMatch = function (response) {
        var matchdata = response.Data.Match;
        var teams = matchdata.Teams;
        var map_players = {};
        map_players.Red = {};
        map_players.Blue = {};
        var matchmore = [];

        matchmore.push('<div class="tab_header">');

        matchmore.push('<div class="tab select" id="overview" data-match="' + matchdata.MatchId + '" data-i18n="[html]overview">Overview</div>');
        matchmore.push('<div class="tab" id="killmap" data-match="' + matchdata.MatchId + '" data-i18n="[html]kill-map">Kill Map</div>')
        matchmore.push('<div class="tab" id="builds" data-match="' + matchdata.MatchId + '" data-i18n="[html]builds-breakdown">Player Builds</div>');
         matchmore.push('<div class="tab" id="draft" data-match="' + matchdata.MatchId + '">Draft</div>');
        matchmore.push('<div class="tab" id="vision" data-match="' + matchdata.MatchId + '">Vision Map</div>');
        matchmore.push('</div>');


        matchmore.push('<div class="more_overview" id="' + matchdata.MatchId + '">');
        matchmore.push('<div class="content_overview" id="' + matchdata.MatchId + '">');
        $.each(teams, function (teamid, team) {
            var players = team.Players;
            var winner = 'Loss';
            if (team.Winner == 'true') {
                winner = 'Win'
            };

            matchmore.push('<div class="sidestats"><div class="head_side"><div class="info" data-i18n="[append]' + teamid.toLowerCase() + '-side"><span id="' + winner + '" data-i18n="[html]' + winner + '">' + winner + '</span> </div>');
            matchmore.push('<div class="items" data-i18n="[html]items">Items</div><div class="kda" data-i18n="[html]kda"></div>');
            matchmore.push('<div class="damage" data-i18n="[html]damage">Damage</div>');
            matchmore.push('<div class="cs">CS</div>');
            // matchmore.push('<div class="gold">Gold</div>');
            matchmore.push('<div class="tier" data-i18n="[html]tier">Tier</div></div>');
            $.each(players, function (index, el) {
                var items = el.Items;
                map_players[teamid][el.actor] = el;
                if (el.deaths == 0) {
                    el.KDA = '<font color="green" size="0.5" style="position:absolute;margin-left:-42px;margin-top:2px;"><b data-i18n="[html]perfect-kda">PERFECT</b></font>';
                }
                matchmore.push('<div class="each"><div class="info"><a href="' + config.baseurlp + match.region + '/' + el.name + '" target="_self">');
                matchmore.push('<div class="hero_img" data-tooltip="' + el.actor + '" style="background-image: url(assets/images/heroes/' + el.actor + '.gif)"></div>');
                matchmore.push('<div class="player_name">' + el.name + '</div></a>');
                matchmore.push('</div>');
                matchmore.push('<div class="items">');
                $.each(items, function (index, el) {
                    matchmore.push('<div class="item_img" data-tooltip="' + el + '" style="background-image: url(assets/images/items/' + el + '.png)"></div>');
                })
                matchmore.push('</div>');
                matchmore.push('<div class="kda"><span class="kda">' + el.KDA + ' KDA</span><span class="numb">' + el.kills + ' / <span class="death">' + el.deaths + '</span> / ' + el.assists + '</div></span>');
                matchmore.push('<div class="damage" id="' + matchdata.MatchId + '" data-dmg="' + teamid + el.actor + '"><span>Loading.</span><div class="bar"><div class="fill" style="width:0;"></div></div></div>');
                matchmore.push('<div class="cs"><span class="total">' + el.farm + ' cs</span><span class="jungle" data-i18n="[append]jungle">' + el.jungleKills + ' </span></div>');
                //matchmore.push('<div class="gold">-/-</div>');
                // matchmore.push('<div class="tier" id="' + el.skillColor + '">' + el.skillShort + '<br>' + el.skillColor + '</div>');
                var skilltier = parseInt(el.skillTier) + 2;
                matchmore.push('<div class="tier" data-tooltip="' + el.skillName + ' ' + el.skillColor + '"><div class="tier_img" style="background-image: url(assets/images/skilltier/' + skilltier + '.png)" ></div></div>');
                matchmore.push('</div>');

            })
            matchmore.push('<div class="team_stats">');
            matchmore.push('<div class="stats"><span class="name" id="sentrygun"></span>');
            matchmore.push('<span class="value" id="sentrygun"> ' + team.TurretKills + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats"><span class="name" data-i18n="[prepend]krakens">:</span>');
            matchmore.push('<span class="value"> ' + team.Kraken + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats"><span class="name" data-i18n="[prepend]gold">:</span>');
            matchmore.push('<span class="value"> ' + team.Gold + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats"><span class="name" data-i18n="[prepend]aces">:</span>');
            matchmore.push('<span class="value"> ' + team.Aces + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats" id="not"><span class="name" data-i18n="[prepend]kills">:</span>');
            matchmore.push('<span class="value"> ' + team.TotalKills + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats" id="not"><span class="name" data-i18n="[prepend]deaths">:</span>');
            matchmore.push('<span class="value"> ' + team.TotalDeaths + '</span>');
            matchmore.push('</div>');
            matchmore.push('<div class="stats" id="not"><span class="name" data-i18n="[prepend]assists">:</span>');
            matchmore.push('<span class="value"> ' + team.TotalAssists + '</span>');
            matchmore.push('</div>');
            matchmore.push('</div></div>');


        });

        matchmore.push('</div>');

        //start killmap
        matchmore.push('<div class="content_killmap" style="display:none" id="' + matchdata.MatchId + '">');
        //addteam
        matchmore.push(' <div class="more_team"><div class="more_wrap"><div class="more_nameT" data-i18n="[prepend]blue-side"></div>');

        $.each(map_players.Blue, function (hero, name) {
            var hero_data = 'Blue' + hero.toLowerCase();
            matchmore.push('<div class="more_heroes killmap_heroes" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="' + hero + '"><div class="more_hero_img" style="background-image: url(assets/images/heroes/' + hero + '.gif);border-left: 8px solid ' + match.gerarCor(hero_data) + '"></div><div class="more_hero_name">' + name.name + '</div></div>');
        });
        matchmore.push('</div></div>');
        //end team
        matchmore.push('<div class="map"></div>');
        //add team
        matchmore.push(' <div class="more_team"><div class="more_wrap"><div class="more_nameT red" data-i18n="[prepend]red-side"></div>');
        $.each(map_players.Red, function (hero, name) {
            var hero_data = 'Red' + hero.toLowerCase();
            matchmore.push('<div class="more_heroes killmap_heroes" data-match="' + matchdata.MatchId + '" data-side="Red" data-name="' + hero + '"><div class="more_hero_img" style="background-image: url(assets/images/heroes/' + hero + '.gif);border-left: 8px solid ' + match.gerarCor(hero_data) + '"></div><div class="more_hero_name">' + name.name + '</div></div>');
        });
        matchmore.push('</div></div>');
        //end team
        matchmore.push('</div>');
        //end killmap
        //start build
        matchmore.push('<div class="content_builds" style="display:none" id="' + matchdata.MatchId + '">');

        matchmore.push(' <div class="more_team"><div class="more_wrap"><div class="more_nameT" data-i18n="[prepend]blue-side"></div>');
        $.each(map_players.Blue, function (hero, name) {
            var hero_data = 'Blue' + hero.toLowerCase();
            matchmore.push('<div class="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="' + hero + '"><div class="more_hero_img" style="background-image: url(assets/images/heroes/' + hero + '.gif)"></div><div class="more_hero_name">' + name.name + '</div></div>');
        });
        matchmore.push('</div></div>');
        //end team
        matchmore.push('<div class="more_team"><div class="more_wrap"><div class="more_nameT red" data-i18n="[prepend]red-side"></div>');
        $.each(map_players.Red, function (hero, name) {
            var hero_data = 'Red' + hero.toLowerCase();
            matchmore.push('<div class="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Red" data-name="' + hero + '"><div class="more_hero_img" style="background-image: url(assets/images/heroes/' + hero + '.gif)"></div><div class="more_hero_name">' + name.name + '</div></div>');
        });

        matchmore.push('</div></div>');
        //end team

        matchmore.push('<div class="builds_content" id="' + matchdata.MatchId + '">');
        $.each(map_players.Blue, function (hero, name) {
            var hero_data = 'Blue' + hero.toLowerCase();
            matchmore.push('<div class="heroes_build ' + hero_data + '_build" style="display:none;">');
            matchmore.push('<div class="title" data-i18n="[html]skills">Skills</div><div class="skill_wrap"><div class="skill_overdrive"><h2 data-i18n="[html]overdrive">Overdrive</h2><div class="overdrive_content" id="' + hero_data + '">');
            matchmore.push('</div></div>');
            matchmore.push('<div class="skill_order" id="' + hero_data + '">');
            matchmore.push('<div class="skill a"><div class="skill_img" style="background-image: url(assets/images/abilities/' + hero.toLowerCase() + '_a.png)"></div><div class="level ' + hero.toLowerCase() + '_a level_1">1</div> <div class="level ' + hero.toLowerCase() + '_a level_2 ">2</div> <div class="level ' + hero.toLowerCase() + '_a level_3">3</div> <div class="level ' + hero.toLowerCase() + '_a level_4">4</div> <div class="level ' + hero.toLowerCase() + '_a level_5">5</div> <div class="level ' + hero.toLowerCase() + '_a level_6">6</div> <div class="level ' + hero.toLowerCase() + '_a level_7">7</div> <div class="level ' + hero.toLowerCase() + '_a level_8">8</div> <div class="level ' + hero.toLowerCase() + '_a level_9">9</div> <div class="level ' + hero.toLowerCase() + '_a  level_10">10</div> <div class="level ' + hero.toLowerCase() + '_a  level_11">11</div> <div class="level ' + hero.toLowerCase() + '_a  level_12">12</div> </div>');
            matchmore.push('<div class="skill b"><div class="skill_img" style="background-image: url(assets/images/abilities/' + hero.toLowerCase() + '_b.png)"></div><div class="level ' + hero.toLowerCase() + '_b level_1">1</div> <div class="level ' + hero.toLowerCase() + '_b level_2">2</div> <div class="level ' + hero.toLowerCase() + '_b level_3">3</div> <div class="level ' + hero.toLowerCase() + '_b level_4">4</div> <div class="level ' + hero.toLowerCase() + '_b level_5">5</div> <div class="level ' + hero.toLowerCase() + '_b level_6">6</div> <div class="level ' + hero.toLowerCase() + '_b level_7">7</div> <div class="level ' + hero.toLowerCase() + '_b level_8">8</div> <div class="level ' + hero.toLowerCase() + '_b level_9">9</div> <div class="level ' + hero.toLowerCase() + '_b level_10">10</div> <div class="level ' + hero.toLowerCase() + '_b level_11">11</div> <div class="level ' + hero.toLowerCase() + '_b level_12">12</div> </div>');
            matchmore.push('<div class="skill c"><div class="skill_img" style="background-image: url(assets/images/abilities/' + hero.toLowerCase() + '_c.png)"></div><div class="level ' + hero.toLowerCase() + '_c level_1">1</div> <div class="level ' + hero.toLowerCase() + '_c level_2">2</div> <div class="level ' + hero.toLowerCase() + '_c level_3">3</div> <div class="level ' + hero.toLowerCase() + '_c level_4">4</div> <div class="level ' + hero.toLowerCase() + '_c level_5">5</div> <div class="level ' + hero.toLowerCase() + '_c level_6">6</div> <div class="level ' + hero.toLowerCase() + '_c level_7">7</div> <div class="level ' + hero.toLowerCase() + '_c level_8">8</div> <div class="level ' + hero.toLowerCase() + '_c level_9">9</div> <div class="level ' + hero.toLowerCase() + '_c level_10">10</div> <div class="level ' + hero.toLowerCase() + '_c level_11">11</div> <div class="level ' + hero.toLowerCase() + '_c level_12">12</div> </div>');
            matchmore.push('</div></div>');
            matchmore.push('<div class="title" data-i18n="[html]builds-breakdown">Build</div>');
            matchmore.push('<div class="build_wrap" id="' + hero_data + '">');

            matchmore.push('</div></div>');
        });
        matchmore.push('<div class="build_load"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');
        $.each(map_players.Red, function (hero, name) {
            var hero_data = 'Red' + hero.toLowerCase();
            matchmore.push('<div class="heroes_build ' + hero_data + '_build"  style="display:none;">');
            matchmore.push('<div class="title" data-i18n="[html]skills">Skills</div><div class="skill_wrap"><div class="skill_overdrive"><h2 data-i18n="[html]overdrive">Overdrive</h2><div class="overdrive_content" id="' + hero_data + '">');
            matchmore.push('</div></div>');
            matchmore.push('<div class="skill_order" id="' + hero_data + '">');
            matchmore.push('<div class="skill a"><div class="skill_img" style="background-image: url(http://vgpro.gg/assets/images/abilities/' + hero.toLowerCase() + '_a.png)"></div><div class="level ' + hero.toLowerCase() + '_a level_1">1</div> <div class="level ' + hero.toLowerCase() + '_a level_2 ">2</div> <div class="level ' + hero.toLowerCase() + '_a level_3">3</div> <div class="level ' + hero.toLowerCase() + '_a level_4">4</div> <div class="level ' + hero.toLowerCase() + '_a level_5">5</div> <div class="level ' + hero.toLowerCase() + '_a level_6">6</div> <div class="level ' + hero.toLowerCase() + '_a level_7">7</div> <div class="level ' + hero.toLowerCase() + '_a level_8">8</div> <div class="level ' + hero.toLowerCase() + '_a level_9">9</div> <div class="level ' + hero.toLowerCase() + '_a  level_10">10</div> <div class="level ' + hero.toLowerCase() + '_a  level_11">11</div> <div class="level ' + hero.toLowerCase() + '_a  level_12">12</div> </div>');
            matchmore.push('<div class="skill b"><div class="skill_img" style="background-image: url(http://vgpro.gg/assets/images/abilities/' + hero.toLowerCase() + '_b.png)"></div><div class="level ' + hero.toLowerCase() + '_b level_1">1</div> <div class="level ' + hero.toLowerCase() + '_b level_2">2</div> <div class="level ' + hero.toLowerCase() + '_b level_3">3</div> <div class="level ' + hero.toLowerCase() + '_b level_4">4</div> <div class="level ' + hero.toLowerCase() + '_b level_5">5</div> <div class="level ' + hero.toLowerCase() + '_b level_6">6</div> <div class="level ' + hero.toLowerCase() + '_b level_7">7</div> <div class="level ' + hero.toLowerCase() + '_b level_8">8</div> <div class="level ' + hero.toLowerCase() + '_b level_9">9</div> <div class="level ' + hero.toLowerCase() + '_b level_10">10</div> <div class="level ' + hero.toLowerCase() + '_b level_11">11</div> <div class="level ' + hero.toLowerCase() + '_b level_12">12</div> </div>');
            matchmore.push('<div class="skill c"><div class="skill_img" style="background-image: url(http://vgpro.gg/assets/images/abilities/' + hero.toLowerCase() + '_c.png)"></div><div class="level ' + hero.toLowerCase() + '_c level_1">1</div> <div class="level ' + hero.toLowerCase() + '_c level_2">2</div> <div class="level ' + hero.toLowerCase() + '_c level_3">3</div> <div class="level ' + hero.toLowerCase() + '_c level_4">4</div> <div class="level ' + hero.toLowerCase() + '_c level_5">5</div> <div class="level ' + hero.toLowerCase() + '_c level_6">6</div> <div class="level ' + hero.toLowerCase() + '_c level_7">7</div> <div class="level ' + hero.toLowerCase() + '_c level_8">8</div> <div class="level ' + hero.toLowerCase() + '_c level_9">9</div> <div class="level ' + hero.toLowerCase() + '_c level_10">10</div> <div class="level ' + hero.toLowerCase() + '_c level_11">11</div> <div class="level ' + hero.toLowerCase() + '_c level_12">12</div> </div>');
            matchmore.push('</div></div>');
            matchmore.push('<div class="title" data-i18n="[html]builds-breakdown">Build</div>');
            matchmore.push('<div class="build_wrap" id="' + hero_data + '">');

            matchmore.push('</div>');
            matchmore.push('</div>');
        });
        matchmore.push('</div>');
        //start team

        //end teami
        matchmore.push('</div>');

        //start draft
        matchmore.push(match.draft(matchdata));


        matchmore.push('<div class="content_vision" style="display:none" id="' + matchdata.MatchId + '">');
        //addteam
        matchmore.push(' <div class="more_team"><div class="more_wrap">');

        matchmore.push('<div class="more_heroes vision_team" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="Blue"><div class="more_hero_img" style="background-color:#5285C9;"></div><div class="more_hero_name" data-i18n="[prepend]blue-side"></div></div><div class="more_heroes vision_team"  data-match="' + matchdata.MatchId + '" data-side="Red" data-name="Red"><div class="more_hero_img" style="background-color:#FF5944;"></div><div class="more_hero_name" data-i18n="[prepend]red-side"></div></div></div></div>');
        //end team
        matchmore.push('<div class="map"><div class="heatmap heat_map_Blue' + matchdata.MatchId + '" id="' + matchdata.MatchId.substring(25, 30) + '" style="display:none"></div><div class="heatmap heat_map_Red' + matchdata.MatchId + '" id="' + matchdata.MatchId.substring(25, 30) + '" style="display:none"></div></div>');
        //add team
        //end team
        matchmore.push('</div>');

        //matchmore.push('<svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>');
        matchmore.push('</div></div>');

        matchmore.push('</div>');
        //$(".match_history_more#"+matchdata.MatchId).html(html);
        $(".match_history_more#" + matchdata.MatchId).html(matchmore.join('')).localize();
        match.ID = matchdata.MatchId;
        match.getTelemetry(matchdata.MatchId);


    };

    return match;
}();

var teamData = function () {
    "use strict";
    var team = {};
    team.init = function () {
        var region = tools.getRegion();
        $(".regieach div#" + region).click();
        //$(".preload").fadeOut();
    }

    $(".regieach").on('click', 'div', function (event) {
        $(".regieach div").removeAttr('class');
        $(this).addClass('select');
        $(".content .boxes").html('<div align="center"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></span></div>');
        teamData.loadApi($(this).attr('id'));


        /* Act on the event */
    });
    team.loadApi = function (region) {
        var url = config.webapi + "list_teams/" + region;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: team.loadData
        });
    }

    team.loadData = function (response) {
        $(".content .boxes").html('');
        $.each(response, function (index, el) {
            var teamshalf = Math.round(Object.keys(el).length / 2);
            var i = 0;
            var html = [];
            html.push('<div class="team_row">');
            $.each(el, function (index, el) {
                var final = '';
                if (i % 2 == 0) {
                    html.push('</div><div class="team_row">');
                }
                html.push('<div class="team"><div class="side"><div class="logo">');
                html.push('<div class="logo_img" style="background-image: url(assets/teams/' + el.tag + '.png);"></div>');
                html.push('<div class="name">' + el.name + '</div>');
                html.push('<div class="desc">[' + el.tag + ']</div>');
                html.push('</div> </div><div class="side">');
                $.each(el.Players, function (name, desc) {
                    html.push('<div class="player">');
                    html.push('<a href="' + config.baseurlp + desc.region + "/" + name + '" target="_self">');
                    html.push('<div class="player_img" style="background-image: url(assets/' + desc.profile_pic + ');"></div>');
                    html.push('<div class="player_name">' + name + '</div>');
                    html.push('<div class="player_desc">' + desc.national + ' <span class="flag-icon flag-icon-' + desc.country + '"></span></div>');
                    html.push('<div class="player_role" style="background-image: url(assets/images/roles/' + desc.role.toLowerCase() + '.png"></div>');
                    html.push('</a>');
                    html.push('</div>')
                })
                html.push('</div>');
                html.push('</div>');
                i++;
            });
            html.push('</div>')
            $('.content .boxes').html(html.join(''));
        });
    }
    return team;
}();

var news = function () {
    "use strict";
    var not = {};
    var params = window.location.pathname.split('/').slice(1);
    not.id = params[1];
    not.last = function () {
        var url = config.webapi + "news/news_list";

        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: not.loadhome
        });
    }
    not.read = function () {
        var url = config.webapi + "news/" + not.id;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: not.loadnews
        });
    }
    not.loadhome = function (response) {
        var html = [];
        $.each(response, function (id, data) {
            html.push('<a href=' + config.link + 'news/' + data.id + '/' + data.title_url + '><div class="each-article"><div class="article-img" style="background-image:url(' + data.img + ');">');
            html.push('<div class="article-title"><h1>' + data.title + '</h1><h2>By ' + data.author.ingame_name + '</h2>');
            html.push('</div></div></div></a>');
        })
        $(".content-out .news").html(html.join(''));
    }
    not.loadnews = function (response) {
        document.title = response.title + " - VGPRO.gg";
        $('.news-img').css('background-image', 'url(' + response.content_image + ')');
        $(".news-title-text h1").html(response.title);
        $(".blog-content").html(response.content);
        $(".author_name").html(response.author.ingame_name);
        $('.author_img').css('background-image', 'url(' + response.author.profile_pic + ')');
        $(".news-title-text h2").html(jQuery.timeago(response.createdAt) + ' • WRITTEN BY ' + response.author.ingame_name);
        $(".author_about").html(response.author.bio);
        $(".author_topheroes").html("<a href='" + config.baseurlp + response.author.ingame_shard + "/" + response.author.ingame_name + "' ><div class='author_button'>See stats</div></a>");
        var html = [];
        $.each(response.related, function (id, data) {
            html.push('<a href=' + config.link + 'news/' + data.id + '/' + data.title_url + '><div class="each-article"><div class="article-img" style="background-image:url(' + data.img + ');">');
            html.push('<div class="article-title"><h1>' + data.title + '</h1><h2>By ' + data.author.ingame_name + '</h2>');
            html.push('</div></div></div></a>');
        })
        $(".box-body#artitle").html(html.join(''));
    }
    return not;
}();

var leaderboard = function () {
    "use strict";
    var lead = {};
    lead.getLeaderboard = function (region, page) {
        var url = config.webapi + "leaderboard/" + region + "/" + page;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: lead.loadLeaderboard
        });
    }

    lead.getLeaderboardName = function (region, name) {
        var url = config.webapi + "leaderboard_player/" + region + "/" + name;
        console.log(url);
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: lead.loadLeaderboardName,
            error: lead.dealError
        });
    }
    lead.dealError = function (response) {
        alert('Not found!');
        $(".view_reset").click();
        return false;
    }
    lead.loadLeaderboardName = function (response) {
        var html = [];
        $.each(response, function (index, element) {
            var region = element.region;
            if (region == 'sg') {
                region = 'sea'
            };
            var style = '';
            if (lead.name == element.name) {
                style = 'me';
            }
            var diff = '<span class="modif none"></span>';
            if (element.diff > 0) {
                diff = '<span class="modif up">' + element.diff + '</span>';
            } else if (element.diff < 0) {
                diff = '<span class="modif down">' + Math.abs(element.diff) + '</span>';
            }
            var styleWinRate = playerData.giveWRstyle(element.winrate);
            var styleRating = playerData.giveRatingstyle(element.rating);
            html.push('<a href="' + config.baseurlp + element.region + "/" + element.name + '" target="_self" class="each_player" id="' + style + '">');
            html.push('<div class="position"><span class="position">' + element.position + '</span>' + diff + '</div>');
            html.push('<div class="player"><div class="tier"><div class="tier_img" style="background-image: url(assets/images/skilltier/' + element.skillTier + '.png)"></div></div> ' + element.name + ' <span>' + region + '</span></div>');
            html.push('<div class="kda">' + element.kda + '</div><div class="winrate"><div class="winrate_fill"><div class="winrate_fill_win" style="width:' + element.winrate + '%">' + element.win + 'W</div><span id="loss">' + element.loss + 'L</span></div><span class="winrate_number">' + element.winrate + '%</span></div><div class="points">' + element.rating + '</div></a>');
        })
        $(".load").hide();
        $(".lead_box").append(html.join(''));
    }
    lead.loadLeaderboard = function (response) {
        if (!(response)) {
            return false;
        }

        var html = [];

        for (var i = 0; i < response.length; i++) {
            var element = response[i];
            var region = element.region;
            if (region == 'sg') {
                region = 'sea'
            };
            var diff = '<span class="modif none"></span>';
            if (element.diff > 0) {
                diff = '<span class="modif up">' + element.diff + '</span>';
            } else if (element.diff < 0) {
                diff = '<span class="modif down">' + Math.abs(element.diff) + '</span>';
            }
            var styleWinRate = playerData.giveWRstyle(element.winrate);
            var styleRating = playerData.giveRatingstyle(element.rating);
            html.push('<a href="' + config.baseurlp + element.region + "/" + element.name + '" target="_self" class="each_player">');
            html.push('<div class="position"><span class="position">' + element.position + '</span>' + diff + '</div>');
            html.push('<div class="player"><div class="tier"><div class="tier_img" style="background-image: url(assets/images/skilltier/' + element.skillTier + '.png)"></div></div> ' + element.name + ' <span>' + region + '</span></div>');
            html.push('<div class="kda">' + element.kda + '</div><div class="winrate"><div class="winrate_fill"><div class="winrate_fill_win" style="width:' + element.winrate + '%">' + element.win + 'W</div><span id="loss">' + element.loss + 'L</span></div><span class="winrate_number">' + element.winrate + '%</span></div><div class="points">' + element.rating + '</div></a>');

        }
        $(".load").hide();
        $(".lead_box").append(html.join(''));
    }


    lead.init = function () {
        var region = 'global';
        lead.page = 1;
        lead.name = '';
        lead.getLeaderboard(region, lead.page);
        $(".view_more_space").on('click', '.view_more', function (e) {
            lead.page++;
            $(".load").show();
            $(".view_reset").show();
            lead.getLeaderboard(region, lead.page);
        })

        $(".view_more_space").on('click', '.view_reset', function (e) {
            lead.page = 1;
            $(".load").show();
            $(".view_more").show();
            $(".view_reset").hide();
            $(".lead_box").html("");
            lead.getLeaderboard(region, lead.page);
        })

        $(".region_all_filter").on('click', '.region_filter', function () {
            $(".region_filter").removeAttr('id');
            $(this).attr('id', 'select');
            lead.page = 1;
            region = $(this).data('region');
            $(".load").show();
            $(".view_more").show();
            $(".view_reset").hide();
            $(".lead_box").html("");

            lead.getLeaderboard(region, lead.page);
        });
        $(".lookup_leader").submit(function (e) {
            lead.name = $(".lookup_leader .input_name").val();
            $(".region_filter").removeAttr('id')
            console.log(lead.name, region);
            e.preventDefault();

            $(".load").show();
            $(".view_reset").show();
            $(".view_more").hide();
            $(".lead_box").html("");
            lead.getLeaderboardName(region, lead.name);

        })

    }

    return lead;

}()