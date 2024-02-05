export interface Car {
    id?:number;
    manufacturer:string;
    model:string;
    year:number|null;
    seats:number|null;
    rental_pricing:number|null;
    photo:string;
    photoFile?:string;
    maintenance_staff:string;
    maintenance_schedule:number|null;
    maintenance_staff_id:number;
}
