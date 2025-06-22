import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  CircleHelp as HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Gift,
  Users,
} from 'lucide-react-native';
import { theme } from '@/assets/theme';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  rating: number;
  totalRides: number;
  memberSince: string;
  verified: boolean;
}

export default function ProfileScreen() {
  // obter versão do package.json
  const packageJson = require('../../package.json');

  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const userProfile: UserProfile = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 (11) 99999-9999',
    rating: 4.8,
    totalRides: 127,
    memberSince: 'Janeiro 2023',
    verified: true,
  };

  const menuSections = [
    {
      title: 'Conta',
      items: [
        {
          icon: User,
          title: 'Editar Perfil',
          subtitle: 'Nome, email e telefone',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
          icon: CreditCard,
          title: 'Pagamentos',
          subtitle: 'Cartões e métodos de pagamento',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
          icon: MapPin,
          title: 'Endereços Salvos',
          subtitle: 'Casa, trabalho e favoritos',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Preferências',
      items: [
        {
          icon: Bell,
          title: 'Notificações',
          subtitle: 'Push, email e SMS',
          hasSwitch: true,
          switchValue: notifications,
          onSwitchChange: setNotifications,
        },
        {
          icon: Shield,
          title: 'Privacidade',
          subtitle: 'Dados e permissões',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
          icon: Settings,
          title: 'Configurações',
          subtitle: 'App e preferências gerais',
          hasSwitch: false,
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Programa de Benefícios',
      items: [
        {
          icon: Gift,
          title: 'Promoções',
          subtitle: 'Cupons e ofertas especiais',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
          icon: Users,
          title: 'Indique e Ganhe',
          subtitle: 'Convide amigos e ganhe créditos',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: HelpCircle,
          title: 'Central de Ajuda',
          subtitle: 'FAQ e suporte técnico',
          onPress: () =>
            Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
          icon: LogOut,
          title: 'Sair',
          subtitle: 'Encerrar sessão',
          isDestructive: true,
          onPress: () => {
            Alert.alert('Sair da Conta', 'Tem certeza que deseja sair?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Sair', style: 'destructive', onPress: () => {} },
            ]);
          },
        },
      ],
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={item.onPress}
      disabled={item.hasSwitch}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.iconContainer,
            item.isDestructive && styles.iconContainerDestructive,
          ]}
        >
          <item.icon
            size={20}
            color={item.isDestructive ? '#ef4444' : theme.primary}
          />
        </View>
        <View style={styles.menuItemContent}>
          <Text
            style={[
              styles.menuItemTitle,
              item.isDestructive && styles.menuItemTitleDestructive,
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: '#e2e8f0', true: theme.primary }}
            thumbColor={'#ffffff'}
          />
        ) : (
          <ChevronRight size={20} color="#94a3b8" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header do Perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color={theme.primary} />
            </View>
            {userProfile.verified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color="#ffffff" />
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <Text style={styles.profilePhone}>{userProfile.phone}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.totalRides}</Text>
            <Text style={styles.statLabel}>Corridas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.statValue}>{userProfile.rating}</Text>
            </View>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2023</Text>
            <Text style={styles.statLabel}>Membro desde</Text>
          </View>
        </View>

        {/* Menu de Opções */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuContainer}>
              {section.items.map(renderMenuItem)}
            </View>
          </View>
        ))}

        {/* Informações do App */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>MotoGo {packageJson.version}</Text>
          <Text style={styles.appInfoText}>© 2025 Studio 3 por 1</Text>
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
  profileHeader: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
    textAlign: 'center',
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  profilePhone: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 24,
    marginTop: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1e293b',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  menuSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerDestructive: {
    backgroundColor: '#fef2f2',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1e293b',
  },
  menuItemTitleDestructive: {
    color: '#ef4444',
  },
  menuItemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  menuItemRight: {
    marginLeft: 16,
  },
  appInfo: {
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
  },
  appInfoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
