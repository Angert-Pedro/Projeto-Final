import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
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
    marginBottom: 80,
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
    textAlign: "center",
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
});

export default styles;