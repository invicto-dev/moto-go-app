import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Star, CreditCard, Calendar } from 'lucide-react-native';
import { colors } from '@/constains/colors';

interface RideHistory {
  id: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  fare: string;
  driver: {
    name: string;
    rating: number;
  };
  paymentMethod: string;
  status: 'completed' | 'cancelled';
}

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const rideHistory: RideHistory[] = [
    {
      id: '1',
      date: '15 Jan 2025',
      time: '14:30',
      origin: 'Shopping Eldorado',
      destination: 'Av. Paulista, 1578',
      duration: '18 min',
      distance: '5.2 km',
      fare: 'R$ 15,90',
      driver: {
        name: 'Carlos Silva',
        rating: 4.9,
      },
      paymentMethod: 'Cartão',
      status: 'completed',
    },
    {
      id: '2',
      date: '14 Jan 2025',
      time: '09:15',
      origin: 'Rua Augusta, 1234',
      destination: 'Aeroporto de Congonhas',
      duration: '32 min',
      distance: '12.8 km',
      fare: 'R$ 28,50',
      driver: {
        name: 'Maria Santos',
        rating: 5.0,
      },
      paymentMethod: 'PIX',
      status: 'completed',
    },
    {
      id: '3',
      date: '12 Jan 2025',
      time: '19:45',
      origin: 'Vila Madalena',
      destination: 'Itaim Bibi',
      duration: '0 min',
      distance: '0 km',
      fare: 'R$ 0,00',
      driver: {
        name: 'João Pereira',
        rating: 4.7,
      },
      paymentMethod: 'Cartão',
      status: 'cancelled',
    },
    {
      id: '4',
      date: '10 Jan 2025',
      time: '16:20',
      origin: 'Estação da Luz',
      destination: 'Mercado Municipal',
      duration: '12 min',
      distance: '3.1 km',
      fare: 'R$ 9,80',
      driver: {
        name: 'Ana Costa',
        rating: 4.8,
      },
      paymentMethod: 'Dinheiro',
      status: 'completed',
    },
    {
      id: '5',
      date: '08 Jan 2025',
      time: '11:00',
      origin: 'Parque Ibirapuera',
      destination: 'Shopping Iguatemi',
      duration: '25 min',
      distance: '8.7 km',
      fare: 'R$ 19,40',
      driver: {
        name: 'Roberto Lima',
        rating: 4.6,
      },
      paymentMethod: 'Cartão',
      status: 'completed',
    },
  ];

  const filteredHistory = rideHistory.filter(ride => {
    if (selectedFilter === 'all') return true;
    return ride.status === selectedFilter;
  });

  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'completed', label: 'Concluídas' },
    { key: 'cancelled', label: 'Canceladas' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'completed' ? '#10b981' : '#ef4444';
  };

  const getStatusText = (status: string) => {
    return status === 'completed' ? 'Concluída' : 'Cancelada';
  };

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'cartão':
        return '💳';
      case 'dinheiro':
        return '💵';
      case 'pix':
        return '📱';
      default:
        return '💳';
    }
  };

  const renderRideItem = ({ item }: { item: RideHistory }) => (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View style={styles.dateTimeContainer}>
          <Calendar size={16} color="#64748b" />
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#10b981' }]} />
          <Text style={styles.locationText} numberOfLines={1}>{item.origin}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.locationText} numberOfLines={1}>{item.destination}</Text>
        </View>
      </View>

      {item.status === 'completed' && (
        <>
          <View style={styles.rideDetails}>
            <View style={styles.detailItem}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.detailText}>{item.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.detailText}>{item.distance}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.paymentIcon}>{getPaymentIcon(item.paymentMethod)}</Text>
              <Text style={styles.detailText}>{item.paymentMethod}</Text>
            </View>
          </View>

          <View style={styles.rideFooter}>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{item.driver.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.ratingText}>{item.driver.rating}</Text>
              </View>
            </View>
            <Text style={styles.fareText}>{item.fare}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Corridas</Text>
        <Text style={styles.subtitle}>{filteredHistory.length} corrida{filteredHistory.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.key as any)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Corridas */}
      <FlatList
        data={filteredHistory}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 20,
  },
  rideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1e293b',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#ffffff',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#e2e8f0',
    marginLeft: 3,
    marginVertical: 2,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
  paymentIcon: {
    fontSize: 16,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1e293b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
  fareText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.primary,
  },
});