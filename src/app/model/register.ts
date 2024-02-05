export interface Register {
    id?:number;
    username: string;
    name:string;
    email: string;
    phone_number: string;
    password?:string;
    confirmPassword?:string;
    address:string;
}
