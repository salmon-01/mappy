import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import SettingsSheet from './SettingsSheet';
import { SettingsSheetProps } from '~/types';

const SettingsBottomSheet = ({
  isVisible,
  onClose,
  onClearMap,
  onLogout,
  onDeleteAccount,
}: SettingsSheetProps) => {
  const snapPoints = ['90%'];

  return (
    <BottomSheet
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      onClose={onClose}
      enablePanDownToClose={true}>
      <SettingsSheet
        onClose={onClose}
        onClearMap={onClearMap}
        onLogout={onLogout}
        onDeleteAccount={onDeleteAccount}
      />
    </BottomSheet>
  );
};

export default SettingsBottomSheet;
