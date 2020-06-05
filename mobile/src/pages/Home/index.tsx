import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos?orderBy=nome`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleNavigatePoints() {
    navigation.navigate('Points');
  }

  function NavigateToPoints() {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  function handleSelectUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{ label: 'Selecione um estado' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
          style={{
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5,
            },
            iconContainer: {
              padding: 20,
            },
          }}
          onValueChange={(value) => handleSelectUf(value)}
          items={ufs.map((uf) => ({ label: uf, value: uf }))}
        />

        <RNPickerSelect
          placeholder={{ label: 'Selecione uma cidade' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
          style={{
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5,
            },
            iconContainer: {
              padding: 20,
            },
          }}
          onValueChange={(value) => handleSelectCity(value)}
          items={cities.map((city) => ({ label: city, value: city }))}
        />

        <RectButton style={styles.button} onPress={NavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" size={24} color="#fff" />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
