import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Navigation,
  Clock,
} from 'lucide-react-native';
import { theme } from '@/assets/theme';

const { width, height } = Dimensions.get('window');

interface RideStatus {
  status: 'searching' | 'found' | 'pickup' | 'ongoing' | 'completed';
  driver?: {
    name: string;
    rating: number;
    vehicle: string;
    plate: string;
    photo: string;
  };
  estimatedTime: string;
  distance: string;
  fare: string;
}

export default function TrackingScreen() {
  const [rideStatus, setRideStatus] = useState<RideStatus>({
    status: 'searching',
    estimatedTime: '5 min',
    distance: '2.3 km',
    fare: 'R$ 8,50',
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Simular progressão da corrida
  useEffect(() => {
    const steps = [
      { status: 'searching', delay: 3000 },
      {
        status: 'found',
        delay: 2000,
        driver: {
          name: 'Victo Hugo',
          rating: 4.9,
          vehicle: 'Honda CG 160',
          plate: 'ABC-1234',
          photo: '👨‍🦱',
        },
      },
      { status: 'pickup', delay: 5000 },
      { status: 'ongoing', delay: 8000 },
      { status: 'completed', delay: 0 },
    ];

    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        const nextStep = steps[currentStep + 1];
        setRideStatus((prev) => ({
          ...prev,
          status: nextStep.status as any,
          driver: nextStep.driver || prev.driver,
        }));
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getStatusText = () => {
    switch (rideStatus.status) {
      case 'searching':
        return 'Procurando motociclista...';
      case 'found':
        return 'Motociclista encontrado!';
      case 'pickup':
        return 'Motociclista a caminho';
      case 'ongoing':
        return 'Corrida em andamento';
      case 'completed':
        return 'Corrida finalizada';
      default:
        return 'Aguardando...';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus.status) {
      case 'searching':
        return '#f59e0b';
      case 'found':
        return '#10b981';
      case 'pickup':
        return theme.primary;
      case 'ongoing':
        return '#8b5cf6';
      case 'completed':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Cancelar Corrida',
      'Tem certeza que deseja cancelar a corrida?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            setRideStatus((prev) => ({ ...prev, status: 'searching' }));
            setCurrentStep(0);
          },
        },
      ]
    );
  };

  const handleCompleteRide = () => {
    if (rideStatus.status === 'completed') {
      Alert.alert('Avaliar Corrida', 'Como foi sua experiência?', [
        { text: 'Depois', style: 'cancel' },
        { text: 'Avaliar', onPress: () => {} },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Header */}
      <View
        style={[styles.statusHeader, { backgroundColor: getStatusColor() }]}
      >
        <Text style={styles.statusText}>{getStatusText()}</Text>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: '#ffffff' }]} />
        </View>
      </View>

      {/* Mapa de Rastreamento */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Navigation size={60} color={theme.primary} />
          <Text style={styles.mapTitle}>Rastreamento em Tempo Real</Text>
          <Text style={styles.mapSubtitle}>
            {rideStatus.status === 'ongoing'
              ? 'Você está a caminho!'
              : 'Localização atualizada'}
          </Text>

          {/* Informações da Rota */}
          <View style={styles.routeInfo}>
            <View style={styles.routeItem}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.routeText}>{rideStatus.estimatedTime}</Text>
            </View>
            <View style={styles.routeItem}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.routeText}>{rideStatus.distance}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Informações do Motorista */}
      {rideStatus.driver && rideStatus.status !== 'searching' && (
        <View style={styles.driverCard}>
          <View style={styles.driverHeader}>
            <View style={styles.driverInfo}>
              <Text style={styles.driverPhoto}>{rideStatus.driver.photo}</Text>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{rideStatus.driver.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.rating}>{rideStatus.driver.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color={theme.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageSquare size={20} color={theme.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleText}>{rideStatus.driver.vehicle}</Text>
            <Text style={styles.plateText}>{rideStatus.driver.plate}</Text>
          </View>
        </View>
      )}

      {/* Informações da Viagem */}
      <View style={styles.tripInfo}>
        <View style={styles.tripRow}>
          <Text style={styles.tripLabel}>Tarifa:</Text>
          <Text style={styles.tripValue}>{rideStatus.fare}</Text>
        </View>

        {rideStatus.status === 'pickup' && (
          <View style={styles.tripRow}>
            <Text style={styles.tripLabel}>Chegada em:</Text>
            <Text style={styles.tripValue}>3-5 min</Text>
          </View>
        )}

        {rideStatus.status === 'ongoing' && (
          <View style={styles.tripRow}>
            <Text style={styles.tripLabel}>Tempo restante:</Text>
            <Text style={styles.tripValue}>8-12 min</Text>
          </View>
        )}
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        {rideStatus.status === 'completed' ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCompleteRide}
          >
            <Text style={styles.primaryButtonText}>Avaliar Corrida</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelRide}
          >
            <Text style={styles.cancelButtonText}>Cancelar Corrida</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  statusHeader: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#ffffff',
  },
  statusIndicator: {
    marginLeft: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mapContainer: {
    height: height * 0.4,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1e293b',
    marginTop: 16,
  },
  mapSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  routeInfo: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 24,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1e293b',
  },
  driverCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    fontSize: 40,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1e293b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  driverActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  vehicleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1e293b',
  },
  plateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.primary,
  },
  tripInfo: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tripLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
  },
  tripValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1e293b',
  },
  actionButtons: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#ffffff',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#ef4444',
  },
});
