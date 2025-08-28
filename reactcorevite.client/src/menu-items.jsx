const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    icon: 'feather icon-home',
                    url: '/app/dashboard/default' 
                }
            ]
        },
        {
            id: 'Inventory',
            title: 'Inventory',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'product',
                    title: 'Product',
                    type: 'collapse',
                    icon: 'feather icon-shopping-cart',
                    badge: {
                        title: 'New',
                        type: 'label-danger'
                    },
                    children: [
                        {
                            id: 'productdetails',
                            title: 'Product Details',
                            type: 'item',
                            url: '/Inventory/ProductChildMenu/ProductDetails', 
                            breadcrumbs: false
                        },
                        {
                            id: 'addupdateproduct',
                            title: 'ADD/Update',
                            type: 'item',
                            url: '/Inventory/ProductChildMenu/addupdateproduct', 
                            breadcrumbs: false
                        }
                    ]
                }
            ]
        },
        {
            id: 'users',
            title: 'Users',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'newuser',
                    title: 'Users',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    badge: {
                        title: 'New',
                        type: 'label-danger'
                    },
                    children: [
                        {
                            id: 'adduser',
                            title: 'Add User',
                            type: 'item',
                            url: '/Admin/AddNewUser',
                            breadcrumbs: false
                        },
                        {
                            id: 'userdetails',
                            title: 'User Details',
                            type: 'item',
                            url: '/Admin/UserDetails',
                            breadcrumbs: false
                        }
                    ]
                }
            ]
        }
    ]
};

export default menuItems;
