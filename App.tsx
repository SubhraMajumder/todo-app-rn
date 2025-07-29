import { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, TextInput, View, Text, Pressable, FlatList, Alert } from 'react-native';

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  const handleSubmit = () => {
    if(text !== ""){
      setTodo([...todo, { id: Date.now().toString(), name: text }]);
      setText("");
    } else {
      Alert.alert("Kichu add koro");
    }
  }

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
            <Pressable style={styles.submitBtn}>
              <Text style={styles.submitBtnText} onPress={handleSubmit}>Add</Text>
            </Pressable>
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              data={todo}
              renderItem={({item}) => (
                <View style={styles.todoItems}>
                  <Text>{item?.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item?.id}
            />
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
    borderTopRightRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    maxWidth: "60%",
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  submitBtn: {
    backgroundColor: "#4000ffff",
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10    
  },
  submitBtnText: {
    color: "#fff",
  },
  bottomContainer: {
    backgroundColor: "#fff",
    minHeight: 500,
    paddingHorizontal: 20
  },
  todoItems: {
    borderRadius: 0,
    padding: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: .5,
  }
});

export default App;
