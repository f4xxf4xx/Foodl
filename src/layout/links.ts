export interface ListItemLink {
    path: string;
    name: string;
    icon: string;
}

export const getLinks = (): ListItemLink[] => {
    return [
        {
            path: "/",
            name: "Home",
            icon: "home"
        },
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

export const getAdminLinks = (): ListItemLink[] => {
    return [
        {
            path: "/ingredients",
            name: "Ingredients",
            icon: "local_pizza"
        }
    ]
}