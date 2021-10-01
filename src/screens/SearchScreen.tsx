import React from 'react';
import {View, Text, FlatList, Dimensions, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import styles from '../theme/appTheme';
import {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  const screenWIdth = Dimensions.get('window').width;

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWIdth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        style={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}
        data={pokemonFiltered}
        keyExtractor={poke => poke.id}
        numColumns={2}
        //Header
        ListHeaderComponent={() => (
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              top: 65,
              marginBottom: top + 80,
            }}>
            {term}
          </Text>
        )}
        renderItem={({index, item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

export default SearchScreen;
