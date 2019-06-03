# rn-persian-date-picker

a simple persian date picker for react native

# ScreenShots :

<img src="https://media.giphy.com/media/U77f6ZefyqUalkye5m/giphy.gif" width="300" height="600"/>

.

<img src="https://media.giphy.com/media/Qw2aJdzo4m9O0gGGOg/giphy.gif" width="300" height="600"/>

# Installing:

# Step 1:

      npm i rn-persian-date-picker --save

OR
yarn add rn-persian-date-picker

# Step 2:

     react-native link react-native-picker

# Usage

```javascript
import PersianDatePicker from "rn-persian-date-picker";
export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => this.picker.showPicker()}>
          <View style={{ height: 80, width: 180, backgroundColor: "red" }}>
            <Text>
              {selectedDate.format("jYYYY/jMM/jDD")} //for more formats and
              functions go to moment-jalaali
            </Text>
          </View>
        </TouchableOpacity>
        <PersianDatePicker
          type="Gregorian"
          yearCount={10}
          onConfirm={date => this.setState({ selectedDate: date })}
          ref={ref => (this.picker = ref)}
        />
      </View>
    );
  }
}
```

# props

| prop                  |                                                    desc                                                    |                example |
| --------------------- | :--------------------------------------------------------------------------------------------------------: | ---------------------: |
| type                  |                           type of date picker( can be "Gregorian" or "Jalali" )                            |                        |
| yearCount             |                                     count of years to be show from now                                     |                     10 |
| pickerConfirmBtnText  |                                           text of confirm Button                                           |               "انتخاب" |
| pickerTitleText       |                                              title of picker                                               | "تاریخ را انتخاب کنید" |
| pickerCancelBtnText   |                                           text of cancel Button                                            |                  "لغو" |
| pickerCancelBtnColor  |                                   color of cancel button ( RGBA array )                                    |           [0, 0, 0, 1] |
| pickerToolBarBg       |                                  tollbar background color ( RGBA array )                                   |           [0, 0, 0, 1] |
| pickerConfirmBtnColor |                                   color of confirm button ( RGBA array )                                   |           [0, 0, 0, 1] |
| pickerTitleColor      |                                         title color ( RGBA array )                                         |           [0, 0, 0, 1] |
| pickerBg              |                                   picker background color ( RGBA array )                                   |           [0, 0, 0, 1] |
| pickerFontFamily      |                                      font family of the picker items                                       |                        |
| minDate               |            picker start date (string, can be jalali( 1398/08/08 ) or gregorian( 2019/09/09 ) )             |                        |
| maxDate               |              picker max date(string, just like minDate, can be use instead of yearCount and)               |                        |
| onConfirm             | function that be called when a date select(argument that pass to onConfirm is a Moment-jalali date object) |  (date:moment-jalaali) |
| onPickerCancel        |                        function that be called when a user press the cancel button                         |                        |

# methods

| method     |                                    desc                                    | example |
| ---------- | :------------------------------------------------------------------------: | ------: |
| showPicker |                            open the date picker                            |         |
| hidePicker |                           close the date picker                            |         |
| isOpen     | return date picker status (true : picker is open, false : picker is close) |         |

# Example

```javascript
import React, { Component } from "react";
import { Text, View } from "react-native";
import PersianDatePicker from "rn-persian-date-picker";

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => this.picker.showPicker()}>
          <View style={{ height: 80, width: 180, backgroundColor: "red" }}>
            <Text>
              {selectedDate.format("jYYYY/jMM/jDD")} //for more formats and
              functions go to moment Jalali
            </Text>
          </View>
        </TouchableOpacity>
        <PersianDatePicker
          type="Gregorian"
          yearCount={10}
          onConfirm={date => this.setState({ selectedDate: date })}
          ref={ref => (this.picker = ref)}
        />
      </View>
    );
  }
}
```
