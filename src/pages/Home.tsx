import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [grettings, setGrettings] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills(oldState => [...oldState, data]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGrettings('Good Morning!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGrettings('Good Afternoon!');
    } else {
      setGrettings('Good Evening!');
    }
  }, [])

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Welcome, Rafael!</Text>
      <Text style={styles.grettings}>{grettings}</Text>
      <TextInput 
        style={styles.input} 
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />
      <Button onPress={handleAddNewSkill} title="Add" />
      <Text style={[styles.title, {marginVertical: 50}]} >My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    marginTop: 30,
    borderRadius: 7,
  },
  grettings: {
    color: '#fff',
  }
})