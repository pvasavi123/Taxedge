import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { ServiceHeader } from "../../../shared/components/ServiceHeader";
import { ServiceList } from "../../../shared/components/ServiceList";
import { loansService } from "../services/LoansService";
import { LoanServiceItem } from "../types/loans.types";
import { styles } from "./LoansScreen.styles";

export const LoansScreen: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<LoanServiceItem[]>([]);

  useEffect(() => {
    loansService.fetchLoanServices().then(setServices);
  }, []);

  const handleCardPress = (item: LoanServiceItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <View style={styles.container}>
      <ServiceHeader
        title="Loan Services"
        subtitle="Choose from a wide range of loan options tailored for your needs."
        tag="Capital & Financing"
        iconName="wallet"
      />
      <ServiceList items={services} onItemPress={handleCardPress} />
    </View>
  );
};

export default LoansScreen;
