// @flow
import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import Screen from "../Screen";
import moment from "moment-jalaali";
import Picker from "react-native-picker";
import { toFaDigit, convertNumberToEnglish } from "../modules";
import { primaryFontFamily, smallFont } from "../modules";

type Props = {
  type: "jalali" | "Gregorian",
  year: number,
  month: number,
  day: number,
  pickerConfirmBtnText: string,
  pickerTitleText: string,
  pickerCancelBtnColor: [number, number, number, number],
  pickerToolBarFontSize: number,
  pickerFontSize: number,
  pickerToolBarBg: [number, number, number, number],
  pickerConfirmBtnColor: [number, number, number, number],
  pickerTitleColor: [number, number, number, number],
  pickerBg: [number, number, number, number],
  pickerCancelBtnText: string,
  yearCount: number,
  onConfirm: () => moment.Moment,
  onCancel: Function,
  onSelect: Function,
  pickerFontFamily: string
};

export default class PheebsDatePicker extends Component<Props> {
  static defaultProps = {
    pickerCancelBtnText: "لغو",
    pickerTitleText: "تاریخ را انتخاب کنید",
    pickerConfirmBtnText: "انتخاب",
    onConfirm: date => console.warn(date),
    pickerCancelBtnColor: [0, 0, 0, 1],
    pickerFontSize: 18,
    pickerToolBarBg: [232, 232, 232, 1],
    pickerConfirmBtnColor: [0, 0, 0, 1],
    pickerTitleColor: [0, 0, 0, 1],
    pickerBg: [255, 255, 255, 255],
    pickerFontFamily: primaryFontFamily,
    pickerToolBarFontSize: smallFont
  };
  hide() {
    this.pickerIsOpen = false;
    Picker.hide();
  }
  showPicker = () => {
    const {
      pickerCancelBtnText,
      pickerTitleText,
      pickerConfirmBtnText,
      onConfirm,
      pickerCancelBtnColor,
      pickerToolBarFontSize,
      pickerFontSize,
      pickerToolBarBg,
      pickerConfirmBtnColor,
      pickerTitleColor,
      pickerFontFamily,
      pickerBg
    } = this.props;
    Picker.init({
      pickerCancelBtnText,
      pickerTitleText,
      pickerCancelBtnColor,
      pickerToolBarFontSize,
      pickerFontSize,
      pickerToolBarBg,
      pickerConfirmBtnColor,
      pickerFontFamily,
      pickerTitleColor,
      pickerBg,
      pickerConfirmBtnText,
      pickerTextEllipsisLen: 100,
      pickerData: this.data,
      onPickerConfirm: data => {
        this.props.type === "Gregorian"
          ? this.gregorianConfirm(data)
          : this.jalaliConfirm(data);
      },
      onPickerCancel: data => {
        this.pickerIsOpen = false;
      },
      onPickerSelect: data => {}
    });
    Keyboard.dismiss();
    Picker.show();
    this.pickerIsOpen = true;
  };
  gregorianConfirm(data) {
    const { onConfirm } = this.props;
    data[1] = this.getMonthNumberEng(data[1]);
    data[0] = convertNumberToEnglish(data[0]);
    data[2] = convertNumberToEnglish(data[2]);
    this.setState({ year: data[0], day: data[2], month: data[1] });
    m = new moment(data[0] + "/" + data[1] + "/" + data[2], "'YYYY/M/D'");
    onConfirm(m);
    this.pickerIsOpen = false;
  }
  jalaliConfirm(data) {
    const { onConfirm } = this.props;
    data[1] = this.getMonthNumber(data[1]);
    data[0] = convertNumberToEnglish(data[0]);
    data[2] = convertNumberToEnglish(data[2]);
    this.setState({ year: data[0], day: data[2], month: data[1] });
    m = new moment(data[0] + "/" + data[1] + "/" + data[2], "'jYYYY/jM/jD'");
    onConfirm(m);
    this.pickerIsOpen = false;
  }
  render() {
    this.data =
      this.props.type === "Gregorian"
        ? this._createGregorianDates()
        : this._createDates();
    return (
      <View />
      //   <Screen>
      //     <View
      //       style={{
      //         flex: 1,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         backgroundColor: "red"
      //       }}
      //     >
      //       <TouchableOpacity onPress={this.showPicker}>
      //         <View
      //           style={{ backgroundColor: "green", height: 64, width: 100 }}
      //         />
      //       </TouchableOpacity>
      //     </View>
      //   </Screen>
    );
  }

