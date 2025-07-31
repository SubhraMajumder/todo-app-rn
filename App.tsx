import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the todo type
type TodoItem = {
  id: string;
  name: string;
};

export default function App() {
  const [text, setText] = useState<string>('');
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          setTodo(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todo));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    };
    saveTodos();
  }, [todo]);

  const handleSubmit = () => {
    if (text.trim() !== '') {
      setTodo([...todo, { id: Date.now().toString(), name: text }]);
      setText('');
    } else {
      Alert.alert('Please enter something.');
    }
  };

  const handleDelete = (id: string) => {
    setTodo(todo.filter((td) => td.id !== id));
  };

  const handleEdit = (item: TodoItem) => {
    setIsEditing(true);
    setEditingIndex(item.id);
    setText(item.name);
  };

  const handleEditSubmit = () => {
    if (editingIndex !== null) {
      setTodo(todo.map(item => item.id === editingIndex ? { ...item, name: text } : item));
      setText('');
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="#4000ff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.topview}>
          <Text style={styles.toptitle}>Todo App</Text>
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            onChangeText={setText}
            value={text}
          />
          <Pressable
            onPress={isEditing ? handleEditSubmit : handleSubmit}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>{isEditing ? 'Edit' : 'Add'}</Text>
          </Pressable>
        </View>

        <View style={styles.bottomContainer}>
          <FlatList
            data={todo}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.todoItems}>
                <Text style={styles.todoText}>{item.name}</Text>
                <View style={styles.todoActions}>
                  <Pressable onPress={() => handleEdit(item)}>
                    <Icon name="edit" size={25} color="#4000ff" />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(item.id)}>
                    <Icon name="delete" size={25} color="#4000ff" />
                  </Pressable>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ebebebff',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topview: {
    height: 100,
    backgroundColor: '#4000ff',
    justifyContent: 'center',
  },
  toptitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  inputcontainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  submitBtn: {
    backgroundColor: '#4000ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  todoItems: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  todoText: {
    width: '75%',
  },
  todoActions: {
    flexDirection: 'row',
    gap: 10,
  },
  separator: {
    height: 10,
  },
});
