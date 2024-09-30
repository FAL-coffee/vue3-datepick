# API Reference

## Props

| Prop                | Type       | Default               | Description                                       |
| ------------------- | ---------- | --------------------- | ------------------------------------------------- |
| `v-model`           | `String`   | `null`                | The selected date (two-way data binding).         |
| `displayFormat`     | `String`   | `'yyyy-MM-dd'`        | The format used to display the date.              |
| `disabled`          | `Boolean`  | `false`               | Disables the date picker.                         |
| `placeholder`       | `String`   | `null`                | Placeholder text for the input.                   |
| `yearContent`       | `String`   | `null`                | Content to display for the year.                  |
| `yearFirst`         | `Boolean`  | `false`               | Display year before the month in the date picker. |
| `months`            | `Array`    | Full list of months   | Array of month names.                             |
| `weekdays`          | `Array`    | Full list of weekdays | Array of weekday names.                           |
| `startWeekOnSunday` | `Boolean`  | `false`               | Determines if the week starts on Sunday.          |
| `isDateDisabled`    | `Function` | `null`                | Function to disable specific dates.               |

## Events

- **@update:modelValue**: Triggered when the selected date changes.

Example:

```vue
<DatePick @update:modelValue="handleDateChange" />
```

## Methods

### `focus()`

Focuses the date picker component programmatically.

Example:

```vue
<DatePick ref="datepicker" />
<script setup>
const datepicker = ref(null)
datepicker.value.focus()
</script>
```
