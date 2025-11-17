import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F7",
    marginTop: 50,
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  // Logo e Títulos
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 0,
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
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 16,
    color: "#636366",
    marginBottom: 30,
  },
  // Formulário
  formContainer: {
    width: "100%",
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
    marginTop: 20,
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
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
  scrollArea: {
    marginBottom: 20,
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
});

export default styles;