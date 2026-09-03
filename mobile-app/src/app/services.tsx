import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../hooks/use-theme";
import { BrandColors } from "../shared/theme";
import { SERVICES, CATEGORIES } from "../data/services";
import { ScreenLayout } from "../components/ScreenLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../styles/app/services.styles";

export default function ServicesScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ selectedCategory?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Handle deep-link redirection from home dashboard carousel
  useEffect(() => {
    if (params.selectedCategory) {
      setActiveCategory(params.selectedCategory);
    }
  }, [params.selectedCategory]);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      activeCategory === "ALL" || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScreenLayout title="TaxEdge Services">

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search services (e.g. GST, Loan, OPC...)"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />

          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Category Pills Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveCategory("ALL")}
            style={[
              styles.pillBtn,
              {
                backgroundColor:
                  activeCategory === "ALL"
                    ? colors.primary
                    : colors.backgroundElement,
                borderColor:
                  activeCategory === "ALL" ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.pillText,
                { color: activeCategory === "ALL" ? BrandColors.WHITE : colors.text },
              ]}
            >
              All Services
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.pillBtn,
                {
                  backgroundColor:
                    activeCategory === cat.id
                      ? colors.primary
                      : colors.backgroundElement,
                  borderColor:
                    activeCategory === cat.id ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  {
                    color:
                      activeCategory === cat.id ? BrandColors.WHITE : colors.text,
                  },
                ]}
              >
                {cat.name.split(" ")[0]}{" "}
                {/* display first word like GST, ITR, Loans */}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          // Pushed screen, not a tab: no floating bar to clear, just the inset.
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No services found
            </Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              Try search queries like GST, ITR or Company
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/service/${item.id}`)}
            style={[
              styles.serviceCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconBg, { backgroundColor: colors.orangeLight }]}
              >
                <Ionicons name={item.icon} size={24} color={colors.orange} />
              </View>
              <View style={styles.headerInfo}>
                <Text style={[styles.serviceName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.catBadge,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text
                    style={[styles.catBadgeText, { color: colors.primary }]}
                  >
                    {item.category}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={[styles.serviceDesc, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item.description}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.docsCountContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[
                    styles.docsCountText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.requiredDocs.length} Documents Required
                </Text>
              </View>

              <View style={styles.actionBtn}>
                <Text style={[styles.actionBtnText, { color: colors.primary }]}>
                  Apply
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScreenLayout>
  );
}

