function gpsDistance(lat1, lon1, lat2, lon2) {
    // if you like gps maths look at http://www.movable-type.co.uk/scripts/latlong.html
    //Haversine formula
  
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
  
    return d;
  }
  
  export function calculateDistance(data){
    const total_km = gpsDistance(data.start.latitude, data.start.longitude, data.end.latitude, data.end.longitude);

    const total_km_to_yds = total_km*1094;
    const yds_rounded = total_km_to_yds | 0;
  
    return([yds_rounded]);
  }