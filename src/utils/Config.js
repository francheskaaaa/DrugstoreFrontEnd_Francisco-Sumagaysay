class Config {
    static loginUrl= "http://127.0.0.1:8000/api/gettoken/";

    static refreshUrl = "http://127.0.0.1:8000/api/refresh_token/";
    static inventoryUrl = "http://127.0.0.1:8000/api/inventory/";
    static productUrl = "http://127.0.0.1:8000/api/product/";
    static orderUrl = "http://127.0.0.1:8000/api/order/";
    static customerUrl = "http://127.0.0.1:8000/api/customer/";
    static supplierUrl = "http://127.0.0.1:8000/api/supplier/";
    static userUrl = "http://127.0.0.1:8000/api/user/";
    static roleUrl = "http://127.0.0.1:8000/api/role/";
    static permissionUrl = "http://127.0.0.1:8000/api/permission/";
    static permissionGroupUrl = "http://127.0.0.1:8000/api/permission_group/";
    static permissionGroupPermissionUrl = "http://127.0.0.1:8000/api/permission_group_permission/";
    static homeUrl="/home";
    static logoutUrl = "/logout";
}

export default Config;