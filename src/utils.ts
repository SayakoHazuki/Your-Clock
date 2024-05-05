export function formatDate(date: Date, format: string) {
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const MONTHS_SHORT = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function leftPad(x: number, len: number = 2) {
        let res = x + "";
        while (res.length < len) res = "0" + res;
        return res;
    }

    function to12h(x: number) {
        if (x === 0) return 12;
        if (x > 12) return x - 12;
        return x;
    }

    let result = format;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    const hour24 = date.getHours();
    const hour12 = to12h(hour24);
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const millisecond = date.getMilliseconds();
    const am_pm = hour24 < 12 ? "AM" : "PM";

    const tzOffset = -date.getTimezoneOffset();
    const tzSign = !tzOffset ? "Z" : tzOffset > 0 ? "+" : "-";
    const tzHrs = Math.floor(Math.abs(tzOffset) / 60);
    const tzMin = Math.abs(tzOffset) % 60;
    const tzString = tzSign + leftPad(tzHrs) + ":" + leftPad(tzMin);

    result = result.replace(/(^|[^\\])yyyy/g, "$1" + year);
    result = result.replace(
        /(^|[^\\])yy/g,
        "$1" + year.toString().substring(2, 2)
    );
    result = result.replace(/(^|[^\\])y/g, "$1" + year);

    const IDENTIFIERS = {
        MONTH_SHORT: "\x01",
        MONTH_LONG: "\x02",
        WEEKDAY_SHORT: "\x03",
        WEEKDAY_LONG: "\x04",
    };

    result = result.replace(/(^|[^\\])MMMM/g, "$1" + IDENTIFIERS.MONTH_LONG);
    result = result.replace(/(^|[^\\])MMM/g, "$1" + IDENTIFIERS.MONTH_SHORT);
    result = result.replace(/(^|[^\\])MM/g, "$1" + leftPad(month));
    result = result.replace(/(^|[^\\])M/g, "$1" + month);

    result = result.replace(/(^|[^\\])dddd/g, "$1" + IDENTIFIERS.WEEKDAY_LONG);
    result = result.replace(/(^|[^\\])ddd/g, "$1" + IDENTIFIERS.WEEKDAY_SHORT);
    result = result.replace(/(^|[^\\])dd/g, "$1" + leftPad(dayOfMonth));
    result = result.replace(/(^|[^\\])d/g, "$1" + dayOfMonth);

    result = result.replace(/(^|[^\\])HH/g, "$1" + leftPad(hour24));
    result = result.replace(/(^|[^\\])H/g, "$1" + hour24);
    result = result.replace(/(^|[^\\])hh+/g, "$1" + leftPad(hour12));
    result = result.replace(/(^|[^\\])h/g, "$1" + hour12);

    result = result.replace(/(^|[^\\])mm+/g, "$1" + leftPad(minute));
    result = result.replace(/(^|[^\\])m/g, "$1" + minute);

    result = result.replace(/(^|[^\\])ss+/g, "$1" + leftPad(second));
    result = result.replace(/(^|[^\\])s/g, "$1" + second);

    result = result.replace(/(^|[^\\])fff+/g, "$1" + leftPad(millisecond, 3));
    result = result.replace(
        /(^|[^\\])ff/g,
        "$1" + leftPad(Math.round(millisecond / 10))
    );
    result = result.replace(
        /(^|[^\\])f/g,
        "$1" + Math.round(millisecond / 100)
    );

    result = result.replace(/(^|[^\\])TT+/g, "$1" + am_pm);
    result = result.replace(/(^|[^\\])T/g, "$1" + am_pm.charAt(0));

    result = result.replace(/(^|[^\\])tt+/g, "$1" + am_pm.toLowerCase());
    result = result.replace(
        /(^|[^\\])t/g,
        "$1" + am_pm.toLowerCase().charAt(0)
    );

    result = result.replace(/(^|[^\\])K/g, "$1" + tzString);

    result = result.replace(IDENTIFIERS.MONTH_LONG, MONTHS[month - 1]);
    result = result.replace(IDENTIFIERS.MONTH_SHORT, MONTHS_SHORT[month - 1]);
    result = result.replace(IDENTIFIERS.WEEKDAY_LONG, WEEKDAYS[dayOfWeek]);
    result = result.replace(
        IDENTIFIERS.WEEKDAY_SHORT,
        WEEKDAYS_SHORT[dayOfWeek]
    );

    result = result.replace(/\\(.)/g, "$1");

    return result;
}
