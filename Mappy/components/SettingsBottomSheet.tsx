import React from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import SettingsSheet from './SettingsSheet'; // Your settings sheet component

interface SettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onClearMap: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const SettingsBottomSheet: React.FC<SettingsBottomSheetProps> = ({
  isVisible,
  onClose,
  onClearMap,
  onLogout,
  onDeleteAccount,
}) => {
  const snapPoints = ['95%'];

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
