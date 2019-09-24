import {authHeader} from './auth-header';
import * as constants from "./constants"
import {userService} from "./user.service";

export const rideService = {
    delete: _delete,
};

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, name) {
    const confirmed = confirm(`Die Fahrt '${name}' wirklich löschen?`)
    if (!confirmed) {
        return
    }
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${constants.hostname}/ride/delete?id=${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}