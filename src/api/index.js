const serverIP = "http://77.73.69.230:90";
const serverGOOGLEIP = "http://77.73.69.230:93";
const serverPortal = "http://77.73.69.230:8090";
function addIP(url) {
  return `${serverIP}${url}`;
}
function addGoogleIP(url) {
  return `${serverGOOGLEIP}${url}`;
}
function addPortalIP(url) {
  return `${serverPortal}${url}`;
}

export const AUTHORIZE = addIP("/api/Auth/authorize");
export const GET_CATEGORIES = addIP("/api/Catalog/get-categories");
export const GET_CATALOG_PRODUCTS = addIP("/api/Catalog/get-catalog-products");
export const GET_CATEGORIES_PARAMETERS = addIP("/api/Catalog/get-category-parameters");
export const GET_PRODUCT_CARD = addIP("/api/Catalog/get-product-card");
export const GET_VENDOR_CARD = addIP("/api/Catalog/get-vendor-card");
export const ADD_VENDOR_TO_FAVOURITE = addIP("/api/Favourite/add-vendor-to-favourite");
export const REMOVE_FAVOURITE_VENDOR = addIP("/api/Favourite/remove-favourite-vendor");

export const GET_PRODUCT_PARAMETERS = addIP("/api/Product/get-product-parameters");
export const CREATE_PRODUCT = addIP("/api/Product/create-product");
export const CREATE_DRAFT_PRODUCT = addIP("/api/Product/create-draft-product");
export const UPLOAD_PHOTO = addGoogleIP("/api/Upload/upload-photo");
export const GET_PRODUCT_TO_UPDATE = addIP("/api/Product/get-product-to-update");
export const UPDATE_PRODUCT = addIP("/api/Product/update-product");

export const CHANGE_PRODUCT_COUNT_IN_CART = addIP("/api/Cart/change-product-count-in-cart");
export const DECREASE_PRODUCT_IN_CART = addIP("/api/Cart/decrease-product-in-cart");
export const GET_CLIENT_CART = addIP("/api/Cart/get-client-cart");
export const REMOVE_PRODUCT_FROM_CART = addIP("/api/Cart/remove-product-from-cart");
export const GET_CLIENT_CART_COUNT = addIP("/api/Cart/get-client-cart-count");
export const ADD_PRODUCT_TO_CART = addIP("/api/Cart/add-product-to-cart");
export const ADD_PRODUCT_TO_FAVOURITE = addIP("/api/Favourite/add-product-to-favourite");
export const REMOVE_FAVOURITE_PRODUCT = addIP("/api/Favourite/remove-favourite-product");

export const GET_MY_PRODUCTS = addIP("/api/Product/get-my-products");
export const GET_MY_DRAFT_PRODUCTS = addIP("/api/Product/get-my-draft-products");
export const GET_MY_ARCHIVE_PRODUCTS = addIP("/api/Product/get-my-archive-products");
export const DELETE_PRODUCT = addIP("/api/Product/delete-product");
export const CHANGE_MY_PRODUCT_COUNT = addIP("/api/Product/change-my-product-count");
export const ARCHIVE_PRODUCT = addIP("/api/Product/archive-product");
export const CHANGE_MY_PRODUCT_DELIVERY = addIP("/api/Product/change-my-product-delivery");

//Portal
export const GET_ARENAS = addPortalIP("/user/");
export const GET_USER_BY_ID = addPortalIP("/user/");
