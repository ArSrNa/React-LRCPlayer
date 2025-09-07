"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LRCPlayer;
exports.createLrcObj = createLrcObj;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./style.css");
function LRCPlayer(_a) {
    var src = _a.src, cover = _a.cover, _b = _a.title, title = _b === void 0 ? "" : _b, _c = _a.subTitle, subTitle = _c === void 0 ? "" : _c, lrc = _a.lrc, _d = _a.placeholder, placeholder = _d === void 0 ? "空" : _d, _e = _a.animate, animate = _e === void 0 ? {
        type: "lrcplayer-fade",
        duration: 0.5
    } : _e, _f = _a.nextLrc, nextLrc = _f === void 0 ? {
        display: false,
        number: 5
    } : _f, _g = _a.offset, offset = _g === void 0 ? 0 : _g;
    var _h = (0, react_1.useState)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), current = _h[0], setCurrent = _h[1];
    var _j = (0, react_1.useState)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), next = _j[0], setNext = _j[1];
    var _k = (0, react_1.useState)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), lrcText = _k[0], setLrcText = _k[1];
    (0, react_1.useEffect)(function () {
        setLrcText((0, jsx_runtime_1.jsx)("div", { className: "lrcplayer-display", style: {
                "--animate-type": animate.type,
                "--animate-duration": animate.duration + "s"
            }, children: current === "" ? ((0, jsx_runtime_1.jsx)("i", { style: { color: "grey" }, children: placeholder })) : (current) }, "lrcplayer-lrc_".concat(Math.random())));
    }, [current]);
    var ontimeupdate = function (e) {
        var currentTime = e.target.currentTime;
        lrc.forEach(function (lyric, i1) {
            var isCurrent = currentTime >= lrc[i1].t + offset;
            if (isCurrent) {
                setCurrent(lyric.c);
                // if (i1 + nextLrc.number < lrc.length) {
                setNext((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array.from(new Array(nextLrc.number).keys()).map(function (offset) {
                        var line = i1 + 1 + offset < lrc.length ? lrc[i1 + 1 + offset].c : " ";
                        return line === "" ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("i", { style: { color: "royalblue" }, children: placeholder }, offset), (0, jsx_runtime_1.jsx)("br", {})] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [line, (0, jsx_runtime_1.jsx)("br", {})] }));
                    }) }));
                // }
            }
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            borderRadius: 8,
            border: "#ccc solid 1px",
            paddingBlock: 20,
            paddingInline: 20
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 10
                }, children: [(0, jsx_runtime_1.jsx)("img", { src: cover, width: 80, alt: "cover", style: { marginRight: 15, borderRadius: 8 } }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: "1.7rem", color: "royalblue" }, children: title }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { style: { color: "grey" }, children: subTitle })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", paddingBlock: 15 }, children: [lrcText, nextLrc.display ? (0, jsx_runtime_1.jsx)("div", { style: { color: "grey" }, children: next }) : ""] }), (0, jsx_runtime_1.jsx)("audio", { src: src, controls: true, style: { width: "100%" }, onTimeUpdate: ontimeupdate })] }));
}
function createLrcObj(lrc) {
    var oLRC = [];
    if (lrc.length === 0)
        return;
    var lrcs = lrc.split("\n"); //用回车拆分成数组
    for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) {
            //不是数值
            for (var i in oLRC) {
                if (i !== "ms" && i === s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        }
        else {
            //是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
            var start = 0;
            for (var k in arr) {
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start); //获取歌词内容
            for (var k in arr) {
                var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
                var s = t.split(":"); //分离:前后文字
                oLRC.push({
                    //对象{t:时间,c:歌词}加入ms数组
                    t: parseFloat(s[0]) * 60 + parseFloat(s[1]),
                    c: content
                });
            }
        }
    }
    oLRC.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
    });
    return oLRC;
}
