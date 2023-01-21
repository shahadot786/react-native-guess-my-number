import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import GuessLogItem from '../components/game/GuessLogItem';
import customStyle from '../styles/customStyle';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [gueesRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(gueesRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //direction => 'lower' , 'grater'
    if (
      (direction == 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRnNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRnNumber);
    setGuessRounds((prevGuessRounds) => [newRnNumber, ...prevGuessRounds]);
  }

  const guessRoundListLength = gueesRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={[customStyle.green, customStyle['font-size']]}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonContainer}>
          <View style={styles.flexButton}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons
                name="md-add-circle-outline"
                size={24}
                color={Colors.colorWhite}
              />
            </PrimaryButton>
          </View>
          <View style={styles.flexButton}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name="md-remove-circle-outline"
                size={24}
                color={Colors.colorWhite}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listItemContainer}>
        <FlatList
          data={gueesRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    marginTop: 50,
  },
  instructionText: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  flexButton: {
    flex: 1,
  },
  listItemContainer: {
    flex: 1,
    padding: 16,
  },
});
