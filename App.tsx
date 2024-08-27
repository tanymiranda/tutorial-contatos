import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Contacts from "expo-contacts";
import { useEffect, useState } from 'react';

export default function App() {
  const [contatos, setContatos] = useState<Contacts.Contact[]>([]);
  useEffect (() => {
    init();
  }, []);
  
  async function init() {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) {
      alert("Ops, sem acesso a sua lista de contatos.");
      return;
    }
    const {data} = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });
    setContatos(data);
  //if (data.length > 0){
    //const contact = data[0];
    //console.log(contact);
  //}
}

  return (
    <View style={styles.container}>
      <ScrollView>
      {contatos?.map((contato) =>(
        <View style ={styles.name}> 
          <Text style ={ styles.namecontact}>{contato.name}</Text>
          <Text>{contato.phoneNumbers?.map(p =>p.number)?.join(", ")}</Text>
        </View>
      ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  namecontact:{
    fontSize: 20,
    fontWeight: 'bold',
  },
});
