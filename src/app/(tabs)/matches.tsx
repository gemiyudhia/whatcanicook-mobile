import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FilterChips } from '@/components/FilterChips';
import { MatchResultCard } from '@/components/matches/MatchResultCard';
import { MOCK_MATCHES } from '@/data/mock-matches';
import { INITIAL_PANTRY_ITEMS } from '@/data/mock-pantry';
import {
  countMatches,
  filterMatches,
  QUICK_COOK_LIMIT_MINUTES,
  rankMatches,
  type MatchFilter,
} from '@/lib/match-results';

const FILTER_LABELS: Record<MatchFilter, string> = {
  all: 'Semua',
  ready: '100% Siap Masak',
  'missing-one': 'Kurang 1 Bahan',
};

const SWITCH_COLORS = { false: '#E7DED0', true: '#34483A' };

export default function MatchesScreen() {
  const [filter, setFilter] = useState<MatchFilter>('all');
  const [completeOnly, setCompleteOnly] = useState(false);
  const [quickOnly, setQuickOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const visibleMatches = rankMatches(
    filterMatches(MOCK_MATCHES, { filter, completeOnly, quickOnly }),
  );

  const filterOptions = (Object.keys(FILTER_LABELS) as MatchFilter[]).map(
    (value) => ({
      value,
      label: `${FILTER_LABELS[value]} (${countMatches(MOCK_MATCHES, value)})`,
    }),
  );

  const toggleSaved = (id: string) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

  const openRecipe = (id: string) =>
    router.push({ pathname: '/recipe/[id]', params: { id } });

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <ScrollView
        contentContainerClassName="gap-5 px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader subtitle="Resep Yang Cocok" />

        <View>
          <Text className="font-heading text-[28px] text-primary">
            Resep yang Cocok
          </Text>
          <Text className="mt-2 font-body text-base text-pebble">
            Ditemukan{' '}
            <Text className="font-body-semibold text-ink">
              {MOCK_MATCHES.length} resep
            </Text>{' '}
            berdasarkan {INITIAL_PANTRY_ITEMS.length} bahan di dapurmu.
          </Text>
        </View>

        <FilterChips
          options={filterOptions}
          selected={filter}
          onSelect={setFilter}
        />

        <View className="gap-1 rounded-2xl bg-card px-4 py-2">
          <View className="flex-row items-center py-2">
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#383831"
            />
            <Text className="ml-3 flex-1 font-body-medium text-sm text-ink">
              Hanya yang bahan komplit
            </Text>
            <Switch
              value={completeOnly}
              onValueChange={setCompleteOnly}
              accessibilityLabel="Hanya yang bahan komplit"
              trackColor={SWITCH_COLORS}
              thumbColor="#FAF8F3"
            />
          </View>
          <View className="flex-row items-center py-2">
            <Ionicons name="timer-outline" size={20} color="#383831" />
            <Text className="ml-3 flex-1 font-body-medium text-sm text-ink">
              Masak kilat (&lt; {QUICK_COOK_LIMIT_MINUTES} menit)
            </Text>
            <Switch
              value={quickOnly}
              onValueChange={setQuickOnly}
              accessibilityLabel="Masak kilat"
              trackColor={SWITCH_COLORS}
              thumbColor="#FAF8F3"
            />
          </View>
        </View>

        <View className="gap-4">
          {visibleMatches.length === 0 ? (
            <Text className="py-8 text-center font-body text-sm text-pebble">
              Tidak ada resep yang cocok dengan filter ini.
            </Text>
          ) : (
            visibleMatches.map((match) => (
              <MatchResultCard
                key={match.id}
                match={match}
                isSaved={savedIds.includes(match.id)}
                onToggleSave={() => toggleSaved(match.id)}
                onOpen={() => openRecipe(match.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
