import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 30,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  column: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  separator: {
    width: 1,
    backgroundColor: '#C7C7C7',
    height: '100%', 
  },
  linkText: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3C3C43',
    fontWeight: 'bold',
  },
});
