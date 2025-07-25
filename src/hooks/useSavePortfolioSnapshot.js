// hooks/useSavePortfolioSnapshot.js
import { useEffect, useCallback, useMemo } from 'react';
import { useAddPortfolioSnapshotMutation, useGetPortfolioSnapshotsQuery } from '../store';
import { usePortfolioData } from './usePortfolioData';

export const useSavePortfolioSnapshot = () => {
  const {
    portfolio,
    totalValue,
    totalInvested,
    totalProfit,
    change24hValue,
    change24hPercent,
    isFetching,
    error,
  } = usePortfolioData();

  const [addSnapshot, { isLoading: isSaving, isSuccess, isError, error: saveError }] = useAddPortfolioSnapshotMutation();
  const { data: existingSnapshots, isFetching: isFetchingSnapshots } = useGetPortfolioSnapshotsQuery();

  // Calculate today's date string once
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const snapshotExists = useMemo(() => {
    if (isFetchingSnapshots || !existingSnapshots) return false;
    return existingSnapshots.some((snap) => snap.date === today);
  }, [existingSnapshots, today, isFetchingSnapshots]);

  const canSave = useMemo(() => {
    return (
      !isFetching &&
      !isFetchingSnapshots &&
      !error &&
      portfolio &&
      existingSnapshots &&
      !snapshotExists &&
      !isSaving
    );
  }, [
    isFetching,
    isFetchingSnapshots,
    error,
    portfolio,
    existingSnapshots,
    snapshotExists,
    isSaving,
  ]);

  // Save snapshot function, memoized
  const saveSnapshot = useCallback(async () => {
    if (!canSave) return;
    try {
      await addSnapshot({
        date: today,
        totalValue,
        totalInvested,
        totalProfit,
        change24hValue,
        change24hPercent,
      }).unwrap();
    } catch (err) {
    }
  }, [
    canSave,
    addSnapshot,
    today,
    totalValue,
    totalInvested,
    totalProfit,
    change24hValue,
    change24hPercent,
  ]);

  // Optionally, auto-save on mount if possible
  useEffect(() => {
    if (canSave) {
      saveSnapshot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSave, saveSnapshot]);

  return {
    canSave,
    isSaving,
    isSuccess,
    isError: isError || !!saveError,
    saveError,
    saveSnapshot,
    snapshotExists,
  };
};
