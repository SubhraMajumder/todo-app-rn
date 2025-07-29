import { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
// import SvgUri from 'react-native-svg-uri';

const arr = [
  {id: 1, name: "Subhra"},
  {id: 2, name: "Rony"},
  {id: 3, name: "Piu"},
  {id: 4, name: "Rajeswari"},
  {id: 5, name: "Bu"},
  {id: 6, name: "Tu"}
]

function App() {
  const [text, setText] = useState("");
  // const [todo, setTodo] = useState([]);

  return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar 
            backgroundColor="#4000ffff"
          />
          <View style={styles.topview}>
            <Text style={styles.toptitle}>Todo App</Text>
          </View>

          <View style={styles.inputcontainer}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
            />
            <Pressable>
              
            </Pressable>
          </View>

        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topview: {
    height: 100, 
    backgroundColor: "#4000ffff"
  },
  toptitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    paddingTop: 15
  },
  inputcontainer: {
    height: 100, 
    backgroundColor: "#ffffff",
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  input: {
    maxWidth: "60%",
    borderWidth: 1
  }
});

export default App;
