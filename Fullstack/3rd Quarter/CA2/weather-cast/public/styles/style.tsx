import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  suggestionList: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 8,
    maxHeight: 150,
  },
  suggestion: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  error: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
  resultBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 4,
  },
  attributeMsg: {
    fontSize: 10,
    marginVertical: 4
  }
});