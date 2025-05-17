import mockAPI from "./mock-res.json"
export interface VehicleListRequest {
  filter: { model: string };
  search: { vin_number: string };
  sort: { field_name: string; direction: 'ASC' | 'DESC' };
  pagination: { page_id: number; page_size: number };
}
export interface Vehicle {
id: string;
vehicle_status: string;
excise_tax_status: string | null;
customs_tax_status: string | null;
pdi_status: string | null;
order_date: string;
order_type: string;
origin: string | null;
po_no: string;
po_date: string;
sales_contract_no: string;
sales_contract_date: string;
vin_no: string;
front_motor: string;
vehicle_type: string;
rear_motor: string;
engine: string;
model: string;
model_year: string;
sub_model: string | null;
model_description: string;
type: string;
variant: string;
code: string;
model_code: string;
exterior_color_code: string;
exterior_color_name: string;
exterior_color_name_th: string;
exterior_color_marketing_name: string | null;
purchase_price: number;
purchase_currency: string;
payment_terms: string;
delivery_terms: string;
lot_no: string;
atd: string;
ata: string | null;
original_invoice_no: string;
front_motor_no: string;
rear_motor_no: string;
battery_no: string;
engine_no: string;
production_date: string;
retail_price_approval_no: string | null;
excise_tax_subsidy: string | null;
excise_rever_invoice_no: string | null;
excise_approval_no: string | null;
customs_rever_invoice_no: string | null;
tax_payment_date: string | null;
import_entry_no: string | null;
gate_in_date: string | null;
yard_location: string | null;
dealer_code: string | null;
delivery_location_code: string | null;
dealer_code_sap: string | null;
floor_plan_code: string | null;
dealer_name: string | null;
delivery_location: string | null;
allocation_date: string | null;
wholesales_type: string | null;
currency: string | null;
wholesales_price: number | null;
price_approval_type: string | null;
gate_out_date: string | null;
delivery_date: string | null;
final_delivery_location_code: string | null;
final_delivery_location_name: string | null;
remark1: string;
remark2: string;
remark3: string;
updated_at: string;
updated_by_full_name: string;
updated_by_email: string;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  pagination: {
    page_id: number;
    page_size: number;
    total_record: number;
    last_page: number;
  };
}



export const getVehicleList = async (req: VehicleListRequest) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return the mock response
  return mockAPI
};
