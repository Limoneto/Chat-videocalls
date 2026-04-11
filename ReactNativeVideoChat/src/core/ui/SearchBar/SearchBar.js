import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar,  } from 'react-native-paper';
import { useTheme, useTranslations } from '../../dopebase';
import dynamicStyles from './styles';

export default function SearchBar(props) {
  const {
    onChangeText,
    onSearchBarCancel,
    onSearch,
    searchRef,
    placeholder,
    searchContainerStyle,
  } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const [searchText, setSearchText] = React.useState('');

  const onSearchTextChange = text => {
    setSearchText(text);
    onChangeText(text);
  };

  const onCancel = () => {
    setSearchText('');
    onSearchBarCancel();
  };

  return (
    <View style={[styles.container, searchContainerStyle]}>
      <Searchbar
        ref={searchRef}
        placeholder={placeholder || localized('Search for friends')}
        value={searchText}
        onChangeText={onSearchTextChange}
        onIconPress={onSearch}
        onSubmitEditing={onSearch}
        style={styles.searchInput}
        icon="magnify"
        clearIcon="close"
        onClear={onCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
  },
});
