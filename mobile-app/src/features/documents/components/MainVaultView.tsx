import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { VaultIllustration } from "./VaultIllustration";
import { styles } from "./MainVaultView.styles";
import type { CategoryInfo, DocumentItem } from "../types/documentTypes";

interface MainVaultViewProps {
  categories: (CategoryInfo & { icon: any; tint: string; tintBg: string; fileCount: number })[];
  onSelectCategory: (categoryId: string) => void;
}

export const MainVaultView: React.FC<MainVaultViewProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState("");

  const filteredCategories = categories.filter((c) =>
    query.trim() === ""
      ? true
      : c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 1. Header with Vault Illustration */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>My Documents</Text>
          <Text style={styles.headerSub}>Secure digital document vault</Text>
        </View>
        <VaultIllustration size={54} />
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={BrandColors.PRIMARY_BLUE} style={{ marginRight: 8 }} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search documents..."
          placeholderTextColor={BrandColors.TEXT_MUTED}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={8} style={{ padding: 4 }}>
            <Ionicons name="close-circle" size={17} color={BrandColors.TEXT_MUTED} />
          </TouchableOpacity>
        )}
        <View style={styles.searchDivider} />
        <TouchableOpacity style={{ padding: 4 }}>
          <Ionicons name="options-outline" size={19} color={BrandColors.PRIMARY_BLUE} />
        </TouchableOpacity>
      </View>

      {/* 3. Security AES-256 Card */}
      <View style={styles.securityCard}>
        <View style={styles.securityIconBox}>
          <Ionicons name="shield-checkmark" size={17} color={BrandColors.PRIMARY_ORANGE_DARK} />
        </View>
        <Text style={styles.securityText}>
          Your documents are securely stored with <Text style={styles.boldOrange}>AES-256</Text> encryption.
        </Text>
      </View>

      {/* 4. Storage Used Card */}
      <View style={styles.storageCard}>
        <View style={styles.rowBetween}>
          <View style={styles.rowAlign}>
            <Ionicons name="pie-chart-outline" size={16} color={BrandColors.PRIMARY_BLUE} />
            <Text style={styles.storageTitle}>Storage Used</Text>
          </View>
          <Text style={styles.storageNumbers}>
            <Text style={styles.boldNavy}>23.4 MB</Text>
            <Text style={styles.subText}> / 500 MB</Text>
          </Text>
        </View>
        <View style={styles.track}>
          <View style={styles.trackFill} />
        </View>
        <View style={styles.rowBetween}>
          <View style={styles.rowAlign}>
            <View style={styles.orangeDot} />
            <Text style={styles.usedStat}>4.68% used</Text>
          </View>
          <View style={styles.rowAlign}>
            <Ionicons name="server-outline" size={13} color={BrandColors.TEXT_SECONDARY} />
            <Text style={styles.availStat}>476.6 MB available</Text>
          </View>
        </View>
      </View>

      {/* 5. Document Categories Heading & Count */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Document Categories</Text>
        <View style={styles.categoriesCountBadge}>
          <Text style={styles.categoriesCountText}>{filteredCategories.length} categories</Text>
        </View>
      </View>

      {/* 6. List of Categories */}
      <View style={styles.cardsList}>
        {filteredCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.78}
            onPress={() => onSelectCategory(cat.id)}
            style={styles.categoryCard}
          >
            <View
              style={[
                styles.catIconWrap,
                { backgroundColor: cat.tintBg },
              ]}
            >
              <Ionicons name={cat.icon as any} size={22} color={cat.tint} />
            </View>

            <View style={styles.catInfo}>
              <Text style={styles.catTitle} numberOfLines={1}>{cat.name}</Text>
              <Text style={styles.catSub}>{cat.fileCount} files</Text>
            </View>

            <View style={styles.chevronWrap}>
              <Ionicons name="chevron-forward" size={17} color={BrandColors.PRIMARY_ORANGE} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
