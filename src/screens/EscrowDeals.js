import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const EscrowDeals = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    amount: '',
    description: '',
  });

  const DEALS = [
    {
      id: '1',
      title: 'Human Hair - Vietnamese',
      amount: '$500.00',
      status: 'In Progress',
      counterparty: 'Seller: HairHub',
      date: '24 Jan 2024',
      type: 'Active',
    },
    {
      id: '2',
      title: 'MacBook Pro 2022',
      amount: '$1,200.00',
      status: 'Pending Delivery',
      counterparty: 'Seller: TechWorld',
      date: '22 Jan 2024',
      type: 'Active',
    },
    {
      id: '3',
      title: 'iPhone 13 Case',
      amount: '$25.00',
      status: 'Completed',
      counterparty: 'Seller: MobileStyle',
      date: '15 Jan 2024',
      type: 'Completed',
    },
  ];

  const filteredDeals = DEALS.filter(deal => deal.type === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escrow Deals</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => setShowCreateModal(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#4285F4" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Active', 'Completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <View key={deal.id} style={styles.dealCard}>
              <View style={styles.dealHeader}>
                <View style={styles.dealIconContainer}>
                  <FontAwesome5 name="handshake" size={20} color="#4285F4" />
                </View>
                <View style={styles.dealInfo}>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealCounterparty}>{deal.counterparty}</Text>
                </View>
                <Text style={styles.dealAmount}>{deal.amount}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.dealFooter}>
                <View style={styles.statusBadge}>
                  <View style={[styles.statusDot, { backgroundColor: deal.type === 'Active' ? '#4CAF50' : '#9E9E9E' }]} />
                  <Text style={styles.statusText}>{deal.status}</Text>
                </View>
                <Text style={styles.dealDate}>{deal.date}</Text>
              </View>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color="#4285F4" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#CCC" />
            <Text style={styles.emptyStateText}>No {activeTab.toLowerCase()} deals found</Text>
          </View>
        )}
      </ScrollView>

      {/* Create Deal Bottom Sheet */}
      <Modal
        visible={showCreateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowCreateModal(false)}
        >
          <Pressable style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Create New Deal</Text>
                <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Deal Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. MacBook Pro Purchase"
                  value={newDeal.title}
                  onChangeText={(text) => setNewDeal({ ...newDeal, title: text })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Price ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={newDeal.amount}
                  onChangeText={(text) => setNewDeal({ ...newDeal, amount: text })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe the terms of the deal..."
                  multiline={true}
                  numberOfLines={4}
                  value={newDeal.description}
                  onChangeText={(text) => setNewDeal({ ...newDeal, description: text })}
                />
              </View>

              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => {
                  // Logic to create deal would go here
                  setShowCreateModal(false);
                }}
              >
                <Text style={styles.createButtonText}>Create & Generate Link</Text>
              </TouchableOpacity>
              
              <View style={{ height: 20 }} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  plusButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    marginRight: 30,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4285F4',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  dealCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  dealCounterparty: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  dealAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  dealDate: {
    fontSize: 12,
    color: '#999',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: 'bold',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15,
    maxHeight: '90%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  createButton: {
    backgroundColor: '#4285F4',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EscrowDeals;
