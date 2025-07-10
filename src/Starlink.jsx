import axios from 'axios';
import {useState, useEffect} from 'react';

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
        <ul>
            {satelites.map((sat) => (
                 <li key={sat.id}>{sat.spaceTrack.OBJECT_NAME}</li>
                ))
            }
        </ul>
    </>)
}

export default Starlink;