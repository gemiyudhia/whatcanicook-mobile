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
import { registerSchema, type RegisterValues } from '@/lib/auth-schemas';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { displayName: '', email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((values) => {
    // TODO: panggil POST /auth/register lewat API client
    void values;
  });

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <AuthHeader subtitle="DAFTAR AKUN" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="gap-6 px-5 pb-10 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-2xl bg-sage-light p-5">
            <Text className="font-heading text-[28px] leading-9 text-primary">
              Mulai Petualangan Memasakmu
            </Text>
            <Text className="mt-3 font-body text-base leading-6 text-pebble">
              Buat akun gratis untuk mengelola bahan dapur, kurangi sampah
              makanan, dan temukan resep nusantara yang menggugah selera.
            </Text>
          </View>

          <View className="gap-4">
            <Controller
              control={control}
              name="displayName"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <AuthTextField
                  label="Nama Lengkap"
                  icon="person-outline"
                  placeholder="misal: Nisa Pratiwi"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  autoComplete="name"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <AuthTextField
                  label="Alamat Email"
                  icon="mail-outline"
                  placeholder="nama@domain.com"
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
                  placeholder="Minimal 8 karakter & kombinasi angka"
                  hint="Minimal 8 karakter dan mengandung angka."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  isPassword
                  autoCapitalize="none"
                  autoComplete="new-password"
                />
              )}
            />
          </View>

          <PrimaryButton
            label="Daftar & Mulai Masak"
            onPress={onSubmit}
            disabled={isSubmitting}
          />

          <View className="flex-row items-center justify-center">
            <Text className="font-body text-sm text-pebble">
              Sudah punya akun?{' '}
            </Text>
            <Pressable onPress={() => router.replace('/login')} hitSlop={10}>
              <Text className="font-body-semibold text-sm text-primary">
                Masuk di Sini
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
