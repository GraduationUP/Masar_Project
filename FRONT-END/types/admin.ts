export interface Roles {
  id: number;
  name: string;
}
export interface Admin {
  id: number;
  username: string;
}
export interface Ban {
  id: number;
  target_id: number;
  reason: string;
  banned_by: number;
  created_at: string;
  updated_at: string;
  admin: Admin | null;
}
export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: Roles[];
  ban: Ban | null;
}
export interface StoreUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
export interface StoreData {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  status: "pending" | "active" | "inactive" | "banned";
  created_at: string;
  updated_at: string;
  latitude: string | null;
  longitude: string | null;
  user: StoreUser;
}
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}
export interface ServiceData {
  city: string;
  stores: [];
  aids: [];
  market: [];
  gas_station: [];
  restaurants: [];
  car_services: [];
  petrol_station: [];
  internet: [];
  delivery: [];
}
export interface ProductStore {
  id: number;
  store_name: string;
}
export interface ProductData {
  id: number;
  store_id: number;
  name: string;
  description: string;
  photo: null;
  category_id: number;
  price: string;
  latitude: null;
  longitude: null;
  show_location: number;
  created_at: string;
  updated_at: string;
  store: ProductStore;
}

export interface Mapdata {
  typeName: string;
  id: number;
  name: string;
  status: boolean;
  coordinates: number[];
}

export interface MapData_Market {
  id: number;
  name: string;
  status: boolean;
  coordinates: number[][];
}

export interface Coordinates {
  [index: number]: number;
}
type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type Report = {
  id: number;
  user_id: number;
  reported_user_id: number;
  message: string;
  status: "pending" | "resolved" | "in_progress";
  created_at: string;
  updated_at: string;
  user: User;
  reported_user: User;
};