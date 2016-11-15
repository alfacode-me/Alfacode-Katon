var path = require('path');

module.exports = (hbs) => {
    hbs.registerHelper("pagination", function (url, page) {
        if (page.total >= 1) {
            var out = "<li><a href='/backend/" + url + "/list/1'><i class='fa fa-angle-double-left'></i></a></li>";
            for (var index = 1; index <= page.total; index++) {
                if (index >= parseInt(page.active) - 2 && index <= parseInt(page.active) + 2) {
                    if (parseInt(page.active) == index) {
                        out = out + "<li class='active'><a href='/backend/" + url + "/list/'" + index + "'>" + index + "</a></li>"
                    } else {
                        out = out + "<li><a href='/backend/" + url + "/list/" + index + "'>" + index + "</a></li>"
                    }
                }
            }
            out = out + "<li><a href='/backend/" + url + "/list/" + page.total + "'><i class='fa fa-angle-double-right'></i></a></li>"
        } else {
            out = "<li class='disabled'><a href='#'><i class='fa fa-angle-double-left'></i></a></li>";
            out = out + "<li class='disabled'><a href='#'><i class='fa fa-angle-double-right'></i></a></li>";
        }
        return new hbs.SafeString(out);
    });
};