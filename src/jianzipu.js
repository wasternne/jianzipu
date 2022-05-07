function jzpParseNotes(line) {
    return line.split(",").map(jzpParseNote);
}

function jzpParseNote(line) {
    const [top, bottom] = line.split("/", 2);
    return { top: jzpParseTop(top), bottom: jzpParseBottom(bottom) };
}

function jzpParseTop(line) {
    if ("open" === line) return { finger: "open", position: null };
    const [finger, position] = line.split("@", 2);
    return { finger: finger, position: position };
}

function jzpParseBottom(line) {
    const [pluck, string] = line.split("@", 2);
    return { pluck: pluck, string: string };
}

function jzpHtmlNotes(array) {
    return "<div class='jzp-notes'>" + array.map(jzpHtmlNote).join("") + "</div>";
}

function jzpHtmlNote(object) {
    return "<div class='jzp-note'>" + jzpHtmlTop(object.top) + jzpHtmlBottom(object.bottom) + "</div>";
}

function jzpHtmlTop(object) {
    const topHtml = object.finger === "open" ? "艹" : jzpHtmlFinger(object.finger) + jzpHtmlPosition(object.position);
    return "<div class='jzp-top'>" + topHtml + "</div>";
}

function jzpHtmlFinger(number) {
    return "<div class='jzp-finger'>" + hanFinger(number) + "</div>";
}

function jzpHtmlPosition(line) {
    const parts = line.split(".", 2);
    if (parts.length === 1) {
        return "<div class='jzp-position'>" + hanDigit(parts[0]) + "</div>";
    } else {
        let positionHtml = hanDigit(parts[0]) + "<br/>" + hanDigit(parts[1], true);
        return "<div class='jzp-position jzp-position-small'>" + positionHtml + "</div>";
    }
}

function jzpHtmlBottom(object) {
    return "<div class='jzp-bottom jzp-pluck-" + jzpPluck(object.pluck) + "'><div class='jzp-string'>" + hanDigit(object.string) + "</div></div>";
}

function jzpPluck(line) {
    switch (line) {
        case "gou": case "勹": return "勹";
        case "tiao": case "乚": default: return "乚";
    }
}

function hanFinger(line) {
    switch (line) {
        case "da": case "大": return "大";
        case "shi": case "亻": return "亻";
        case "zhong": case "中": return "中";
        case "ming": case "夕": return "夕";
        default: return "<span class='jzp-error'>" + line + "</span>";
    }
}

function hanDigit(line, subposition) {
    switch (line) {
        case '1': return "一";
        case '2': return "二";
        case '3': return "三";
        case '4': return "四";
        case '5': return subposition ? "╪" : "五";
        case '6': return "六";
        case '7': return "七";
        case '8': return "八";
        case '9': return "九";
        case '10': return "十";
        case '11': return "十一";
        case '12': return "十二";
        case '13': return "十三";
        default: return "<span class='jzp-error'>" + line + "</span>";
    }
}