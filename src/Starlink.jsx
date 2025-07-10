import axios from 'axios';

function Starlink() {

    axios.post('https://api.spacexdata.com/v4/starlink/query',
        {
            "query": {},
            "options": { limit: 10 }
        }
    ).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });

    return <h1>Lista de satélites starlink</h1>
}

export default Starlink;