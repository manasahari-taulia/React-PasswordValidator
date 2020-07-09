export const getUserService  = {
    getAllMemberships,
}

function getAllMemberships() 
{    
    var endpointURL= 'http://www.mocky.io/v2/5de6c328370000a21d0925f2';
    console.log(endpointURL);
    return fetch(endpointURL)
    .then(response => {
        return response.json()
    })    
}