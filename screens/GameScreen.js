import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import GuessLogItem from '../components/game/GuessLogItem';

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
  const { width, height } = useWindowDimensions();

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
  const marginTopDistance = height < 400 ? 40 : 100;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
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
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.flexButton}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons
                name="md-add-circle-outline"
                size={24}
                color={Colors.colorWhite}
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
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
      </>
    );
  }

  return (
    <View style={[styles.screen, { marginTop: marginTopDistance }]}>
      <Title>Opponent's Guess</Title>
      {content}
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
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexButton: {
    flex: 1,
  },
  listItemContainer: {
    flex: 1,
    padding: 16,
  },
});
