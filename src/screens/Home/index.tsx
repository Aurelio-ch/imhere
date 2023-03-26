import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert} from 'react-native'

import { styles } from './styles';
import { Participant } from '../../components/Participant';


export function Home() {
  const [participants, setParticipants ] = useState<string[]>([]);
  const [participantName, setParticipantName ] = useState('');

    // 'Rodrigo', 'Sebastian', 'Tiago', 'Aurélio', 'Vin', 'Fabrico', 'Caio', 'Paulo', 'Felipe', 'Brain', 'Clever'

    function handleParticipantAdd(){
        if(participants.includes(participantName)){
            return Alert.alert("Participante já existe", "Já existe um participante com esse nome")
        }
        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }
    function handleParticipantRemove(name: string){
        Alert.alert("Remover", `Deseja Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },

            {
                text: 'Não',
                style: 'cancel'
            }
        ])

    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName} >
                Primeiro modulo react native
            </Text>

            <Text style={styles.eventDate}>
                Sábado, 11 de Fevereiro de 2023
            </Text>

            <View style={styles.form}>
                <TextInput 
                style={styles.input}
                placeholder="Nome do Participante"
                placeholderTextColor="#6B6B6B"
                onChangeText={setParticipantName}
                value={participantName}

                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) =>(
                    <Participant
                        key={item} 
                        name={item} 
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={()=> (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

            {/* <ScrollView showsVerticalScrollIndicator={false}>
                {
                    participants.map((participant =>(
                        <Participant
                        key={participant} 
                        name={participant} 
                        onRemove={handleParticipantRemove}/>
                    )))
                }
            </ScrollView> */}




        </View>
    );
  }
  