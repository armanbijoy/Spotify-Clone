import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongItems from "../components/SongItems";
import { Player } from "../PlayerContext";
import { BottomModal } from 'react-native-modal';
const LikedSongsScreen = () => {
  const Navigation = useNavigation();
  const {currentTrack, setcurrentTrack} = useContext(Player);
   const [modal, setModal] = useState(false)

  const [input, setInput] = useState("");
  const [saveTracks, setsaveTracks] = useState([]);
  
  const getsaveTracks = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed");
    }
    const data = await response.json();
    setsaveTracks(data.items);
  };

  useEffect(() => {
    getsaveTracks();
  }, []);
  //   console.log(saveTracks);
  const playTrack = async () => {
    if (saveTracks.length > 0) {
      setcurrentTrack(saveTracks[0]);
    }
    await play(saveTracks[0]);
  };
  const play = async () => {};
  console.log(currentTrack);
  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 50 }}>
          <Pressable
            onPress={() => Navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
              }}
            >
              <AntDesign name="search1" size={20} color="#fff" />
              <TextInput
                value={input}
                onChange={(text) => setInput(text)}
                placeholder="Find Liked Songs"
                placeholderTextColor={"#fff"}
              />
            </Pressable>
            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
              }}
            >
              <Text style={{ color: "#fff" }}>Sort</Text>
            </Pressable>
          </Pressable>
          <View style={{ height: 50 }}>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Liked Songs
              </Text>
              <Text style={{ color: "#fff", fontSize: 13, marginTop: 5 }}>
                430 Songs
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1D8954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="#fff" />
            </Pressable>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1D8954"
              />
              <Pressable
                onPress={playTrack}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#1D8954",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="controller-play" size={24} color="#fff" />
              </Pressable>
            </View>
          </Pressable>
          <FlatList
            data={saveTracks}
            renderItem={({ item }) => {
              return <SongItems item={item} />;
            }}
          />
        </ScrollView>
      </LinearGradient>

      {currentTrack && (
        <Pressable style={{backgroundColor:'#5072A7', width:"90%", padding:10,
        marginLeft:'auto', marginRight:'auto', marginBottom:15, position:'absolute'
        , borderRadius:6,  left:20, bottom:10, justifyContent:'space-between'
        ,flexDirection:'row', alignItems:'center', gap:10}}>
          <View  style={{
            flexDirection:'row',
            alignItems:'center',
            gap:10
          }}>
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: currentTrack.track.album.images[0].url }}
            />
            <Text style={{
                fontSize:13,
                fontWeight:'bold',
                color:'#fff'
            }} numberOfLines={1}>{currentTrack.track.name} {currentTrack.track.artists[0].name}</Text>

          </View>

          <View style={{
            flexDirection:'row',
            alignItems:'center',
            gap:8
          }}>
          
          <Pressable>
          <AntDesign name="pausecircle" size={24} color="#fff" />
          </Pressable>
          </View>
        </Pressable>
      )}
       
       <BottomModal visible={modal}>
          
       </BottomModal>
    </>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({});
