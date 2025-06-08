import { StyleSheet } from 'react-native';

const colors = {
  primary: '#3498db',
  background: '#FFFFFF',
  text: '#333',
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  padding: {
    padding: 16
  }
});


export { colors, globalStyles };
