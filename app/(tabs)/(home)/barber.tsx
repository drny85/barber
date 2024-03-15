import { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeOutLeft } from 'react-native-reanimated';
import Screen from '~/components/Screen';
import { Appointment } from '~/typing';
import { cn } from '~/utils/cn';

export default function TabOneScreen() {
  const [data, setData] = useState<Appointment[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const isAppointmentAvailable = (
    appointments: Appointment[],
    startTime: string,
    endTime: string
  ): boolean => {
    const overlappingAppointments = appointments.filter(
      (appt) =>
        (appt.startTime <= startTime && appt.endTime >= startTime) ||
        (appt.startTime <= endTime && appt.endTime >= endTime) ||
        (appt.startTime >= startTime && appt.endTime <= endTime)
    );

    if (overlappingAppointments.length > 0) {
      return false;
    }

    return true;
  };

  const appointments: Appointment[] = [];

  const getAvailableAppointments = (
    appointments: Appointment[],
    timeWindowMinutes: number,
    openTime: string,
    closingTime: string
  ): Appointment[] => {
    const availableAppointments: Appointment[] = [];
    let currentStartTime = openTime;
    let id = 0;
    while (currentStartTime <= closingTime) {
      const currentEndTime = addMinutes(currentStartTime, timeWindowMinutes);
      if (
        currentEndTime <= closingTime &&
        isAppointmentAvailable(appointments, currentStartTime, currentEndTime)
      ) {
        const newAppt: Appointment = {
          id: ++id,
          startTime: currentStartTime,
          endTime: currentEndTime,
          isAvailable: true,
        };

        availableAppointments.push(newAppt);
      }
      currentStartTime = addMinutes(currentStartTime, timeWindowMinutes);
    }

    return availableAppointments;
  };

  // Utility function to add minutes to a given time
  const addMinutes = (time: string, minutes: number): string => {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    const totalMinutes = hour * 60 + minute + minutes;
    const newHour = Math.floor(totalMinutes / 60) % 24;
    const newMinute = totalMinutes % 60;
    return `${padZero(newHour)}:${padZero(newMinute)}`;
  };

  // Utility function to pad single-digit numbers with leading zeros
  const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

  // Example usage:

  const timeWindowMinutes = 40;
  const openTime = '09:00';
  const closingTime = '19:00';
  const availableAppointments = getAvailableAppointments(
    appointments,
    timeWindowMinutes,
    openTime,
    closingTime
  );

  const onAppointmentPress = (appointment: Appointment) => {
    console.log('Appointment selected:', appointment);
    setAppointment(appointment);
    // Mark appoitment unavailbale
    // setData((prevData) => [
    //   ...prevData.map((a) =>
    //     a.startTime === appointment.startTime
    //       ? { ...a, isAvailable: false }
    //       : { ...a, isAvailable: true }
    //   ),
    // ]);
    // Perform any necessary actions with the selected appointment here
  };

  const renderAppointments: ListRenderItem<Appointment> = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={item.id === appointment?.id}
        onPress={() => onAppointmentPress(item)}
        className={cn('rounded-lg p-3 items-center bg-accent justify-center', {
          'bg-slate-300': item.id === appointment?.id,
        })}>
        <Animated.View exiting={FadeOutLeft.duration(500)} className={' items-center flex-row '}>
          <Text className="font-bold">{convertTo12HourFormat(item.startTime)}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setData(availableAppointments);
  }, []);
  return (
    <Screen>
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold">Home</Text>
        <View className="h-20">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              padding: 10,
            }}
            data={data}
            renderItem={renderAppointments}
            keyExtractor={(item) => item.startTime}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = {
  container: `items-center flex-1 justify-center mt-10`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};

const convertTo12HourFormat = (time24: string): string => {
  // Split the time string into hours and minutes
  const [hourStr, minuteStr] = time24.split(':');

  // Convert hours and minutes to numbers
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // Determine AM or PM
  const period = hour >= 12 ? 'PM' : 'AM';

  // Convert hour to 12-hour format
  const hour12 = hour % 12 || 12; // If hour is 0 or 12, use 12

  // Format the time in 12-hour format
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
};
