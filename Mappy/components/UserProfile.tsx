import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface UserProfileProps {
  username: string;
  avatar: string;
  onPress: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, avatar, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.profileSection}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 30,
    marginRight: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default UserProfile;
