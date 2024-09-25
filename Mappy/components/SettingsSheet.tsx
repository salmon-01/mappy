import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SettingsSheetProps {
  onClose: () => void;
  onClearMap: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({
  onClose,
  onClearMap,
  onLogout,
  onDeleteAccount,
}) => {
  return (
    <View style={styles.sheetContent}>
      <Text style={styles.title}>TestUser</Text>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Email</Text>
        <Text style={styles.optionText}>Username</Text>
        <Text style={styles.optionText}>Name</Text>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Privacy policy</Text>
        <Text style={styles.optionText}>Terms of service</Text>
      </View>
      <TouchableOpacity onPress={onClearMap}>
        <Text style={styles.optionText}>Clear map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogout}>
        <Text style={[styles.optionText, styles.logout]}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteAccount}>
        <Text style={styles.deleteText}>Delete account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  logout: {
    color: 'red',
  },
  deleteText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  versionText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default SettingsSheet;
