# Customization Guide

## Custom Styles

You can easily apply custom CSS to style the `vue3-datepick` component according to your project needs.

Example:

```css
.datepick {
  background-color: #f0f0f0;
  border-radius: 8px;
}
```

## Date Format Customization

You can easily customize how the date is displayed using the `displayFormat` prop. The default format is `yyyy-MM-dd`.

Example:

```vue
<DatePick v-model="selectedDate" display-format="dd/MM/yyyy" />
```

## Disable Specific Dates

You can disable specific dates (such as weekends) using the `isDateDisabled` function.

Example: Disable Sundays:

```vue
<DatePick v-model="selectedDate" :is-date-disabled="isDateDisabled" />

<script setup lang="ts">
const isDateDisabled = (date: Date) => {
  return date.getDay() === 0 // Disable Sundays
}
</script>
```
