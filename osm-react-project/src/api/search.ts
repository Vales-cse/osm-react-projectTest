import type { Place } from "./Place";

interface SearchRespone {
    features: {
        geometry: {
            coordinates: number[]
        }
        properties: {
            place_id: number;
            display_name: string
        }
    }[]
}

export const search = async (term: string) => {
    console.log('Sending request for:', term);
    //aggiungo una gestione dell'errore
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetail=1&layer=address&limit=2`
        );
        console.log('Response:', res);  // Stampa la risposta
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data: SearchRespone = await res.json();

        const places: Place[] = data.features.map((feature) => {
            return {
                id: feature.properties.place_id,
                name: feature.properties.display_name,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1]
            }
        });
        return places;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}