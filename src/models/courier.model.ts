
export interface Courier {
  id: number,
  cnh: string;
  name: string;
  vehicleType: "car" | "motorcycle" | "bicycle";
  location: { lat: number; long: number };
}
