import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FadeInImage} from '../components/FadeInImage';
import PokemonCard from '../components/PokemonCard';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaVG}
      />

      <FlatList
        style={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}
        data={simplePokemonList}
        keyExtractor={poke => poke.id}
        numColumns={2}
        //Header
        ListHeaderComponent={() => (
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 10,
              marginBottom: top + 10,
            }}>
            Pokedex
          </Text>
        )}
        renderItem={({index, item}) => <PokemonCard pokemon={item} />}
        // infinite scroll
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        //Activity indicator
        ListFooterComponent={
          // eslint-disable-next-line react-native/no-inline-styles
          <ActivityIndicator style={{height: 100}} color="purple" size={20} />
        }
      />
    </View>
  );
};

export default HomeScreen;
