import React, { useState } from "react";
import { Button, View } from "react-native";

export function YearSelect(props: {
  value: 1 | 2 | 3 | 4 | 5;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ gap: 8 }}>
      <Button
        title={`Years ago: ${props.value}`}
        onPress={() => setOpen(!open)}
        color="#d92323" />

      {open && (
        <View style={{ gap: 6 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button
              key={n}
              title={`${n}`}
              color="#d92323"
              onPress={() => {
                const year = n as 1 | 2 | 3 | 4 | 5;
                console.log(`${year} year is selected`);
                props.onChange(year);
                setOpen(false);
              }}
             />
          ))}
        </View>
      )}
    </View>
  );
}