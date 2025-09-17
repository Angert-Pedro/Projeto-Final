import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 6,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#4A4A4A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyLink: {
      marginTop: 16,
      color: '#666',
      textDecorationLine: 'underline',
  }, 
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    padding: 8,
    marginBottom: 24,
  },
  tab: {
    fontSize: 14,
    color: "#666",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
  },
});