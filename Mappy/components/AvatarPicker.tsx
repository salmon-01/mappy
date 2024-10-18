import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { AvatarPickerProps } from '~/types';

const avatars: { [key: string]: any } = {
  avatar1: require('../assets/avatars/avatar1.png'),
  avatar2: require('../assets/avatars/avatar2.png'),
  avatar3: require('../assets/avatars/avatar3.png'),
  avatar4: require('../assets/avatars/avatar4.png'),
  avatar5: require('../assets/avatars/avatar5.png'),
};

const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, setAvatar }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose your Mappy Avatar</Text>
      <View style={styles.avatarsContainer}>
        {Object.keys(avatars).map((avatarKey, index) => (
          <TouchableOpacity key={index} onPress={() => setAvatar(avatarKey)}>
            <Image
              source={avatars[avatarKey]}
              style={[styles.avatar, selectedAvatar === avatarKey && styles.selectedAvatar]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  avatarsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start', 
    gap: 1, 
    marginTop: 8,
    marginBottom: 16
  },
  avatar: {
    width: 75,
    height: 75,
    opacity: 0.75,
    marginRight: 2,
    marginBottom: 10,
  },
  selectedAvatar: {
    opacity: 1,
  },
  text: {
    color: '#333333',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16
  },
});

export default AvatarPicker;
