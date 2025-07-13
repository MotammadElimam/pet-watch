// Native imports
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

// Expo imports
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

// Component imports
import PetCard from "@/components/PetCard";
import ShimmerCard from "@/components/ShimmerCard";

// Context imports
import { usePetContext } from "@/context/pet-context";

// Data imports
import { mockPets } from "@/data/mockPets";

// Types imports
import { Pet } from "@/types/pet";

// Style imports
import { homeStyles as styles } from "@/styles";

const pageSize = 5;

const HomeScreen = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { adoptedPets } = usePetContext();

  const loadPets = async (reset = false) => {
    if (reset) {
      setPage(1);
      setHasMore(true);
      setPets([]);
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPets(mockPets.slice(0, pageSize));
    setHasMore(mockPets.length > pageSize);
    setLoading(false);
  };

  const loadMorePets = useCallback(async () => {
    if (loadingMore || loading || !hasMore) return;
    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const nextPage = page + 1;
    const newPets = mockPets.slice(0, nextPage * pageSize);
    setPets(newPets);
    setPage(nextPage);
    setHasMore(newPets.length < mockPets.length);
    setLoadingMore(false);
  }, [page, loadingMore, loading, hasMore]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPets(true);
    setRefreshing(false);
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handlePetPress = useCallback((pet: Pet) => {
    router.push(`/pet-details?petId=${pet.id}`);
  }, [router]);

  // ----------------------------------- START: UI RENDER METHODS ----------------------------------------------- //

  const renderPetItem = useCallback(({ item }: { item: Pet }) => {
    const isAdoptedByMe = adoptedPets.some((p) => p.id === item.id);
    return (
      <PetCard
        pet={item}
        onPress={handlePetPress}
        adoptedByMe={isAdoptedByMe}
      />
    );
  }, [adoptedPets, handlePetPress]);

  const renderShimmerItem = useCallback(() => <ShimmerCard />, []);

  const renderTitle = () => <Text style={styles.title}>Pets Watch</Text>;

  const renderSubtitle = () => (
    <Text style={styles.subtitle}>
      {loading
        ? "Loading pets..."
        : `${mockPets.length} pets available for adoption`}
    </Text>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {renderTitle()}
      {renderSubtitle()}
    </View>
  );

  const renderEmptyText = () => (
    <Text style={styles.emptyText}>No pets available</Text>
  );

  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>{renderEmptyText()}</View>
  ), []);

  const renderLoadingIndicator = () => (
    <ActivityIndicator size="small" color="#FF6B35" />
  );

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return <View style={styles.footerLoading}>{renderLoadingIndicator()}</View>;
  }, [loadingMore]);

  const renderRefreshControl = useCallback(() => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#007AFF"
      colors={["#007AFF"]}
    />
  ), [refreshing, onRefresh]);

  const shimmerData = useMemo(() => Array(pageSize).fill(null), []);

  const renderFlashList = () => (
    <FlashList
      data={loading ? shimmerData : pets}
      renderItem={loading ? renderShimmerItem : renderPetItem}
      estimatedItemSize={280}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      refreshControl={renderRefreshControl()}
      ListEmptyComponent={!loading ? renderEmpty : null}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (!loading && !loadingMore && hasMore) {
          loadMorePets();
        }
      }}
    />
  );

  const renderContent = () => (
    <>
      {renderHeader()}
      {renderFlashList()}
    </>
  );

  // ----------------------------------- END: UI RENDER METHODS ----------------------------------------------- //

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {renderContent()}
    </SafeAreaView>
  );
};

export default HomeScreen;
