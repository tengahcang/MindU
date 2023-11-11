import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {
  Categories, CalendarIcon, HomeIcon, AddIcon,Settings
} from '../../assets/svgs';

function NavbarBottom({  isActive }) {
  return (
    <View style={{
      overflow: 'hidden',
      borderTopWidth: 2,
      borderTopColor: '#F0F0F0',
    }}
    >
      <View style={{ ...styles.wrapper }}>
        <View style={styles.menuSection}>
          <TouchableOpacity><HomeIcon width={37} height={37} isActive={isActive === 'Home'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>home</Text>
        </View>
        <View style={styles.menuSection}>
          <TouchableOpacity><Categories width={37} height={37} isActive={isActive === 'Kategori'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>event</Text>
        </View>

          <View style={styles.menuSection}>
            <TouchableOpacity><AddIcon width={37} height={37} isActive={isActive === 'Add'} /></TouchableOpacity>
            <Text style={styles.menuTitle}>Tambah</Text>
          </View>


          <View style={styles.menuSection}>
            <TouchableOpacity><CalendarIcon width={37} height={37} isActive={isActive === 'Calender'} /></TouchableOpacity>
            <Text style={styles.menuTitle}>Kalender</Text>
          </View>


          <View style={styles.menuSection}>
            <TouchableOpacity><Settings width={37} height={37} isActive={isActive === 'Settings'} /></TouchableOpacity>
            <Text style={styles.menuTitle}>Setting</Text>
          </View>

      </View>
    </View>
  );
}

export default NavbarBottom;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 35,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  menuSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
});