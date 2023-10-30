import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const SongItems = ({item}) => {
  return (
    <Pressable style={{flexDirection:'row', alignItems:'center', padding:10}}>
        <Image style={{
            height:50, width:50, marginRight:10
        }} source={{uri:item?.track?.album?.images[0].url}}/>

        <View style={{flex:1}}>
            <Text style={{
                fontWeight:'bold',
                fontSize:14,
                color:'#fff'
            }}>{item.track.name}</Text>
            <Text style={{
                marginTop:4, color: "#989898"
            }}>{item.track.artists[0].name}</Text>
        </View>

        <View style={{flexDirection:'row',  gap:7, marginHorizontal:10}}>
        <AntDesign name="heart" size={24} color="green" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
        </View>
    </Pressable>
  )
}

export default SongItems

const styles = StyleSheet.create({})