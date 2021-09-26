import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {

  const [bgColor, setBgColor] = useState('gray');
  const isMounted = useRef(true);

  useEffect(() => {

    ImageColors.getColors(pokemon.picture, { fallback: 'gray' })
      .then(colors => {

        if (isMounted.current === false) return;

        if (colors.platform === 'android') {
          setBgColor(colors.dominant || 'gray');
        }

        if (colors.platform === 'ios') {
          setBgColor(colors.background || 'gray')
        }

      });

    return () => {
      isMounted.current = false;
    }

  }, []);


  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor
        }}>
        {/* Pokemon name and ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>
        {/* Pokemon images */}
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.4,
  },
  pokebolaContainer: {
    // backgroundColor: 'blue',
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -10,
    right: -5,
  },
});
