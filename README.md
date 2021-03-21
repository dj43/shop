# shop

1) Products can be using add-product API, it takes base64 string array for product images, new categories will be automatically added to cateogry document.
2) find-products-by-category - self explanatory
3) list-categories - self explanatory
4) delete-product - takes product id in request which can be picked from find-products-by-category
5) add-product-to-cart - takes product id in request which can be picked from find-products-by-category
6) get-cart - self explanatory
7) delete-product-from-cart - takes product id in request which can be picked from find-products-by-category
8) reduce-product-from-cart - takes product id in request which can be picked from find-products-by-category
9) create-order - takes address as request
10) get-orders - self explanatory

i have also added a user model for future when authentication is added, for now one user is hard-coded.

known bugs - 
1) user is not created automatically before add-cart-api
2) categories collection is created after add-product api run for first time, because of it for first add-product categories are not added but runs correctly after
