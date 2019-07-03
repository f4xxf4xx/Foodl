export const getLinks = () => {
    return [
        {
            path: "/",
            name: "Home",
            icon: "home"
        }
    ];
}

export const getLoggedOnLinks = () => {
    return [
        {
            path: "/recipes",
            name: "Recipes",
            icon: "library_books"
        },
        {
            path: "/cart",
            name: "Cart",
            icon: "shopping_cart"
        }
    ];
}

export const getAdminLinks = () => {
    return [
        {
            path: "/ingredients",
            name: "Ingredients",
            icon: "local_pizza"
        }
    ]
}