  _createDates() {
    var MaxMonth;
    var MaxYear;
    var MaxDay;
    if (this.props.maxDate == undefined) {
      maxDate = moment();
      maxDate.add(this.props.yearCount, "jYear");
      var MaxYear = maxDate.jYear();
      var MaxMonth = 12;
      if (moment.jIsLeapYear(_year)) {
        var MaxDay = 30;
      } else {
        var MaxDay = 29;
      }
    } else {
      m = moment(this.props.maxDate, "jYYYY/jM/jD");
      var MaxMonth = m.jMonth();
      var MaxYear = m.jYear();
      var MaxDay = m.jDate();
    }
    m =
      this.props.minDate == undefined
        ? moment()
        : moment(this.props.minDate, "jYYYY/jM/jD");
    var month = m.jMonth();
    var year = m.jYear();
    var day = m.jDate();

    let data = [];

    for (let i = 0; m.jYear() <= MaxYear; i++) {
      var _year = m.jYear();
      let months = [];
      for (let j = 0; j < 12; j++) {
        var daysLength = moment.jIsLeapYear(_year) ? 30 : 29;
        if (j != 11) {
          daysLength = 30;
        }
        if (j <= 5) {
          daysLength = 31;
        }
        if (_year == MaxYear && j > MaxMonth) break;
        if (year == _year && j < month) continue;
        let days = [];
        for (let k = 0; k < daysLength; k++) {
          if (_year == MaxYear && j == MaxMonth && k == MaxDay) break;
          if (_year == year && month == j && k < day - 1) continue;
          days.push(toFaDigit(k + 1));
        }
        let _days = {};
        _days[this.getMonthString(j + 1)] = days;
        months.push(_days);
      }
      let _data = {};
      _data[toFaDigit(_year)] = months;
      data.push(_data);
      m.add(1, "jYear");
    }
    return data;
  }
  getMonthString(number) {
    switch (number) {
      case 1:
        return "فروردین";
      case 2:
        return "اردیبهشت";
      case 3:
        return "خرداد";
      case 4:
        return "تیر";
      case 5:
        return "مرداد";
      case 6:
        return "شهریور";
      case 7:
        return "مهر";
      case 8:
        return "آبان";
      case 9:
        return "آذر";
      case 10:
        return "دی";
      case 11:
        return "بهمن";
      case 12:
        return "اسفند";
    }
    return number;
  }
  getMonthNumber(string) {
    switch (string) {
      case "فروردین":
        return 1;
      case "اردیبهشت":
        return 2;
      case "خرداد":
        return 3;
      case "تیر":
        return 4;
      case "مرداد":
        return 5;
      case "شهریور":
        return 6;
      case "مهر":
        return 7;
      case "آبان":
        return 8;
      case "آذر":
        return 9;
      case "دی":
        return 10;
      case "بهمن":
        return 11;
      case "اسفند":
        return 12;
    }
    return 0;
  }

  _createGregorianDates() {
    var MaxMonth;
    var MaxYear;
    var MaxDay;
    if (this.props.maxDate == undefined) {
      maxDate = moment();
      maxDate.add(this.props.yearCount, "Year");
      var MaxYear = maxDate.year();
      var MaxMonth = 12;
      var MaxDay = 31;
    } else {
      m = moment(this.props.maxDate, "YYYY/M/D");
      var MaxMonth = m.Month();
      var MaxYear = m.year();
      var MaxDay = m.Date();
    }
    m =
      this.props.minDate == undefined
        ? moment()
        : moment(this.props.minDate, "YYYY/M/D");
    var month = m.month();
    var year = m.year();
    var day = m.date();
    let data = [];
    for (let i = 0; m.year() <= MaxYear; i++) {
      var _year = m.year();
      let months = [];
      for (let j = 0; j < 12; j++) {
        if (j == 1) {
          if (moment(_year + "/" + (j + 1) + "/29", "YYYY/M/DD").isValid()) {
            daysLength = 29;
          } else {
            daysLength = 28;
          }
        } else if (
          moment(_year + "/" + (j + 1) + "/31", "YYYY/M/DD").isValid()
        ) {
          daysLength = 31;
        } else {
          daysLength = 30;
        }
        if (_year == MaxYear && j > MaxMonth) break;
        if (year == _year && j < month) continue;
        let days = [];
        for (let k = 0; k < daysLength; k++) {
          if (_year == MaxYear && j == MaxMonth && k == MaxDay) break;
          if (_year == year && month == j && k < day - 1) continue;
          days.push(k + 1);
        }
        let _days = {};
        _days[this.getMonthStringEng(j + 1)] = days;
        months.push(_days);
      }
      let _data = {};
      _data[_year] = months;
      data.push(_data);
      m.add(1, "year");
    }
    return data;
  }
  getMonthStringEng(number) {
    switch (number) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
    return number;
  }
  getMonthNumberEng(string) {
    switch (string) {
      case "January":
        return 1;
      case "February":
        return 2;
      case "March":
        return 3;
      case "April":
        return 4;
      case "May":
        return 5;
      case "June":
        return 6;
      case "July":
        return 7;
      case "August":
        return 8;
      case "September":
        return 9;
      case "October":
        return 10;
      case "November":
        return 11;
      case "December":
        return 12;
    }
    return number;
  }
}
