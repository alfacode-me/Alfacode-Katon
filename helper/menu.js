var path = require('path');

module.exports = (hbs) => {
    hbs.registerHelper("menu", function (path, menu) {
        var cls = (path.startsWith(menu.link)) ? 'active' : '';
        return new hbs.SafeString(`<li class="${cls}"><a href="${menu.link}"><i class="${menu.icon}"></i> <span>${menu.text}</span></a></li>`);
    });
    hbs.registerHelper("menugroup", function (path, menu) {
        var cls = (path.startsWith(menu.link)) ? 'active' : '';
        var submenu = "";
        menu.menu.forEach((mn) => {
            var subcls = (path.startsWith(mn.link)) ? 'active' : '';
            submenu = submenu + `<li class="${subcls}"><a href="${mn.link}"><i class="fa fa-bullseye"></i> <span>${mn.text}</span></a></li>`
        });
        var menugroup = `<li class="treeview ${cls}">
            <a href="#"><i class="${menu.icon}"></i><span> ${menu.text}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
                <ul class="treeview-menu">
                    ${submenu}
                </ul>
        </li>`;
        return new hbs.SafeString(menugroup);
    });
};