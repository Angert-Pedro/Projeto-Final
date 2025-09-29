import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ECEFF1',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  eventImage: {
    width: 60,
    height: 60,
    backgroundColor: '#B0BEC5',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#263238',
  },
  eventDetails: {
    fontSize: 14,
    color: '#546E7A',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});