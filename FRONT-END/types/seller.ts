export interface Store {
  id: number;
  name: string;
  owner_phone: string;
  status: string;
  created_at: string;
  average_rating: number;
  latitude: string;
  longitude: string;
  id_card_photo_url: string;
}

export interface Product {
  id: number;
  name: string;
  photo: string;
  price: string;
  category: string;
  created_at: string;
}

export interface Data {
  store: Store;
  recent_products: Product[];
  recent_ratings: {
    user: string;
    score: number;
    created_at: string;
  }[];
  recent_comments: {
    id: number;
    user: string;
    comment: string;
    created_at: string;
  }[];
}

export interface StoreData {
  store_name: string;
  phone: string;
  location_address: string;
  id_card_photo: File | null;
  latitude: string;
  longitude: string;
}

export interface OriginalStroe {
  id: number;
  name: string;
  owner_phone: string;
  status: "active" | "inactive" | "pending" | "banned";
  location_address: string;
  created_at: string;
  average_rating: number;
  latitude: string;
  longitude: string;
  id_card_photo_url: string;
}

export interface store_form {
  store_name: string;
  id_card_photo: File | string; // Changed the type to accept both File and string
  phone: string;
  location_address: string;
  status: "active" | "inactive" | "pending" | "banned";
  latitude: number;
  longitude: number;
}

export interface Product_form {
  name: string;
  description: string;
  photo: File | null;
  category_id: number;
  price: number;
  latitude: number;
  longitude: number;
  show_location: number;
}