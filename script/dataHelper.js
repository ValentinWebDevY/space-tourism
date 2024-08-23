export class DataHelper {
    BASE_URL = "../script/data.json";

    routes = {
        "destinations": "",
        "crew" : "",
        "technology" :""
    }

    getDestinationByName(destinationName) {
        let url = this.BASE_URL;
        return fetch(url)
            .then(response => response.json())
            .then(decoded => {
                const destination = decoded.destinations.find(d => d.name.toLowerCase() === destinationName.toLowerCase());
                if (!destination) {
                    throw new Error(`Destination "${destinationName}" not found.`);
                }
                return destination;
            });
    }

    getCrewMemberByNumber(crewNbr) {
        let url = this.BASE_URL;
        return fetch(url)
            .then(response => response.json())
            .then(decoded => {
                return decoded.crew[crewNbr];
            })
    }

    getTechnologyByNumber(techNumber) {
        let url = this.BASE_URL;
        return fetch(url)
            .then(response => response.json())
            .then(decoded => {
                return decoded.technology[techNumber];
            })
    }
}