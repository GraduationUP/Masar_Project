export interface Store {
  id: number;
  user_id: number;
  store_name: string;
  id_card_photo: string;
  phone: string;
  location_address: string;
  status: number;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
  store_image: string;
}

export interface userFeedback {
  score: number | null;
  score_id: number | null;
  content: string | null;
  content_id: number | null;
  is_favorite: boolean;
}

export interface Feedback {
  user_name: string;
  user_id: number;
  score: number;
  content: string;
  created_at: string;
  is_owner: boolean;
}
export interface StoreData {
  id: number;
  seller_id: number;
  name: string;
  latitude: number;
  longitude: number;
  location_address: string;
  phone: string;
  store_image: string;
  average_rating: number;
  products: {
    id: number;
    store_id: number;
    name: string;
    description: string | null;
    photo: string | null;
    category_id: number;
    price: string;
    latitude: number | null;
    longitude: number | null;
    show_location: number;
    created_at: string;
    updated_at: string;
  }[];
  feedback: Feedback[];
}
