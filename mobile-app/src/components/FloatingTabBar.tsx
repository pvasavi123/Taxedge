import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Href } from "expo-router";
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "expo-router/js-tabs";

import type { IconName } from "../types/domain";

export const FLOATING_TAB_HEIGHT = 60;
export const FLOATING_TAB_GAP = 12;

const BAR_BG = "#1E3A5F"; // Royal Navy Blue capsule background
const ACTIVE_PILL_BG = "#FFFFFF"; // Clean white active pill
const ACTIVE_ICON_COLOR = "#FF5722"; // Vibrant Orange icon when clicked/active
const INACTIVE_ICON_COLOR = "#FFFFFF"; // Crisp white icon on blue background

const HIDDEN_FROM_BAR = new Set(["gst"]);

export interface TabMeta {
  label: string;
  icon: IconName;
  iconOutline: IconName;
}

const FALLBACK_META: TabMeta = {
  label: "Tab",
  icon: "ellipse",
  iconOutline: "ellipse-outline",
};

function metaFor(routeName: string): TabMeta {
  return (
    TAB_META[routeName] ??
    TAB_META[routeName.replace(/\/index$/, "")] ??
    TAB_META[routeName.split("/")[0]] ??
    FALLBACK_META
  );
}

const TAB_META: Record<string, TabMeta> = {
  home: { label: "Home", icon: "home", iconOutline: "home-outline" },
  applications: { label: "Applications", icon: "grid", iconOutline: "grid-outline" },
  documents: { label: "Documents", icon: "document-text", iconOutline: "document-text-outline" },
  payments: { label: "Payments", icon: "card", iconOutline: "card-outline" },
  profile: { label: "Profile", icon: "person", iconOutline: "person-outline" },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SPRING = { damping: 18, stiffness: 200, mass: 0.6 };

type TabRoute = BottomTabBarProps["state"]["routes"][number];

interface TabItemProps {
  route: TabRoute;
  isFocused: boolean;
  label: string;
  meta: TabMeta;
  onPress: () => void;
  onLongPress: () => void;
}

function TabItem({
  route,
  isFocused,
  label,
  meta,
  onPress,
  onLongPress,
}: TabItemProps) {
  const pressed = useSharedValue(0);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1 - pressed.value * 0.08, SPRING) }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      testID={`tab-${route.name}`}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      style={[styles.tabItem, pressStyle]}
    >
      {isFocused ? (
        <View style={styles.activePill}>
          <Ionicons
            name={meta.icon}
            size={23}
            color={ACTIVE_ICON_COLOR}
          />
        </View>
      ) : (
        <View style={styles.inactivePill}>
          <Ionicons
            name={meta.iconOutline}
            size={23}
            color={INACTIVE_ICON_COLOR}
          />
        </View>
      )}
    </AnimatedPressable>
  );
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.floatingWrapper,
        {
          bottom: Math.max(insets.bottom, 10),
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.capsuleContainer}>
        {state.routes.map((route, index) => {
          // Skip routes with null href, hidden routes, and any style files or undeclared routes
          if (
            route.name.includes("styles") ||
            route.name.endsWith(".styles") ||
            HIDDEN_FROM_BAR.has(route.name.split("/")[0]) ||
            (!TAB_META[route.name] && !TAB_META[route.name.split("/")[0]])
          ) {
            return null;
          }

          const options = descriptors[route.key].options as
            BottomTabNavigationOptions & { href?: Href | null };

          if (options.href === null) return null;

          const meta = metaFor(route.name);
          const isFocused = state.index === index;
          const label = meta.label ?? options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              meta={meta}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    left: 12,
    right: 12,
    zIndex: 100,
    elevation: 20,
    alignItems: "center",
  },
  capsuleContainer: {
    width: "100%",
    height: FLOATING_TAB_HEIGHT,
    backgroundColor: BAR_BG,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 4,
    shadowColor: "#0A192F",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 14,
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activePill: {
    backgroundColor: ACTIVE_PILL_BG,
    width: "92%",
    maxWidth: 62,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  inactivePill: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
