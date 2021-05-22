import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const App = () => {

  const [songs, setSongs] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [toggleView, setToggleView] = useState(false)
  const [toggleViewIndex, setToggleViewIndex] = useState(null)

  useEffect(() => {
    setLoading(true)
    this.getSongs()
  }, [])

  getSongs = async () => {
    const apiUrl = 'https://itunes.apple.com/search?term=Michael+jackson';
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        setSongs(resJson.results)
        setLoading(false)
      })
  }

  onPressItem = (index) => {
    setToggleView(!toggleView)
    setToggleViewIndex(index)
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onPressItem(index)}>
        <Image
          source={{ uri: item.artworkUrl100 }}
          style={styles.imageStyle}
        />
        <View style={styles.rowContainer}>
          <Text
            style={styles.nameTextStyle}
            numberOfLines={1}
          >{item.collectionName || item.artistName}</Text>

          {
            toggleView && toggleViewIndex === index &&
            < View >
              {
                item.trackName && <Text style={styles.descTextStyle}>Track Name: {item.trackName}</Text>
              }
              {item.collectionPrice && <Text style={styles.descTextStyle}>Collection Price: {item.collectionPrice}</Text>}
              {item.releaseDate && <Text style={styles.descTextStyle}>Release Date: {item.releaseDate}</Text>}
              <Text style={styles.descTextStyle}>{item.shortDescription || item.longDescription}</Text>
            </View>
          }
        </View>
      </TouchableOpacity >
    )
  }

  return (
    isLoading ?
      <View style={styles.loaderConatiner}>
        <ActivityIndicator
          size={'large'}
        />
      </View>
      :
      <SafeAreaView style={styles.mainContainer}>

        <Text style={styles.headingText}>MJ Songs</Text>
        <FlatList
          data={songs}
          style={styles.listContainer}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() =>
            <View style={styles.separatorStyle} />
          }
        />

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  loaderConatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#9370DB',
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
  },
  separatorStyle: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
    backgroundColor: '#9370DB',
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 70 / 2,
    borderColor: '#9370DB'
  },
  rowContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold'
  },
  descTextStyle: {
    fontSize: 12,
    marginTop: 10,
    color: '#000000',
  }
})

export default App;