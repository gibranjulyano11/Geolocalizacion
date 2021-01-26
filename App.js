import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Button, RefreshControl } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps'


const initialStation = {
         latitude: null,
        longitude: null,
       latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
}

export default function App() {
  let myMap;
  const [curentPosition, setCurentPosition] = useState(initialStation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      alert(JSON.stringify(position))
      
      const {longitude, latitude } = position.coords;

      setCurentPosition({
        ...curentPosition,
        latitude,
        longitude, 
      })


    }, error =>alert(error.message),
      {  timeout: 20000, maximumAge: 1000 }
    )
   
  }, [])
  
  return curentPosition.latitude ? (
    <MapView 
       ref={ref => myMap = ref}
      provider={PROVIDER_GOOGLE}
      style={{ flex:1 }}
      showsUserLocation
      initialRegion={curentPosition}
      >
      
      <Marker
        coordinate= {{
          latitude:-0.302676,
          longitude: -78.5631468,
        }}
        onPress={()=>{
          myMap.fitToCoordinates([{
            latitude:-0.302676,
          longitude: -78.5631468,
          }],{
           
              animated:true
          }
          )
        }}
      />
      
      
</MapView>
    
      
    
    
      
    
  ) : <ActivityIndicator style={{flex: 1}} animating size="large" />  


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
