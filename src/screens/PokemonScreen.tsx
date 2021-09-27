import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../navigator/StackNavigator';
//@ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon} = usePokemon(id);
  console.log(pokemon.moves);

  return (
    <View style={{flex: 1}}>
      {/* Header Container */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* Back button */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.backButton, top: top + 10}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>
        {/* Pokemon name */}
        <Text style={{...styles.pokemonName, top: top + 45}}>
          {name + '\n'} #{id}
        </Text>
        {/* Pokeball white */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* Details */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 350,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -10,
    opacity: 0.6,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: 0,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
