import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const RecentlyPlayedCard = ({ item }) => {
  return (
    <Pressable style={{margin:10}}>
      <Image
        style={{ height: 130, width: 130, borderRadius: 5 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <Text numberOfLines={1} style={{
        fontSize:13,
        fontWeight:'500',
        marginTop:10,
        color:'#fff'
      }}>{item?.track?.name}</Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({});
