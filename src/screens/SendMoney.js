import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as RNLocalize from 'react-native-localize';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AFRICAN_COUNTRIES = [
  { name: "Benin", iso: "BJ", flag: "https://flagcdn.com/w320/bj.png", currency: "XOF", code: "+229", rate: 600 },
  { name: "Burkina Faso", iso: "BF", flag: "https://flagcdn.com/w320/bf.png", currency: "XOF", code: "+226", rate: 600 },
  { name: "Burundi", iso: "BI", flag: "https://flagcdn.com/w320/bi.png", currency: "BIF", code: "+257", rate: 2850 },
  { name: "Central African Republic", iso: "CF", flag: "https://flagcdn.com/w320/cf.png", currency: "XAF", code: "+236", rate: 600 },
  { name: "Cameroon", iso: "CM", flag: "https://flagcdn.com/w320/cm.png", currency: "XAF", code: "+237", rate: 600 },
  { name: "Cape Verde", iso: "CV", flag: "https://flagcdn.com/w320/cv.png", currency: "CVE", code: "+238", rate: 100 },
  { name: "Chad", iso: "TD", flag: "https://flagcdn.com/w320/td.png", currency: "XAF", code: "+235", rate: 600 },
  { name: "Congo", iso: "CG", flag: "https://flagcdn.com/w320/cg.png", currency: "XAF", code: "+242", rate: 600 },
  { name: "D.R. Congo", iso: "CD", flag: "https://flagcdn.com/w320/cd.png", currency: "CDF", code: "+243", rate: 2800 },
  { name: "Equatorial Guinea", iso: "GQ", flag: "https://flagcdn.com/w320/gq.png", currency: "XAF", code: "+240", rate: 600 },
  { name: "Gabon", iso: "GA", flag: "https://flagcdn.com/w320/ga.png", currency: "XAF", code: "+241", rate: 600 },
  { name: "Ghana", iso: "GH", flag: "https://flagcdn.com/w320/gh.png", currency: "GHS", code: "+233", rate: 14 },
  { name: "Guinea Conakry", iso: "GN", flag: "https://flagcdn.com/w320/gn.png", currency: "GNF", code: "+224", rate: 8600 },
  { name: "Guinea-Bissau", iso: "GW", flag: "https://flagcdn.com/w320/gw.png", currency: "XOF", code: "+245", rate: 600 },
  { name: "Kenya", iso: "KE", flag: "https://flagcdn.com/w320/ke.png", currency: "KES", code: "+254", rate: 130 },
  { name: "Liberia", iso: "LR", flag: "https://flagcdn.com/w320/lr.png", currency: "LRD", code: "+231", rate: 190 },
  { name: "Malawi", iso: "MW", flag: "https://flagcdn.com/w320/mw.png", currency: "MWK", code: "+265", rate: 1700 },
  { name: "Mali", iso: "ML", flag: "https://flagcdn.com/w320/ml.png", currency: "XOF", code: "+223", rate: 600 },
  { name: "Mozambique", iso: "MZ", flag: "https://flagcdn.com/w320/mz.png", currency: "MZN", code: "+258", rate: 64 },
  { name: "Niger", iso: "NE", flag: "https://flagcdn.com/w320/ne.png", currency: "XOF", code: "+227", rate: 600 },
  { name: "Nigeria", iso: "NG", flag: "https://flagcdn.com/w320/ng.png", currency: "NGN", code: "+234", rate: 1500 },
  { name: "Rwanda", iso: "RW", flag: "https://flagcdn.com/w320/rw.png", currency: "RWF", code: "+250", rate: 1300 },
  { name: "Sao Tome & Principe", iso: "ST", flag: "https://flagcdn.com/w320/st.png", currency: "STN", code: "+239", rate: 23 },
  { name: "Senegal", iso: "SN", flag: "https://flagcdn.com/w320/sn.png", currency: "XOF", code: "+221", rate: 600 },
  { name: "Sierra Leone", iso: "SL", flag: "https://flagcdn.com/w320/sl.png", currency: "SLL", code: "+232", rate: 22000 },
  { name: "South Sudan", iso: "SS", flag: "https://flagcdn.com/w320/ss.png", currency: "SSP", code: "+211", rate: 1000 },
  { name: "Tanzania", iso: "TZ", flag: "https://flagcdn.com/w320/tz.png", currency: "TZS", code: "+255", rate: 2600 },
  { name: "The Gambia", iso: "GM", flag: "https://flagcdn.com/w320/gm.png", currency: "GMD", code: "+220", rate: 67 },
  { name: "Togo", iso: "TG", flag: "https://flagcdn.com/w320/tg.png", currency: "XOF", code: "+228", rate: 600 },
  { name: "Uganda", iso: "UG", flag: "https://flagcdn.com/w320/ug.png", currency: "UGX", code: "+256", rate: 3800 },
  { name: "Zambia", iso: "ZM", flag: "https://flagcdn.com/w320/zm.png", currency: "ZMW", code: "+260", rate: 25 },
  { name: "Zimbabwe", iso: "ZW", flag: "https://flagcdn.com/w320/zw.png", currency: "ZWL", code: "+263", rate: 30000 }
];

