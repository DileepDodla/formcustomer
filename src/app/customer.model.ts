export interface Customer {
    name: string;
    projectNo: number;
    email: string;
    phone: string;
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
    };

}