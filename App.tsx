import React from 'react';
import {
SafeAreaView,
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
FlatList,
Alert,

} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

// Define color constants

const COLORS = {primary: '#1f145c', white: '#FFCC00'};

const App = () => { 

  // State variables for input and to-do items

  const [textInput,setTextInput] = React.useState('');
  const[todos,setTodos] = React.useState([
    {id: 1, task:'First todo', completed: true},
    {id: 2, task:'Second todo', completed: true},
  ]);


  // Component to render each to-do item

  const ListItem = ({todo}) => {
    return (
    <View style ={styles.listItem} >
      <View style={{flex: 1}}>
        <Text
          style={{fontWeight: 'bold',
          fontSize: 20,
          color: COLORS.primary,
          textDecorationLine: todo?.completed ? 'line-through' : 'none',
          }}>
          {todo?.task}
        </Text>
      </View>
      {
        !todo?.completed && 
        (

        <TouchableOpacity style={[styles.actionIcon]}
          onPress={()=> markTodoComplete(todo?.id)}>
            <Icon name="done" size={25} color={COLORS.white} />
        </TouchableOpacity>

        )
      }
      <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'red'}]}

       onPress={()=> deleteTodo(todo?.id)} >
        <Icon name="delete" size={25} color={COLORS.white} />
      </TouchableOpacity>
    </View>
    );
  };
    
  // Function to add a new to-do item

  const addTodo = ()=>{
 if(textInput == ""){

  Alert.alert("Error","Please input TO DO LIST")

 }
 else{
    const newTodo={
    id:Math.random(),
    task:textInput,
    completed:false,
  };
  setTodos([...todos,newTodo])
  setTextInput("");
 }
};
// mark to do if task is done
const markTodoComplete = todoId=>{
const newTodos = todos.map((item)=>{
  if (item.id == todoId)
  {
    return {...item,completed:true};
  }
  return item;
});
setTodos(newTodos);
};

// delete completly from the list 

const deleteTodo = todoId => {
  const newTodos = todos.filter(item => item.id != todoId);
  setTodos(newTodos);
};

// Function to clear all to-do items with a confirmation alert

const clearTodos = () => {
  Alert.alert("Confirm", "Clear todos?", [
    {
      text: "Yes",
      onPress: () => setTodos([]),
    },
    {
      text: "No",
    },
  ]);
};


return(
     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>

        <Text style = {styles.headline}> {'\t\t\t\t\t\t\t\t\t\t\t\t\t'}TO-DO-LIST</Text>
        <Icon name="delete" size={30} color="red"   style={{ margin: 20 }} onPress={clearTodos}/>

      </View>
    
      <FlatList 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom:100}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item}/>}
        />
      <View style = {styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add Todo List"style={{ fontSize: 20 }}
          value={textInput}
          onChangeText={(text)=> setTextInput(text)}/>
        </View>
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
          <Icon name="add" color={COLORS.black} size={30}/>
        </View>
      </TouchableOpacity>
      </View>
     </SafeAreaView>
  );
};


// Styles for the components


    
const styles = StyleSheet.create({
  actionIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginLeft: 5,
    borderRadius: 10,
  },
  listItem: {
    padding: 20,
    backgroundColor: '#FFFFCC', 

    flexDirection: 'row',
    elevation: 12,
    borderRadius: 20,
    marginVertical: 10,

  },
header: {
  padding: 0,
  flexDirection: 'row',
  textAlign:'center',
  alignItems: 'center',
  marginVertical: 10,
  marginHorizontal: 10,

  borderRadius: 10,
  justifyContent: 'space-between',
  backgroundColor: '#FFFF99',
  fontFamily: 'Comic Sans MS',

},

headline:{
  
  fontSize:40,
  alignItems:'center',
  textAlign:'center',
  padding: 10,
  color: 'black',
  fontFamily: 'Comic Sans MS',
},



headerFont: {
  fontFamily: 'Comic Sans MS',
  color: 'black',
  fontSize: 11,
  fontWeight: 'bold',
},
footer: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  
},
inputContainer: {
  backgroundColor: COLORS.white,

  flex: 1,
  height: 60,
  marginVertical: 10,
  marginRight: 10,
  borderRadius: 10,
  backgroundColor: '#FFFF99',
  justifyContent: 'center', // Center vertically
  alignItems: 'center', 
},
iconContainer: {
  height: 60,
  width: 60,
  backgroundColor: COLORS.primary,
  elevation: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFF99',

},
});
  
export default App;
