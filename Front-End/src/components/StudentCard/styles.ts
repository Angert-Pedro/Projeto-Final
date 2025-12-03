import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f4f7',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  instituicao: {
    fontSize: 14,
    fontWeight: '700',
  },
  curso: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
  },
  infoRow: {
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 18,
  },
  qrImage: {
    width: 160,
    height: 160,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  qrLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  footerRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
  },
});

export default styles;