import React, { useState } from "react";
import './style.css';
export default function LRCPlayer({
  src,
  cover,
  title,
  subTitle,
  lrc,
  placeholder = "空",
  animate = {
    type: "fade",
    duration: 0.5
  },
  nextLrc = {
    display: false,
    number: 5
  },
  offset = 0
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [lrcText, setLrcText] = useState("");
  useEffect(() => {
    setLrcText( /*#__PURE__*/React.createElement("div", {
      key: current,
      className: "lrc",
      style: {
        "--animate-type": animate.type,
        "--animate-duration": animate.duration + "s"
      }
    }, current === "" ? /*#__PURE__*/React.createElement("i", {
      style: {
        color: "grey"
      }
    }, placeholder) : current));
  }, [current]);
  const ontimeupdate = e => {
    const {
      currentTime
    } = e.target;
    lrc.forEach((lyric, i1) => {
      let isCurrent = currentTime >= lrc[i1].t + offset;
      if (isCurrent) {
        setCurrent(lyric.c);
        if (i1 + 2 < lrc.length) {
          setNext( /*#__PURE__*/React.createElement(React.Fragment, null, Array.from(new Array(nextLrc.number).keys()).map(offset => {
            const line = lrc[i1 + 1 + offset].c;
            return line === "" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
              key: offset,
              style: {
                color: "royalblue"
              }
            }, placeholder), /*#__PURE__*/React.createElement("br", null)) : /*#__PURE__*/React.createElement(React.Fragment, null, line, /*#__PURE__*/React.createElement("br", null));
          })));
        }
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 8,
      border: "#ccc solid 1px",
      paddingBlock: 20,
      paddingInline: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      paddingBottom: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    width: 80,
    alt: "cover",
    style: {
      marginRight: 15,
      borderRadius: 8
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.7rem",
      color: "royalblue"
    }
  }, title), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "grey"
    }
  }, subTitle)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      paddingBlock: 15
    }
  }, lrcText, nextLrc.display ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "grey"
    }
  }, next) : ""), /*#__PURE__*/React.createElement("audio", {
    src: src,
    controls: true,
    style: {
      width: "100%"
    },
    onTimeUpdate: e => {
      ontimeupdate(e);
    }
  }));
}
export function createLrcObj(lrc) {
  let oLRC = [];
  if (lrc.length === 0) return;
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
    } else {
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