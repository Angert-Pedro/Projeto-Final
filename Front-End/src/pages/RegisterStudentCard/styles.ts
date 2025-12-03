import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  // Logo e Títulos
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logoIcon: {
    marginLeft: 8,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#636366",
    marginBottom: 30,
  },
  // Formulário
  formContainer: {
    width: "100%",
  },
  maskedInput: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d1d1d6",
    color: "#8b8b8bff"
  },
  // Separador
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D1D6",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#636366",
    fontSize: 14,
  },
  // Login Social
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    marginRight: 10,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginLeft: 10,
  },
  socialButtonText: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  googleButtonText: {
    color: "#000",
  },
  // Cadastro
  signupContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#636366",
  },
  signupLink: {
    fontWeight: "bold",
    color: "#007AFF", // Cor padrão de link iOS
  },
  checkboxContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 8,
    color: '#636366',
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fotoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3f3f46",
    marginBottom: 8,
  },
  uploadButton: {
    backgroundColor: "#18181b",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  previewContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  previewText: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#18181b",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f4f4f5",
  },
  confirmButton: {
    backgroundColor: "#18181b",
  },
  cancelText: {
    color: "#18181b",
    fontWeight: "500",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "500",
  },
  uploadButtonDisabled: {
    backgroundColor: "#a1a1aa",
  },
  scrollArea: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
});

export default styles;