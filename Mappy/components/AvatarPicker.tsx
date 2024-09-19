import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const avatars: { [key: string]: any } = {
  avatar1: require('../assets/avatars/avatar1.png'),
};

interface AvatarPickerProps {
  selectedAvatar: string;
  setAvatar: (avatar: string) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, setAvatar }) => {
  return (
    <View style={styles.container}>
      {Object.keys(avatars).map((avatarKey, index) => (
        <TouchableOpacity key={index} onPress={() => setAvatar(avatarKey)}>
          <Image
            source={avatars[avatarKey]}
            style={[styles.avatar, selectedAvatar === avatarKey && styles.selectedAvatar]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
    opacity: 0.75,
  },
  selectedAvatar: {
    opacity: 1,
  },
});

export default AvatarPicker;
