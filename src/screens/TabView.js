import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Home from "./Home/EcomHome";
import Wallet from "./Wallet";
import Orders from "./Orders";
import Chat from "./Chat";
import SendMoney from "./SendMoney";
import EscrowDeals from "./EscrowDeals";
import Settings from "./Settings";
import Profile from "./Profile";
import ProductDetails from "./ProductDetails";
import { Ionicons } from "@expo/vector-icons";
import color from "../constant/color";

const TabView = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home navigateTo={(screen, params) => {
          if (screen === 'ProductDetails') {
            setSelectedProduct(params);
          }
          setActiveTab(screen);
        }} />;
      case "Wallet":
        return <Wallet />;
      case "Orders":
        return <Orders />;
      case "Chat":
        return <Chat />;
      case "SendMoney":
        return <SendMoney onBack={() => setActiveTab("Home")} />;
      case "EscrowDeals":
        return <EscrowDeals onBack={() => setActiveTab("Home")} />;
      case "Settings":
        return <Settings onBack={() => setActiveTab("Home")} navigation={navigation} />;
      case "Profile":
        return <Profile onBack={() => setActiveTab("Home")} navigation={navigation} />;
      case "ProductDetails":
        return <ProductDetails product={selectedProduct} onBack={() => setActiveTab("Home")} />;
      default:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>{activeTab} Screen</Text>
          </View>
        );
    }
  };

  const showTabBar = ["Home", "Wallet", "Orders", "Chat", "Profile"].includes(activeTab);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={color.white} />
      {renderContent()}

      {showTabBar && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => handleTabChange("Home")} style={styles.tabItem}>
              <Ionicons name="home" size={24} color={activeTab === "Home" ? "#4285F4" : "#999"} />
              <Text style={[styles.tabText, { color: activeTab === "Home" ? "#4285F4" : "#999" }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange("Orders")} style={styles.tabItem}>
              <Ionicons name="receipt-outline" size={24} color={activeTab === "Orders" ? "#4285F4" : "#999"} />
              <Text style={[styles.tabText, { color: activeTab === "Orders" ? "#4285F4" : "#999" }]}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange("Chat")} style={styles.tabItem}>
              <Ionicons name="chatbubble-outline" size={24} color={activeTab === "Chat" ? "#4285F4" : "#999"} />
              <Text style={[styles.tabText, { color: activeTab === "Chat" ? "#4285F4" : "#999" }]}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange("Wallet")} style={styles.tabItem}>
              <Ionicons name="wallet-outline" size={24} color={activeTab === "Wallet" ? "#4285F4" : "#999"} />
              <Text style={[styles.tabText, { color: activeTab === "Wallet" ? "#4285F4" : "#999" }]}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange("Profile")} style={styles.tabItem}>
              <Ionicons name="person-outline" size={24} color={activeTab === "Profile" ? "#4285F4" : "#999"} />
              <Text style={[styles.tabText, { color: activeTab === "Profile" ? "#4285F4" : "#999" }]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TabView;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 4,
    height: Platform.OS === "ios" ? 80 : 70,
    backgroundColor: "#fff",

    paddingBottom: Platform.OS === "ios" ? 17 : 5,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 1,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});