const PAYMENT_METHODS = [
  { 
    method: "Mobile Money", 
    description: "M-PESA, Airtel Money, MTN Mobile Money.",
    code: "MOBILE_MONEY",
    icon: "phone-portrait-outline"
  },
  { 
    method: "Debit Card Deposit", 
    description: "Debit Card Deposit",
    code: "CARDS",
    icon: "card-outline"
  },
  { 
    method: "Bank Deposit", 
    description: "Direct bank transfer.",
    code: "BANK_DEPOSIT",
    icon: "business-outline"
  },
  { 
    method: "Cash Pickup", 
    description: "Pick up cash at designated partner locations.",
    code: "CASH_PICKUP",
    icon: "walk-outline"
  },
];


const SendMoney = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [amount, setAmount] = useState('');
  const [senderCurrency] = useState(RNLocalize.getCurrencies()[0] || 'USD');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    accountName: '',
    accountNumber: '',
  });

  const transactionFeeRate = 0.02;

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select recipient country</Text>
      <ScrollView style={styles.countryList} showsVerticalScrollIndicator={false}>
        {AFRICAN_COUNTRIES.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.countryItem,
              selectedCountry?.name === item.name && styles.selectedCountryItem
            ]}
            onPress={() => {
              setSelectedCountry(item);
              handleNext();
            }}
          >
            <Image source={{ uri: item.flag }} style={styles.countryFlagList} />
            <View style={styles.countryInfo}>
              <Text style={styles.countryName}>{item.name}</Text>
              <Text style={styles.countryCurrency}>{item.currency}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStep2 = () => {
    const fee = amount ? parseFloat(amount) * transactionFeeRate : 0;
    const receiveAmount = amount ? (parseFloat(amount) * selectedCountry.rate).toFixed(2) : '0.00';

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Enter amount to send</Text>
        <View style={styles.amountCard}>
          <View style={styles.amountInputHeader}>
            <Text style={styles.currencyLabel}>YOU SEND</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.methodInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#999"
                autoFocus
              />
             
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyCode}>{senderCurrency}</Text>
              </View>
            </View>
          </View>

          <View style={styles.conversionArrow}>
            <Ionicons name="arrow-down-circle" size={32} color="#4285F4" />
          </View>

          <View style={styles.amountInputHeader}>
            <Text style={styles.currencyLabel}>THEY RECEIVE</Text>
            <View style={styles.amountInputContainer}>
              <Text style={[styles.amountInputText, { color: '#4CAF50' }]}>{receiveAmount}</Text>
              <View style={[styles.currencyBadge, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.currencyCode}>{selectedCountry.currency}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.rateInfoContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Exchange Rate</Text>
              <Text style={styles.summaryValue}>1 {senderCurrency} = {selectedCountry.rate} {selectedCountry.currency}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Transaction Fee (2%)</Text>
              <Text style={styles.summaryValue}>{fee.toFixed(2)} {senderCurrency}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !amount && styles.disabledButton]}
          onPress={handleNext}
          disabled={!amount}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose payment method</Text>
      
      {PAYMENT_METHODS.map((method) => {
        const isSelected = paymentMethod === method.method;
        const isDisabled = method.code === 'BANK_DEPOSIT' || method.code === 'CASH_PICKUP';

        return (
          <View key={method.code}>
            <TouchableOpacity 
              style={[
                styles.methodCard, 
                isSelected && styles.selectedMethod,
                isDisabled && styles.disabledMethod
              ]}
              onPress={() => !isDisabled && setPaymentMethod(method.method)}
              disabled={isDisabled}
            >
              <Ionicons name={method.icon} size={24} color={isDisabled ? "#999" : "#4285F4"} />
              <View style={styles.methodInfo}>
                <Text style={[styles.methodName, isDisabled && {color: '#999'}]}>{method.method}</Text>
                <Text style={styles.methodDesc}>{method.description}{isDisabled ? ' (Disabled)' : ''}</Text>
              </View>
              {!isDisabled && (
                <Ionicons name={isSelected ? "radio-button-on" : "radio-button-off"} size={20} color="#4285F4" />
              )}
            </TouchableOpacity>

            {isSelected && method.code === 'MOBILE_MONEY' && (
              <View style={styles.methodInputArea}>
                <Text style={styles.inputLabel}>Receiver Phone Number</Text>
                <TextInput
                  style={styles.methodInput}
                  placeholder={selectedCountry ? `${selectedCountry.code} ...` : "+..."}
                  value={paymentDetails.phoneNumber}
                  onChangeText={(text) => setPaymentDetails({...paymentDetails, phoneNumber: text})}
                  keyboardType="phone-pad"
                />
              </View>
            )}

            {isSelected && method.code === 'CARDS' && (
              <View style={styles.methodInputArea}>
                <Text style={styles.inputLabel}>Account Name</Text>
                <TextInput
                  style={styles.methodInput}
                  placeholder="John Doe"
                  value={paymentDetails.accountName}
                  onChangeText={(text) => setPaymentDetails({...paymentDetails, accountName: text})}
                />
                <Text style={[styles.inputLabel, {marginTop: 10}]}>Account Number</Text>
                <TextInput
                  style={styles.methodInput}
                  placeholder="1234567890"
                  value={paymentDetails.accountNumber}
                  onChangeText={(text) => setPaymentDetails({...paymentDetails, accountNumber: text})}
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={[styles.nextButton, (!paymentMethod || (paymentMethod === 'Mobile Money' && !paymentDetails.phoneNumber) || (paymentMethod === 'Debit Card Deposit' && (!paymentDetails.accountName || !paymentDetails.accountNumber))) && styles.disabledButton, {marginTop: 10}]}
        onPress={handleNext}
        disabled={!paymentMethod || (paymentMethod === 'Mobile Money' && !paymentDetails.phoneNumber) || (paymentMethod === 'Debit Card Deposit' && (!paymentDetails.accountName || !paymentDetails.accountNumber))}
      >
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => {
    const fee = parseFloat(amount) * transactionFeeRate;
    const totalToPay = parseFloat(amount) + fee;
    const receiveAmount = (parseFloat(amount) * selectedCountry.rate).toFixed(2);

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Transaction Overview</Text>
        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Sending to</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{ uri: selectedCountry.flag }} style={{width: 24, height: 16, borderRadius: 2, marginRight: 8}} />
              <Text style={styles.overviewValue}>{selectedCountry.name}</Text>
            </View>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Payment Method</Text>
            <Text style={styles.overviewValue}>{paymentMethod}</Text>
          </View>
          {paymentMethod === 'Mobile Money' ? (
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Phone Number</Text>
              <Text style={styles.overviewValue}>{paymentDetails.phoneNumber}</Text>
            </View>
          ) : (
            <>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Account Name</Text>
                <Text style={styles.overviewValue}>{paymentDetails.accountName}</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Account Number</Text>
                <Text style={styles.overviewValue}>{paymentDetails.accountNumber}</Text>
              </View>
            </>
          )}
          <View style={styles.divider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>You send</Text>
            <Text style={styles.overviewValue}>{amount} {senderCurrency}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Fee (2%)</Text>
            <Text style={styles.overviewValue}>{fee.toFixed(2)} {senderCurrency}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Total to pay</Text>
            <Text style={[styles.overviewValue, {fontWeight: 'bold', color: '#1A237E'}]}>{totalToPay.toFixed(2)} {senderCurrency}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Receiver gets</Text>
            <Text style={[styles.overviewValue, {fontSize: 18, color: '#4CAF50', fontWeight: 'bold'}]}>{receiveAmount} {selectedCountry.currency}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleNext}>
          <Text style={styles.sendButtonText}>Send Money Now</Text>
          <Ionicons name="paper-plane" size={20} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSuccess = () => (
    <View style={[styles.stepContainer, {alignItems: 'center', justifyContent: 'center', flex: 1}]}>
      <View style={styles.successIconContainer}>
        <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
      </View>
      <Text style={styles.successTitle}>Transfer Successful!</Text>
      <Text style={styles.successMessage}>
        Your money is on its way to {selectedCountry.name}. It should arrive shortly.
      </Text>
      <TouchableOpacity style={styles.doneButton} onPress={onBack}>
        <Text style={styles.doneButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderSuccess();
      default: return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money {currentStep < 5 && `(${currentStep}/4)`}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    flexGrow: 1,
    width: '100%',
  },
  stepContainer: {
    padding: 20,
    width: '100%',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  countryList: {
    marginBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedCountryItem: {
    borderColor: '#4285F4',
    backgroundColor: '#E8F0FE',
  },
  countryFlagList: {
    width: 45,
    height: 30,
    borderRadius: 4,
    marginRight: 15,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  countryCurrency: {
    fontSize: 12,
    color: '#666',
  },
  amountCard: {
    backgroundColor: '#F8F9FF',
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: '#E0E4FF',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    width: '100%',
    alignSelf: 'stretch',
  },
  amountInputHeader: {
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 70,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  amountInputText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    flex: 1,
  },
  conversionArrow: {
    alignItems: 'center',
    marginVertical: -15,
    zIndex: 1,
  },
  rateInfoContainer: {
    marginTop: 5,
  },
  currencyLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 5,
  },
  currencyBadge: {
    backgroundColor: '#1A237E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  currencyCode: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E4FF',
    marginVertical: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#666',
    fontSize: 14,
  },
  summaryValue: {
    fontWeight: '500',
    color: '#333',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#4285F4',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F9FF',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedMethod: {
    borderColor: '#4285F4',
    backgroundColor: '#E8F0FE',
  },
  disabledMethod: {
    opacity: 0.6,
    backgroundColor: '#F5F5F5',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 15,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  methodDesc: {
    fontSize: 12,
    color: '#666',
  },
  methodInputArea: {
    padding: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8F0FE',
    borderRadius: 15,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  methodInput: {
    backgroundColor: '#F5F5F5',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  overviewCard: {
    backgroundColor: '#F8F9FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E4FF',
    width: '100%',
  },
  overviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewLabel: {
    color: '#666',
    fontSize: 14,
  },
  overviewValue: {
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#4285F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  doneButton: {
    backgroundColor: '#1A237E',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default SendMoney;
