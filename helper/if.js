var path = require('path');

module.exports = (hbs) => {
    hbs.registerHelper("selected", function (var1, var2) {
        var attr = "";
        if (var1 == var2) attr = 'selected'
        return new hbs.SafeString(attr);
    });
};