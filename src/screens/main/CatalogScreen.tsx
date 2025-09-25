import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Game } from '../../types';
import { gameService } from '../../services/api';
import { GameCard } from '../../components/GameCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../styles/colors';

type CatalogScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: CatalogScreenNavigationProp;
}

export const CatalogScreen: React.FC<Props> = ({ navigation }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'price'>('title');

  const genres = ['Todos', 'Acción', 'Aventura', 'RPG', 'Puzzle', 'Plataformas'];

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    filterAndSortGames();
  }, [games, searchQuery, selectedGenre, sortBy]);

  const loadGames = async () => {
    try {
      const gamesData = await gameService.getAllGames();
      setGames(gamesData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los juegos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterAndSortGames = () => {
    let filtered = [...games];

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por género
    if (selectedGenre && selectedGenre !== 'Todos') {
      filtered = filtered.filter(game => game.genre === selectedGenre);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredGames(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadGames();
  };

  const handleGamePress = (game: Game) => {
    navigation.navigate('GameDetail', { game });
  };

  const renderGame = ({ item }: { item: Game }) => (
    <GameCard
      game={item}
      onPress={() => handleGamePress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Catálogo</Text>
      
      <Input
        placeholder="Buscar juegos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        <Button
          title="Filtros"
          onPress={() => setShowFilters(true)}
          variant="outline"
          size="small"
          style={styles.filterButton}
        />
        <Text style={styles.resultCount}>
          {filteredGames.length} juegos
        </Text>
      </View>
    </View>
  );

  const renderFiltersModal = () => (
    <Modal
      visible={showFilters}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtros y Ordenamiento</Text>
          
          <Text style={styles.sectionTitle}>Género</Text>
          <View style={styles.genreContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genreButton,
                  selectedGenre === genre && styles.genreButtonActive
                ]}
                onPress={() => setSelectedGenre(genre === 'Todos' ? '' : genre)}
              >
                <Text style={[
                  styles.genreButtonText,
                  selectedGenre === genre && styles.genreButtonTextActive
                ]}>
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Ordenar por</Text>
          <View style={styles.sortContainer}>
            {[
              { key: 'title', label: 'Alfabético' },
              { key: 'rating', label: 'Calificación' },
              { key: 'price', label: 'Precio' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.sortButtonActive
                ]}
                onPress={() => setSortBy(option.key as any)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === option.key && styles.sortButtonTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="Aplicar"
            onPress={() => setShowFilters(false)}
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando juegos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredGames}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {renderFiltersModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 0,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  row: {
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  genreButtonTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  sortContainer: {
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  sortButtonTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  applyButton: {
    marginTop: 24,
  },
});