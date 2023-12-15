import React, { useState } from 'react';
import { Heading, View, ScrollView } from 'native-base';
import { NavbarTopNew, PrimaryButton, Task, Separator } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import todolist from '../../todolist';

const extractUniqueCategories = (taskList) => {
  const uniqueCategories = {};

  taskList.forEach((task) => {
    if (task.category && task.category.nama && task.category.warna) {
      uniqueCategories[task.category.nama] = task.category.warna;
    }
  });

  return uniqueCategories;
};

const Categori = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const uniqueCategories = extractUniqueCategories(todolist);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredTasks = todolist.filter(
    (task) => !selectedCategory || task.category.nama === selectedCategory
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D5DEEF' }}>
      <NavbarTopNew />
      <Heading mt={10} ml={5}>
        Kategori
      </Heading>
      <SafeAreaView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Object.entries(uniqueCategories).map(([category, color], index) => (
            <View key={index} w={107} m={2}>
              <PrimaryButton
                title={category}
                color={color}
                fs={16}
                onPress={() => handleCategoryPress(category)}
                isSelected={category === selectedCategory}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <Separator height={15} />
      <ScrollView p={5}>
        {filteredTasks.map((task) => (
          <React.Fragment key={task.id}>
            <Task title={task.namatask} color={task.category.warna} />
            <Separator height={5} />
            {task.catatan && <Task title={`Catatan: ${task.catatan}`}  />}
            <Separator height={5} />
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categori;
