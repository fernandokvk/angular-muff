

export interface Courier {
  id: number,
  cnh: string;
  vehicleType: "car" | "motorcycle" | "bicycle";
  location: { address: string; lat: number; long: number }; //Não tem como/porque usar o address, mas deixei pra padronizar com os outros - Fernando
}
