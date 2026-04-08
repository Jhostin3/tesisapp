import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../molecules/SearchBar';
import StudentCard from '../molecules/StudentCard';
import AppText from '../atoms/AppText';
import SectionHeader from '../molecules/SectionHeader';
import type { Student } from '../../types/models';

type Props = {
  query: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  students: Student[];
};

export default function StudentSearchSection({ query, onChange, onSearch, students }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Búsqueda de estudiante" subtitle="Por cédula o nombre" />
      <SearchBar value={query} onChangeText={onChange} onSearch={onSearch} placeholder="Buscar" />
      <View style={styles.results}>
        {students.map((item) => <StudentCard key={item.id} student={item} />)}
        {!students.length ? <AppText variant="caption">Sin resultados.</AppText> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  results: { gap: 10 },
});
