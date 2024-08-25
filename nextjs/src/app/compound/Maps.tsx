'use client'
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";

export default function Maps({ data }: any) {
  const [Data, setData] = useState(data || []);
  const [center, setCenter] = useState<[number, number] | null>(null);


  useEffect(() => {
    if (data !== undefined) {
      if (data.latitude !== '') {
        fetchPilots(data.latitude, data.longitude, data.range);
      } else {
        currentLocation();
      }
    }
  }, [data]);

 
  function currentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        matchPilots(position.coords.latitude, position.coords.longitude);
        setCenter([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error(error)
    );
  }


  async function fetchPilots(lat: number, lng: number, range = 10) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}pilots`, {
        params: { lat, lng, range },
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function matchPilots(lat: number, lng: number, range = 10) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}pilots/match`, {
        params: { lat, lng, range },
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Use effect to get current location once
  useEffect(() => {
    currentLocation();
  }, []);

  return (
    <>
      <MapContainer center={center || [26.2645, 82.0728]} zoom={5} style={{ height: '100vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Data.map((pilot: any) => (
          pilot.coordinates && pilot.coordinates.lat && pilot.coordinates.lng && (
            <Marker position={[pilot.coordinates.lat, pilot.coordinates.lng]} key={pilot._id}>
              <Popup>
                <div>
                  <h3>{pilot.name}</h3>
                  <p>Experience: {pilot.work_experience_years} years</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
        {center && (
          <Marker position={center}>
            <Popup>
              <div>
                <h3>Your Location</h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
