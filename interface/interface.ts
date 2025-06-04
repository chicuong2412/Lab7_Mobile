export interface IAuth {
    token?: string,
    isLogged: boolean,
    HandleLogin: (phone: string, password: string) => Promise<void>,
    setIslogged?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Product {
    "_id": string,
    "name": string,
    "price": number,
    "createdBy": string,
    "createdAt": Date,
    "updatedAt": Date
}

export interface ProductDetail {
    "_id": string,
    "name": string,
    "price": number,
    "createdBy": string,
    "createdAt": Date,
    "updatedAt": Date,
    "user" : {
        "name": string
    }
}

export interface Customer {
    "_id": string,
    "name": string,
    "phone": string,
    "totalSpent": number,
    "loyalty": string,
    "createdBy": string,
    "updatedBy": string
}

export interface ProductCart {
     "_id": string,
    "name": string,
    "price": number,
    "createdBy": string,
    "createdAt": Date,
    "updatedAt": Date,
    "quantity": number,
}

export interface Transaction {
    "_id": string,
    "id": string,
    "customer": Customer,
    "services": ProductCart[],
    "priceBeforePromotion": number,
    "price": number,
    "createdBy": Customer,
    "status": string,
    "createdAt": string,
    "updatedAt": Date
}

export interface CustomerDetail {
    "_id": string,
    "name": string,
    "phone": string,
    "totalSpent": number,
    "loyalty": string,
    "createdBy": string,
    "updatedBy": string
    "_v": number,
    "transactions": Transaction[]
}