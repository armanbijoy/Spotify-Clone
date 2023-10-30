import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const Navigation = useNavigation()
  const [userProfile, setuserProfile] = useState();
  const [recentlyPlayed, setrecentlyPlayed] = useState([]);
  const [topArtist, settopArtist] = useState([]);
  const greetingMessage = () => {
    const curentTime = new Date().getHours();
    if (curentTime < 12) {
      
      return "Good Morning";
    } else if (curentTime < 16) {
      return "Good AfterNoon";
    } else {
    
      return "Good Evening";
    }
  };
  const message = greetingMessage();
  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setuserProfile(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  // console.log(userProfile);

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=14",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setrecentlyPlayed(tracks);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayedSongs();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: "#282828",
          borderRadius: 4,
        }}
      >
        <Image
          style={{ height: 55, width: 55 }}
          source={{ uri: item.track.album.images[0].url }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
        >
          <Text
            numberOfLines={2}
            style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}
          >
            {item.track.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  // useEffect(()=>{
  //   const getTopItems = async ()=>{
  //     const accessToken = await AsyncStorage.getItem("token");
  //     try {
  //       if(!accessToken){
  //         console.log('Not Found')
  //         return
  //       }
  //       const type = "artist"
  //       const response = await axios.get(`https://api/spotify.com/v1/me/top/${type}`,{
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       settopArtist(response.data.items)
  //       }catch(err){
  //         console.log(err.message)
  //       }
  //   }
  //   getTopItems()

  // },[])
  // console.log(topArtist)
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={require("../assets/icon.png")}
            />
            <Text
              style={{
                color: "#fff",
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {message}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="#fff"
          />
        </View>

        <View
          style={{
            marginHorizontal: 12,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "#fff" }}>Music</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "#fff" }}>Podcast & Shows</Text>
          </Pressable>
        </View>

        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={()=>Navigation.navigate("Liked")}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 4,
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="#fff" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 4,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <View>
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>
                HipHop Tamhiza
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 19,
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            Recently Played
          </Text>

          <FlatList
          horizontal
            data={recentlyPlayed}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <RecentlyPlayedCard item={item} key={index} />}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
