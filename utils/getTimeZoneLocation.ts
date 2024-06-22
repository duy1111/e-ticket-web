import axios from "axios";

interface IGetTimeZoneLocation {
  latitude: number;
  longitude: number;
  timestamp?: number;
}

export async function getTimeZoneLocation({
  latitude,
  longitude,
  timestamp,
}: IGetTimeZoneLocation) {
  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.round(
      timestamp || new Date().getTime() / 1000
    ).toString()}&key=${process.env.GOOGLE_PLACE_API_KEY}`,
    headers: {},
  };

  try {
    return await axios(config);
  } catch (error) {
    console.log(error);
  }
}
