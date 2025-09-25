import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type GameDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameDetail'>;
type GameDetailScreenRouteProp = RouteProp<RootStackParamList, 'GameDetail'>;

interface Props {
  navigation: GameDetailScreenNavigationProp;
  route: GameDetailScreenRouteProp;
}

export const GameDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { game } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(game);
    Alert.alert(
      'Agregado al carrito',
      `${game.title} ha sido agregado a tu carrito`,
      [
        { text: 'Continuar comprando', style: 'cancel' },
        { text: 'Ver carrito', onPress: () => navigation.navigate('Main') },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: game.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{game.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {game.rating}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Género</Text>
            <Text style={styles.infoValue}>{game.genre}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Precio</Text>
            <Text style={styles.price}>${game.price}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fecha de lanzamiento:</Text>
            <Text style={styles.detailValue}>{formatDate(game.releaseDate)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plataformas:</Text>
            <Text style={styles.detailValue}>{game.platform.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Button
            title="Agregar al carrito"
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 16,
  },
  ratingContainer: {
    backgroundColor: colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  price: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    flex: 2,
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  addButton: {
    backgroundColor: colors.secondary,
  },
});