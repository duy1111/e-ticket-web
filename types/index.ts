export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}
export type ProfileType = {
  id: number;
  email: string;
  username: string;
  role: Role;
  phoneNumber: string;
};

export type EventType = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  imageUrl: string;
  creatorId: number;
  status: "DRAFT" | "PUBLISHED" | "DEACTIVE";
  publishedTime: number;
  locationId: number;
  location?: LocationType;
  ETicketBook: ETicketBook;
};

export type Billing = {
  id: number;
  stripeCheckoutSessionId?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  eventId: number;
  userId: number;
  createdAt: string;
  user: {
    email: string;
    name: string;
  };
  event: {
    name: string;
    ETicketBook: {
      price: number;
      currency: string;
    };
  };
};

export type ETicket = {
  id: number;
  serialNo: string;
  price: number;
  currency: string;
  userId: number;
  eventId: number;
  eTicketBookId: number;
  status: string;
  redeemTime: string;
  thumbnail: string;
  atributes: string;
  QrCode: string;
  createdAt: string;
  updatedAt: string;
  event: EventType;
  user: {
    id: number;
    email: string;
    username: string;
  };
};

export type LocationType = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type ETicketBook = {
  id: number;
  total: string;
  sold: number;
  price: number;
  currency: string;
  status: "OPEN" | "CLOSE" | "SOLD";
  startTime: string;
  closeTime: string;
};

export type LocationDto = {
  address: string;
  latitudeFloat: number;
  longitudeFloat: number;
  title: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  zip: number | null;
  state: string;
};
