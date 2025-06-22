import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Banknote,
  CreditCard,
  MapPin,
  Navigation,
  Smartphone,
} from 'lucide-react-native';
import { theme } from '@/assets/theme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AutocompleteInput from '@/components/AutoCompletInput';

const { width, height } = Dimensions.get('window');

interface RideRequest {
  origin: string;
  destination: string;
  rideType: 'standard' | 'premium';
  paymentMethod: 'card' | 'cash' | 'pix';
}

export default function HomeScreen() {
  const API_KEY = 'AIzaSyDYOCGx7fPk7zhZoyseAOq-tSaxdFYSU4Y';
  const [rideRequest, setRideRequest] = useState<RideRequest>({
    origin: '',
    destination: '',
    rideType: 'standard',
    paymentMethod: 'card',
  });
  const [isRequestingRide, setIsRequestingRide] = useState(false);

  const handleRequestRide = async () => {
    if (!rideRequest.origin || !rideRequest.destination) {
      Alert.alert('Erro', 'Por favor, preencha origem e destino');
      return;
    }

    setIsRequestingRide(true);

    try {
      const response = await fetch('http://localhost:3001/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rideRequest),
      });

      if (!response.ok) {
        throw new Error('Erro ao solicitar corrida');
      }

      const data = await response.json();

      console.log('Dados da solicitação de corrida:', data);

      if (data.success && data.driverFound) {
        Alert.alert(
          'Motorista encontrado!',
          `🧑‍✈️ ${data.driver.name}\n🏍️ ${data.driver.moto}\n📍 Chega em ${data.estimatedArrival}`
        );
      } else {
        Alert.alert('Nenhum motorista disponível no momento');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível solicitar a corrida.');
    }

    setIsRequestingRide(false);
  };

  const rideTypes = [
    {
      id: 'standard',
      name: 'Padrão',
      price: 'R$ 8,50',
      time: '5-8 min',
      description: 'Econômico e confiável',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 12,90',
      time: '3-5 min',
      description: 'Mais rápido e confortável',
    },
  ];

  const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: <Smartphone /> },
    { id: 'cash', name: 'Dinheiro', icon: <Banknote /> },
    { id: 'card', name: 'Cartão', icon: <CreditCard />, disabled: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Olá!</Text>
          <Text style={styles.titleText}>Para onde vamos?</Text>
        </View>

        {/* Mapa Simulado */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Navigation size={40} color={theme.primary} />
            <Text style={styles.mapText}>Mapa de Oriximiná</Text>
            <Text style={styles.mapSubtext}>Localização atual detectada</Text>
          </View>
        </View>

        {/* Formulário de Corrida */}
        <View style={styles.rideForm}>
          <View style={styles.locationInputs}>
            <View style={styles.inputGroup}>
              <AutocompleteInput
                placeholder="De onde você está saindo?"
                onPlaceSelected={(place) => {
                  console.log(place);
                  setRideRequest((prev) => ({
                    ...prev,
                    origin: place.description,
                  }));
                }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.inputGroup}>
              <AutocompleteInput
                placeholder="Para onde você vai?"
                onPlaceSelected={(place) => {
                  console.log(place);
                  setRideRequest((prev) => ({
                    ...prev,
                    destination: place.description,
                  }));
                }}
              />
            </View>
          </View>

          {/* Tipos de Corrida */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Escolha o tipo de corrida</Text>
            {rideTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.rideTypeCard,
                  rideRequest.rideType === type.id && styles.rideTypeCardActive,
                ]}
                onPress={() =>
                  setRideRequest((prev) => ({
                    ...prev,
                    rideType: type.id as 'standard' | 'premium',
                  }))
                }
              >
                <View style={styles.rideTypeInfo}>
                  <Text style={styles.rideTypeName}>{type.name}</Text>
                  <Text style={styles.rideTypeDescription}>
                    {type.description}
                  </Text>
                </View>
                <View style={styles.rideTypeDetails}>
                  <Text style={styles.rideTypePrice}>{type.price}</Text>
                  <Text style={styles.rideTypeTime}>{type.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Métodos de Pagamento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Método de pagamento</Text>
            <View style={styles.paymentMethods}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    rideRequest.paymentMethod === method.id &&
                      styles.paymentMethodActive,
                  ]}
                  onPress={() =>
                    setRideRequest((prev) => ({
                      ...prev,
                      paymentMethod: method.id as 'card' | 'cash' | 'pix',
                    }))
                  }
                >
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentText}>{method.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botão de Solicitar */}
          <TouchableOpacity
            style={[
              styles.requestButton,
              isRequestingRide && styles.requestButtonLoading,
            ]}
            onPress={handleRequestRide}
            disabled={isRequestingRide}
          >
            <Text style={styles.requestButtonText}>
              {isRequestingRide
                ? 'Procurando motorista...'
                : 'Solicitar Corrida'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
    marginTop: 4,
  },
  mapContainer: {
    height: height * 0.25,
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
  },
  mapText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginTop: 8,
  },
  mapSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  rideForm: {
    padding: 20,
  },
  locationInputs: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  rideTypeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  rideTypeCardActive: {
    borderColor: theme.primary,
    backgroundColor: '#eff6ff',
  },
  rideTypeInfo: {
    flex: 1,
  },
  rideTypeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1e293b',
  },
  rideTypeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  rideTypeDetails: {
    alignItems: 'flex-end',
  },
  rideTypePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.primary,
  },
  rideTypeTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  paymentMethodActive: {
    borderColor: theme.primary,
    backgroundColor: '#eff6ff',
  },
  paymentIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  paymentText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1e293b',
  },
  requestButton: {
    backgroundColor: theme.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    elevation: 4,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  requestButtonLoading: {
    backgroundColor: '#64748b',
  },
  requestButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#ffffff',
  },
});
