import axios from 'axios';
import {useState, useEffect} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';

const satelliteIcon = new L.Icon({
    iconUrl: 'satellite.png',
    iconSize: [25,25],
    iconAnchor: [12,12],
    popupAnchor:[0,-12]
});

function Starlink() {

    const [satelites, setSatelites] = useState([]);
    const [page,setPage] = useState(1);

    useEffect(() => {
        fetchSatellites(page);
    },[]);

    const fetchSatellites = async(page_to_load) => {
        axios.post('https://api.spacexdata.com/v4/starlink/query',
            {
                "query": {},
                "options": { limit: 100, page:page_to_load }
            }
        ).then(function(response) {
            setSatelites(response.data.docs);
        });
    }

    return (<>
        <h1>Lista de satélites starlink Total: {satelites.length} Página: {page} </h1>
        <MapContainer center={[51.505, -0.09]} zoom={2} style={{height: '80vh'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {satelites
                .filter((sat) => sat.longitude && sat.latitude)
                .map((sat) => (
                    <Marker position={[sat.latitude, sat.longitude]}
                            icon={satelliteIcon}>
                        <Popup>
                            <h2>
                                {sat.spaceTrack.OBJECT_NAME}
                            </h2>
                            <p>{sat.id}</p>
                        </Popup>
                    </Marker>
                ))
            }
            
        </MapContainer>
    </>)
}

export default Starlink;