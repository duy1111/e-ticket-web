import { useState, useMemo } from "react";
import {UseFormReturn} from "react-hook-form";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface PlacesProps {
    form : UseFormReturn<any>
}

export default function Places({form}: PlacesProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmW0NKd4ZWAzEYo76ycZ_HVHCH7BUu-p8",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map form={form} />;
}

function Map({form}: PlacesProps) {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete form={form} setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({
  setSelected,
  form
}: {
  setSelected: (selected: any) => void;
    form: UseFormReturn<any>
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const locationName = form.watch("locationName");
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const res = await fetch(
        "http://localhost:3001/" + "location/create",
        {
            method: "POST",
            body: JSON.stringify({
                address: address,
                latitudeFloat: lat,
                longitudeFloat: lng,
            }),
            headers: {
                "Content-Type": "application/json",
            },

        }
    );
    let location = null;
    if(res.status === 200) {
        location = await res.json();
    }
    form.setValue("locationId", location.id);
    
    setSelected({ lat, lng });
  };


  return (
    <Command>
      <CommandInput
        value={value || locationName}
        onValueChange={setValue}
        disabled={!ready}
        placeholder="Search an address"
        className="combobox-input"
      />
      <CommandList>
        <CommandGroup>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <CommandItem
                key={place_id}
                value={description}
                title={description}
                onSelect={handleSelect}
              >
                <span>{description}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
