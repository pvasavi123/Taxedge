import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../hooks/use-theme";
import { BrandColors, BorderWidth, Spacing } from "../../shared/theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";
import { styles } from "../../styles/app/(auth)/otp.styles";

/**
 * Step one of signup: confirm the code sent to the mobile number. Entering the
 * sixth digit - or pressing Verify - pushes on to /(auth)/createprofile, which
 * owns the profile form and the registration itself.
 */
export default function OTPScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber } = useAuthStore();

  // OTP states
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/createprofile");
    }, 250);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp("");
      setError("");
      Alert.alert("OTP Resent", "A new verification code has been sent.");
    }
  };

  const renderOtpBoxes = () => {
    return Array.from({ length: 6 }).map((_, i) => {
      const char = otp[i] || "";
      const isCurrent = i === otp.length;
      return (
        <View
          key={i}
          style={[
            styles.otpBox,
            {
              borderColor: error
                ? colors.error
                : isCurrent
                  ? BrandColors.PRIMARY_BLUE_DARK
                  : BrandColors.CARD_BORDER,
              borderWidth: isCurrent ? BorderWidth.medium : BorderWidth.base,
              backgroundColor: isCurrent ? BrandColors.WHITE : BrandColors.BACKGROUND,
            },
          ]}
        >
          <Text style={[styles.otpBoxText, { color: colors.text }]}>
            {char}
          </Text>
        </View>
      );
    });
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: BrandColors.BACKGROUND }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={[styles.backBtnAbsolute, { top: insets.top + Spacing.md }]}
        >
          <Ionicons name="arrow-back" size={20} color={BrandColors.PRIMARY_BLUE} />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: BrandColors.PRIMARY_BLUE }]}>
            Verification Code
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Enter the 6-digit OTP sent to +91 {mobileNumber || "9876543210"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          {/* OTP Box Displays */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.otpTouchable}
          >
            <View style={styles.otpGrid}>{renderOtpBoxes()}</View>
          </TouchableOpacity>

          {/* Hidden text input */}
          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9]/g, "");
              setOtp(clean);
              if (error) setError("");
              if (clean.length === 6) {
                setTimeout(() => {
                  router.push("/(auth)/createprofile");
                }, 200);
              }
            }}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            autoFocus
          />

          {error ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error}
            </Text>
          ) : null}

          <PrimaryButton
            title="Verify Code"
            onPress={handleVerifyOtp}
            loading={loading}
            colorType="orange"
            style={styles.verifyBtn}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text
                style={[styles.resendText, { color: colors.textSecondary }]}
              >
                Resend code in{" "}
                <Text style={{ color: "#0F2E5C", fontWeight: "700" }}>
                  0:{timer < 10 ? `0${timer}` : timer}
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendLink, { color: "#F97316" }]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

