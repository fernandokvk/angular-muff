
export interface Courier {
  id: number,
  cnh: string;
  vehicleType: "car" | "motorcycle" | "bicycle";
  location: { lat: number; long: number };
}
