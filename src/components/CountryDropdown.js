import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {countries} from '../data/countries';
import {COLORS, DEFAULTS} from '../helpers/styles';

const CountryDropdown = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(countries);

  return (
    <DropDownPicker
      style={styles.container}
      textStyle={{
        fontSize: 16,
      }}
      listItemContainerStyle={{
        backgroundColor: COLORS.light,
        borderWidth: 0,
      }}
      placeholder="select a country"
      placeholderStyle={{
        color: 'grey',
      }}
      onChangeValue={value => {
        console.log(value);
        props.passState(value);
      }}
      showTickIcon={true}
      open={open}
      value={value}
      showArrowIcon={true}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    borderRadius: 4,
    borderWidth: 0,
    marginTop: DEFAULTS.marginTop + 20,
    backgroundColor: COLORS.light,
    fontSize: 18,
  },
});

export default CountryDropdown;
