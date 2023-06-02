interface Geolocation {
  latitude: number;
  longitude: number;
  address: String;
}

export interface Employee {
  id: number;
  name: string;
  lastName: string;
  job?: string;
  imgUrl: string;
  dateAdmission: string;
  geolocation: Geolocation;
}
