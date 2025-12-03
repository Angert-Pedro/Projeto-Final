import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface TimePickerProps {
  time: Date | null;                 // Current selected time
  onChange: (time: Date) => void;    // Callback when time is selected
  label?: string;                    // Label to display
}

export default function TimePicker({
  time,
  onChange,
  label = "Horário",
}: TimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const isPlaceholder = time === null || time === undefined;

  const formatDisplay = (dt: Date | null): string => {
    if (!dt) return label;
    const h = dt.getHours().toString().padStart(2, "0");
    const m = dt.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const formatTimeForInput = (dt: Date): string => {
    const h = String(dt.getHours()).padStart(2, "0");
    const m = String(dt.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  // Web version with HTML input
  if (Platform.OS === "web") {
    return (
      <input
        type="time"
        value={time ? formatTimeForInput(time) : ""}
        onChange={(e: any) => {
          const val = e.target.value;
          if (val) {
            const [h, m] = val.split(":");
            const dt = new Date();
            dt.setHours(Number(h), Number(m), 0, 0);
            onChange(dt);
          }
        }}
        placeholder={label}
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          border: "1px solid #d1d1d6",
          backgroundColor: "#FFFFFF",
          fontSize: 16,
          fontFamily: "inherit",
          color: time ? "#000" : "#8A8A8E",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: 12,
        } as any}
      />
    );
  }

  return (
    <View>
      {/* Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("TimePicker button pressed, Platform:", Platform.OS);
          setShowPicker(true);
        }}
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
        <Text
          style={{
            fontSize: 16,
            color: isPlaceholder ? "#8A8A8E" : "#000",
          }}
        >
          {isPlaceholder ? label : formatDisplay(time)}
        </Text>
      </TouchableOpacity>

      {/* Native Picker */}
      {showPicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
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
