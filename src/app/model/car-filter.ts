export interface CarFilter {
    manufacturer?: string;
    model?: string;
    seats?: number;
    rentalPricingRangeMin?: number;
    rentalPricingRangeMax?: number;
    rentalPricing?: number;
    start_date?:String;
    end_date?:String;
  }
  