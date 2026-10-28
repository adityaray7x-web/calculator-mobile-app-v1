import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const stats = [
  { label: 'Tasks', value: '08', color: '#6C63FF' },
  { label: 'Streak', value: '12d', color: '#00C2A8' },
  { label: 'Energy', value: '82%', color: '#FFB648' },
];

const tasks = [
  { name: 'Design review', time: '09:00', done: true },
  { name: 'Sprint planning', time: '11:30', done: false },
  { name: 'Client sync', time: '14:00', done: false },
  { name: 'Deep work block', time: '16:00', done: false },
];

const quickActions = ['Add task', 'Focus mode', 'Track mood'];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Good morning</Text>
            <Text style={styles.title}>Koro</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>K</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Today's focus</Text>
            <Text style={styles.heroPercent}>72%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.heroText}>You’re on track to complete the key priorities before lunch.</Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={[styles.statCard, { borderColor: item.color }]}>
              <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>

        <View style={styles.actionsRow}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action} style={styles.actionChip}>
              <Text style={styles.actionText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <Text style={styles.sectionLink}>4 tasks</Text>
        </View>

        {tasks.map((task) => (
          <View key={task.name} style={styles.taskRow}>
            <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
              {task.done ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>

            <View style={styles.taskInfo}>
              <Text style={[styles.taskName, task.done && styles.taskDone]}>{task.name}</Text>
              <Text style={styles.taskTime}>{task.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Text style={[styles.navItem, styles.navActive]}>Home</Text>
        <Text style={styles.navItem}>Plans</Text>
        <Text style={styles.navItem}>Insights</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 14,
    color: '#7A7F9A',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#131B32',
    letterSpacing: -1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#131B32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#8992B5',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    marginBottom: 18,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 18,
    color: '#1F2A3D',
    fontWeight: '700',
  },
  heroPercent: {
    fontSize: 20,
    color: '#6C63FF',
    fontWeight: '800',
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#EEF1FF',
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    width: '72%',
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 999,
  },
  heroText: {
    fontSize: 14,
    color: '#687087',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#6E778D',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1F2A3D',
    fontWeight: '700',
  },
  sectionLink: {
    fontSize: 13,
    color: '#6C63FF',
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 10,
  },
  actionChip: {
    backgroundColor: '#EDEBFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
  },
  actionText: {
    color: '#2C265F',
    fontWeight: '700',
    fontSize: 13,
  },
  taskRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#dfe6ff',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#C7D0EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  checkmark: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    color: '#1F2A3D',
    fontWeight: '700',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 12,
    color: '#7E879A',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#9AA5B8',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#dfe6ff',
    shadowOpacity: 0.35,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  navItem: {
    fontSize: 12,
    color: '#7C859B',
    fontWeight: '700',
  },
  navActive: {
    color: '#6C63FF',
  },
});
