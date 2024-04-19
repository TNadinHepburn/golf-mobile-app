import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect  } from 'react';
import data from '../test_data/CardExample.json' 

export default function Scorecard() {
  const [playerScore, updatePlayerScore] = useState(data.scorecard);

  const Total = props => {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    );
  };

  const getTotal = (scoreData, player) => {
    return _reduce(
      scoreData,
      (sum, index) => {
        return sum + index[player];
      },
      0
    );
  };
  
  const Score = ({ scoreCellSelected, player, header, scoreData }) => {
    return (
      <View style={styles.container}>
        <Header text={header}></Header>
        {_map(scoreData, data => (
          <TouchableOpacity
            key={data.hole}
            style={styles.view}
            onPress={() => scoreCellSelected(data.hole, player)}>
            <Text style={styles.text}>{data[player]}</Text>
          </TouchableOpacity>
        ))}
        <Total text={getTotal(scoreData, player)} />
      </View>
    );
  };

  const Hole = ({ scoreData }) => {
    return (
      <View style={styles.container}>
        <Header text="Hole"></Header>
        {_map(scoreData, data => (
          <View key={data.hole} style={styles.view}>
            <Text style={styles.text}>{data.hole}</Text>
          </View>
        ))}
        <Total text="Total" />
      </View>
    );
  };

  const Par = ({ scoreData }) => {
    return (
      <View style={styles.container}>
        <Header text="Par"></Header>
        {_map(scoreData, data => (
          <View key={data.hole} style={styles.view}>
            <Text style={styles.text}>{data.par}</Text>
          </View>
        ))}
        <Total text="27" />
      </View>
    );
  };
  


return (
  <View style={styles.container}>
    <View style={styles.container}>
      <Text>Scorecard</Text>
        
      <Hole scoreData={scoreData} />
      <Par scoreData={scoreData} />
      <Score
        header="Player Score"
        scoreData={scoreData}
        // scoreCellSelected={scoreCellSelected}
      />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
});