export interface Reservation {
  id: number;
  reservation_date: Date;
  start_date: Date;
  end_date: Date;
  total_price: number;
  model_name: string;
  userId:number;
  carId:number;
}
