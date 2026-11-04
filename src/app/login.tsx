import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { loginSchema, type LoginValues } from '@/lib/auth-schemas';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((values) => {
    // TODO: panggil POST /auth/login lewat API client
    void values;
  });

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <AuthHeader subtitle="MASUK" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="gap-6 px-5 pb-10 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-sage-light">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Ionicons name="restaurant" size={28} color="#FAF8F3" />
              </View>
            </View>
            <Text className="mt-5 text-center font-heading text-[28px] leading-9 text-primary">
              Selamat Datang Kembali di Dapur
            </Text>
            <Text className="mt-3 text-center font-body text-base leading-6 text-pebble">
              Masuk untuk mengakses stok bahan dapurmu, resep favorit tersimpan,
              dan inspirasi hidangan lezat hari ini.
            </Text>
          </View>

          <View className="gap-4">
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <AuthTextField
                  label="Email"
                  icon="mail-outline"
                  placeholder="misal: nisa@email.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <AuthTextField
                  label="Kata Sandi"
                  icon="lock-closed-outline"
                  placeholder="Masukkan kata sandi"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  isPassword
                  autoCapitalize="none"
                  autoComplete="current-password"
                />
              )}
            />
          </View>

          <PrimaryButton
            label="Masuk ke Dapur Saya"
            onPress={onSubmit}
            disabled={isSubmitting}
          />

          <View className="flex-row items-center justify-center">
            <Text className="font-body text-sm text-pebble">
              Belum punya akun dapur?{' '}
            </Text>
            <Pressable onPress={() => router.replace('/register')} hitSlop={10}>
              <Text className="font-body-semibold text-sm text-primary">
                Daftar Akun Sekarang
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
