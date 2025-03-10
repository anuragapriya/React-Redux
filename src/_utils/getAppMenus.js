const getAppMenus = (portalKey, isMBAdmin) => {
    const appMenuItems = [];

    const addMenuItem = (name, link, orderID, key) => {
        appMenuItems.push({ name, link, orderID, key });
    };

    switch (portalKey.toLowerCase()) {
        case "ai":
            addMenuItem('Account Search', 'dashboardAI', 1);
           // addMenuItem('Upload', 'upload', 2);
            break;
        case "ea":
            addMenuItem('Dashboard', 'dashboardEA', 1, 'dashboard');
           // addMenuItem('Jurisdiction', 'jurisdiction', 2, 'jurisdiction');
            break;
        case "mc":
            addMenuItem('Map Center', 'dashboardMC', 1);
            break;
        case "mb":
            appMenuItems.push({
                name: 'Nomination',
                orderID: 1,
                items: [
                    { name: 'NOMINATION BY PIPELINE', link: 'nominationPipeline', orderID: 1 },
                    { name: 'NOMINATION BY GROUP', link: 'nominationGroup', orderID: 2},
                    { name: 'PIPELINE DELIVERY', link: 'pipelinedelivery', orderID: 3}
                ]
            });
            addMenuItem('Filehub', 'Filehub', 2);
            addMenuItem('Services', '', 3);
            appMenuItems.push({
                name: 'Adjustments',
                orderID: 4,
                items: [
                    { name: 'BY FIRM', link: 'byfirm', orderID: 1 },
                    { name: 'By Interruptible', link: 'byInterruptible', orderID: 2 }
                ]
            });
            addMenuItem('Customers','customerDetails', 5);
            addMenuItem('Reports', 'Reports', 6);
            break;
        case "sd":
            addMenuItem('Supplier', 'dashboardSD', 1);
            break;
        case "admin":
            //addMenuItem('Users', 'userprofile', 1);
            // addMenuItem('Role Management', 'configuration', 3);
            appMenuItems.push({
                name:'Users',
                orderID:1,
                items:[]
            });
            addMenuItem('Customers', 'customer', 3);
            addMenuItem('Announcements', 'announcement', 4);
            addMenuItem('SeasonDates', 'seasonDates', 5);
            appMenuItems.push({
                name: 'Support',
                orderID: 5,
                items: [
                    { name: 'Support', link: 'support', orderID: 1 },
                    { name: 'FAQ', link: 'faqCreate', orderID: 2 }
                ]
            });
            if (isMBAdmin) {
                appMenuItems.push({
                    name: 'Marketers',
                    orderID: 2,
                    items: [
                        { name: 'Marketers', link: 'marketer', orderID: 1 },
                        { name: 'Marketer Group', link: 'marketerGroup', orderID: 2 }
                    ]
                });
            }
            break;
        case "reviewer":
           // addMenuItem('Users', 'userprofile', 1);
           appMenuItems.push({
            name:'Users',
            orderID:1,
            items:[]
        });
        default:
            break;
    }

    // Sort the menu items by orderID
    appMenuItems.sort((a, b) => a.orderID - b.orderID);

    return appMenuItems;
};

export default getAppMenus;