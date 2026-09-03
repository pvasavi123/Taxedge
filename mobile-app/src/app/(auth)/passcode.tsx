import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Colors, BorderWidth, Spacing } from "../../shared/theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";
import { styles } from "../../styles/app/(auth)/passcode.styles";

const HEADER_OFFSET = Spacing.md;
const FOOTER_OFFSET = Spacing.base;
const MIN_SCROLL_PADDING = Spacing.xl + Spacing.xs;

export default function PasscodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber, loginWithPasscode } = useAuthStore();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const phone = mobileNumber ? `+91 ${mobileNumber.slice(0, 5)} ${mobileNumber.slice(5)}` : "+91 XXXXX XXXXX";

  const handleLoginPress = async () => {
    if (passcode.length !== 6) {
      setError("Please enter your 6-digit passcode");
      inputRef.current?.focus();
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await loginWithPasscode(passcode);
      setLoading(false);

      if (res.success) {
        router.replace("/(main)/home" as any);
      } else {
        setError(res.error || "Incorrect passcode. Please try again.");
        setPasscode("");
        inputRef.current?.focus();
      }
    } catch (err) {
      setLoading(false);
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
      inputRef.current?.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, { backgroundColor: BrandColors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: Math.max(insets.top + HEADER_OFFSET, MIN_SCROLL_PADDING), paddingBottom: Math.max(insets.bottom + FOOTER_OFFSET, MIN_SCROLL_PADDING) }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={[styles.backBtn, { top: insets.top + HEADER_OFFSET }]}>
          <Ionicons name="arrow-back" size={20} color={BrandColors.PRIMARY_BLUE} />
        </TouchableOpacity>

        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Image source={require("../../../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Welcome Back 👋</Text>
            <Text style={styles.sub}>Enter your 6-digit passcode for{"\n"}<Text style={styles.phoneHighlight}>{phone}</Text></Text>
          </View>

          {/* Hidden input receiving native mobile keypad input without auto-submitting */}
          <TextInput
            ref={inputRef}
            value={passcode}
            onChangeText={(t) => {
              const c = t.replace(/\D/g, "").slice(0, 6);
              setPasscode(c);
              if (error) setError("");
            }}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            autoFocus
          />

          {/* Visual 6 Dots */}
          <TouchableOpacity activeOpacity={1} onPress={() => inputRef.current?.focus()} style={styles.dotsTouchable}>
            <View style={styles.dotsRow}>
              {Array.from({ length: 6 }).map((_, i) => {
                const filled = i < passcode.length;
                const current = i === passcode.length;
                return (
                  <View key={i} style={[styles.dotBox, { borderColor: error ? Colors.error : filled || current ? BrandColors.PRIMARY_BLUE : BrandColors.BORDER, backgroundColor: filled ? BrandColors.PRIMARY_BLUE : BrandColors.WHITE, borderWidth: current ? BorderWidth.thick : BorderWidth.regular }]}>
                    {filled ? <View style={styles.innerDot} /> : current ? <View style={styles.cursor} /> : null}
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : <View style={{ height: Spacing.xl }} />}

          {/* Solid Orange Background with White Text Button */}
          <PrimaryButton
            title="Login"
            onPress={handleLoginPress}
            loading={loading}
            colorType="orange"
            style={styles.loginBtn}
          />

          <TouchableOpacity activeOpacity={0.75} onPress={() => router.replace("/(auth)/login" as any)} style={styles.switchBtn}>
            <Text style={styles.switchText}>Log in with a different mobile number</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
