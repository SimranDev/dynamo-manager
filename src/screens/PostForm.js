import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
const axios = require('axios');
import JSONTree from 'react-native-json-tree';
import CountryDropdown from '../components/CountryDropdown';
import Logo from '../assets/icons/aws-dynamodb.svg';
import Checkbox from '../assets/icons/checkbox-checked.svg';
import {COLORS, DEFAULTS} from '../helpers/styles';
import {API_URL} from '../helpers/consts';

const PostForm = () => {
  const [country, setCountry] = useState('');
  const [activeCases, setActiveCases] = useState();
  const [totalCases, setTotalCases] = useState();
  const [res, setRes] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  const url = API_URL;
  const data = {
    total: totalCases,
    active: activeCases,
    countryName: country,
  };

  const postData = () => {
    Keyboard.dismiss();
    setRes({});
    setIsPosting(true);
    setTimeout(() => {
      axios
        .post(url, data)
        .then(res => {
          console.log(res.data);
          setRes(res.data);
        })
        .catch(err => {
          setRes(err.toString());
        })
        .then(setIsPosting(false));
    }, 1000);
  };

  return (
    <View style={{zIndex: 1, margin: 18}}>
      <View style={styles.head}>
        <Logo height={36} width={36} />
        <Text style={styles.title}>DynamoDB Manager</Text>
      </View>
      <CountryDropdown passState={val => setCountry(val)} />

      <View>
        <Text style={styles.subtitle}>ACTIVE CASES</Text>
        <TextInput
          placeholder="e.g. 123"
          style={styles.input}
          keyboardType="numeric"
          defaultValue={activeCases}
          onChangeText={val => {
            setActiveCases(val);
          }}
        />
      </View>
      <View>
        <Text style={styles.subtitle}>TOTAL CASES</Text>
        <TextInput
          placeholder="e.g. 123"
          keyboardType="numeric"
          style={styles.input}
          defaultValue={totalCases}
          onChangeText={val => {
            setTotalCases(val);
          }}
        />
      </View>
      <View style={styles.postContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
          }}>
          <Checkbox height={28} width={28} />
          <Text>Date Stamp</Text>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLORS.dark,
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
          }}
          onPress={postData}
          activeOpacity={0.8}>
          <Text style={{color: 'white', fontSize: 15}}>
            {isPosting ? 'POSTING...' : 'POST DATA'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.jsonView}>
        <Text>Response</Text>
        <JSONTree data={res} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: COLORS.light,
    color: COLORS.dark,
    paddingLeft: 10,
    fontSize: 16,
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: 'bold',
    height: 40,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.dark,
    fontWeight: 'bold',
    marginTop: DEFAULTS.marginTop,
  },
  postContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTS.marginTop + 10,
    alignItems: 'center',
  },
  btn: {
    height: 50,
    width: 100,
    color: 'red',
    backgroundColor: 'red',
    flex: 1,
  },
  jsonView: {
    marginTop: DEFAULTS.marginTop,
  },
});

export default PostForm;
