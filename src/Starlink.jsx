import axios from 'axios';
import {useState, useEffect} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css'

function Starlink() {

    const [satelites, setSatelites] = useState([]);

    useEffect(() => {
        axios.post('https://api.spacexdata.com/v4/starlink/query',
            {
                "query": {},
                "options": { limit: 10 }
            }
        ).then(function(response) {
            setSatelites(response.data.docs);
        });
    },[]);

    return (<>
        <h1>Lista de satélites starlink {satelites.length}</h1>
        {/* <ul>
            {satelites.map((sat) => (
                 <li key={sat.id}>{sat.spaceTrack.OBJECT_NAME}</li>
                ))
            }
        </ul> */}
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </>)
}

export default Starlink;