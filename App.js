import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("please grant location Permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync();
    setLocation(currentLocation);
    console.log("current locations:", currentLocation);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("geocode location:", geocodedLocation);
  };

  const reeverseLocation = async () => {
    const reveersGeocodedLocation = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log("reveers location:", reveersGeocodedLocation);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button title="Reeverse Location" onPress={reeverseLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
