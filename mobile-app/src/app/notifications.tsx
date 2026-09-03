import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../hooks/use-theme";
import { Spacing } from "../shared/theme";
import { useNotificationStore } from "../store/notificationStore";
import { AppHeader } from "../components/AppHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../styles/app/notifications.styles";
import type { IconName, NotificationType } from "../types/domain";

export default function NotificationsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { notifications, markAllAsRead } = useNotificationStore();

  // Automatically mark all notifications as read when the screen is opened
  useEffect(() => {
    markAllAsRead();
  }, []);

  const getIcon = (
    type: NotificationType,
  ): { name: IconName; color: string } => {
    switch (type) {
      case "gst":
        return { name: "receipt-outline", color: colors.primary };
      case "itr":
        return { name: "cash-outline", color: colors.primaryDark };
      case "loans":
        return { name: "business-outline", color: colors.orange };
      case "insurance":
        return { name: "shield-checkmark-outline", color: colors.success };
      case "payment":
        return { name: "card-outline", color: colors.success };
      case "document":
        return { name: "document-text-outline", color: colors.error };
      default:
        return { name: "notifications-outline", color: colors.textSecondary };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Notifications" showBack showNotification={false} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No notifications
            </Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              You are all caught up!
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const icon = getIcon(item.type);
          return (
            <View
              style={[
                styles.notifCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBg,
                  { backgroundColor: colors.backgroundSelected },
                ]}
              >
                <Ionicons name={icon.name} size={20} color={icon.color} />
              </View>
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={[styles.notifTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.notifTime,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.timestamp}
                  </Text>
                </View>
                <Text
                  style={[styles.notifBody, { color: colors.textSecondary }]}
                >
                  {item.body}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
