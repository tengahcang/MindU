import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
// import { FlatList } from "native-base";



const Categories = () => {
    const [kategori, setKategori] = useState(
        [
            {
                nama: 'Kuliah'
            },
            {
                nama: 'Rumah'
            },
            {
                nama: 'Kerja'
            },
        ]
    );

    const [kategoriSeleksi, setKategoriSeleksi] = useState({
        nama: 'Kuliah',
    });

    return (
        <View style={{flex: 1}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10, marginLeft: 10}}> Kategori</Text>
            <FlatList 
            data={kategori}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity 
              style={{
                marginRight: 7, 
    backgroundColor: kategoriSeleksi.nama == item.nama ? '#2196F3' : '#A4A4A4', 
    elevation: 3,
    alignItems: 'center', 
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 20,
    width: 95,
              }}>
                    <Text style= {{color:'white', fontWeight:'bold'}}>{item.nama}</Text>
                </TouchableOpacity>
            )}
            />
            </View>
        </View>
    );
};
export default Categories;

// const menu = {
//     marginRight: 10, 
//     backgroundColor: kategoriSeleksi.nama == item.nama ? '#2196F3' : '#A4A4A4', 
//     elevation: 3,
//     paddingHorizontal: 20, 
//     paddingVertical: 8,
//     marginBottom: 10,
//     borderRadius: 15,
//     marginLeft: 5,
//     width: 110,
// }
