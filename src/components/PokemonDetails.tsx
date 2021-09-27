import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {PokemonFull} from '../interfaces/PokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types and weight */}
      <View style={{...styles.container, marginTop: 360}}>
        <Text style={styles.title}>Types:</Text>
        <View>
          <View style={{flexDirection: 'row'}}>
            {pokemon.types.map(({type}) => (
              <Text
                key={type.name}
                style={{...styles.regularText, marginRight: 10}}>
                {type.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>Weight:</Text>
          <Text style={styles.regularText}>{pokemon.weight}kg</Text>
        </View>
      </View>
      {/* Sprites */}
      <View style={{...styles.container, marginTop: 20}}>
        <Text style={styles.title}>Sprites:</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>
      {/* Abilities */}
      <View style={{...styles.container, marginBottom: 20}}>
        <Text style={styles.title}>Base abilities:</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Moves */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Moves:</Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Stats */}
      <View style={{...styles.container, marginTop: 20}}>
        <Text style={styles.title}>Stats:</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View
              key={stat.stat.name + i}
              style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text
                style={{
                  ...styles.regularText,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  width: 200,
                }}>
                {stat.stat.name}:
              </Text>
              <Text style={{...styles.regularText, marginRight: 10}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
        {/* Final Sprite */}
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});

export default PokemonDetails;
