import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

const Wallet = () => {
  const [isSellEnabled, setIsSellEnabled] = useState(false);
  const toggleSwitch = () => setIsSellEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="paper-plane" size={18} color="white" />
            </View>
            <Text style={styles.logoText}>PayBill</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.sellToggleContainer}>
              <Text style={styles.sellText}>Sell</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#1A237E" }}
                thumbColor={isSellEnabled ? "#fff" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isSellEnabled}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabText}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Escrow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Deposit</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <TouchableOpacity style={styles.currencySelector}>
            <Text style={styles.currencyText}>USD</Text>
            <Ionicons name="chevron-down" size={16} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$0.00</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.escrowRow}>
            <View>
              <Text style={styles.escrowLabel}>In Escrow</Text>
              <Text style={styles.escrowAmount}>1000.0</Text>
            </View>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <View style={[styles.arrowCircle, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="arrow-down" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.statsLabel}>This Month</Text>
            </View>
            <Text style={styles.statsValue}>0.00</Text>
          </View>
          
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <View style={[styles.arrowCircle, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="arrow-down" size={20} color="#2196F3" />
              </View>
              <Text style={styles.statsLabel}>Withdrawn</Text>
            </View>
            <Text style={styles.statsValue}>0.00</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No recent transactions.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: '#4285F4',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
  sellToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 2,
    height: 36,
  },
  sellText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 90,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#002244',
    borderColor: '#002244',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  balanceCard: {
    backgroundColor: '#002244',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  currencyText: {
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  escrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  escrowLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  escrowAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  withdrawText: {
    color: '#002244',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyStateContainer: {
    marginTop: 10,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Wallet;
