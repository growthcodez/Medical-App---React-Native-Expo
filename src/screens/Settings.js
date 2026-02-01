import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ onBack, navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.replace("Login");
            } catch (error) {
              console.log("Logout failed:", error);
              await AsyncStorage.clear();
              navigation.replace("Login");
            }
          }
        }
      ]
    );
  };

  const SETTINGS_OPTIONS = [
    {
      title: 'Account Settings',
      items: [
        { id: '1', name: 'Profile Information', icon: 'person-outline', color: '#4285F4' },
        { id: '2', name: 'Security & Password', icon: 'shield-checkmark-outline', color: '#34A853' },
        { id: '3', name: 'Identity Verification', icon: 'id-card-outline', color: '#FBBC05' },
      ],
    },
    {
      title: 'Payment & Limits',
      items: [
        { id: '4', name: 'Linked Bank Accounts', icon: 'business-outline', color: '#EA4335' },
        { id: '5', name: 'Transaction Limits', icon: 'speedometer-outline', color: '#673AB7' },
      ],
    },
    {
      title: 'General',
      items: [
        { id: '6', name: 'Notifications', icon: 'notifications-outline', color: '#FF9800' },
        { id: '7', name: 'Help & Support', icon: 'help-circle-outline', color: '#00BCD4' },
        { id: '8', name: 'Privacy Policy', icon: 'document-text-outline', color: '#607D8B' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=paybill' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Zencoder User</Text>
            <Text style={styles.profileEmail}>user@example.com</Text>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color="#4285F4" />
              <Text style={styles.verifiedText}>Verified Account</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={20} color="#4285F4" />
          </TouchableOpacity>
        </View>

        {/* Settings Groups */}
        {SETTINGS_OPTIONS.map((group, index) => (
          <View key={index} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.itemRow}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#CCC" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#EA4335" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4285F4',
    marginLeft: 4,
    fontWeight: '500',
  },
  editButton: {
    padding: 10,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginLeft: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  groupItems: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  logoutText: {
    fontSize: 16,
    color: '#EA4335',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 20,
  },
});

export default Settings;
