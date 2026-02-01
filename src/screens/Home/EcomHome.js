import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <View style={styles.productImageContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.bagIconContainer}>
        <Ionicons name="bag-handle" size={20} color="#999" />
      </View>
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={styles.ratingText}>{product.rating}</Text>
      </View>
      <Text style={styles.productPrice}>{product.price}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Ionicons name="cart-outline" size={18} color="white" />
        <Text style={styles.addToCartText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const EcomHome = ({ navigateTo }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'All', name: 'All', icon: 'grid-outline', color: '#F5F5F5' }]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({ id: 'All', name: 'All' });
  const [showFilter, setShowFilter] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchCategories(), fetchFeaturedProducts()]);
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://staging.paybillglobal.com/api/category/categories_list/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      
      const categoryIcons = {
        'fruits': { icon: 'leaf-outline', color: '#E8F5E9' },
        'laptops': { icon: 'laptop-outline', color: '#F3E5F5' },
        'clothes': { icon: 'shirt-outline', color: '#E1F5FE' },
        'Wigs': { icon: 'woman-outline', color: '#FFF3E0' }
      };

      const mappedCategories = data.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: categoryIcons[cat.name]?.icon || 'cube-outline',
        color: categoryIcons[cat.name]?.color || '#F5F5F5'
      }));

      setCategories([{ id: 'All', name: 'All', icon: 'grid-outline', color: '#F5F5F5' }, ...mappedCategories]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://staging.paybillglobal.com/api/products/products_list/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      
      const mappedProducts = (data.results || data || []).map((item) => ({
        id: item.id.toString(),
        title: item.name || item.title || 'Product',
        price: `$${item.price || '0.00'}`,
        rating: item.rating || '0.0',
        image: item.image || item.thumbnail || 'https://images.unsplash.com/photo-1595475243692-392881ca1031?q=80&w=200&auto=format&fit=crop',
        categoryId: item.category_id || item.category?.id || item.category, // Handle various possible structures
      }));
      
      setAllProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, allProducts]);

  const filterProducts = () => {
    let filtered = allProducts;

    if (selectedCategory && selectedCategory.id !== 'All') {
      filtered = filtered.filter(product => {
        // Match by ID if both are available, otherwise fall back to name matching
        if (product.categoryId && selectedCategory.id) {
          return String(product.categoryId) === String(selectedCategory.id);
        }
        const categoryName = typeof product.category === 'string' ? product.category : String(product.category || '');
        const selectedCatName = typeof selectedCategory.name === 'string' ? selectedCategory.name : String(selectedCategory.name || '');
        return categoryName.toLowerCase() === selectedCatName.toLowerCase();
      });
    }

    if (searchQuery && typeof searchQuery === 'string') {
      filtered = filtered.filter(product => {
        const title = typeof product.title === 'string' ? product.title : String(product.title || '');
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="paper-plane" size={18} color="white" />
          </View>
          <Text style={styles.logoText}>PayBill</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="black" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigateTo('Profile')}>
            <View style={styles.profilePlaceholder}>
              <Ionicons name="person" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Grid */}
      <View style={styles.actionGrid}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#27AE60' }]}
          onPress={() => navigateTo('SendMoney')}
        >
          <Feather name="arrow-up" size={24} color="white" />
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4285F4' }]}
          onPress={() => setShowEscrowModal(true)}
        >
          <MaterialIcons name="attach-money" size={24} color="white" />
          <Text style={styles.actionText}>Escrow Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4285F4' }]}>
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.actionText}>Marketplace</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4285F4' }]}
          onPress={() => navigateTo('Chat')}
        >
          <Ionicons name="chatbox-outline" size={24} color="white" />
          <Text style={styles.actionText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4285F4' }]}
          onPress={() => navigateTo('Wallet')}
        >
          <MaterialIcons name="account-balance-wallet" size={24} color="white" />
          <Text style={styles.actionText}>Wallet Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
          onPress={() => navigateTo('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Promo Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Find what you need, Fast</Text>
          <Text style={styles.bannerSubtitle}>Buy from trusted sellers. Pay safely through escrow</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerImageContainer}>
           <Image 
                source={{ uri: 'https://img.freepik.com/free-vector/shopping-bag-with-smartphone-design_24877-50854.jpg' }} 
                style={styles.bannerImage}
                resizeMode="contain"
            />
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilter(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowFilter(false)}
        >
          <Pressable style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Category</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesGrid}>
              {categories.map((cat, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryItemModal}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setShowFilter(false);
                  }}
                >
                  <View style={[
                    styles.categoryIconWrapperModal, 
                    { backgroundColor: selectedCategory?.id === cat.id ? '#553B9C' : cat.color }
                  ]}>
                     <Ionicons 
                       name={cat.icon} 
                       size={24} 
                       color={selectedCategory?.id === cat.id ? 'white' : '#553B9C'} 
                     />
                  </View>
                  <Text style={[
                    styles.categoryTextModal,
                    { fontWeight: selectedCategory?.id === cat.id ? 'bold' : 'normal', color: selectedCategory?.id === cat.id ? '#553B9C' : '#333' }
                  ]}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSelectedCategory(categories[0]); // Reset to 'All'
                setSearchQuery('');
                setShowFilter(false);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Escrow Deals Bottom Sheet */}
      <Modal
        visible={showEscrowModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEscrowModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowEscrowModal(false)}
        >
          <Pressable style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Escrow Deals</Text>
                <TouchableOpacity onPress={() => setShowEscrowModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Create New Deal</Text>
              
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
                  style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
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
                  setShowEscrowModal(false);
                  // Logic to create deal
                }}
              >
                <Text style={styles.createButtonText}>Create & Generate Link</Text>
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity 
                style={styles.viewDealsButton}
                onPress={() => {
                  setShowEscrowModal(false);
                  navigateTo('EscrowDeals');
                }}
              >
                <Ionicons name="list" size={20} color="#4285F4" />
                <Text style={styles.viewDealsButtonText}>View My Deals</Text>
              </TouchableOpacity>
              
              <View style={{ height: 20 }} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Featured Products */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>
          {(!selectedCategory || selectedCategory.id === 'All') ? 'Featured Products' : `${selectedCategory.name} Products`}
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1A237E" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.productsGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={() => navigateTo('ProductDetails', product)}
                />
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={50} color="#CCC" />
                <Text style={styles.noResultsText}>No products found</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      {/* Spacer for bottom nav */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  profilePlaceholder: {
    backgroundColor: '#D1C4E9',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: 'black',
  },
  searchIcon: {
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: '#1A237E',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#4DD0E1', // Cyan gradient placeholder
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    height: 180,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 12,
    marginBottom: 15,
    opacity: 0.9,
  },
  shopNowButton: {
    backgroundColor: '#00E5FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bannerImageContainer: {
    width: 100,
    height: 100,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 15,
    marginBottom: 25,
  },
  categoryItemModal: {
    width: (width - 70) / 3, // 3 items per row
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIconWrapperModal: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryTextModal: {
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResults: {
    flex: 1,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  productsSection: {
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImageContainer: {
    height: 150,
    backgroundColor: '#F5F5F5',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  bagIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 5,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#1A237E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 20,
  },
  viewDealsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  viewDealsButtonText: {
    color: '#4285F4',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default EcomHome;
