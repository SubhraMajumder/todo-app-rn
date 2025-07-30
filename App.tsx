import { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, TextInput, View, Text, Pressable, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([] as any);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, seteditingIndex] = useState(null);

  const handleSubmit = () => {
    if(text !== ""){
      setTodo([...todo, { id: Date.now().toString(), name: text }]);
      setText("");
    } else {
      Alert.alert("Kichu add koro");
    }
  }

  const handleDelete = (id) => {
    setTodo(todo.filter((td) => td['id'] !== id));
  }  

  const handleEdit = (item) => {
    setIsEditing(true);
    seteditingIndex(item['id']);
    setText(item['name']);
  }

  const handleEditSubmit = () => {
    setTodo(todo.map(item => (
      item['id'] === editingIndex ? {...item, name: text} : item
    )));
    setText("");
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
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
              value={ text }
            />
            <Pressable style={styles.submitBtn}>
              <Text style={styles.submitBtnText} onPress={ isEditing ? handleEditSubmit : handleSubmit }>{isEditing ? 'Edit' : 'Add'}</Text>
            </Pressable>
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              data={todo}
              renderItem={({item, index}) => (
                <View style={styles.todoItems}>
                  <Text style={{ width: '80%' }}>{item['name']}</Text>
                  <View style={{ width: '20%', flexDirection: 'row', gap: 10 }}>
                    <Pressable onPress={() => handleEdit(item)}>
                      <Icon name="edit" size={25} color="#4000ffff" />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(item['id'])}>
                      <Icon name="delete" size={25} color="#4000ffff" />
                    </Pressable>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item['id']}
              ItemSeparatorComponent={<View style={{ padding: 5 }} />}
            />
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "red",
    height: "100%"
  },
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
    flex: 1,
    paddingHorizontal: 20
  },
  todoItems: {
    width: '100%',
    borderRadius: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity:.5,
    shadowRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    alignContent: 'center'
  }
});

export default App;
