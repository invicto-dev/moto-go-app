import { theme } from '@/assets/theme';
import { MapPin } from 'lucide-react-native';
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ActivityIndicator,
  Keyboard
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');


const GOOGLE_API_KEY = 'AIzaSyDYOCGx7fPk7zhZoyseAOq-tSaxdFYSU4Y';

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: Prediction) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  maxResults?: number;
  style?: any;
}

export default function AutocompleteInput({ 
  placeholder, 
  onPlaceSelected,
  disabled = false,
  error,
  label,
  maxResults = 5,
  style
}: AutocompleteInputProps) {
  const [input, setInput] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPredictions, setShowPredictions] = useState<boolean>(false);
  
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Debounce para otimizar chamadas à API
  const debouncedSearch = (searchText: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchText.length > 2) {
        searchPlaces(searchText);
      } else {
        setPredictions([]);
        setLoading(false);
        setShowPredictions(false);
      }
    }, 300);
  };

  const searchPlaces = async (searchText: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          searchText
        )}&key=${GOOGLE_API_KEY}&language=pt-BR&components=country:br`
      );
      
      const data = await response.json();
      
      if (data?.predictions) {
        setPredictions(data.predictions.slice(0, maxResults));
        setShowPredictions(true);
      } else {
        setPredictions([]);
        setShowPredictions(false);
      }
    } catch (err) {
      console.error('Erro ao buscar lugares:', err);
      setPredictions([]);
      setShowPredictions(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedSearch(input);
    
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [input]);

  const handleInputChange = (text: string) => {
    setInput(text);
    if (text.length <= 2) {
      setShowPredictions(false);
    }
  };

  const handleSelect = (place: Prediction) => {
    setInput(place.description);
    setPredictions([]);
    setShowPredictions(false);
    onPlaceSelected(place);
    Keyboard.dismiss();
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (predictions.length > 0) {
      setShowPredictions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay para permitir seleção antes de esconder
    setTimeout(() => {
      setShowPredictions(false);
    }, 150);
  };

  const clearInput = () => {
    setInput('');
    setPredictions([]);
    setShowPredictions(false);
    inputRef.current?.focus();
  };

  const renderSuggestion = ({ item }: { item: Prediction }) => (
    <TouchableOpacity 
      onPress={() => handleSelect(item)} 
      style={styles.suggestion}
      activeOpacity={0.7}
    >
      <View style={styles.suggestionContent}>
        {item.structured_formatting ? (
          <>
            <Text style={styles.mainText} numberOfLines={1}>
              {item.structured_formatting.main_text}
            </Text>
            <Text style={styles.secondaryText} numberOfLines={1}>
              {item.structured_formatting.secondary_text}
            </Text>
          </>
        ) : (
          <Text style={styles.suggestionText} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
        disabled && styles.inputContainerDisabled
      ]}>
        <MapPin size={20} color={theme.primary} />
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            disabled && styles.inputDisabled
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.disabledColor}
          value={input}
          onChangeText={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          autoCorrect={false}
          autoCapitalize="words"
        />
        
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={theme.primary} 
            style={styles.loadingIndicator}
          />
        )}
        
        {input.length > 0 && !loading && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {showPredictions && predictions.length > 0 && (
        <View style={styles.predictionsContainer}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={renderSuggestion}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.borderColor,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    minHeight: 50,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: theme.primary,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: '#ef4444',
  },
  inputContainerDisabled: {
    backgroundColor: theme.bgLayout,
    borderColor: theme.disabledColor,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 12,
  },
  inputDisabled: {
    color: theme.disabledColor,
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  clearButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.disabledColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  predictionsContainer: {
    marginTop: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.borderColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 200,
  },
  suggestion: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.bgLayout,
  },
  suggestionContent: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    color: theme.disabledColor,
  },
  suggestionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 20,
  },
});