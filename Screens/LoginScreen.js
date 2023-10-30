import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const Navigation = useNavigation()

  useEffect(()=>{
   const checkTokenValidity = async ()=>{
      const accessToken = await AsyncStorage.getItem("token")
      const expirationDate = await AsyncStorage.getItem("expirationDate")
      console.log("Access Token", accessToken)
      console.log("exper Date", expirationDate)

      if(accessToken && expirationDate){
        const currentTime = Date.now()
        if(currentTime < parseInt(expirationDate)){
          Navigation.replace("Main")
        } else{
          AsyncStorage.removeItem("token")
          AsyncStorage.removeItem("expirationDate")
        }
      } 
   }
   checkTokenValidity()
  },[])
   
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "79e46b4263194351b6b8d5bb7f18ab8f",
      clientSecret: "42622d945fc847f19f29b92f7aeae121",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public"
      ],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://192.168.0.104:8081",
    },
    discovery
  );
  React.useEffect(() => {
    if (response?.type === "success") {
      
      console.log("Success");
      const result = response.params
      console.log(result)
      if(result.access_token){
        const expirationDate = new Date(result.expires_in).getTime()
        AsyncStorage.setItem("token",result.access_token)
        AsyncStorage.setItem("expirationDate",expirationDate.toString())
        Navigation.navigate("Main")
      }
    }
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="#fff"
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 40,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs free on Spotyfy
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
          onPress={() => promptAsync()}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Sign In with Spotify</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="#fff" />
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with Phone Number
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with Google
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with Facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
