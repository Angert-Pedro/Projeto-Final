import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, Modal, ScrollView } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface MobileDatePickerProps {
  date: Date | null;                 // Current selected date
  onChange: (date: Date) => void;    // Callback when date is selected
  maxDate: Date;                     // Maximum allowed date
  placeholder?: string;              // Custom placeholder text
}

export default function DatePicker({
  date,
  onChange,
  maxDate,
  placeholder = "Data de Nascimento",
}: MobileDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const isPlaceholder = date === null || date === undefined;

  const formatDisplay = (dt: Date | null): string => {
    if (!dt) return placeholder;
    const d = dt.getDate().toString().padStart(2, "0");
    const m = (dt.getMonth() + 1).toString().padStart(2, "0");
    const y = dt.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const formatDateForInput = (dt: Date): string => {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Web version with modal date picker
  if (Platform.OS === "web") {
    const [showModal, setShowModal] = useState(false);
    const [tempDate, setTempDate] = useState(date || new Date());
    const [showYearPicker, setShowYearPicker] = useState(false);

    const currentYear = tempDate.getFullYear();
    const currentMonth = tempDate.getMonth();
    const currentDay = tempDate.getDate();

    // Get first day of month and number of days in month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create calendar grid
    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    // Year range for picker
    const minYear = new Date().getFullYear() - 100;
    const maxYear = maxDate.getFullYear();
    const yearRange = [];
    for (let i = minYear; i <= maxYear; i++) {
      yearRange.push(i);
    }

    const handlePrevMonth = () => {
      setTempDate(new Date(currentMonth === 0 ? currentYear - 1 : currentYear, currentMonth === 0 ? 11 : currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setTempDate(new Date(currentMonth === 11 ? currentYear + 1 : currentYear, currentMonth === 11 ? 0 : currentMonth + 1, 1));
    };

    const handleSelectYear = (year: number) => {
      setTempDate(new Date(year, currentMonth, 1));
      setShowYearPicker(false);
    };

    const handleSelectDate = () => {
      onChange(tempDate);
      setShowModal(false);
    };

    return (
      <>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#d1d1d6",
            backgroundColor: "#FFFFFF",
            marginBottom: 12,
          }}
        >
          <Text style={{
            fontSize: 16,
            color: date ? "#000" : "#8A8A8E",
          }}>
            {date ? formatDisplay(date) : placeholder}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          } as any}>
            {!showYearPicker ? (
              <View style={{
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 20,
                width: "90%",
                maxWidth: 350,
              } as any}>
                {/* Header with month/year and nav */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } as any}>
                  <TouchableOpacity onPress={handlePrevMonth}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{"<"}</Text>
                  </TouchableOpacity>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {monthNames[currentMonth]}
                    </Text>
                    <TouchableOpacity onPress={() => setShowYearPicker(true)}>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007bff", marginTop: 4 }}>
                        {currentYear}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={handleNextMonth}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{">"}</Text>
                  </TouchableOpacity>
                </View>

                {/* Day names header */}
                <View style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-around" } as any}>
                  {dayNames.map((day) => (
                    <Text key={day} style={{ fontWeight: "600", width: "14%", textAlign: "center", color: "#666" }}>
                      {day}
                    </Text>
                  ))}
                </View>

                {/* Calendar grid */}
                <View style={{ marginBottom: 20 }}>
                  {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIdx) => (
                    <View key={weekIdx} style={{ flexDirection: "row", justifyContent: "flex-start", marginBottom: 8 } as any}>
                      {calendarDays.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, dayIdx) => (
                        <TouchableOpacity
                          key={dayIdx}
                          onPress={() => {
                            if (day) {
                              setTempDate(new Date(currentYear, currentMonth, day));
                            }
                          }}
                          disabled={!day}
                          style={{
                            width: "14.2%",
                            aspectRatio: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 6,
                            backgroundColor: day === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "#007bff" : day === currentDay ? "#007bff" : "#f0f0f0",
                            marginRight: dayIdx < 6 ? "0.4%" : 0,
                          } as any}
                        >
                          <Text style={{ color: day === currentDay ? "#fff" : "#000", fontWeight: day === currentDay ? "bold" : "normal" }}>
                            {day}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: "row", gap: 12 } as any}>
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 6,
                      backgroundColor: "#e0e0e0",
                      alignItems: "center",
                    } as any}
                  >
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSelectDate}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 6,
                      backgroundColor: "#007bff",
                      alignItems: "center",
                    } as any}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 20,
                width: "90%",
                maxWidth: 350,
                maxHeight: "80%",
              } as any}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } as any}>
                  <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{"<"}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>Selecione o Ano</Text>
                  <View style={{ width: 24 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={true} style={{ maxHeight: 400 }}>
                  {yearRange.map((year) => (
                    <TouchableOpacity
                      key={year}
                      onPress={() => handleSelectYear(year)}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        marginVertical: 4,
                        borderRadius: 6,
                        backgroundColor: currentYear === year ? "#007bff" : "#f0f0f0",
                      } as any}
                    >
                      <Text style={{
                        fontSize: 16,
                        fontWeight: currentYear === year ? "bold" : "normal",
                        color: currentYear === year ? "#fff" : "#000",
                        textAlign: "center",
                      }}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
      </>
    );
  }

  return (
    <View>
      {/* Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("DatePicker button pressed, Platform:", Platform.OS);
          setShowPicker(true);
        }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#d1d1d6",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{
          fontSize: 16,
          color: isPlaceholder ? "#8A8A8E" : "#000",
        }}>
          {isPlaceholder ? placeholder : formatDisplay(date)}
        </Text>
      </TouchableOpacity>

      {/* Native Picker */}
      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          maximumDate={maxDate}
          onChange={(
            event: DateTimePickerEvent,
            selected?: Date | undefined
          ) => {
            if (event.type === "dismissed") {
              setShowPicker(false);
              return;
            }

            if (selected) {
              onChange(selected);
            }

            // Android closes automatically — iOS keeps open unless manually closed
            if (Platform.OS === "android") {
              setShowPicker(false);
            }
          }}
        />
      )}
    </View>
  );
}
