// hooks/useSavePortfolioSnapshot.js
import { useEffect, useRef } from 'react';
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

  const [addSnapshot] = useAddPortfolioSnapshotMutation();
  const { data: existingSnapshots, isFetching: isFetchingSnapshots } =
    useGetPortfolioSnapshotsQuery();

  const hasAttemptedRef = useRef(false); // Track if we've attempted to save

  useEffect(() => {
    // Only proceed if we have all data and haven't attempted yet
    if (
      hasAttemptedRef.current ||
      isFetching ||
      isFetchingSnapshots ||
      error ||
      !portfolio ||
      !existingSnapshots
    ) {
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const snapshotExists = existingSnapshots.some((snap) => snap.date === today);
    if (snapshotExists) return;

    addSnapshot({
      date: today,
      totalValue,
      totalInvested,
      totalProfit,
      change24hValue,
      change24hPercent,
    })
      .unwrap()
      .catch((err) => {
        console.error('Error while saving snapshot:', err);
        // Možeš da obavestiš korisnika o grešci
      });

    hasAttemptedRef.current = true; // Mark that we've attempted to save
  }, [
    portfolio,
    existingSnapshots,
    isFetching,
    isFetchingSnapshots,
    error,
    addSnapshot,
    totalValue,
    totalInvested,
    totalProfit,
    change24hValue,
    change24hPercent,
  ]);

  // This return is optional but can be useful for debugging
  return {
    hasAttempted: hasAttemptedRef.current,
    shouldSave:
      !hasAttemptedRef.current &&
      !isFetching &&
      !isFetchingSnapshots &&
      !error &&
      portfolio &&
      existingSnapshots,
  };
};
