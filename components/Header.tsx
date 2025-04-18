import { Leaf, User } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Header() {
  return (
    <View style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Leaf color="#5ee6b8" size={20} />
        <Text style={styles.title}>Nutria AI</Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <User color="#5ee6b8" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginLeft: 8,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});