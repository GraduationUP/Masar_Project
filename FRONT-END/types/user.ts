interface Store {
    id: any;
    user_id: any;
    store_name: string;
    store_image: string;
    phone: string;
    location_address: string;
    status: any;
    latitude: number | null;
    longitude: number | null;
  }

  interface favourites {
    id: number;
    store_name: string;
    phone: string;
    location_address: string;
    status: string;
    latitude: number;
    longitude: number;
    store_image: string;
    created_at: string;
  }

  interface comment {
    id: number;
    store_id: number;
    store_name: string;
    comment: string;
    created_at: string;
  }

  interface rating {
    id: number;
    store_id: number;
    store_name: string;
    rating: number;
    created_at: string;
  }

  export interface Data {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    store: Store | null;
  }

  export interface OwnerData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role: string;
    store: Store | null;
    comments: [comment] | [];
    ratings: [rating] | [];
    favourites: [favourites] | [];
  }