import { API } from "../../backend";

// *****************category calls ****************************

//category api calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

//get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

//get single category
export const getaCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    }).then(res => res.json())
        .catch(err => console.log(err))
}

//update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(res => res.json())
        .catch(err => console.log(err))

}


//delete a category

export const deleteCartegory = (userId, categoryId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
        .catch(err => console.log(err))
}




//********************************** product calls ***************************
//product api calls
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))

}

//get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

//get a single product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(res => res.json())
        .catch(err => console.log(err))
}

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))

}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))

}